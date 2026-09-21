(() => {
  const main = document.querySelector('main');
  if (!main || document.getElementById('site-photo-viewer')) return;

  const dialog = document.createElement('dialog');
  dialog.id = 'site-photo-viewer';
  dialog.innerHTML = `
    <div class="site-photo-panel">
      <div class="site-photo-topbar">
        <p class="site-photo-counter" aria-live="polite"></p>
        <div class="site-photo-tools">
          <button type="button" class="site-photo-slideshow" aria-pressed="false"></button>
          <button type="button" class="site-photo-close"></button>
        </div>
      </div>
      <div class="site-photo-stage">
        <button type="button" class="site-photo-previous" aria-label="Vorheriges Foto"><span aria-hidden="true">←</span></button>
        <img alt="">
        <button type="button" class="site-photo-next" aria-label="Nächstes Foto"><span aria-hidden="true">→</span></button>
      </div>
      <div class="site-photo-bottom"><p class="site-photo-caption"></p><div class="site-photo-thumbs" role="tablist" aria-label="Bilder auswählen"></div></div>
    </div>`;
  document.body.append(dialog);

  const close = dialog.querySelector('.site-photo-close');
  const previous = dialog.querySelector('.site-photo-previous');
  const next = dialog.querySelector('.site-photo-next');
  const slideshow = dialog.querySelector('.site-photo-slideshow');
  const large = dialog.querySelector('.site-photo-stage img');
  const caption = dialog.querySelector('.site-photo-caption');
  const counter = dialog.querySelector('.site-photo-counter');
  const thumbnails = dialog.querySelector('.site-photo-thumbs');
  let trigger, galleryItems = [], galleryIndex = -1, timer, pointerStart;
  const english = () => document.documentElement.lang.startsWith('en');
  const eligible = image => image.getAttribute('src') && !image.closest('header, nav, .closing, [data-no-zoom]') && (!image.closest('.hero, .story-hero') || image.closest('a.photo-link')) && !image.src.includes('logo');
  const imageFor = control => control.matches('img') ? control : control.querySelector('img');

  function prepare() {
    main.querySelectorAll('img').forEach(image => {
      if (!eligible(image)) return;
      const linked = image.closest('a, .gallery-photo');
      if (linked && !linked.classList.contains('photo-link') && !linked.classList.contains('gallery-photo')) return;
      const control = linked || image;
      control.classList.add('site-photo-trigger');
      if (!control.matches('a, button')) {
        control.tabIndex = 0;
        control.setAttribute('role', 'button');
      }
      control.setAttribute('aria-haspopup', 'dialog');
      control.setAttribute('aria-label', `${english() ? 'View photo' : 'Foto ansehen'}${image.alt ? ': ' + image.alt : ''}`);
    });
  }

  function stopSlideshow() {
    clearInterval(timer);
    timer = undefined;
    slideshow.setAttribute('aria-pressed', 'false');
    slideshow.textContent = english() ? 'Play' : 'Abspielen';
  }

  function renderThumbnails() {
    thumbnails.replaceChildren(...galleryItems.map((item, index) => {
      const image = imageFor(item);
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-label', `${english() ? 'Show photo' : 'Foto zeigen'} ${index + 1}`);
      button.innerHTML = `<img src="${image.currentSrc || image.src}" alt="" loading="lazy">`;
      button.addEventListener('click', () => showItem(index, true));
      return button;
    }));
  }

  function showItem(index, manual = false) {
    if (!galleryItems.length) return;
    if (manual) stopSlideshow();
    galleryIndex = (index + galleryItems.length) % galleryItems.length;
    const control = galleryItems[galleryIndex];
    const image = imageFor(control);
    if (!image) return;
    trigger = control;
    large.src = image.currentSrc || image.src;
    large.alt = image.alt;
    caption.textContent = image.closest('figure')?.querySelector('figcaption')?.textContent || image.closest('.gallery-photo')?.querySelector('.gallery-caption')?.textContent || image.alt;
    counter.textContent = `${String(galleryIndex + 1).padStart(2, '0')} / ${String(galleryItems.length).padStart(2, '0')}`;
    const navigable = galleryItems.length > 1;
    previous.hidden = !navigable;
    next.hidden = !navigable;
    slideshow.hidden = !navigable;
    [...thumbnails.children].forEach((thumb, thumbIndex) => {
      const selected = thumbIndex === galleryIndex;
      thumb.setAttribute('aria-selected', String(selected));
      thumb.tabIndex = selected ? 0 : -1;
      if (selected) thumb.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    });
  }

  function open(control) {
    stopSlideshow();
    // Each story becomes a continuous visual narrative, irrespective of which
    // editorial section supplied the selected image.
    galleryItems = [...main.querySelectorAll('.site-photo-trigger')];
    renderThumbnails();
    showItem(Math.max(0, galleryItems.indexOf(control)));
    dialog.setAttribute('aria-label', english() ? 'Photo gallery' : 'Fotogalerie');
    close.textContent = english() ? 'Close ×' : 'Schließen ×';
    dialog.showModal();
    document.body.classList.add('site-photo-open');
  }

  main.addEventListener('click', event => {
    const control = event.target.closest('.site-photo-trigger');
    if (!control) return;
    event.preventDefault();
    open(control);
  });
  main.addEventListener('keydown', event => {
    if (!event.target.matches('.site-photo-trigger') || !['Enter', ' '].includes(event.key)) return;
    event.preventDefault();
    open(event.target);
  });
  close.addEventListener('click', () => dialog.close());
  previous.addEventListener('click', () => showItem(galleryIndex - 1, true));
  next.addEventListener('click', () => showItem(galleryIndex + 1, true));
  slideshow.addEventListener('click', () => {
    if (timer) return stopSlideshow();
    timer = setInterval(() => showItem(galleryIndex + 1), 4600);
    slideshow.setAttribute('aria-pressed', 'true');
    slideshow.textContent = english() ? 'Pause' : 'Pausieren';
  });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' && galleryItems.length > 1) showItem(galleryIndex - 1, true);
    if (event.key === 'ArrowRight' && galleryItems.length > 1) showItem(galleryIndex + 1, true);
  });
  large.addEventListener('pointerdown', event => { pointerStart = event.clientX; });
  large.addEventListener('pointerup', event => {
    if (pointerStart == null || galleryItems.length < 2) return;
    const distance = event.clientX - pointerStart;
    pointerStart = undefined;
    if (Math.abs(distance) > 44) showItem(galleryIndex + (distance < 0 ? 1 : -1), true);
  });
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    stopSlideshow();
    document.body.classList.remove('site-photo-open');
    large.removeAttribute('src');
    thumbnails.replaceChildren();
    trigger?.focus({ preventScroll: true });
  });
  prepare();
  new MutationObserver(prepare).observe(main, { childList: true, subtree: true });
  new MutationObserver(prepare).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();
