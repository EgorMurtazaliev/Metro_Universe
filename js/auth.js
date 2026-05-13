let users = JSON.parse(localStorage.getItem('users')) || [
    { login: 'admin', password: '1234' },
    { login: 'user', password: 'qwerty' }
];

function handleLogin() {
    const login = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const user = users.find(u => u.login === login && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify({ login: user.login }));
        alert(`Добро пожаловать, ${login}!`);
        const redirectUrl = localStorage.getItem('redirectAfterLogin') || '/index.html';
        localStorage.removeItem('redirectAfterLogin');
        window.location.href = redirectUrl;
    } else {
        alert('Неверный логин или пароль!');
    }
}

function handleRegister() {
    const login = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;

    if (users.find(u => u.login === login)) {
        alert('Пользователь уже существует!');
        return;
    }

    if (login.length < 3) {
        alert('Логин должен быть не менее 3 символов');
        return;
    }

    if (password.length < 4) {
        alert('Пароль должен быть не менее 4 символов');
        return;
    }

    users.push({ login: login, password: password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Регистрация успешна! Теперь войдите.');
    document.getElementById('reg-username').value = '';
    document.getElementById('reg-password').value = '';
    showLogin();
}

function showLogin() {
    document.getElementById('login-form').className = 'auth';
    document.getElementById('register-form').className = 'auth auth--inactive';
}

function showRegister() {
    document.getElementById('login-form').className = 'auth auth--inactive';
    document.getElementById('register-form').className = 'auth';
}