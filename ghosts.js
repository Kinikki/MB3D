/* Little Ghosts: one listing, single or mixed trio, one size per order. */
const ghostMoney = cents => new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD"
}).format(cents / 100);

function ghostEscape(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[char]));
}

function normalizeGhostSelection(input = {}) {
    const valid = (list, id) => list.find(option => option.id === id) || list[0];
    return {
        pack: Number(input.pack) === 3 ? 3 : 1,
        size: valid(ghostCollection.sizes, input.size).id,
        choices: Array.from({ length: 3 }, (_, i) => ({
            design: valid(ghostCollection.designs, input.choices?.[i]?.design || ghostCollection.designs[i]?.id).id,
            color: valid(ghostCollection.colors, input.choices?.[i]?.color).id
        }))
    };
}

function getGhostQuote(input) {
    const state = normalizeGhostSelection(input);
    const size = ghostCollection.sizes.find(option => option.id === state.size);
    const total = state.pack === 3 ? size.trio : size.single;
    return { state, size, total, saving: state.pack === 3 ? size.single * 3 - total : 0 };
}

function getGhostOrderText(input) {
    const { state, size, total } = getGhostQuote(input);
    const lines = ["Little Ghosts order request", "", `${state.pack === 3 ? "Pick 3 pack" : "One ghost"} | ${size.name}`, ""];
    state.choices.slice(0, state.pack).forEach((choice, i) => {
        const design = ghostCollection.designs.find(item => item.id === choice.design);
        const color = ghostCollection.colors.find(item => item.id === choice.color);
        lines.push(`${i + 1}. ${design.name} | ${size.name} | ${color.name}`);
    });
    lines.push("", `Item subtotal: ${ghostMoney(total)}`, "Shipping/pickup and any applicable tax to be confirmed.", "",
        "Please confirm availability and send payment details.", "", "My name:", "Pickup or shipping:", "Needed by (if any):");
    return lines.join("\n");
}

let ghostDraft = normalizeGhostSelection();
try {
    const saved = localStorage.getItem("mb3d-ghost-options-v1");
    if (saved) ghostDraft = normalizeGhostSelection(JSON.parse(saved));
} catch (_) { /* Shopping still works when browser storage is disabled. */ }

