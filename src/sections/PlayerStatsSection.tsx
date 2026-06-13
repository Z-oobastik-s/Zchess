import { useRef, useEffect } from 'react';
import { gsap } from '@/animations/gsapSetup';

const PLAYER_STATS = [
  { label: 'Партий', value: '532' },
  { label: 'Побед', value: '298' },
  { label: 'Ничьих', value: '134' },
  { label: 'Поражений', value: '100' },
  { label: 'Винрейт', value: '55.9%' },
  { label: 'Серия', value: '7' },
] as const;

interface PlayerStatsSectionProps {
  compact?: boolean;
}

export function PlayerStatsSection({ compact = false }: PlayerStatsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-pstat]', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
        opacity: 0,
        x: 30,
        stagger: 0.08,
        duration: 0.6,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`px-2 ${compact ? 'py-2' : 'py-4'}`}>
      <h3 className={`section-title ${compact ? 'mb-2' : 'mb-4'}`}>Статистика игрока</h3>
      <div className={`glass-panel ${compact ? 'p-3' : 'p-5'}`}>
        <div className={`flex items-center ${compact ? 'gap-3 mb-2' : 'gap-5 mb-5'}`}>
          <div className={`relative ${compact ? 'w-16 h-16' : 'w-24 h-24'} flex-shrink-0`}>
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
              <circle
                cx="50" cy="50" r="42" fill="none"
                stroke="url(#ratingGrad)" strokeWidth="6"
                strokeDasharray="264" strokeDashoffset="66"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="ratingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8B3DFF" />
                  <stop offset="100%" stopColor="#D44CFF" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`${compact ? 'text-[8px]' : 'text-[10px]'} uppercase tracking-wider text-text-secondary`}>Рейтинг</span>
              <span className={`font-display ${compact ? 'text-base' : 'text-xl'} font-black text-accent-glow`}>1742</span>
            </div>
          </div>
          <div className={`grid grid-cols-2 ${compact ? 'gap-x-2 gap-y-1' : 'gap-x-4 gap-y-2'} flex-1`}>
            {PLAYER_STATS.map((s) => (
              <div key={s.label} data-pstat>
                <div className={`${compact ? 'text-[8px]' : 'text-[10px]'} uppercase tracking-wider text-text-secondary`}>{s.label}</div>
                <div className={`font-display font-bold ${compact ? 'text-xs' : 'text-sm'}`}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
