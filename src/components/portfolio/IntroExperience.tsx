"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDownRight, ArrowRight, Sparkles } from "lucide-react";
import { profile } from "@/data/portfolio";
import { ProfilePhoto } from "./ProfilePhoto";

type IntroExperienceProps = { onComplete: () => void; visible: boolean };
type Particle = { x: number; y: number; vx: number; vy: number; radius: number; phase: number };
type Wave = { x: number; y: number; born: number };

function InteractiveField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: -1000, y: -1000, active: false });
  const waves = useRef<Wave[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let frame = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const particles: Particle[] = [];
    const amount = Math.min(105, Math.floor((window.innerWidth * window.innerHeight) / 10500));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    for (let index = 0; index < amount; index++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: Math.random() * 1.7 + 0.6,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      const linkDistance = Math.min(150, width * 0.12);
      const pointerPosition = pointer.current;

      particles.forEach((particle, index) => {
        if (!reduced) {
          particle.x += particle.vx;
          particle.y += particle.vy;
          if (particle.x < -10 || particle.x > width + 10) particle.vx *= -1;
          if (particle.y < -10 || particle.y > height + 10) particle.vy *= -1;
        }

        const dx = pointerPosition.x - particle.x;
        const dy = pointerPosition.y - particle.y;
        const distanceToPointer = Math.hypot(dx, dy);
        if (pointerPosition.active && distanceToPointer < 125 && distanceToPointer > 0) {
          const force = (125 - distanceToPointer) / 1250;
          particle.x -= (dx / distanceToPointer) * force * 12;
          particle.y -= (dy / distanceToPointer) * force * 12;
        }

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius + Math.sin(time * 0.001 + particle.phase) * 0.25, 0, Math.PI * 2);
        context.fillStyle = index % 5 === 0 ? "rgba(171, 143, 255, .76)" : "rgba(104, 231, 204, .62)";
        context.fill();

        for (let next = index + 1; next < particles.length; next++) {
          const other = particles[next];
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
          if (distance < linkDistance) {
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(other.x, other.y);
            context.strokeStyle = `rgba(117, 207, 192, ${(1 - distance / linkDistance) * 0.16})`;
            context.lineWidth = 0.7;
            context.stroke();
          }
        }
      });

      const now = performance.now();
      waves.current = waves.current.filter((wave) => now - wave.born < 1250);
      waves.current.forEach((wave) => {
        const progress = (now - wave.born) / 1250;
        context.beginPath();
        context.arc(wave.x, wave.y, progress * 180, 0, Math.PI * 2);
        context.strokeStyle = `rgba(105, 217, 196, ${(1 - progress) * 0.48})`;
        context.lineWidth = 1.4;
        context.stroke();
      });
      if (!reduced) frame = window.requestAnimationFrame(draw);
    };

    if (reduced) draw(0);
    else frame = window.requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    const trackPointer = (event: PointerEvent) => {
      pointer.current = { x: event.clientX, y: event.clientY, active: true };
    };
    const leavePointer = () => { pointer.current.active = false; };
    const makeWave = (event: PointerEvent) => waves.current.push({ x: event.clientX, y: event.clientY, born: performance.now() });
    window.addEventListener("pointermove", trackPointer, { passive: true });
    window.addEventListener("pointerdown", makeWave, { passive: true });
    window.addEventListener("blur", leavePointer);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", trackPointer);
      window.removeEventListener("pointerdown", makeWave);
      window.removeEventListener("blur", leavePointer);
    };
  }, []);

  return <canvas ref={canvasRef} className="intro-canvas" aria-hidden="true" />;
}

export function IntroExperience({ onComplete, visible }: IntroExperienceProps) {
  const reducedMotion = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), reducedMotion ? 100 : 4200);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  useEffect(() => {
    if (!visible) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter") onComplete();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onComplete, visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          className="intro-scene"
          aria-label="Animasi pembuka portofolio"
          aria-modal="true"
          role="dialog"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.025, filter: "blur(8px)" }}
          transition={{ duration: reducedMotion ? 0.15 : 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <InteractiveField />
          <div className="intro-vignette" />
          <header className="intro-topline"><span><i /> FIELD NOTE 001</span><span>MOBILE / DATA / HUMAN</span></header>
          <button className="intro-skip" type="button" onClick={onComplete}>Lewati intro <kbd>ESC</kbd></button>

          <div className="intro-focus">
            <motion.div
              className="intro-photo-halo"
              initial={reducedMotion ? false : { opacity: 0, scale: 0.72, rotate: -14 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="intro-photo-ring intro-photo-ring--one" />
              <span className="intro-photo-ring intro-photo-ring--two" />
              <ProfilePhoto className="intro-photo" sizes="(max-width: 700px) 180px, 240px" priority />
              <span className="intro-photo-spark"><Sparkles size={15} /></span>
            </motion.div>

            <motion.p className="intro-index" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>A PERSONAL PORTFOLIO · {new Date().getFullYear()}</motion.p>
            <motion.h1 initial={reducedMotion ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72, duration: 0.75 }}>
              Halo, saya <span>{profile.shortName}.</span>
            </motion.h1>
            <motion.p className="intro-role" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
              {profile.role} <span>·</span> merangkai pengalaman digital yang terasa dekat.
            </motion.p>
            <motion.button
              className={`intro-enter ${ready ? "intro-enter--ready" : ""}`}
              type="button"
              onClick={onComplete}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: ready ? 1 : 0.45, y: 0 }}
              transition={{ delay: ready ? 0 : 1.35, duration: 0.45 }}
            >
              <span>{ready ? "Masuk ke portofolio" : "Membangun koneksi…"}</span>
              {ready ? <ArrowDownRight size={17} /> : <span className="intro-loader" />}
            </motion.button>
          </div>

          <footer className="intro-bottom"><span>MUHAMMAD AR RAFI SAIFUDDIN</span><span>GERAKKAN KURSOR · KLIK UNTUK MEMBUAT GELOMBANG <ArrowRight size={12} /></span></footer>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
