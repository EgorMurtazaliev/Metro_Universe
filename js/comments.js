function initDefaultComments() {
    const defaultComments = [
        {
            id: 1,
            articleId: 'book_metro_2033',
            author: 'user',
            text: 'Отличная книга! Советую всем прочитать её и остальные две!!!',
            date: '13 мая 2026 г. в 10:31'
        },
        {
            id: 2,
            articleId: 'book_metro_2033',
            author: 'admin',
            text: 'Благодарим за тёплый отзыв! Рады, что вам понравилось. Надеемся, вы также оцените и другие материалы нашего сайта.',
            date: '13 мая 2026 г. в 12:15'
        },
        {
            id: 3,
            articleId: 'book_metro_2033',
            author: 'user',
            text: 'Книга понравилась. НЕ статья, КНИГА. Статья так себе',
            date: '13 мая 2026 г. в 13:06'
        },
        {
            id: 4,
            articleId: 'book_metro_2033',
            author: 'admin',
            text: 'Приносим извинения, если статья показалась вам недостаточно содержательной. Мы постоянно работаем над улучшением материалов. Уточните, пожалуйста, что именно вы хотели бы видеть? Будем благодарны за конструктивную обратную связь!',
            date: '13 мая 2026 г. в 13:17'
        },
        {
            id: 5,
            articleId: 'games',
            author: 'user',
            text: 'Почему нет новый игры Метро 2039?',
            date: '16 апреля 2026 г. в 20:39'
        },
        {
            id: 6,
            articleId: 'games',
            author: 'admin',
            text: 'Её пока только анонсировали, здесь только основные вышедшие игры.',
            date: '17 апреля 2026 г. в 08:45'
        }
    ];

    if (!localStorage.getItem('comments')) {
        localStorage.setItem('comments', JSON.stringify(defaultComments));
    }
}

function loadComments(articleId) {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    const articleComments = comments.filter(c => c.articleId === articleId);
    const countSpan = document.getElementById('comments-count');
    if (countSpan) countSpan.textContent = articleComments.length;
    renderComments(articleComments);
}

function renderComments(comments) {
    const container = document.getElementById('comments-list');
    if (!container) return;

    if (comments.length === 0) {
        container.innerHTML = '<p class="comments__auth">Пока нет комментариев. Будьте первым!</p>';
        return;
    }

    container.innerHTML = comments.map(comment => `
        <div class="comment">
            <div class="comment__header">
                <span class="comment__author">${escapeHtml(comment.author)}</span>
                <span class="comment__date">${comment.date}</span>
            </div>
            <div class="comment__text">${escapeHtml(comment.text)}</div>
        </div>
    `).join('');
}

function addComment(articleId, text) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
        alert('Войдите, чтобы оставить комментарий');
        return false;
    }

    if (!text.trim()) {
        alert('Введите текст комментария');
        return false;
    }

    const comments = JSON.parse(localStorage.getItem('comments')) || [];

    const newComment = {
        id: Date.now(),
        articleId: articleId,
        author: currentUser.login,
        text: text.trim(),
        date: new Date().toLocaleString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };

    comments.push(newComment);
    localStorage.setItem('comments', JSON.stringify(comments));
    const textarea = document.getElementById('comment-text');
    if (textarea) textarea.value = '';
    loadComments(articleId);
    return true;
}

function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const form = document.getElementById('comment-form');
    const authMessage = document.getElementById('comment-auth');

    if (form && authMessage) {
        if (currentUser) {
            form.style.display = 'block';
            authMessage.style.display = 'none';
        } else {
            form.style.display = 'none';
            authMessage.style.display = 'block';
        }
    }
}

function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function initComments(articleId) {
    initDefaultComments();
    checkAuth();
    loadComments(articleId);
    const submitBtn = document.getElementById('comment-button');

    if (submitBtn) {
        const newBtn = submitBtn.cloneNode(true);
        submitBtn.parentNode.replaceChild(newBtn, submitBtn);
        newBtn.addEventListener('click', () => {
            const text = document.getElementById('comment-text')?.value || '';
            addComment(articleId, text);
        });
    }
}