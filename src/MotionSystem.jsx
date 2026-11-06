import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { MotionConfig, useReducedMotion } from 'framer-motion';
import { Pause, Play, ArrowUp } from 'lucide-react';

const MotionContext = createContext({ enabled: true, toggle: () => {} });

export function MotionProvider({ children }) {
  const systemReduced = useReducedMotion();
  const [paused, setPaused] = useState(() => {
    try { return localStorage.getItem('du-motion') === 'paused'; } catch { return false; }
  });
  const enabled = !systemReduced && !paused;
  useEffect(() => { document.documentElement.dataset.motion = enabled ? 'on' : 'off'; }, [enabled]);
  const toggle = () => setPaused(value => {
    try { localStorage.setItem('du-motion', value ? 'playing' : 'paused'); } catch { /* Optional preference storage. */ }
    return !value;
  });
  return <MotionContext.Provider value={{ enabled, toggle, systemReduced }}>
    <MotionConfig reducedMotion={enabled ? 'never' : 'always'}>{children}</MotionConfig>
  </MotionContext.Provider>;
}

export function useMotionPreference() { return !useContext(MotionContext).enabled; }

export function MotionControls() {
  const { enabled, toggle, systemReduced } = useContext(MotionContext);
  const [scrolled, setScrolled] = useState(false);
  const progress = useRef(null);
  useEffect(() => {
    let frame;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      setScrolled(window.scrollY > 650);
      frame = null;
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('resize', scroll);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', scroll); window.removeEventListener('resize', scroll); };
  }, []);
  return <>
    <div className="reading-progress" ref={progress} aria-hidden="true" />
    <div className="floating-controls">
      <button className="motion-toggle" onClick={toggle} disabled={!!systemReduced}
        aria-label={systemReduced ? 'Reduced motion follows your device setting' : enabled ? 'Pause animations' : 'Enable animations'}
        title={systemReduced ? 'Reduced motion follows your device setting' : enabled ? 'Pause animations' : 'Enable animations'}>
        {enabled ? <Pause size={13} /> : <Play size={13} />} <span>Motion {enabled ? 'on' : 'off'}</span>
      </button>
      {scrolled && <a href="#top" className="back-top" aria-label="Back to top"><ArrowUp size={16} /></a>}
    </div>
  </>;
}

export function InteractionEffects() {
  const { enabled } = useContext(MotionContext);
  useEffect(() => {
    if (!enabled || !matchMedia('(pointer: fine)').matches) return;
    const cards = [...document.querySelectorAll('.flagship-feature-card, .build-card, .pillar-card, .education-grid article, .apart-feature')];
    const move = e => {
      const el = e.currentTarget, box = el.getBoundingClientRect();
      el.style.setProperty('--glow-x', `${e.clientX - box.left}px`);
      el.style.setProperty('--glow-y', `${e.clientY - box.top}px`);
      el.style.setProperty('--tilt-x', `${-(e.clientY - box.top - box.height / 2) / box.height * 2}deg`);
      el.style.setProperty('--tilt-y', `${(e.clientX - box.left - box.width / 2) / box.width * 2}deg`);
    };
    const leave = e => { e.currentTarget.style.setProperty('--tilt-x', '0deg'); e.currentTarget.style.setProperty('--tilt-y', '0deg'); };
    cards.forEach(el => { el.addEventListener('pointermove', move); el.addEventListener('pointerleave', leave); });
    return () => cards.forEach(el => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); leave({ currentTarget: el }); });
  }, [enabled]);
  return null;
}

export function TechMarquee() {
  const items = ['MODEL ENGINEERING', 'AI AGENTS', 'CONVERSATIONAL AI', 'AUTOMATION', 'EVALUATION'];
  return <div className="tech-marquee" aria-label={items.join(', ')}>
    <div className="marquee-track" aria-hidden="true">{[...items, ...items].map((item, i) => <span key={i}>{item}<i>✳</i></span>)}</div>
  </div>;
}
