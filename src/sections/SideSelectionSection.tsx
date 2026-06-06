import { useState } from 'react';
import { motion } from 'framer-motion';
import whiteKing from '../../assets/Image/1.png';
import blackKing from '../../assets/Image/11.png';
import swordsIcon from '../../assets/Image/Swords.png';

const SIDES = [
  { id: 'white' as const, label: 'Белые', icon: whiteKing },
  { id: 'black' as const, label: 'Чёрные', icon: blackKing },
  { id: 'random' as const, label: 'Случайно', icon: swordsIcon },
];

export function SideSelectionSection() {
  const [selected, setSelected] = useState<string>('white');

  return (
    <section className="px-2 py-4">
      <h3 className="section-title mb-4">Играй за</h3>
      <div className="flex gap-3">
        {SIDES.map((side) => (
          <motion.button
            key={side.id}
            type="button"
            onClick={() => setSelected(side.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex-1 glass-panel p-3 flex flex-col items-center gap-2 transition-all duration-300 ${
              selected === side.id ? 'shadow-neon border-accent-primary/50' : ''
            }`}
          >
            <img src={side.icon} alt={side.label} className="w-8 h-8 object-contain" loading="lazy" />
            <span className="text-[10px] uppercase tracking-wider font-bold">{side.label}</span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
