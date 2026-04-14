export function initLightbox(): void {
  const overlay = document.querySelector<HTMLDivElement>('.lightbox-overlay');
  if (!overlay) return;

  const img = overlay.querySelector<HTMLImageElement>('img');
  const closeBtn = overlay.querySelector<HTMLButtonElement>('.lightbox-close');
  const prevBtn = overlay.querySelector<HTMLButtonElement>('.lightbox-prev');
  const nextBtn = overlay.querySelector<HTMLButtonElement>('.lightbox-next');
  if (!img) return;

  const galleryItems = Array.from(document.querySelectorAll<HTMLElement>('.gallery-item'));
  const links = galleryItems
    .map((item) => item.querySelector<HTMLAnchorElement>('a[href]'))
    .filter((a): a is HTMLAnchorElement => a !== null);
  if (links.length === 0) return;

  const urls = links.map((a) => a.href);
  let currentIndex = 0;

  const showImage = (index: number): void => {
    currentIndex = (index + urls.length) % urls.length;
    img.src = urls[currentIndex];
  };

  const openLightbox = (index: number): void => {
    showImage(index);
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = (): void => {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  links.forEach((anchor, i) => {
    anchor.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault();
      openLightbox(i);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  overlay.addEventListener('click', (e: MouseEvent) => {
    if (e.target === overlay) closeLightbox();
  });

  if (prevBtn) prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => showImage(currentIndex + 1));

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  });
}
