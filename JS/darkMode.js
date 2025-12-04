// função de inicialização do dark, chamada APÓS a navbar carregar
function initDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    if (!themeToggle) return;

    const currentTheme = localStorage.getItem('theme');

    const isDarkMode =
        currentTheme === 'dark' ||
        (currentTheme === null && !window.matchMedia('(prefers-color-scheme: light)').matches) ||
        (currentTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDarkMode) {
        html.classList.add('dark');
        themeToggle.checked = true;
    } else {
        html.classList.remove('dark');
        themeToggle.checked = false;
    }

    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    });
}

function initCursor() {
    const solidCursor = document.createElement('div');
    solidCursor.classList.add('cursor-solid');
    document.body.appendChild(solidCursor);

    document.addEventListener('mousemove', e => {
        solidCursor.style.left = e.clientX + 'px';
        solidCursor.style.top = e.clientY + 'px';
    });
}

window.initDarkMode = initDarkMode;
window.initCursor = initCursor;
