import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ThinkingOrb } from 'thinking-orbs';
import { createParticleReveal, supportsHtmlInCanvas } from './canvasui/ParticleRevealVanilla';

/* Orb replaces the status dot: "connecting" while loading, "breathing" once live, still when offline. */
function StatusOrb({ el }: { el: HTMLElement }) {
  const [cls, setCls] = useState(el.className);
  useEffect(() => {
    const mo = new MutationObserver(() => setCls(el.className));
    mo.observe(el, { attributes: true, attributeFilter: ['class'] });
    return () => mo.disconnect();
  }, [el]);
  const live = cls.includes('live');
  const loading = !live && el.textContent?.includes('Loading');
  return <ThinkingOrb state={live ? 'breathing' : 'connecting'} size={20} dark paused={!live && !loading} />;
}

const status = document.getElementById('status');
if (status) {
  status.classList.add('has-orb');
  const host = document.createElement('b'); // not a span: app.js writes status text into the first span
  host.className = 'orb';
  status.prepend(host);
  createRoot(host).render(<StatusOrb el={status} />);
}

/* Particle Reveal on the billboard: Chrome-only (html-in-canvas), everyone else keeps the plain page. */
const bb = document.getElementById('billboard');
if (bb && supportsHtmlInCanvas() && !matchMedia('(prefers-reduced-motion: reduce)').matches && !matchMedia('(pointer: coarse)').matches) {
  const wrap = document.createElement('div');
  wrap.className = 'pr-wrap';
  const source = document.createElement('canvas');
  const output = document.createElement('canvas');
  output.className = 'pr-out';
  bb.replaceWith(wrap);
  source.appendChild(bb);
  wrap.append(source, output);
  const fx = createParticleReveal({ source, content: bb, output }, { radius: 260, background: '#07080c' });
  if (!fx) { wrap.replaceWith(bb); }
}
