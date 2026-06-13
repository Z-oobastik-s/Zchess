import { motion } from 'framer-motion';

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-20 flex flex-col items-center pt-6 md:pt-8 xl:pt-3 xl:pb-1 px-4 shrink-0"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center shadow-neon-sm">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
            <path d="M12 2L14 8H20L15 12L17 18L12 15L7 18L9 12L4 8H10L12 2Z" />
          </svg>
        </div>
        <h1 className="font-display text-2xl md:text-3xl xl:text-2xl font-black tracking-[0.3em] text-glow">
          ZCHESS
        </h1>
      </div>
      <p className="mt-2 xl:mt-1 text-xs md:text-sm xl:text-[10px] text-text-secondary uppercase tracking-[0.2em] font-medium">
        Новое поколение шахмат онлайн
      </p>
    </motion.header>
  );
}
