import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const start = performance.now();
    const animationFrame = requestAnimationFrame(function updateProgress(now) {
      const nextProgress = Math.min(((now - start) / 250) * 100, 100);
      setProgress(nextProgress);
      if (nextProgress < 100) requestAnimationFrame(updateProgress);
    });
    const timeout = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 300);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-navy-900"
        >
          {/* Orbital Spinner */}
          <div className="relative w-20 h-20 mb-8">
            <div className="loader-ring absolute inset-0" />
            <div
              className="absolute inset-2 rounded-full border-2 border-transparent"
              style={{
                borderTopColor: '#8b5cf6',
                borderLeftColor: '#06b6d4',
                animation: 'loader-spin 1.2s ease-in-out infinite reverse',
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-mono font-bold gradient-text">
                {Math.min(Math.round(progress), 100)}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-48 h-1 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #06b6d4, #8b5cf6)',
              }}
              initial={{ width: '0%' }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>

          <p className="mt-4 text-xs text-slate-500 font-mono tracking-widest uppercase">
            Loading Experience
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
