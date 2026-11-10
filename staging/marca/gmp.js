// Planeta do GMP: anel, e as letras andando na superfície como um planeta girando.
// Gira sozinho devagar e acompanha a rolagem; quem pede menos movimento só vê o giro da rolagem.
(() => {
  const PASSO = 48, root = document.documentElement;
  const calmo = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sups = [...document.querySelectorAll('[data-planeta]')].map((alvo, n) => {
    const id = `gmp-c${n}`;
    const letras = [-1, 0, 1, 2].map((k) => `<text x="${31 + k * PASSO}" y="57">GMP</text>`).join('');
    alvo.innerHTML = `<svg viewBox="0 0 100 100" role="img" aria-label="GMP"><defs><clipPath id="${id}"><circle cx="50" cy="50" r="29"/></clipPath></defs>`
      + '<g transform="rotate(-17 50 50)"><ellipse class="anel" cx="50" cy="50" rx="47" ry="12.5"/></g>'
      + `<circle class="corpo" cx="50" cy="50" r="29"/><g clip-path="url(#${id})"><g class="sup">${letras}</g>`
      + '<ellipse class="lat" cx="50" cy="33" rx="27" ry="4.5"/><ellipse class="lat" cx="50" cy="69" rx="25" ry="4"/></g>'
      + '<circle class="borda" cx="50" cy="50" r="29"/>'
      + '<g transform="rotate(-17 50 50)"><path class="anel-vao" d="M3 50A47 12.5 0 0 0 97 50"/><path class="anel" d="M3 50A47 12.5 0 0 0 97 50"/></g></svg>';
    return alvo.querySelector('.sup');
  });
  const t0 = performance.now();
  const pinta = (t) => {
    const giro = ((calmo ? 0 : (t - t0) * 0.005) + scrollY * 0.12) % PASSO;
    sups.forEach((s) => s.setAttribute('transform', `translate(${(-giro).toFixed(2)} 0)`));
    root.style.setProperty('--gmp-p', Math.min(1, Math.max(0, scrollY / 60)).toFixed(3));
  };
  if (calmo) { addEventListener('scroll', () => pinta(0), { passive: true }); pinta(0); }
  else { const laco = (t) => { pinta(t); requestAnimationFrame(laco); }; requestAnimationFrame(laco); }
})();
