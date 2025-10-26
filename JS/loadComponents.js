function loadHTML(id, file) {
    return fetch(file) 
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        });
}

// botão do menu e overlay para mobile
function setupMenu() {
    // busca os elementos 
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    if (!menuBtn || !sidebar || !overlay) {
        // se a navbar ou sidebar não tiverem sido carregadas corretamente
        console.error("Erro: Elementos do menu (botão, sidebar ou overlay) não encontrados após o carregamento.");
        return;
    }

    // lógica do menu mobile
    menuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
        overlay.style.display = sidebar.classList.contains('-translate-x-full') ? 'none' : 'block';
    });

    overlay.addEventListener('click', () => {
        sidebar.classList.add('-translate-x-full');
        overlay.style.display = 'none';
    });
}

// carrega navbar e sidebar apos dom carregar
document.addEventListener("DOMContentLoaded", () => {
    Promise.all([
        loadHTML('navbar-container', '../HTML/navbar.html'),
        loadHTML('sidebar-container', '../HTML/sidebar.html')
    ]).then(() => {
        setupMenu();
        
        if (window.initDarkMode) {
            window.initDarkMode();
        }
        
        if (window.initCursor) {
            window.initCursor(); 
        }
    }).catch(error => {
        console.error("Erro ao carregar layout:", error);
    });
});
