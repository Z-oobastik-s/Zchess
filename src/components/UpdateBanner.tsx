import { motion, AnimatePresence } from 'framer-motion';

interface UpdateBannerProps {
  visible: boolean;
  updating: boolean;
  onUpdate: () => void;
}

export function UpdateBanner({ visible, updating, onUpdate }: UpdateBannerProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] glass-panel px-6 py-4 flex items-center gap-4 shadow-neon-lg"
        >
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-accent-secondary animate-pulse" />
            <span className="text-sm text-text-primary font-medium">
              Доступна новая версия ZChess
            </span>
          </div>
          <button
            onClick={onUpdate}
            disabled={updating}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-accent-primary to-accent-secondary text-white text-xs font-bold uppercase tracking-wider hover:shadow-neon transition-shadow disabled:opacity-50"
          >
            {updating ? 'Обновление...' : 'Обновить'}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
