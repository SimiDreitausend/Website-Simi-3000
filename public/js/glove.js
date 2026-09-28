// Glove cursor (desktop only): follows the pointer and tilts over the photo and anything
// clickable. The CSS cursor in site.css is the fallback when this doesn't run.
(() => {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const glove = document.createElement('img');
  glove.className = 'glove-cursor';
  glove.src = '/img/cursor.png';
  glove.srcset = '/img/cursor.png 1x, /img/cursor@2x.png 2x';
  glove.alt = '';
  glove.setAttribute('aria-hidden', 'true');
  document.body.append(glove);
  document.documentElement.classList.add('glove');

  const clickable = 'a[href], button, summary, select, input, label, .photo';

  addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    glove.style.translate = `${e.clientX - 21}px ${e.clientY - 2}px`;
    glove.classList.add('visible');
    glove.classList.toggle('bent', !!e.target.closest?.(clickable));
  }, { passive: true });

  // Hide it when the pointer leaves the window (mouseout with nowhere to go) or the tab blurs.
  document.addEventListener('mouseout', (e) => { if (!e.relatedTarget) glove.classList.remove('visible'); });
  addEventListener('blur', () => glove.classList.remove('visible'));
})();
