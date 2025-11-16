"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Sparkles } from 'lucide-react';
import { calculateLevel } from '@/lib/gamification';

interface LevelUpModalProps {
  show: boolean;
  newLevel: number;
  onClose: () => void;
}

export function LevelUpModal({ show, newLevel, onClose }: LevelUpModalProps) {
  const levelInfo = calculateLevel((newLevel - 1) * 200); // Aproximação

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative p-12 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary text-center space-y-6 max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-6 -right-6"
            >
              <Sparkles className="w-12 h-12 text-primary" />
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Trophy className="w-24 h-24 mx-auto text-primary glow-blue" />
            </motion.div>

            <div className="space-y-2">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                🆙 LEVEL UP!
              </h2>
              <p className="text-2xl font-bold text-foreground">
                Você alcançou o Nível {newLevel}!
              </p>
              <p className="text-xl text-primary font-semibold">
                {levelInfo.emoji} {levelInfo.name}
              </p>
            </div>

            <p className="text-muted-foreground">
              Continue treinando e desbloqueie novas recompensas!
            </p>

            <button
              onClick={onClose}
              className="px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-full text-white font-bold hover:shadow-xl transition-all"
            >
              Continuar Treinando
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
