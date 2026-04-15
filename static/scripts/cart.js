let cartRaw = localStorage.getItem("cart");
let cart = cartRaw ? JSON.parse(cartRaw) : [];

const cartContainer  = document.getElementById("cart_container");
const placeOrderBtn  = document.getElementById("place_order");

function createCartCard(item) {
    const card = document.createElement("div");
    card.className = "dish";
    card.innerHTML = `
        <div class="out_img">
            <img src="${item.image_url}" alt="dish_img">
        </div>
        <span class="dish_name" data-id="${item.id}">${item.name}</span>
        <span class="dish_weight">${item.weight}</span>
        <span class="dish_price">${item.price}</span>
        <button class="remove_from_cart">Удалить из корзины</button>
    `;

    const removeBtn = card.getElementsByClassName("remove_from_cart");
    removeBtn.addEventListener("click", (e) => {
        const parent = e.target.parentElement;
        const id = parseInt(parent.querySelector(".dish_name").getAttribute("data-id"), 10);
        const idx = cart.findIndex(dish => dish.id === id);
        if (idx !== -1) {
            cart.splice(idx, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
        }
    });

    return card;
}

function renderCart() {
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <span style="display: block; margin: 30px 0; text-align: center; color: #888; font-size: 18px;">
                Корзина пуста
            </span>
        `;
        placeOrderBtn.disabled = true;
        return;
    }

    placeOrderBtn.disabled = false;

    cart.forEach((item) => {
        const card = createCartCard(item);
        cartContainer.appendChild(card);
    });
}

placeOrderBtn.addEventListener("click", async () => {
    const address = document.getElementById("address").value.trim();
    const userId = parseInt(document.getElementById("user_id").value || "0", 10);

    if (cart.length === 0) {
        document.getElementById("order_status").textContent = "Нельзя оформить пустой заказ.";
        return;
    }

    if (!address) {
        document.getElementById("order_status").textContent = "Укажите адрес доставки.";
        return;
    }

    const dishes_id = cart.map(item => parseInt(item.id, 10));

    const orderData = {
        user_id:   userId,
        dishes_id: dishes_id,
        address:   address,
        status:    "ready"
    };

    try {
        const response = await fetch("http://127.0.0.1:8000/orders/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(orderData)
        });

        if (response.ok) {
            const result = await response.json();
            document.getElementById("order_status").innerHTML =
                `<span style="color: #009900;">Заказ оформлен! ID: ${result.id}</span>`;
            cart = [];
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
        } else {
            const error = await response.text();
            document.getElementById("order_status").textContent = `Ошибка оформления: ${error}`;
        }
    } catch (err) {
        console.error("Ошибка запроса:", err);
        document.getElementById("order_status").textContent = "Не удалось отправить заказ.";
    }
});

document.addEventListener("DOMContentLoaded", () => {
    renderCart();
});