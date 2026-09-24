(() => {
  const header = document.querySelector('.magazine-header');
  if (!header) return;

  const navigation = header.querySelector('.main-navigation');
  const toggle = header.querySelector('.menu-toggle');
  const mobile = window.matchMedia('(max-width: 760px)');
  const actions = header.querySelector('.header-actions');
  if (!navigation) return;
  const footer = document.querySelector('body > footer');
  if (footer) footer.innerHTML = `<span>© <span id="year">${new Date().getFullYear()}</span> VanVenture</span><span>Travel slow. Go far.</span>`;

  // The public menu has one source. Existing page headers supply only the
  // brand, the menu button and page-specific context.
  navigation.innerHTML = `
    <details class="nav-trips"><summary data-nav="trips" data-de="Reisen" data-en="Trips">Reisen</summary>
      <div class="trip-menu">
        <a href="norwegen-2018.html" data-de="Norwegen 2018" data-en="Norway 2018">Norwegen 2018</a>
        <a href="sardinien-2019.html" data-de="Sardinien 2019" data-en="Sardinia 2019">Sardinien 2019</a>
        <a href="italien-2021.html" data-de="Italien 2021" data-en="Italy 2021">Italien 2021</a>
      </div>
    </details>
    <a href="vehicle.html" data-nav="vehicle" data-de="Fahrzeug" data-en="Vehicle">Fahrzeug</a>
    <details class="nav-trips nav-gear"><summary data-nav="gear" data-de="Ausrüstung" data-en="Gear">Ausrüstung</summary>
      <div class="trip-menu">
        <a href="kajak.html" data-de="Kajak" data-en="Kayak">Kajak</a>
        <details class="trip-submenu"><summary data-de="Räder" data-en="Bikes">Räder</summary>
          <div class="trip-submenu-links">
            <a href="scott-mountainbike.html">Black Beauty</a>
            <a href="cube.html" data-de="Sabines Cube" data-en="Sabine’s Cube">Sabines Cube</a>
            <a href="trek-gravelbike.html" data-de="Trek Gravelbike" data-en="Trek gravel bike">Trek Gravelbike</a>
            <a href="woom-2.html" data-de="Adrians Woom 2" data-en="Adrian’s Woom 2">Adrians Woom 2</a>
            <a href="diamant-stadtraeder.html" data-de="Diamant Stadträder" data-en="Diamant city bikes">Diamant Stadträder</a>
          </div>
        </details>
      </div>
    </details>
    <a href="index.html#ueber-uns" data-nav="about" data-de="Über uns" data-en="About us">Über uns</a>`;
  const trips = navigation.querySelector('.nav-trips');
  const tripMenu = trips.querySelector('.trip-menu');
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  const currentTrip = tripMenu.querySelector(`a[href="${currentPage}"]`);
  if (currentTrip) { currentTrip.setAttribute('aria-current','page'); trips.classList.add('is-active'); }
  if (currentPage === 'vehicle.html') navigation.querySelector('[data-nav="vehicle"]').setAttribute('aria-current', 'page');
  if (actions && !document.getElementById('language')) {
    const languageButton = document.createElement('button');
    languageButton.id = 'language'; languageButton.className = 'language'; languageButton.type = 'button';
    actions.insertBefore(languageButton, actions.firstChild);
  }
  const menuLabel = actions?.querySelector('.menu-label');
  if (menuLabel) { menuLabel.dataset.de = 'Menü'; menuLabel.dataset.en = 'Menu'; }
  const gear = navigation.querySelector('.nav-gear');
  const gearPages = new Set(['kajak.html','scott-mountainbike.html','cube.html','trek-gravelbike.html','woom-2.html','diamant-stadtraeder.html']);
  if (gearPages.has(currentPage)) gear.classList.add('is-active');
  navigation.querySelectorAll('.trip-menu a').forEach(link => {
    if (link.getAttribute('href') === currentPage) link.setAttribute('aria-current', 'page');
  });

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
    gear?.removeAttribute('open');
    gear?.querySelectorAll('details[open]').forEach(menu => menu.removeAttribute('open'));
    toggle?.focus();
  });

  document.addEventListener('click', (event) => {
    if (!mobile.matches && trips?.open && !trips.contains(event.target)) trips.removeAttribute('open');
    if (!mobile.matches && gear?.open && !gear.contains(event.target)) gear.removeAttribute('open');
  });

  if (actions) {
    const privateMenu = document.createElement('details');
    privateMenu.className = 'private-menu';
    privateMenu.innerHTML = '<summary>Login</summary><div class="private-flyout"><p class="private-flyout-title">Privater Bereich</p><p class="private-flyout-copy">Redaktion, Cockpit und eure Einstellungen.</p><form><label>Benutzername<input name="name" autocomplete="username" required></label><label>Passwort<input name="password" type="password" autocomplete="current-password" required></label><p class="private-login-error" role="status" hidden></p><button>Anmelden</button></form><div class="private-flyout-divider"><span>oder</span></div><a class="private-google" href="/api/auth/google/start?returnTo=/privat">Mit Google anmelden</a></div>';
    actions.prepend(privateMenu);
    const flyout=privateMenu.querySelector('.private-flyout'),form=flyout.querySelector('form'),error=flyout.querySelector('.private-login-error');
    const showError=value=>{error.textContent=value;error.hidden=!value;};
    const showSignedIn=()=>{const accountLink=document.createElement('a');accountLink.className='private-account-link';accountLink.href='/privat';accountLink.textContent='Konto';privateMenu.replaceWith(accountLink);};
    fetch('/api/session').then(response=>response.ok?response.json():null).then(session=>{if(session)showSignedIn();}).catch(()=>{});
    form.addEventListener('submit',async event=>{event.preventDefault();showError('');const button=form.querySelector('button');button.disabled=true;try{const response=await fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form)))}),result=await response.json();if(!response.ok)throw new Error(result.error||'Anmeldung fehlgeschlagen.');location.assign('/privat');}catch(errorValue){showError(errorValue.message);}finally{button.disabled=false;}});
    document.addEventListener('click',event=>{if(!mobile.matches&&privateMenu.open&&!privateMenu.contains(event.target))privateMenu.removeAttribute('open');});
    document.addEventListener('keydown',event=>{if(event.key==='Escape')privateMenu.removeAttribute('open');});
  }
  document.dispatchEvent(new Event('vanventure:public-header-ready'));

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
      gear?.classList.remove('is-active');
      if (current === 'trips') trips?.classList.add('is-active');
      else if (current === 'gear' || current === 'kayak') gear?.classList.add('is-active');
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
