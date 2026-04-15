export function initCookieConsent() {
    const banner = document.querySelector('.cookie-consent');
    if (!banner)
        return;
    if (localStorage.getItem('cookie-consent') !== null)
        return;
    banner.classList.add('visible');
    const accept = (preferences) => {
        localStorage.setItem('cookie-consent', JSON.stringify({ ...preferences, acceptedAt: new Date().toISOString() }));
        banner.classList.remove('visible');
    };
    const gatherCheckboxes = () => {
        const checkboxes = banner.querySelectorAll('input[type="checkbox"]');
        const result = {};
        checkboxes.forEach((cb) => {
            result[cb.name] = cb.checked;
        });
        return result;
    };
    const btnSelected = banner.querySelector('.btn-accept-selected');
    const btnAll = banner.querySelector('.btn-accept-all');
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
//# sourceMappingURL=cookies.js.map