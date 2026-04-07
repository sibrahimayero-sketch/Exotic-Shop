// script.js complet

const products = [
    { name: "Mangue Exotique",      price: 10, image: "images/mangue.jpg" },
    { name: "Ananas Tropical",      price: 8,  image: "images/ananas.jpg" },
    { name: "Noix de Coco",         price: 6,  image: "images/coco.jpg" },
    { name: "Fruit de la Passion",  price: 7,  image: "images/fruit-passion.jpg" },
    { name: "Papaye Sucrée",        price: 9,  image: "images/papaye.jpg" },
    { name: "Pitaya (Fruit du Dragon)", price: 12, image: "images/pitaya.jpg" },
    { name: "Litchis Frais",        price: 11, image: "images/litchis.jpg" },
    { name: "Goyave Tropicale",     price: 8,  image: "images/goyave.jpg" }
];

let cart = [];

// Affichage des produits
const productList = document.getElementById("product-list");

products.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("product");

    div.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">€${product.price}</p>
        <button>Ajouter au panier</button>
    `;

    div.querySelector("button").addEventListener("click", () => addToCart(product));
    productList.appendChild(div);
});

// Panier
function addToCart(product) {
    const existing = cart.find(item => item.name === product.name);
    if (existing) existing.quantity++;
    else cart.push({ ...product, quantity: 1 });

    updateCartCount();

    const cartIcon = document.getElementById("cart-icon");
    cartIcon.style.transform = "scale(1.4)";
    setTimeout(() => cartIcon.style.transform = "scale(1)", 200);
}

function updateCartCount() {
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById("cart-count").innerText = count;
}

function renderCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalEl = document.getElementById("cart-total");
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p style="text-align:center; padding:40px; color:#666;">Votre panier est vide 🌴</p>`;
        cartTotalEl.innerText = "0 €";
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <div><strong>${item.name}</strong><br>€${item.price} × ${item.quantity}</div>
            <div style="text-align:right;">
                <strong>€${itemTotal}</strong><br>
                <button class="remove-btn" data-index="${index}">Supprimer</button>
            </div>
        `;
        cartItemsContainer.appendChild(div);
    });

    cartTotalEl.innerText = total + " €";

    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            cart.splice(parseInt(e.target.dataset.index), 1);
            renderCart();
            updateCartCount();
        });
    });
}

// Modal Panier
document.getElementById("cart-icon").addEventListener("click", () => {
    renderCart();
    document.getElementById("cart-modal").classList.add("show");
});

document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("cart-modal").classList.remove("show");
});

// Formulaire de contact
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    
    if (name) {
        alert(`✅ Merci ${name} !\nVotre message a bien été envoyé.\nNous vous répondrons rapidement. 🌴`);
        contactForm.reset();
    } else {
        alert("Veuillez remplir au moins votre nom.");
    }
});