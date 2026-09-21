const langButton = document.getElementById('language');
let language = 'de';

// Exact editorial titles work in both static and editor-generated pages.
// Each inner array is a line; object segments receive the green italic accent.
const heroTitles = new Map([
  ['Der lange Weg ist der gute Weg.', [['Der lange ', { em: 'Weg' }], ['ist der ', { em: 'gute Weg.' }]]],
  ['The long way is the good way.', [['The long ', { em: 'way' }], ['is the ', { em: 'good way.' }]]],
  ['Eine Insel, viele Wege', [['Eine ', { em: 'Insel,' }], ['viele ', { em: 'Wege' }]]],
  ['One island, many ways', [['One ', { em: 'island,' }], ['many ', { em: 'ways' }]]],
  ['Fünf Wochen, immer weiter', [['Fünf ', { em: 'Wochen,' }], ['immer ', { em: 'weiter' }]]],
  ['Five weeks, always onward', [['Five ', { em: 'weeks,' }], ['always ', { em: 'onward' }]]],
  ['Eine Nacht über dem See', [['Eine ', { em: 'Nacht' }], ['über dem ', { em: 'See' }]]],
  ['A night above the lake', [['A ', { em: 'night' }], ['above the ', { em: 'lake' }]]],
]);

function styleHeroTitles() {
  document.querySelectorAll('.hero h1, .story-hero h1').forEach((heading) => {
    const lines = heroTitles.get(heading.textContent);
    if (!lines) return;
    const content = document.createDocumentFragment();
    lines.forEach((segments, index) => {
      if (index) content.append(document.createElement('br'), ' ');
      segments.forEach((segment) => {
        if (typeof segment === 'string') content.append(segment);
        else {
          const emphasis = document.createElement('em');
          emphasis.textContent = segment.em;
          content.append(emphasis);
        }
      });
    });
    heading.replaceChildren(content);
  });
}

function setLanguage(next) {
  language = next;
  document.documentElement.lang = language;
  document.querySelectorAll('[data-de][data-en]').forEach((element) => { element.textContent = element.dataset[language]; });
  styleHeroTitles();
  langButton.textContent = language === 'de' ? 'EN' : 'DE';
  langButton.setAttribute('aria-label', language === 'de' ? 'Switch to English' : 'Auf Deutsch wechseln');
}

langButton.addEventListener('click', () => setLanguage(language === 'de' ? 'en' : 'de'));
document.getElementById('year').textContent = new Date().getFullYear();
styleHeroTitles();
