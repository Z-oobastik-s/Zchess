import { motion } from 'framer-motion';

export function FooterSection() {
  return (
    <footer className="relative z-10 px-4 py-10 md:py-14 border-t border-white/5">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent-primary" />
          <span className="font-display text-xs uppercase tracking-[0.3em] text-accent-glow">
            ZChess
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent-primary" />
        </motion.div>

        <p className="font-hero text-xl md:text-2xl lg:text-3xl text-glow tracking-wide">
          Это не игра. Это твоя легенда.
        </p>

        <p className="mt-4 text-sm text-text-secondary">
          © {new Date().getFullYear()} ZChess. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
