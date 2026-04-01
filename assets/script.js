(() => {
  const orb = document.getElementById('orb');
  if (!orb) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  const state = {
    pointerX: 50,
    pointerY: 40,
    currentX: 50,
    currentY: 40,
    raf: 0,
    tick: 0,
  };

  const updatePointerTarget = (event) => {
    const x = (event.clientX / window.innerWidth) * 100;
    const y = (event.clientY / window.innerHeight) * 100;

    state.pointerX = Math.min(80, Math.max(20, x));
    state.pointerY = Math.min(75, Math.max(20, y));
  };

  const animate = () => {
    state.tick += 0.004;

    const driftX = Math.sin(state.tick) * 1.5;
    const driftY = Math.cos(state.tick * 1.3) * 1.2;

    state.currentX += ((state.pointerX + driftX) - state.currentX) * 0.05;
    state.currentY += ((state.pointerY + driftY) - state.currentY) * 0.05;

    orb.style.setProperty('--x', state.currentX.toFixed(3));
    orb.style.setProperty('--y', state.currentY.toFixed(3));

    state.raf = requestAnimationFrame(animate);
  };

  window.addEventListener('pointermove', updatePointerTarget, { passive: true });
  state.raf = requestAnimationFrame(animate);

  window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(state.raf);
  });
})();
