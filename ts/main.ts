import { initNavigation } from './navigation.js';
import { initSlider } from './slider.js';
import { initLightbox } from './lightbox.js';
import { initCookieConsent } from './cookies.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSlider();
  initLightbox();
  initCookieConsent();
});
