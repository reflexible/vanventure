(() => {
  const main = document.querySelector('main');
  if (!main || document.getElementById('site-photo-viewer')) return;
  const dialog = document.createElement('dialog');
  dialog.id = 'site-photo-viewer';
  dialog.innerHTML = '<div class="site-photo-panel"><button type="button"></button><img alt=""><p></p></div>';
  document.body.append(dialog);
  const close = dialog.querySelector('button');
  const large = dialog.querySelector('img');
  const caption = dialog.querySelector('p');
  let trigger;
  const english = () => document.documentElement.lang.startsWith('en');
  const eligible = image => image.getAttribute('src') && !image.closest('header, nav, .closing, [data-no-zoom]') && (!image.closest('.hero, .story-hero') || image.closest('a.photo-link')) && !image.src.includes('logo');

  function prepare() {
    main.querySelectorAll('img').forEach(image => {
      if (!eligible(image)) return;
      const link = image.closest('a');
      // Preserve navigation links; the draft's explicit photo links use this viewer too.
      if (link && !link.classList.contains('photo-link')) return;
      const control = link || image;
      control.classList.add('site-photo-trigger');
      if (!link) {
        control.tabIndex = 0;
        control.setAttribute('role', 'button');
      }
      control.setAttribute('aria-haspopup', 'dialog');
      control.setAttribute('aria-label', `${english() ? 'Enlarge photo' : 'Foto vergrößern'}${image.alt ? ': ' + image.alt : ''}`);
    });
  }

  function open(control) {
    const image = control.matches('img') ? control : control.querySelector('img');
    if (!image) return;
    trigger = control;
    // Always use the displayed web derivative, never an unredacted original.
    large.src = image.currentSrc || image.src;
    large.alt = image.alt;
    caption.textContent = image.closest('figure')?.querySelector('figcaption')?.textContent || image.alt;
    dialog.setAttribute('aria-label', english() ? 'Enlarged photo' : 'Vergrößerte Fotoansicht');
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
    if (!event.target.matches('img.site-photo-trigger') || !['Enter', ' '].includes(event.key)) return;
    event.preventDefault();
    open(event.target);
  });
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog || event.target.classList.contains('site-photo-panel')) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('site-photo-open');
    large.removeAttribute('src');
    trigger?.focus({ preventScroll: true });
  });
  prepare();
  new MutationObserver(prepare).observe(main, { childList: true, subtree: true });
  new MutationObserver(prepare).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();
