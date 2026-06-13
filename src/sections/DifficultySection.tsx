import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from '@/animations/gsapSetup';
import pawnIcon from '../../assets/Image/6.png';
import knightIcon from '../../assets/Image/5.png';
import bishopIcon from '../../assets/Image/4.png';
import rookIcon from '../../assets/Image/3.png';
import queenIcon from '../../assets/Image/2.png';
import kingIcon from '../../assets/Image/1.png';
import crownIcon from '../../assets/Image/Crown.png';

const DIFFICULTIES = [
  { name: 'Новичок', icon: pawnIcon, color: '#4ade80' },
  { name: 'Лёгкий', icon: knightIcon, color: '#60a5fa' },
  { name: 'Средний', icon: bishopIcon, color: '#a78bfa' },
  { name: 'Продвинутый', icon: rookIcon, color: '#c084fc' },
  { name: 'Эксперт', icon: queenIcon, color: '#D44CFF' },
  { name: 'Гроссмейстер', icon: kingIcon, color: '#f59e0b' },
  { name: 'Невозможный', icon: crownIcon, color: '#ef4444' },
] as const;

interface DifficultySectionProps {
  compact?: boolean;
}

export function DifficultySection({ compact = false }: DifficultySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll('[data-diff]');
      if (!items?.length) return;

      gsap.from(items, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: compact ? 'top 95%' : 'top 80%',
        },
        scale: 0.8,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'back.out(1.4)',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [compact]);

  if (compact) {
    return (
      <section ref={sectionRef} className="px-2 py-2">
        <h3 className="section-title mb-2">Сложность</h3>
        <div className="grid grid-cols-4 gap-1.5">
          {DIFFICULTIES.map((diff) => (
            <motion.div
              key={diff.name}
              data-diff
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center gap-0.5 cursor-pointer group"
              title={diff.name}
            >
              <div
                className="w-10 h-10 rounded-lg glass-panel flex items-center justify-center group-hover:shadow-neon-sm transition-all"
                style={{ boxShadow: `0 0 12px ${diff.color}22` }}
              >
                <img src={diff.icon} alt={diff.name} className="w-6 h-6 object-contain" loading="lazy" />
              </div>
              <span className="text-[7px] font-medium uppercase tracking-wider text-center leading-tight" style={{ color: diff.color }}>
                {diff.name}
              </span>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative z-10 px-4 py-12 md:py-16">
      <div className="max-w-5xl mx-auto">
        <h3 className="section-title text-center mb-8 md:mb-12">Сложность</h3>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {DIFFICULTIES.map((diff) => (
            <motion.div
              key={diff.name}
              data-diff
              whileHover={{ scale: 1.1, y: -4 }}
              className="flex flex-col items-center gap-2 cursor-pointer group"
            >
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-2xl glass-panel flex items-center justify-center transition-all duration-300 group-hover:shadow-neon"
                style={{ borderColor: `${diff.color}44`, boxShadow: `0 0 20px ${diff.color}22` }}
              >
                <img src={diff.icon} alt={diff.name} className="w-10 h-10 md:w-12 md:h-12 object-contain" loading="lazy" />
              </div>
              <span className="text-xs md:text-sm font-medium uppercase tracking-wider transition-colors group-hover:text-white" style={{ color: diff.color }}>
                {diff.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
