const storageKey = 'vanventure-vehicle-review-v1';
const form = document.getElementById('review-form');
const progress = document.getElementById('progress');
const summary = document.getElementById('summary');
const dialog = document.getElementById('export-dialog');
const exportText = document.getElementById('export-text');

let review = JSON.parse(localStorage.getItem(storageKey) || '{}');

function setRowState(row, state) {
  const id = row.dataset.id;
  review[id] = { ...review[id], state };
  row.classList.toggle('editing', state === 'edit');
  row.querySelectorAll('.choice button').forEach((button) => button.classList.toggle('active', button.dataset.state === state));
  persist();
  updateProgress();
}

function persist() {
  form.querySelectorAll('.row').forEach((row) => {
    const note = row.querySelector('.note');
    if (note) review[row.dataset.id] = { ...review[row.dataset.id], note: note.value };
  });
  form.querySelectorAll('select').forEach((select) => { review[`config-${select.name}`] = select.value; });
  localStorage.setItem(storageKey, JSON.stringify(review));
}

function updateProgress() {
  const rows = [...form.querySelectorAll('.row')];
  const checked = rows.filter((row) => review[row.dataset.id]?.state).length;
  progress.textContent = `${checked} von ${rows.length} Angaben geprüft`;
  summary.textContent = checked === rows.length ? 'Alles geprüft. Du kannst jetzt deine Freigabe zusammenfassen.' : 'Wähle für jeden Eintrag eine Entscheidung.';
}

function restore() {
  form.querySelectorAll('.row').forEach((row) => {
    const saved = review[row.dataset.id];
    if (!saved) return;
    row.querySelector('.note').value = saved.note || '';
    if (saved.state) setRowState(row, saved.state);
  });
  form.querySelectorAll('select').forEach((select) => { select.value = review[`config-${select.name}`] || ''; });
  updateProgress();
}

function buildSummary() {
  const labels = { approve: 'FREIGEGEBEN', edit: 'ÄNDERN', hide: 'AUSBLENDEN' };
  const lines = ['VANVENTURE — Fahrzeugprofil-Freigabe', 'HYMER Grand Canyon S CrossOver · Modelljahr 2025', ''];
  form.querySelectorAll('.row').forEach((row) => {
    const saved = review[row.dataset.id];
    const title = row.querySelector('small').textContent;
    const value = row.querySelector('strong').textContent;
    lines.push(`${labels[saved?.state] || 'OFFEN'} · ${title}: ${value}${saved?.note ? ` — Notiz: ${saved.note}` : ''}`);
  });
  lines.push('', 'KONFIGURATION');
  form.querySelectorAll('select').forEach((select) => lines.push(`${select.closest('label').querySelector('span').textContent}: ${select.value || 'offen'}`));
  lines.push('', 'Hinweis: Diese Zusammenfassung ist eine Freigabe zur Vorbereitung. Veröffentlichung erst nach ausdrücklicher Bestätigung.');
  return lines.join('\n');
}

form.addEventListener('click', (event) => {
  const button = event.target.closest('.choice button');
  if (button) setRowState(button.closest('.row'), button.dataset.state);
});
form.addEventListener('input', persist);
form.addEventListener('change', persist);
document.getElementById('save').addEventListener('click', () => { persist(); summary.textContent = 'Deine Auswahl wurde lokal in diesem Browser gespeichert.'; });
document.getElementById('export').addEventListener('click', () => { persist(); exportText.textContent = buildSummary(); dialog.showModal(); });
document.getElementById('clear').addEventListener('click', () => {
  if (!confirm('Lokale Auswahl wirklich zurücksetzen?')) return;
  localStorage.removeItem(storageKey); review = {}; form.reset(); form.querySelectorAll('.choice button').forEach((button) => button.classList.remove('active')); form.querySelectorAll('.row').forEach((row) => row.classList.remove('editing')); updateProgress();
});
document.querySelector('.close').addEventListener('click', () => dialog.close());
document.getElementById('copy').addEventListener('click', async () => { await navigator.clipboard.writeText(exportText.textContent); document.getElementById('copy').textContent = 'Kopiert ✓'; });
restore();
