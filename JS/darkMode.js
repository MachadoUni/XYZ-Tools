// Função de inicialização do Dark Mode, chamada APÓS a navbar carregar
function initDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    if (!themeToggle) return; // Sai se o elemento não existir

    // --- LÓGICA DE DEFINIÇÃO DO TEMA ---
    const currentTheme = localStorage.getItem('theme');
    
    // 1. Determina se o modo escuro deve estar ativo
    // Padrão é dark, a menos que o local storage diga 'light',
    // OU se não houver local storage e a preferência do sistema for light.
    const isDarkMode = currentTheme === 'dark' || 
                       (currentTheme === null && !window.matchMedia('(prefers-color-scheme: light)').matches) ||
                       (currentTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches); // Adiciona preferência dark como fallback

    // 2. Aplica as classes e o estado do checkbox
    if (isDarkMode) {
        html.classList.add('dark');
        themeToggle.checked = true;
    } else {
        html.classList.remove('dark');
        themeToggle.checked = false;
    }
    // ------------------------------------

    // 3. Listener para o clique/mudança
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

// --------------------------------------------------------------------------
// Efeito no Cursor: Coloquei a lógica de inicialização em uma função
/*function initCursor() {
    const solidCursor = document.createElement('div');
    solidCursor.classList.add('cursor-solid');
    document.body.appendChild(solidCursor);

    document.addEventListener('mousemove', e => {
        solidCursor.style.left = e.clientX + 'px';
        solidCursor.style.top = e.clientY + 'px';
    });
}*/
// --------------------------------------------------------------------------


// Disponibiliza as funções globalmente para o loadComponents.js
window.initDarkMode = initDarkMode;
//window.initCursor = initCursor; 

// REMOVA O VELHO DOMContentLoaded AQUI! Ele será chamado no loadComponents.js
// Se o seu darkMode.js SÓ tiver isso, mantenha apenas a parte de initCursor no DOMContentLoaded
/*
document.addEventListener('DOMContentLoaded', () => {
   // Apenas o código do cursor (que não depende de fetch) pode ficar aqui, se quiser.
   // Mas para consistência, recomendo chamar initCursor no loadComponents após o DOMContentLoaded.
});
*/