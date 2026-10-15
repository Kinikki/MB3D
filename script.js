const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });
}

const glitter = document.querySelector(".glitter");

if (glitter) {
    for (let i = 0; i < 40; i++) {
        const sparkle = document.createElement("span");
        sparkle.className = "sparkle";
        sparkle.style.left = Math.random() * 100 + "%";
        sparkle.style.animationDelay = Math.random() * 8 + "s";
        sparkle.style.animationDuration = 5 + Math.random() * 7 + "s";
        glitter.appendChild(sparkle);
    }
}

const productGrid = document.getElementById("productGrid");
const filterButtons = document.querySelectorAll(".filter-btn");

function displayProducts(category = "All") {
    if (!productGrid || typeof products === "undefined") {
        return;
    }

    productGrid.innerHTML = "";

    const availableProducts = products.filter(product => product.available !== false);
    const filteredProducts = category === "All"
        ? availableProducts
        : availableProducts.filter(product => product.category === category);

    filteredProducts.forEach(product => {
        if (product.configurable === "ghosts") {
            productGrid.appendChild(createGhostCard(product));
            return;
        }
        const card = document.createElement("div");
        card.className = "product-card";

        const imageContent = product.image
            ? `<img src="${product.image}" alt="${product.name}">`
            : `<div class="placeholder-img">🌈<br>${product.name}</div>`;

        const availability = `<span class="badge available">Made to order</span>`;
        const squareButton = product.squareLink && product.squareLink !== "#"
            ? `<a href="${product.squareLink}" class="buy-btn square" target="_blank" rel="noopener noreferrer">Buy with Square</a>`
            : "";
        const paypalButton = product.paypalLink && product.paypalLink !== "#"
            ? `<a href="${product.paypalLink}" class="buy-btn paypal" target="_blank" rel="noopener noreferrer">PayPal</a>`
            : "";
        const requestButton = !squareButton && !paypalButton
            ? `<a class="buy-btn ghost-order-link" href="mailto:info.mb3dcreations@gmail.com?subject=${encodeURIComponent(product.name + " order request")}">Request this item</a>`
            : "";

        card.innerHTML = `
            ${imageContent}

            <div class="product-info">
                ${availability}
                <h3>${product.name}</h3>
                <p class="category">${product.category}</p>
                <p>${product.description}</p>
                <p><strong>Colors:</strong> ${product.colors}</p>
                <p class="price">${product.price}</p>

                <div class="product-buttons">
                    ${squareButton}
                    ${paypalButton}
                    ${requestButton}
                </div>
            </div>
        `;

        productGrid.appendChild(card);
    });
}

displayProducts();

filterButtons.forEach(button => {
    if (typeof products !== "undefined") {
        button.hidden = button.dataset.category !== "All" && !products.some(product =>
            product.available !== false && product.category === button.dataset.category);
    }
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        displayProducts(button.dataset.category);
    });
});

