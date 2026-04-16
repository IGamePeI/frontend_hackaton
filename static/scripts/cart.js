let container = document.getElementById('cart_items');
let cart = localStorage.getItem("cart");
if(!cart) {
    cart = [];
} else {
    cart = JSON.parse(cart);
}

const address = document.getElementById('delivery_address').value;
const form = document.getElementById('order_form').value;

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let userid;
    response = await fetch('http://127.0.0.1:8000/auth/me', {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        }).then(data => {
            data.json();
        }).then(data => {
            userid = data.id;
        })
        .catch(error => {
            console.error(error);
        });
    if (userid) {
        const res = await fetch("http://localhost:8000/orders/", {
        method: "POST",
        headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_id: userid,
            dishes_id: cart,
            address: address,
            status: "expected",
        }),
    });
    }
}) 


document.addEventListener('DOMContentLoaded', () => {

});