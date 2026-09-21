const lightbox = document.querySelector('#photo-dialog');
const fullImage = lightbox.querySelector('img');
const caption = lightbox.querySelector('p');
let trigger;

document.querySelectorAll('.photo-link').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    trigger = link;
    const thumbnail = link.querySelector('img');
    fullImage.src = link.href;
    fullImage.alt = thumbnail.alt;
    caption.textContent = link.dataset.caption || thumbnail.alt;
    lightbox.showModal();
    document.body.classList.add('photo-open');
  });
});
lightbox.querySelector('button').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) lightbox.close();
});
lightbox.addEventListener('close', () => {
  document.body.classList.remove('photo-open');
  fullImage.removeAttribute('src');
  trigger?.focus();
});
