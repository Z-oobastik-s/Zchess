import { useRef, useEffect } from 'react';
import { gsap } from '@/animations/gsapSetup';
import horseIcon from '../../assets/Image/Horse_nav.png';

const PLATFORM_FEATURES = [
  { title: 'Мощный движок', desc: 'Stockfish уровня PRO' },
  { title: 'Умный анализ', desc: 'Разбор каждого хода' },
  { title: 'Турниры', desc: 'Ежедневные битвы' },
  { title: 'Достижения', desc: 'Система прогресса' },
] as const;

export function PlatformFeaturesSection() {
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
    <section ref={sectionRef} className="px-2 py-4">
      <h3 className="section-title mb-4">Особенности платформы</h3>
      <div className="grid grid-cols-2 gap-3">
        {PLATFORM_FEATURES.map((f) => (
          <div
            key={f.title}
            data-pfeat
            className="glass-panel p-4 text-center hover:shadow-neon-sm transition-shadow cursor-pointer group"
          >
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-accent-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <img src={horseIcon} alt="" className="w-7 h-7 object-contain opacity-80" loading="lazy" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider">{f.title}</div>
            <div className="text-[10px] text-text-secondary mt-1">{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
