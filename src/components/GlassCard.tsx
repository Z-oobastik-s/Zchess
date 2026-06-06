import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverScale?: boolean;
  glowOnHover?: boolean;
  'data-mode'?: string;
}

export function GlassCard({
  children,
  className = '',
  hoverScale = true,
  glowOnHover = true,
  'data-mode': dataMode,
}: GlassCardProps) {
  return (
    <motion.div
      data-mode={dataMode}
      className={`glass-panel neon-border ${className}`}
      whileHover={
        hoverScale
          ? {
              scale: 1.03,
              boxShadow: glowOnHover
                ? '0 0 30px rgba(139, 61, 255, 0.4), 0 8px 32px rgba(0,0,0,0.5)'
                : undefined,
            }
          : undefined
      }
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
