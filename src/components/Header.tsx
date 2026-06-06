import { motion } from 'framer-motion';

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative z-20 flex flex-col items-center pt-6 md:pt-8 px-4"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center shadow-neon-sm">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
            <path d="M12 2L14 8H20L15 12L17 18L12 15L7 18L9 12L4 8H10L12 2Z" />
          </svg>
        </div>
        <h1 className="font-display text-2xl md:text-3xl font-black tracking-[0.3em] text-glow">
          ZCHESS
        </h1>
      </div>
      <p className="mt-2 text-xs md:text-sm text-text-secondary uppercase tracking-[0.2em] font-medium">
        Новое поколение шахмат онлайн
      </p>
    </motion.header>
  );
}
