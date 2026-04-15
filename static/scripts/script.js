let allDishes = [];
let cart = localStorage.getItem("cart");
if(!cart) {
    cart = [];
}
let addButton = document.getElementById('add_to_cart');


function createDishCard(dish, index) {
    const card = document.createElement('div');
    card.className = 'dish';
    card.id = 'dish';
    card.innerHTML = `
        <img src="${dish.image_url}" alt="dish_img">
        <span id="dish_name" class="dish_name" dish_id="${dish.id}">${dish.name}</span>
        <span id="dish_weight" class="dish_weight">${dish.weight} г</span>
        <div class="buy_dish" id="buy_dish">
            <span id="dish_price" class="dish_price">${dish.price} руб</span>
            <button class="add_to_cart" id="add_to_cart">Добавить в корзину</button>
        </div>
    `;

    return card;
}

function renderMenus(dishes) {
    dishes.forEach((vac, index) => {
        const card = createDishCard(vac, index);
        container = document.getElementById('dish');
        container.appendChild(card);
    });
}

addButton.addEventListener('click', (e) => {
    cart.push(e.target.parentElement.parentElement);
    localStorage.setItem('cart', cart);
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://127.0.0.1:8000/dishes/dishes/all')
        .then(response => response.json())
        .then(data => {
            allDishes = data;
            renderMenus(allDishes);
        })
        .catch(error => {
            console.error('Ошибка загрузки:', error);
        });
});