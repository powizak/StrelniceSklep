import { initNavigation } from './navigation';
import { initSlider } from './slider';
import { initLightbox } from './lightbox';
import { initCookieConsent } from './cookies';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSlider();
  initLightbox();
  initCookieConsent();
});
