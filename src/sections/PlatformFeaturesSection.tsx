import { useRef, useEffect } from 'react';
import { gsap } from '@/animations/gsapSetup';
import horseIcon from '../../assets/Image/Horse_nav.png';

const PLATFORM_FEATURES = [
  { title: 'Мощный движок', desc: 'Stockfish уровня PRO' },
  { title: 'Умный анализ', desc: 'Разбор каждого хода' },
  { title: 'Турниры', desc: 'Ежедневные битвы' },
  { title: 'Достижения', desc: 'Система прогресса' },
] as const;

interface PlatformFeaturesSectionProps {
  compact?: boolean;
}

export function PlatformFeaturesSection({ compact = false }: PlatformFeaturesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-pfeat]', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
        scale: 0.9,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`px-2 ${compact ? 'py-2' : 'py-4'}`}>
      <h3 className={`section-title ${compact ? 'mb-2' : 'mb-4'}`}>Особенности платформы</h3>
      <div className={`grid grid-cols-2 ${compact ? 'gap-2' : 'gap-3'}`}>
        {PLATFORM_FEATURES.map((f) => (
          <div
            key={f.title}
            data-pfeat
            className={`glass-panel ${compact ? 'p-2.5' : 'p-4'} text-center hover:shadow-neon-sm transition-shadow cursor-pointer group`}
          >
            <div className={`${compact ? 'w-9 h-9 mb-1' : 'w-12 h-12 mb-2'} mx-auto rounded-full bg-accent-primary/10 flex items-center justify-center group-hover:scale-105 transition-transform`}>
              <img src={horseIcon} alt="" className={`${compact ? 'w-5 h-5' : 'w-7 h-7'} object-contain opacity-80`} loading="lazy" />
            </div>
            <div className={`${compact ? 'text-[10px]' : 'text-xs'} font-bold uppercase tracking-wider`}>{f.title}</div>
            <div className={`${compact ? 'text-[9px]' : 'text-[10px]'} text-text-secondary mt-0.5`}>{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
