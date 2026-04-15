export function initSlider(): void {
  const container = document.querySelector<HTMLDivElement>('[data-slider]');
  if (!container) return;

  const slides = Array.from(container.querySelectorAll<HTMLDivElement>('.slide'));
  if (slides.length === 0) return;

  const prevBtn = container.querySelector<HTMLButtonElement>('.slider-arrow.prev');
  const nextBtn = container.querySelector<HTMLButtonElement>('.slider-arrow.next');
  const dotsContainer = container.querySelector<HTMLDivElement>('.slider-dots');

  let currentIndex = 0;
  let timer: ReturnType<typeof setInterval> | undefined;

  const dotBtns = dotsContainer
    ? Array.from(dotsContainer.querySelectorAll<HTMLButtonElement>('button'))
    : [];

  const showSlide = (index: number): void => {
    slides.forEach((s) => s.classList.remove('active'));
    dotBtns.forEach((d) => d.classList.remove('active'));

    currentIndex = (index + slides.length) % slides.length;
    slides[currentIndex].classList.add('active');
    if (dotBtns[currentIndex]) dotBtns[currentIndex].classList.add('active');
  };

  const nextSlide = (): void => showSlide(currentIndex + 1);
  const prevSlide = (): void => showSlide(currentIndex - 1);

  const startAutoPlay = (): void => {
    stopAutoPlay();
    timer = setInterval(nextSlide, 5000);
  };

  const stopAutoPlay = (): void => {
    if (timer !== undefined) {
      clearInterval(timer);
      timer = undefined;
    }
  };

  dotBtns.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSlide(i);
      startAutoPlay();
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoPlay();
    });
  }

  showSlide(0);
  startAutoPlay();
}
