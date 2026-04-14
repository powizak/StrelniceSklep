export function initCookieConsent(): void {
  const banner = document.querySelector<HTMLDivElement>('.cookie-consent');
  if (!banner) return;

  if (localStorage.getItem('cookie-consent') !== null) return;

  banner.classList.add('visible');

  const accept = (preferences: Record<string, boolean>): void => {
    localStorage.setItem(
      'cookie-consent',
      JSON.stringify({ ...preferences, acceptedAt: new Date().toISOString() }),
    );
    banner.classList.remove('visible');
  };

  const gatherCheckboxes = (): Record<string, boolean> => {
    const checkboxes = banner.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
    const result: Record<string, boolean> = {};
    checkboxes.forEach((cb) => {
      result[cb.name] = cb.checked;
    });
    return result;
  };

  const btnSelected = banner.querySelector<HTMLButtonElement>('.btn-accept-selected');
  const btnAll = banner.querySelector<HTMLButtonElement>('.btn-accept-all');

  if (btnSelected) {
    btnSelected.addEventListener('click', () => accept(gatherCheckboxes()));
  }

  if (btnAll) {
    btnAll.addEventListener('click', () => {
      const all = gatherCheckboxes();
      Object.keys(all).forEach((k) => {
        all[k] = true;
      });
      accept(all);
    });
  }
}
