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
    const targets = [
      titleRef.current,
      subtitleRef.current,
      ...(ctaRef.current ? Array.from(ctaRef.current.children) : []),
    ].filter(Boolean);

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 0.3 },
      );
    }
    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.6',
      );
    }
    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.6 },
        '-=0.4',
      );
    }

    return () => {
      tl.kill();
      gsap.set(targets, { opacity: 1, y: 0, clearProps: 'transform' });
    };
  }, []);

  const scrollToModes = () => {
    document.getElementById('modes')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative z-10 flex flex-col items-center text-center px-4 pt-8 md:pt-12 pb-6 xl:pt-2 xl:pb-2">
      <h2
        ref={titleRef}
        className="font-hero text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-5xl 2xl:text-6xl leading-none hero-gradient-text max-w-5xl"
      >
        Шахматы нового поколения
      </h2>

      <p
        ref={subtitleRef}
        className="mt-4 md:mt-6 xl:mt-2 text-lg md:text-xl lg:text-2xl xl:text-base text-text-secondary font-light tracking-wide"
      >
        Играй. Развивайся. Доминируй.
      </p>

      <div ref={ctaRef} className="mt-8 md:mt-10 xl:mt-4 flex flex-wrap items-center justify-center gap-4">
        <motion.button
          type="button"
          onClick={() => { window.location.hash = '#play'; }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="relative cursor-pointer outline-none focus:outline-none"
        >
          <img
            src={startBtnImg}
            alt="Играть сейчас"
            draggable={false}
            className="h-14 md:h-16 xl:h-12 w-auto drop-shadow-neon transition-all duration-300 hover:brightness-110"
          />
        </motion.button>
        <GlowButton variant="secondary" onClick={scrollToModes}>
          Узнать больше
        </GlowButton>
      </div>
    </section>
  );
}
