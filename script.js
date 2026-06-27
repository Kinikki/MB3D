const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });
}

const productGrid = document.getElementById("productGrid");

if (productGrid && typeof products !== "undefined") {
    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        const imageContent = product.image
            ? `<img src="${product.image}" alt="${product.name}">`
            : `<div class="placeholder-img">🌈<br>Photo Coming Soon</div>`;

        const availability = product.available
            ? `<span class="badge available">Available Soon</span>`
            : `<span class="badge coming">Coming Soon</span>`;

        const squareButton = product.squareLink && product.squareLink !== "#"
            ? `<a href="${product.squareLink}" class="buy-btn square" target="_blank">Buy with Square</a>`
            : `<button class="buy-btn disabled" disabled>Square Link Coming Soon</button>`;

        const paypalButton = product.paypalLink && product.paypalLink !== "#"
            ? `<a href="${product.paypalLink}" class="buy-btn paypal" target="_blank">PayPal</a>`
            : `<button class="buy-btn disabled" disabled>PayPal Coming Soon</button>`;

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
                </div>
            </div>
        `;

        productGrid.appendChild(card);
    });
}

const sparkleContainer = document.querySelector(".sparkles");

if (sparkleContainer) {
    for (let i = 0; i < 35; i++) {
        const sparkle = document.createElement("span");
        sparkle.className = "sparkle";
        sparkle.style.left = Math.random() * 100 + "%";
        sparkle.style.animationDelay = Math.random() * 8 + "s";
        sparkle.style.animationDuration = 5 + Math.random() * 6 + "s";
        sparkleContainer.appendChild(sparkle);
    }
}
