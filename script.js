const langButton = document.getElementById('language');
const translations = document.querySelectorAll('[data-de][data-en]');
let language = 'de';

function setLanguage(next) {
  language = next;
  document.documentElement.lang = language;
  translations.forEach((element) => { element.textContent = element.dataset[language]; });
  langButton.textContent = language === 'de' ? 'EN' : 'DE';
  langButton.setAttribute('aria-label', language === 'de' ? 'Switch to English' : 'Auf Deutsch wechseln');
}

langButton.addEventListener('click', () => setLanguage(language === 'de' ? 'en' : 'de'));
document.getElementById('year').textContent = new Date().getFullYear();
