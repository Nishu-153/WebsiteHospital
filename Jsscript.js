// Global cart array
let cart = [];

// Add to Cart Function
function addToCart(medicine, price, qtyId) {
    const qty = parseInt(document.getElementById(qtyId).value) || 0;
    if (qty > 0) {
        const existingItem = cart.find(item => item.medicine === medicine);
        if (existingItem) {
            existingItem.quantity += qty;
            existingItem.total += price * qty;
        } else {
            cart.push({ medicine, price, quantity: qty, total: price * qty });
        }
        updateCartTable();
    } else {
        alert("Please enter a valid quantity!");
    }
}

// Update Cart Table
function updateCartTable() {
    const cartTableBody = document.getElementById("cartTableBody");
    cartTableBody.innerHTML = ""; // Clear current table rows
    let totalCost = 0;

    cart.forEach((item, index) => {
        totalCost += item.total;
        const row = `
            <tr>
                <td>${item.medicine}</td>
                <td>$${item.price}</td>
                <td>${item.quantity}</td>
                <td>$${item.total.toFixed(2)}</td>
                <td><button onclick="removeFromCart(${index})">Remove</button></td>
            </tr>
        `;
        cartTableBody.innerHTML += row;
    });

    document.getElementById("totalCost").innerText = `$${totalCost.toFixed(2)}`;
}

// Remove from Cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove item by index
    updateCartTable();
}

// Save Favorites
function saveFavorites() {
    localStorage.setItem("favorites", JSON.stringify(cart));
    alert("Favorites saved!");
}

// Apply Favorites
function applyFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    if (favorites && favorites.length > 0) {
        cart = favorites;
        updateCartTable();
    } else {
        alert("No favorites saved!");
    }
}

// Proceed to Checkout
function proceedToCheckout() {
    if (cart.length > 0) {
        localStorage.setItem("cart", JSON.stringify(cart));
        window.location.href = "checkout.html";
    } else {
        alert("Your cart is empty!");
    }
}
