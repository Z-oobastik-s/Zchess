import { useRef, useEffect } from 'react';
import { gsap } from '@/animations/gsapSetup';
import { GlassCard } from '@/components/GlassCard';
import botAiIcon from '../../assets/Image/Bot_ai.png';
import swordsIcon from '../../assets/Image/Swords.png';
import bookIcon from '../../assets/Image/Book.png';

const MODES = [
  {
    title: 'Против ИИ',
    description: 'Сразись с умным движком любого уровня',
    icon: botAiIcon,
    color: '#8B3DFF',
  },
  {
    title: 'Быстрый матч',
    description: 'Мгновенный поиск соперника онлайн',
    icon: swordsIcon,
    color: '#D44CFF',
  },
  {
    title: 'Обучение',
    description: 'Уроки, задачи и анализ партий',
    icon: bookIcon,
    color: '#B05CFF',
  },
] as const;

interface ModesSectionProps {
  compact?: boolean;
}

export function ModesSection({ compact = false }: ModesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('[data-mode]');
      if (!cards?.length) return;

      gsap.from(cards, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: compact ? 'top 95%' : 'top 80%',
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [compact]);

  if (compact) {
    return (
      <section ref={sectionRef} className="px-2 py-2">
        <h3 className="section-title mb-2">Режимы игры</h3>
        <div className="space-y-2">
          {MODES.map((mode) => (
            <GlassCard key={mode.title} data-mode="" className="p-3 cursor-pointer group">
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform"
                  style={{
                    background: `radial-gradient(circle, ${mode.color}33 0%, transparent 70%)`,
                    boxShadow: `0 0 20px ${mode.color}44`,
                  }}
                >
                  <img src={mode.icon} alt={mode.title} className="w-7 h-7 object-contain" loading="lazy" />
                </div>
                <div>
                  <h4 className="font-display text-xs font-bold uppercase tracking-wider">{mode.title}</h4>
                  <p className="text-[10px] text-text-secondary mt-0.5 leading-snug">{mode.description}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="modes" ref={sectionRef} className="relative z-10 px-4 py-12 md:py-16">
      <div className="max-w-5xl mx-auto">
        <h3 className="section-title text-center mb-8 md:mb-12">Режимы игры</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {MODES.map((mode) => (
            <GlassCard key={mode.title} data-mode="" className="p-6 md:p-8 cursor-pointer group">
              <div className="flex flex-col items-center text-center">
                <div
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110"
                  style={{
                    background: `radial-gradient(circle, ${mode.color}33 0%, transparent 70%)`,
                    boxShadow: `0 0 30px ${mode.color}44`,
                  }}
                >
                  <img src={mode.icon} alt={mode.title} className="w-14 h-14 md:w-16 md:h-16 object-contain drop-shadow-lg" loading="lazy" />
                </div>
                <h4 className="font-display text-lg font-bold uppercase tracking-wider text-text-primary">{mode.title}</h4>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">{mode.description}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
