export function initNavigation() {
    const toggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    if (!toggle || !navList)
        return;
    const isOpen = () => navList.classList.contains('open');
    const closeNav = () => {
        navList.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
    };
    toggle.addEventListener('click', () => {
        const opening = !isOpen();
        navList.classList.toggle('open', opening);
        toggle.setAttribute('aria-expanded', String(opening));
    });
    document.addEventListener('click', (e) => {
        const mainNav = document.querySelector('.main-nav');
        if (isOpen() && mainNav && !mainNav.contains(e.target)) {
            closeNav();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen()) {
            closeNav();
            toggle.focus();
        }
    });
}
//# sourceMappingURL=navigation.js.map