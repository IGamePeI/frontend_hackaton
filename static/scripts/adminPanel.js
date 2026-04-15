let currentUser = null;
adminSection = document.getElementById();
collectorSection = document.getElementById();

function loadCollectorSection() {
    collectorSection.style.display = 'flex';
}

function loadAdminSection() {
    loadCollectorSection();
    adminSection.style.display = 'flex';
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://127.0.0.1:8000/auth/me', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                window.location.href = './login.html';
                return;
            }
            return response.json();
        })
        .then(user => {
            if (!user) return;

            currentUser = user;
            if (user.role === 'admin') {
                loadAdminSection();
            } else {
                loadCollectorSection();
            }
        });
});