import { useState, useEffect, useRef } from 'react';
import type { Variants } from 'framer-motion';

/* ────────────────────────────────────────────────────────
   useTypewriter
   Cycles through an array of phrases with type/delete loop.
──────────────────────────────────────────────────────── */
export function useTypewriter(
  phrases: string[],
  typingSpeed = 70,
  deletingSpeed = 35,
  pauseDuration = 2200,
) {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentPhrase.substring(0, text.length + 1));
        if (text.length === currentPhrase.length) {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        setText(currentPhrase.substring(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, phraseIndex, isDeleting, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  return text;
}

/* ────────────────────────────────────────────────────────
   useAnimatedCounter
   Counts from 0 to `end` with easeOutCubic, triggered
   when the ref element enters the viewport.
──────────────────────────────────────────────────────── */
export function useAnimatedCounter(end: number, duration = 1800, startOnView = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) { setHasStarted(true); return; }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !hasStarted) setHasStarted(true); },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted, startOnView]);

  useEffect(() => {
    if (!hasStarted) return;
    let startTime: number;
    const animate = (now: number) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  return { count, ref };
}

/* ────────────────────────────────────────────────────────
   useParticleCanvas
   Reads CSS custom properties for colour so it responds
   to theme changes automatically without a re-mount.
──────────────────────────────────────────────────────── */
export function useParticleCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Respect prefers-reduced-motion — skip drawing entirely
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let animationId: number;
    type Particle = { x: number; y: number; vx: number; vy: number; size: number; opacity: number };
    const particles: Particle[] = [];

    const getThemeVars = () => {
      const style = getComputedStyle(document.documentElement);
      const rgb  = style.getPropertyValue('--particle-color').trim() || '59, 130, 246';
      const maxOp = parseFloat(style.getPropertyValue('--particle-opacity-max').trim()) || 0.35;
      const connOp = parseFloat(style.getPropertyValue('--particle-connection-opacity').trim()) || 0.06;
      return { rgb, maxOp, connOp };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    const createParticles = () => {
      particles.length = 0;
      // Cap at 45 particles; scale with canvas area
      const count = Math.min(45, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 18000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          size: Math.random() * 1.8 + 0.5,
          opacity: Math.random() * 0.35 + 0.08,
        });
      }
    };

    const draw = () => {
      const { rgb, maxOp, connOp } = getThemeVars();
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.offsetWidth)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;

        const op = Math.min(p.opacity, maxOp);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${op})`;
        ctx.fill();

        // Draw connections — O(n²) capped at 45 particles = max 990 checks/frame
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = q.x - p.x;
          const dy = q.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${rgb}, ${connOp * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animationId = requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    draw();

    const onResize = () => { resize(); createParticles(); };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
    };
  }, [canvasRef]);
}

/* ────────────────────────────────────────────────────────
   Shared Framer Motion variants — typed correctly for v13
──────────────────────────────────────────────────────── */
export const fadeInUp: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] as const } },
};

export const fadeInDown: Variants = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] as const } },
};

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.40 } },
};

export const staggerContainer: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] as const } },
};

export const slideInLeft: Variants = {
  hidden:  { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.50, ease: [0.21, 0.47, 0.32, 0.98] as const } },
};

export const slideInRight: Variants = {
  hidden:  { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.50, ease: [0.21, 0.47, 0.32, 0.98] as const } },
};
