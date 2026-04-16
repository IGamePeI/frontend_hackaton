let allDishes = [];
let cart = localStorage.getItem("cart");
if(!cart) {
    cart = [];
} else {
    cart = JSON.parse(cart);
}

function createDishCard(dish) {
    const card = document.createElement('div');
    card.className = 'dish';
    card.id = 'dish';
    card.innerHTML = `
        <div class="out_img">
            <img src="${dish.image_url}" alt="dish_img">
        </div>
        <span id="dish_name" class="dish_name" dish_id="${dish.id}">${dish.name}</span>
        <span id="dish_weight" class="dish_weight">${dish.weight} г</span>
        <span id="dish_price" class="dish_price">${dish.price} руб</span>
        <button class="add_to_cart" id="add_to_cart_${dish.id}">Добавить в корзину</button>
    `;
    
    return [card, dish.id];
}



function renderMenus(dishes) {
    let container;
    dishes.forEach((vac) => {
        const card = createDishCard(vac);    
        if (vac.category == 'past') {
            container = document.getElementById('past_menu');
        } else if (vac.category == 'present') {
            container = document.getElementById('present_menu');
        } else {
            container = document.getElementById('future_menu');
        }
        container.appendChild(card[0]);
        let button = document.getElementById(`add_to_cart_${card[1]}`);
        button.addEventListener('click', addToCard);
    });
}

function addToCard(e) {
    const card = e.target.closest('.dish');
    const nameSpan = card.querySelector('.dish_name');
    const dishId = nameSpan.getAttribute('dish_id');
    cart.push(dishId);
    localStorage.setItem('cart', cart);
}

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