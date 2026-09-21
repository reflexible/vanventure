(() => {
  const header = document.querySelector('.magazine-header');
  if (!header) return;

  const navigation = header.querySelector('.main-navigation');
  const toggle = header.querySelector('.menu-toggle');
  const trips = header.querySelector('.nav-trips');
  const mobile = window.matchMedia('(max-width: 760px)');

  document.querySelectorAll('a[href="riverstar-entwurf.html"]').forEach((link) => {
    link.href = 'kajak.html';
  });

  const setMenuOpen = (open) => {
    navigation?.classList.toggle('is-open', open);
    navigation?.toggleAttribute('inert', !open && mobile.matches);
    toggle?.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('nav-open', open);
  };

  const closeMenu = () => setMenuOpen(false);

  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    setMenuOpen(open);
  });

  navigation?.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    closeMenu();
    trips?.removeAttribute('open');
    toggle?.focus();
  });

  document.addEventListener('click', (event) => {
    if (!mobile.matches && trips?.open && !trips.contains(event.target)) trips.removeAttribute('open');
  });

  mobile.addEventListener('change', closeMenu);
  closeMenu();

  const aboutSection = document.querySelector('.manifesto');
  if (aboutSection && !aboutSection.id) aboutSection.id = 'ueber-uns';
  if (aboutSection && location.hash === '#ueber-uns') aboutSection.scrollIntoView();

  const homepageSections = [
    ['ueber-uns', 'about'],
    ['reisen', 'trips'],
    ['fahrzeug', 'vehicle'],
    ['ausruestung', 'gear'],
    ['riverstar', 'kayak'],
  ].map(([id, key]) => [document.getElementById(id), key]).filter(([section]) => section);

  if (homepageSections.length) {
    let ticking = false;
    const setCurrentSection = () => {
      ticking = false;
      const marker = window.scrollY + header.offsetHeight + 120;
      let current = null;
      homepageSections.forEach(([section, key]) => { if (section.offsetTop <= marker) current = key; });
      header.querySelectorAll('[data-nav]').forEach((item) => item.removeAttribute('aria-current'));
      trips?.classList.remove('is-active');
      if (current === 'trips') trips?.classList.add('is-active');
      else if (current) header.querySelector(`[data-nav="${current}"]`)?.setAttribute('aria-current', 'location');
    };
    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(setCurrentSection);
    };
    addEventListener('scroll', requestUpdate, { passive: true });
    addEventListener('hashchange', requestUpdate);
    setCurrentSection();
  }

  const storySidebar = document.querySelector('.story-page .story-sidebar nav');
  const storyLayout = document.querySelector('.story-page .story-layout');
  const storyHero = document.querySelector('.story-page .story-hero');
  const chapters = [...document.querySelectorAll('.story-page .story-chapter')];
  if (storySidebar && storyLayout && storyHero && chapters.length) {
    const chapterMenu = document.createElement('details');
    chapterMenu.className = 'chapter-mobile';
    chapterMenu.innerHTML = `<summary><span data-de="Etappen" data-en="Chapters">Etappen</span><span class="chapter-count">01 / ${String(chapters.length).padStart(2, '0')}</span></summary><nav aria-label="Kapitel"></nav>`;
    const chapterNav = chapterMenu.querySelector('nav');
    chapterNav.append(...[...storySidebar.querySelectorAll('a')].map((link) => link.cloneNode(true)));
    storyLayout.before(chapterMenu);
    chapterNav.addEventListener('click', () => chapterMenu.removeAttribute('open'));

    const chapterLinks = [...chapterNav.querySelectorAll('a')];
    const updateChapter = () => {
      const marker = window.scrollY + 145;
      let index = 0;
      chapters.forEach((chapter, chapterIndex) => { if (chapter.offsetTop <= marker) index = chapterIndex; });
      chapterMenu.querySelector('.chapter-count').textContent = `${String(index + 1).padStart(2, '0')} / ${String(chapters.length).padStart(2, '0')}`;
      chapterLinks.forEach((link, linkIndex) => link.toggleAttribute('aria-current', linkIndex === index));
    };
    addEventListener('scroll', updateChapter, { passive: true });
    updateChapter();
  }
})();
