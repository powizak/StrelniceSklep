export function initLightbox() {
    const overlay = document.querySelector('.lightbox-overlay');
    if (!overlay)
        return;
    const img = overlay.querySelector('img');
    const closeBtn = overlay.querySelector('.lightbox-close');
    const prevBtn = overlay.querySelector('.lightbox-prev');
    const nextBtn = overlay.querySelector('.lightbox-next');
    if (!img)
        return;
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    const links = galleryItems
        .map((item) => item.querySelector('a[href]'))
        .filter((a) => a !== null);
    if (links.length === 0)
        return;
    const urls = links.map((a) => a.href);
    let currentIndex = 0;
    const showImage = (index) => {
        currentIndex = (index + urls.length) % urls.length;
        img.src = urls[currentIndex];
    };
    const openLightbox = (index) => {
        showImage(index);
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    const closeLightbox = () => {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    };
    links.forEach((anchor, i) => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            openLightbox(i);
        });
    });
    if (closeBtn)
        closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay)
            closeLightbox();
    });
    if (prevBtn)
        prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
    if (nextBtn)
        nextBtn.addEventListener('click', () => showImage(currentIndex + 1));
    document.addEventListener('keydown', (e) => {
        if (!overlay.classList.contains('active'))
            return;
        if (e.key === 'Escape')
            closeLightbox();
        if (e.key === 'ArrowLeft')
            showImage(currentIndex - 1);
        if (e.key === 'ArrowRight')
            showImage(currentIndex + 1);
    });
}
//# sourceMappingURL=lightbox.js.map