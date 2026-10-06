import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import SiteNavbar from './SiteNavbar';
import InfiniteSpiral from './components/InfiniteSpiral';
import './AlbumPage.css';

import lobbyImage from './assets/smiling-lobby.png';
import workspaceImage from './assets/workspace-glow.png';
import deskImage from './assets/ai-coding-desk.png';
import suitImage from './assets/black-suit.png';
import portraitImage from './assets/portrait-desk.png';
import codingImage from './assets/coding-desk.png';
import studioImage from './assets/standing-studio.png';
import sunsetImage from './assets/sunset-window.png';

const photos = [
  { src: lobbyImage, width: 1024, height: 1536, alt: 'Portrait photo in a bright lobby' },
  { src: codingImage, width: 1672, height: 941, alt: 'Abdullah coding at his desk' },
  { src: workspaceImage, width: 1024, height: 1536, alt: 'A cozy coding workspace glowing at night' },
  { src: portraitImage, width: 1672, height: 941, alt: 'Abdullah learning at his desk' },
  { src: suitImage, width: 1024, height: 1536, alt: 'Portrait photo in a dark suit' },
  { src: sunsetImage, width: 1672, height: 941, alt: 'Abdullah looking over the city at sunset' },
  { src: deskImage, width: 1024, height: 1536, alt: 'A coding desk setup with glowing screens' },
  { src: studioImage, width: 1672, height: 941, alt: 'Abdullah in his studio with a laptop' },
];

function useFinePointer() {
  const [fine, setFine] = useState(true);
  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setFine(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return fine;
}

export default function AlbumPage() {
  const [index, setIndex] = useState(-1);
  const [reduced, setReduced] = useState(false);
  const fine = useFinePointer();
  const closeRef = useRef(null);
  const swipeRef = useRef(null);
  const swipedRef = useRef(false);
  const open = index >= 0;

  const close = useCallback(() => setIndex(-1), []);
  const step = useCallback((dir) => setIndex((current) => (current + dir + photos.length) % photos.length), []);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') close();
      else if (event.key === 'ArrowLeft') step(-1);
      else if (event.key === 'ArrowRight') step(1);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close, step]);

  const spiralItems = useMemo(
    () => photos.map((photo, i) => ({ id: i, src: photo.src, alt: photo.alt })),
    []
  );

  const onSpiralClick = useCallback((event) => {
    const item = event.target.closest ? event.target.closest('.infinite-spiral__item') : null;
    if (!item || !item.parentElement) return;
    const position = Array.prototype.indexOf.call(item.parentElement.children, item);
    if (position >= 0) setIndex(position % photos.length);
  }, []);

  const onSwipeStart = (event) => {
    swipeRef.current = { x: event.clientX, y: event.clientY };
    swipedRef.current = false;
  };
  const onSwipeMove = (event) => {
    if (!swipeRef.current) return;
    const dx = event.clientX - swipeRef.current.x;
    const dy = event.clientY - swipeRef.current.y;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
      swipedRef.current = true;
      step(dx < 0 ? 1 : -1);
      swipeRef.current = null;
    }
  };
  const onSwipeEnd = () => {
    swipeRef.current = null;
  };
  const onBackdropClick = () => {
    if (swipedRef.current) {
      swipedRef.current = false;
      return;
    }
    close();
  };

  const active = open ? photos[index] : null;

  return (
    <main className="album-page">
      <SiteNavbar />
      <section className="album-hero">
        <motion.p className="about-kicker" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          Personal archive <span />
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.75, ease: [0.2, 0.75, 0.25, 1] }}>
          Album<span className="album-dot">.</span>
        </motion.h1>
      </section>

      <section className="album-spiral-section" aria-label="Photo album">
        <div className="album-spiral" onClick={onSpiralClick}>
          <span className="album-spiral-corner is-tl" aria-hidden="true" />
          <span className="album-spiral-corner is-tr" aria-hidden="true" />
          <span className="album-spiral-corner is-bl" aria-hidden="true" />
          <span className="album-spiral-corner is-br" aria-hidden="true" />
          <span className="album-spiral-tag" aria-hidden="true">ALBUM · 01/{String(photos.length).padStart(2, '0')}</span>
          <InfiniteSpiral
            items={spiralItems}
            imageFit="contain"
            animationMode={fine ? 'all' : 'auto'}
            direction="up"
            speed={0.5}
            radius={210}
            cardWidth={168}
            cardHeight={224}
            verticalSpacing={74}
            perspective={1300}
            cardsPerTurn={7}
            cardRadius={15}
            centerScale={1.28}
            edgeFade={0.3}
            edgeBlur={5}
            pauseOnHover
            grayscale={0}
          />
        </div>
      </section>

      <AnimatePresence>
        {open && active && (
          <motion.div
            className="album-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`Photo ${index + 1} of ${photos.length}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.2, 0.75, 0.25, 1] }}
            onClick={onBackdropClick}
            onPointerDown={onSwipeStart}
            onPointerMove={onSwipeMove}
            onPointerUp={onSwipeEnd}
            onPointerCancel={onSwipeEnd}
          >
            <div className="album-lightbox-glow" aria-hidden="true" />
            <motion.figure
              className="album-lightbox-figure"
              key={active.src}
              initial={reduced ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.2, 0.75, 0.25, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <img src={active.src} width={active.width} height={active.height} alt={active.alt} draggable={false} />
            </motion.figure>

            <button type="button" className="album-lb-close" ref={closeRef} onClick={close} aria-label="Close photo">
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
            </button>
            <button type="button" className="album-lb-nav album-lb-prev" onClick={(event) => { event.stopPropagation(); step(-1); }} aria-label="Previous photo">
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button type="button" className="album-lb-nav album-lb-next" onClick={(event) => { event.stopPropagation(); step(1); }} aria-label="Next photo">
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>

            <div className="album-lb-meta" onClick={(event) => event.stopPropagation()}>
              <span className="album-lb-count"><strong>{String(index + 1).padStart(2, '0')}</strong> / {String(photos.length).padStart(2, '0')}</span>
              <span className="album-lb-track" aria-hidden="true"><i style={{ transform: `scaleX(${(index + 1) / photos.length})` }} /></span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
