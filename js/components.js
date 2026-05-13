async function loadComponent(selector, file) {
    try {
        const response = await fetch(file);
        const html = await response.text();
        document.querySelector(selector).outerHTML = html;
    } catch (error) {
        console.error(`Ошибка загрузки ${file}:`, error);
    }
}

function updateAuthButton() {
    const authLink = document.querySelector('.header__auth');

    if (!authLink) return;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser?.login) {
        authLink.textContent = currentUser.login;
        authLink.href = '#';

        authLink.onmouseenter = () => {
            authLink.textContent = 'Выход';
        };

        authLink.onmouseleave = () => {
            authLink.textContent = currentUser.login;
        };

        authLink.onclick = (e) => {
            e.preventDefault();
            logout();
        };
    } else {
        authLink.textContent = 'Вход';

        authLink.onclick = (e) => {
            e.preventDefault();
            localStorage.setItem('redirectAfterLogin', window.location.pathname);
            window.location.href = '/auth.html';
        };

        authLink.onmouseenter = null;
        authLink.onmouseleave = null;
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    updateAuthButton();
    location.reload();
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadComponent('header', '/components/header.html');
    await loadComponent('footer', '/components/footer.html');
    updateAuthButton();
});