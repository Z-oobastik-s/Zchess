import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/animations/gsapSetup';

const STATS = [
  { value: 1.9, suffix: 'M+', label: 'игроков', decimals: 1 },
  { value: 37.9, suffix: 'M+', label: 'партий', decimals: 1 },
  { value: 114, suffix: '+', label: 'стран', decimals: 0 },
] as const;

function animateCounter(
  el: HTMLElement,
  target: number,
  decimals: number,
  suffix: string,
) {
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    duration: 2,
    ease: 'power2.out',
    onUpdate: () => {
      el.textContent = `${obj.val.toFixed(decimals)}${suffix}`;
    },
  });
}

interface StatsSectionProps {
  compact?: boolean;
}

export function StatsSection({ compact = false }: StatsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const runAnimation = (card: Element, valueEl: HTMLElement, i: number, stat: (typeof STATS)[number]) => {
        gsap.from(card, {
          y: compact ? 20 : 40,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.15,
        });
        animateCounter(valueEl, stat.value, stat.decimals, stat.suffix);
      };

      STATS.forEach((stat, i) => {
        const card = sectionRef.current?.querySelector(`[data-stat="${i}"]`);
        const valueEl = card?.querySelector('[data-value]') as HTMLElement | null;
        if (!card || !valueEl) return;

        if (compact) {
          runAnimation(card, valueEl, i, stat);
        } else {
          ScrollTrigger.create({
            trigger: card,
            start: 'top 85%',
            once: true,
            onEnter: () => runAnimation(card, valueEl, i, stat),
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [compact]);

  if (compact) {
    return (
      <section ref={sectionRef} className="grid grid-cols-1 gap-2">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            data-stat={i}
            className="glass-panel neon-border p-3 flex items-center justify-between hover:shadow-neon-sm transition-shadow"
          >
            <span className="text-[10px] uppercase tracking-wider text-text-secondary">{stat.label}</span>
            <span data-value className="font-display text-lg font-black text-accent-glow">
              0{stat.suffix}
            </span>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative z-10 px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            data-stat={i}
            className="glass-panel neon-border p-6 md:p-8 text-center group hover:shadow-neon transition-shadow duration-500"
          >
            <div
              data-value
              className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-accent-glow text-glow"
            >
              0{stat.suffix}
            </div>
            <div className="mt-2 text-sm uppercase tracking-[0.2em] text-text-secondary">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
