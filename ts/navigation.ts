export function initNavigation(): void {
  const toggle = document.querySelector<HTMLButtonElement>('.nav-toggle');
  const navList = document.querySelector<HTMLUListElement>('.nav-list');

  if (!toggle || !navList) return;

  const isOpen = (): boolean => navList.classList.contains('open');

  const closeNav = (): void => {
    navList.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const opening = !isOpen();
    navList.classList.toggle('open', opening);
    toggle.setAttribute('aria-expanded', String(opening));
  });

  document.addEventListener('click', (e: MouseEvent) => {
    const mainNav = document.querySelector<HTMLElement>('.main-nav');
    if (isOpen() && mainNav && !mainNav.contains(e.target as Node)) {
      closeNav();
    }
  });

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen()) {
      closeNav();
      toggle.focus();
    }
  });
}
