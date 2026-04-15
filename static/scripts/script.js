let allDishes = [];
let cart = localStorage.getItem("cart");
if(!cart) {
    cart = [];
}
let addButton = document.getElementById('add-button');


function createDishCard(dish, index) {
    const card = document.createElement('div');
    card.className = 'dish_item';
    card.innerHTML = `
        
    `;

    return card;
}

function renderMenus(dishes) {
    dishes.forEach((vac, index) => {
        const card = createDishCard(vac, index);
        var container;
        if (vac.category == "past") {
            container = document.getElementById('dishes_list_past');
        } else if (vac.category == "present") {
            container = document.getElementById('dishes_list_present');
        } else {
            container = document.getElementById('dishes_list_future');
        }
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