function createGhostCard(product) {
    let state = normalizeGhostSelection(ghostDraft);
    const card = document.createElement("article");
    card.className = "product-card ghost-product";
    card.id = "little-ghosts";
    card.innerHTML = `
        <div class="ghost-gallery">
            <img class="ghost-main-image" src="${ghostEscape(ghostCollection.groupImage)}" alt="Little Ghosts collection, digital model previews" width="720" height="720">
            <button type="button" class="ghost-show-collection">View the whole collection</button>
            <p class="ghost-image-note">${ghostEscape(ghostCollection.imageNote)}</p>
        </div>
        <div class="product-info ghost-info">
            <span class="badge available">Made to order</span>
            <h3>${ghostEscape(product.name)}</h3>
            <p>${ghostEscape(product.description)}</p>
            <form class="ghost-form">
                <div class="ghost-choice-list"></div>
                <fieldset class="ghost-size-field">
                    <legend>Choose a size</legend>
                    <div class="ghost-size-options">${ghostCollection.sizes.map(size => `
                        <label class="ghost-size-option">
                            <input type="radio" name="ghost-size" value="${size.id}" ${state.size === size.id ? "checked" : ""}>
                            <span><strong>${size.name}</strong><small>${ghostMoney(size.single)} each<br>3 for ${ghostMoney(size.trio)}</small></span>
                        </label>`).join("")}
                    </div>
                </fieldset>
                <fieldset class="ghost-pack-field">
                    <legend>How many?</legend>
                    <div class="ghost-pack-options">
                        <label><input type="radio" name="ghost-pack" value="1" ${state.pack === 1 ? "checked" : ""}> One ghost</label>
                        <label><input type="radio" name="ghost-pack" value="3" ${state.pack === 3 ? "checked" : ""}> Pick 3 <span class="ghost-save">Bundle & save</span></label>
                    </div>
                    <p class="ghost-hint">For a trio, mix designs and colors. All three will be your selected size.</p>
                </fieldset>
                <div class="ghost-extra-choices"></div>
                <div class="ghost-order-summary" aria-live="polite" aria-atomic="true"></div>
                <div class="ghost-request-actions">
                    <a class="buy-btn ghost-order-link" href="#">Request this order</a>
                    <button class="ghost-copy" type="button">Copy order details</button>
                </div>
                <p class="ghost-order-note">Opens an email with your selections. We’ll confirm availability, shipping or pickup, and payment details before you pay.</p>
                <p class="ghost-copy-status" role="status"></p>
                <textarea class="ghost-copy-fallback" aria-label="Order details to copy" hidden readonly></textarea>
            </form>
        </div>`;

    const form = card.querySelector(".ghost-form");
    const mainImage = card.querySelector(".ghost-main-image");
    const firstChoices = card.querySelector(".ghost-choice-list");
    const extraChoices = card.querySelector(".ghost-extra-choices");
    const summary = card.querySelector(".ghost-order-summary");
    const orderLink = card.querySelector(".ghost-order-link");

    function showDesign(design) {
        mainImage.src = design.image;
        mainImage.alt = `${design.name}, digital model preview`;
    }

    function designPicker(index) {
        const choice = state.choices[index];
        const selected = ghostCollection.designs.find(design => design.id === choice.design);
        const section = document.createElement("section");
        section.className = "ghost-choice";
        section.innerHTML = `
            <h4>${index === 0 ? "Choose your ghost" : `Ghost ${index + 1}`}</h4>
            <details class="ghost-picker">
                <summary aria-label="Choose design for ghost ${index + 1}">
                    <img src="${ghostEscape(selected.image)}" alt="" width="48" height="54">
                    <span class="ghost-selected-name">${ghostEscape(selected.name)}</span><span class="ghost-chevron" aria-hidden="true">⌄</span>
                </summary>
                <fieldset class="ghost-design-options">
                    <legend class="ghost-sr-only">Design for ghost ${index + 1}</legend>
                    ${ghostCollection.designs.map(design => `
                        <label class="ghost-design-option">
                            <input type="radio" name="ghost-design-${index}" value="${design.id}" ${choice.design === design.id ? "checked" : ""}>
                            <img src="${ghostEscape(design.image)}" alt="" loading="lazy" width="70" height="78">
                            <span>${ghostEscape(design.name)}</span>
                        </label>`).join("")}
                </fieldset>
            </details>
            <label class="ghost-color-label" for="ghost-color-${index}">${index === 0 ? "Choose a color" : `Color for ghost ${index + 1}`}</label>
            <div class="ghost-color-row">
                <span class="ghost-color-dot" aria-hidden="true"></span>
                <select id="ghost-color-${index}" name="ghost-color-${index}">
                    ${ghostCollection.colors.map(color => `<option value="${color.id}" ${choice.color === color.id ? "selected" : ""}>${ghostEscape(color.name)}</option>`).join("")}
                </select>
            </div>`;
        const picker = section.querySelector("details");
        const dot = section.querySelector(".ghost-color-dot");
        const setDot = () => { dot.style.backgroundColor = ghostCollection.colors.find(color => color.id === state.choices[index].color).swatch; };
        setDot();
        picker.addEventListener("toggle", () => {
            if (picker.open) card.querySelectorAll("details[open]").forEach(other => { if (other !== picker) other.open = false; });
        });
        section.querySelectorAll(`input[name="ghost-design-${index}"]`).forEach(input => {
            input.addEventListener("change", () => {
                state.choices[index].design = input.value;
                const design = ghostCollection.designs.find(item => item.id === input.value);
                const selectedImage = picker.querySelector("summary img");
                selectedImage.src = design.image;
                picker.querySelector(".ghost-selected-name").textContent = design.name;
                showDesign(design);
                picker.open = false;
                picker.querySelector("summary").focus();
                updateQuote();
            });
        });
        section.querySelector("select").addEventListener("change", event => {
            state.choices[index].color = event.target.value;
            setDot();
            updateQuote();
        });
        return section;
    }

    function renderExtraChoices() {
        extraChoices.replaceChildren();
        if (state.pack === 3) {
            extraChoices.append(designPicker(1), designPicker(2));
        }
    }

    function updateQuote() {
        const quote = getGhostQuote(state);
        ghostDraft = normalizeGhostSelection(state);
        try { localStorage.setItem("mb3d-ghost-options-v1", JSON.stringify(ghostDraft)); } catch (_) { /* Optional. */ }
        summary.innerHTML = `<div><span>${quote.size.name} ${state.pack === 3 ? "trio · 3 ghosts" : "· 1 ghost"}</span><strong>${ghostMoney(quote.total)}</strong></div>
            ${quote.saving ? `<p>Save ${ghostMoney(quote.saving)} compared with three singles.</p>` : ""}
            <small>Item subtotal. Shipping and any applicable tax confirmed separately.</small>`;
        orderLink.href = `mailto:${ghostCollection.email}?subject=${encodeURIComponent("Little Ghosts order request")}&body=${encodeURIComponent(getGhostOrderText(state))}`;
        card.querySelector(".ghost-copy-fallback").hidden = true;
        card.querySelector(".ghost-copy-status").textContent = "";
    }

    firstChoices.append(designPicker(0));
    // Put size between the first design dropdown and its color control.
    const firstChoice = firstChoices.firstElementChild;
    firstChoice.insertBefore(card.querySelector(".ghost-size-field"), firstChoice.querySelector(".ghost-color-label"));
    form.querySelectorAll('input[name="ghost-size"]').forEach(input => input.addEventListener("change", () => {
        state.size = input.value;
        updateQuote();
    }));
    form.querySelectorAll('input[name="ghost-pack"]').forEach(input => input.addEventListener("change", () => {
        state.pack = Number(input.value);
        renderExtraChoices();
        updateQuote();
    }));
    form.addEventListener("submit", event => event.preventDefault());
    card.querySelector(".ghost-show-collection").addEventListener("click", () => {
        mainImage.src = ghostCollection.groupImage;
        mainImage.alt = "Little Ghosts collection, digital model previews";
    });
    card.querySelector(".ghost-copy").addEventListener("click", async () => {
        const text = getGhostOrderText(state);
        try {
            await navigator.clipboard.writeText(text);
            card.querySelector(".ghost-copy-status").textContent = "Order details copied. Paste them into your message to MB3D Creations.";
        } catch (_) {
            const fallback = card.querySelector(".ghost-copy-fallback");
            fallback.value = text;
            fallback.hidden = false;
            fallback.focus();
            fallback.select();
            card.querySelector(".ghost-copy-status").textContent = "Select and copy the order details below.";
        }
    });
    renderExtraChoices();
    updateQuote();
    return card;
}
