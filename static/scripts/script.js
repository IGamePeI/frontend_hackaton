let allDishes = [];


function createDishCard(dish, index) {
    const card = document.createElement('div');
    card.className = 'dish_item';
    card.innerHTML = `
        <img class="dish_img" src="${dish.img_url}">
        <div class="dish_data">
            <span class="dish_name">${dish.name}</span>
            <span class="dish_desc">${dish.description}</span>
            <div class="dish-params">
                <span class="weight">${dish.weight} г</span>
                <span class="price">${dish.price} руб</span>
            </div>
        </div>
    `;

    return card;
}

function renderMenus(dishes) {
    const container = document.getElementById('vacancies-list');
    dishes.forEach((vac, index) => {
        const card = createDishCard(vac, index);
        if (vac.category == "past") {
            const container = document.getElementById('dishes_list_past');
        } else if (vac.category == "present") {
            const container = document.getElementById('dishes_list_present');
        } else {
            const container = document.getElementById('dishes_list_future');
        }
        container.appendChild(card);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    fetch('http://127.0.0.1:8000/dishes/dishes/')
        .then(response => response.json())
        .then(data => {
            allDishes = data;
            renderMenus(allDishes);
        })
        .catch(error => {
            console.error('Ошибка загрузки:', error);
        });
});