export function initSlider() {
    const container = document.querySelector('[data-slider]');
    if (!container)
        return;
    const slides = Array.from(container.querySelectorAll('.slide'));
    if (slides.length === 0)
        return;
    const prevBtn = container.querySelector('.slider-arrow.prev');
    const nextBtn = container.querySelector('.slider-arrow.next');
    const dotsContainer = container.querySelector('.slider-dots');
    let currentIndex = 0;
    let timer;
    const dotBtns = dotsContainer
        ? Array.from(dotsContainer.querySelectorAll('button'))
        : [];
    const showSlide = (index) => {
        slides.forEach((s) => s.classList.remove('active'));
        dotBtns.forEach((d) => d.classList.remove('active'));
        currentIndex = (index + slides.length) % slides.length;
        slides[currentIndex].classList.add('active');
        if (dotBtns[currentIndex])
            dotBtns[currentIndex].classList.add('active');
    };
    const nextSlide = () => showSlide(currentIndex + 1);
    const prevSlide = () => showSlide(currentIndex - 1);
    const startAutoPlay = () => {
        stopAutoPlay();
        timer = setInterval(nextSlide, 5000);
    };
    const stopAutoPlay = () => {
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
//# sourceMappingURL=slider.js.map