document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('auth-form');
    authForm.addEventListener('submit', async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        response = await fetch('http://127.0.0.1:8000/auth/login', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        }).then(data => {
            window.location.href = '/'
        }).catch(error => {
            console.error(error);
        });
    });
});