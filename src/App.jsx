import { useEffect, useRef, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import heroImage from './assets/coding-desk.png';
import portraitImage from './assets/portrait-desk.png';
import studioImage from './assets/standing-studio.png';
import sunsetImage from './assets/sunset-window.png';
import DepthCarousel from './components/DepthCarousel';
import FuzzyText from './components/FuzzyText';
import SiteNavbar from './SiteNavbar';
import AboutPage from './AboutPage';
import SkillsPage from './SkillsPage';
import AlbumPage from './AlbumPage';
import GlowCursor from './components/GlowCursor';
import ScrollHud from './components/ScrollHud';

const memories = [
  { image: portraitImage, alt: 'Abdullah learning at his desk' },
  { image: heroImage, alt: 'Abdullah coding at his desk' },
  { image: studioImage, alt: 'Abdullah in his studio with a laptop' },
  { image: sunsetImage, alt: 'Abdullah looking over the city at sunset' },
];

function Hero() {
  const navigate = useNavigate();
  const startedRef = useRef(null);
  useEffect(() => {
    const button = startedRef.current;
    if (!button) return undefined;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    let raf = 0;
    const onMove = (event) => {
      const rect = button.getBoundingClientRect();
      const dx = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
      const dy = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        button.style.setProperty('--mx', `${(dx * 16).toFixed(1)}px`);
        button.style.setProperty('--my', `${(dy * 11).toFixed(1)}px`);
      });
    };
    const onLeave = () => {
      button.style.setProperty('--mx', '0px');
      button.style.setProperty('--my', '0px');
    };
    button.addEventListener('pointermove', onMove);
    button.addEventListener('pointerleave', onLeave);
    return () => {
      button.removeEventListener('pointermove', onMove);
      button.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <section className="hero" id="home">
    <div className="hero-photo" style={{ backgroundImage: `url(${heroImage})` }} aria-hidden="true" />
    <div className="hero-light" aria-hidden="true" />
    <SiteNavbar />
    <div className="hero-content">
      <p className="eyebrow"><span /> A little boy · building tomorrow</p>
      <div className="hero-title">
        <FuzzyText
          baseIntensity={0.09}
          hoverIntensity={0.31}
          enableHover
          fontSize="clamp(3rem, 9vw, 8rem)"
          fontWeight={900}
          color="#ffffff"
          gradient={['#ffffff', '#ffffff', '#f4d89c', '#e6bf84']}
          fuzzRange={30}
          fps={60}
          direction="horizontal"
          transitionDuration={8}
          clickEffect={false}
          glitchMode={false}
        >Abdullah</FuzzyText>
      </div>
    </div>
    <button ref={startedRef} className="get-started" onClick={() => navigate('/about')}><span>Get Started</span><b>↓</b></button>
    <div className="hero-meta"><span>Scroll to explore</span><span>01 — 02</span></div>
  </section>;
}

function Album() {
  return <section id="album" className="album-section">
    <div className="album-photo" style={{ backgroundImage: `url(${heroImage})` }} aria-hidden="true" />
    <div className="album-copy"><p className="eyebrow"><span /> Personal archive</p><h2>Small<br/><em>memories.</em></h2><p className="album-description">Little moments from the place where imagination and technology meet.</p><div className="instruction"><span className="instruction-arrow">↗</span><p>Move through<br/>the moments.</p></div></div>
    <div className="memory-stage gallery-stage">
      <DepthCarousel
        items={memories}
        cardWidth={300}
        cardHeight={380}
        radius={18}
        depth={220}
        spread={90}
        tilt={22}
        tiltDirection="right"
        perspective={1400}
        visibleCards={4}
        falloff={0.2}
        blur={6}
        autoplay
        autoplayDelay={3200}
        loop
        showControls
        showIndicators
      />
    </div>
  </section>;
}

function HomePage() { return <main><Hero /><Album /></main>; }

function GlowCursorLayer() {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setActive(fine.matches && !reduce.matches);
    update();
    fine.addEventListener('change', update);
    reduce.addEventListener('change', update);
    return () => { fine.removeEventListener('change', update); reduce.removeEventListener('change', update); };
  }, []);
  if (!active) return null;
  return <GlowCursor color="#FFD700" secondaryColor="#A78BFA" trailLength={38} trailWidth={7} followSpeed={0.18} glowIntensity={1.8} glowSpread={1.15} opacity={0.95} idleFade maxDevicePixelRatio={1.5} style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 9999, pointerEvents: 'none' }} />;
}

export default function App() { return <><GlowCursorLayer /><ScrollHud /><Routes><Route path="/" element={<HomePage />} /><Route path="/about" element={<AboutPage />} /><Route path="/skills" element={<SkillsPage />} /><Route path="/album" element={<AlbumPage />} /><Route path="*" element={<HomePage />} /></Routes></> }
