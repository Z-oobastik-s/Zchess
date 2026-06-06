import { useEffect, useRef } from 'react';
import { gsap } from '@/animations/gsapSetup';

export function useParallaxBackground(selector: string) {
  const quickX = useRef<((value: number) => void) | null>(null);
  const quickY = useRef<((value: number) => void) | null>(null);

  useEffect(() => {
    const el = document.querySelector(selector) as HTMLElement | null;
    if (!el) return;

    quickX.current = gsap.quickSetter(el, 'x', 'px') as (value: number) => void;
    quickY.current = gsap.quickSetter(el, 'y', 'px') as (value: number) => void;

    const handleMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      quickX.current?.(nx * 15);
      quickY.current?.(ny * 10);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [selector]);
}
