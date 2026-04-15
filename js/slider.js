export function initSlider() {
    const container = document.querySelector('.hero-slider');
    if (!container)
        return;
    const slides = Array.from(container.querySelectorAll('.hero-slide'));
    if (slides.length === 0)
        return;
    const prevBtn = container.querySelector('.slider-prev');
    const nextBtn = container.querySelector('.slider-next');
    const dotsContainer = container.querySelector('.slider-dots');
    let currentIndex = 0;
    let timer;
    const showSlide = (index) => {
        slides.forEach((s) => s.classList.remove('active'));
        const dotBtns = dotsContainer
            ? Array.from(dotsContainer.querySelectorAll('.slider-dot'))
            : [];
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
    if (dotsContainer) {
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('slider-dot');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => {
                showSlide(i);
                startAutoPlay();
            });
            dotsContainer.appendChild(dot);
        });
    }
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