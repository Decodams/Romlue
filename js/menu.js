function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('menuOverlay');
    const hamburger = document.querySelector('[onclick="toggleMenu()"]');
    
    menu?.classList.toggle('active');
    overlay?.classList.toggle('active');
    
    const icon = hamburger?.querySelector('.material-symbols-outlined');
    if (icon) {
        icon.textContent = menu?.classList.contains('active') ? 'close' : 'menu';
    }
}

function closeMenu() {
    const menu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('menuOverlay');
    const hamburger = document.querySelector('[onclick="toggleMenu()"]');
    
    menu?.classList.remove('active');
    overlay?.classList.remove('active');
    
    const icon = hamburger?.querySelector('.material-symbols-outlined');
    if (icon) {
        icon.textContent = 'menu';
    }
}
