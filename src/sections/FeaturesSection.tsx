import { useRef, useEffect } from 'react';
import { gsap } from '@/animations/gsapSetup';

const FEATURES = [
  { icon: '⚡', title: 'Быстрые матчи', desc: 'Поиск соперника за секунды' },
  { icon: '🎯', title: 'Умный анализ', desc: 'Разбор каждой партии' },
  { icon: '🏆', title: 'Турниры', desc: 'Ежедневные соревнования' },
  { icon: '📱', title: 'Любое устройство', desc: 'Играй где угодно' },
  { icon: '🔓', title: 'Без регистрации', desc: 'Начни играть мгновенно' },
  { icon: '🔄', title: 'Обновления', desc: 'Новый контент каждую неделю' },
] as const;

interface FeaturesSectionProps {
  compact?: boolean;
}

export function FeaturesSection({ compact = false }: FeaturesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-feature]', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: compact ? 'top 95%' : 'top 80%',
        },
        x: compact ? 20 : -30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [compact]);

  if (compact) {
    return (
      <section ref={sectionRef} className="px-2 py-4">
        <h3 className="section-title mb-4">Почему именно мы</h3>
        <div className="space-y-2">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              data-feature
              className="glass-panel p-3 flex items-center gap-3 hover:shadow-neon-sm transition-shadow"
            >
              <span className="text-lg flex-shrink-0">{f.icon}</span>
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider">{f.title}</h4>
                <p className="text-[10px] text-text-secondary">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative z-10 px-4 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <h3 className="section-title text-center mb-8 md:mb-12">Почему именно мы</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              data-feature
              className="glass-panel p-5 flex items-start gap-4 hover:shadow-neon-sm transition-shadow duration-300"
            >
              <span className="text-2xl flex-shrink-0">{f.icon}</span>
              <div>
                <h4 className="font-display text-sm font-bold uppercase tracking-wider">{f.title}</h4>
                <p className="mt-1 text-sm text-text-secondary">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
