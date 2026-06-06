import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from '@/animations/gsapSetup';
import { GlowButton } from '@/components/GlowButton';
import startBtnImg from '../../assets/Image/Start_game_btn.png';

export function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    if (titleRef.current) {
      tl.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        delay: 0.5,
      });
    }
    if (subtitleRef.current) {
      tl.from(
        subtitleRef.current,
        { y: 30, opacity: 0, duration: 0.8 },
        '-=0.6',
      );
    }
    if (ctaRef.current) {
      tl.from(
        ctaRef.current.children,
        { y: 20, opacity: 0, stagger: 0.15, duration: 0.6 },
        '-=0.4',
      );
    }

    return () => { tl.kill(); };
  }, []);

  const scrollToModes = () => {
    document.getElementById('modes')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative z-10 flex flex-col items-center text-center px-4 pt-8 md:pt-12 pb-6">
      <h2
        ref={titleRef}
        className="font-hero text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-none hero-gradient-text max-w-5xl"
      >
        Шахматы нового поколения
      </h2>

      <p
        ref={subtitleRef}
        className="mt-4 md:mt-6 text-lg md:text-xl lg:text-2xl text-text-secondary font-light tracking-wide"
      >
        Играй. Развивайся. Доминируй.
      </p>

      <div ref={ctaRef} className="mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-4">
        <motion.button
          type="button"
          onClick={() => { window.location.hash = '#play'; }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
          className="relative group cursor-pointer"
        >
          <img
            src={startBtnImg}
            alt="Играть сейчас"
            className="h-14 md:h-16 w-auto drop-shadow-neon transition-all duration-300 group-hover:brightness-125 group-hover:drop-shadow-[0_0_30px_rgba(139,61,255,0.8)]"
          />
          <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-accent-primary/10 blur-xl" />
        </motion.button>
        <GlowButton variant="secondary" onClick={scrollToModes}>
          Узнать больше
        </GlowButton>
      </div>
    </section>
  );
}
