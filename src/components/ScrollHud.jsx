import { useEffect, useRef } from 'react';

export default function ScrollHud() {
  const barRef = useRef(null);
  const pctRef = useRef(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const value = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${value.toFixed(4)})`;
      if (pctRef.current) pctRef.current.textContent = `${String(Math.round(value * 100)).padStart(3, '0')}%`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="scroll-hud-bar" aria-hidden="true"><span ref={barRef} /></div>
      <div className="scroll-hud" aria-hidden="true">
        <i className="scroll-hud-dot" />
        <span className="scroll-hud-label">Sys · Online</span>
        <i className="scroll-hud-sep" />
        <span className="scroll-hud-pct" ref={pctRef}>000%</span>
      </div>
    </>
  );
}
