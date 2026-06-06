import { useRef, type ReactNode, type MouseEvent } from 'react';
import { motion } from 'framer-motion';

interface GlowButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  href?: string;
  className?: string;
}

export function GlowButton({
  children,
  variant = 'primary',
  onClick,
  href,
  className = '',
}: GlowButtonProps) {
  const rippleRef = useRef<HTMLSpanElement>(null);

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const ripple = rippleRef.current;
    if (ripple) {
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      ripple.classList.remove('animate-ripple');
      void ripple.offsetWidth;
      ripple.classList.add('animate-ripple');
    }
    onClick?.();
  };

  const baseClass =
    'relative overflow-hidden inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-display font-bold text-sm uppercase tracking-widest transition-all duration-300 cursor-pointer select-none';

  const variantClass =
    variant === 'primary'
      ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-neon hover:shadow-neon-lg'
      : 'bg-white/5 border border-white/20 text-text-primary hover:border-accent-primary/50 hover:bg-white/10';

  const content = (
    <>
      <span
        ref={rippleRef}
        className="absolute rounded-full bg-white/30 pointer-events-none scale-0 opacity-0"
        style={{ transition: 'none' }}
      />
      <span className="relative z-10">{children}</span>
    </>
  );

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="inline-block"
    >
      {href ? (
        <a
          href={href}
          onClick={handleClick}
          className={`${baseClass} ${variantClass} ${className}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          className={`${baseClass} ${variantClass} ${className}`}
        >
          {content}
        </button>
      )}
      <style>{`
        @keyframes rippleEffect {
          to { transform: scale(4); opacity: 0; }
        }
        .animate-ripple {
          animation: rippleEffect 0.6s ease-out forwards;
          transform: scale(0);
          opacity: 0.5;
        }
      `}</style>
    </motion.div>
  );
}
