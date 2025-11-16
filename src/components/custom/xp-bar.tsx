"use client";

import { useEffect, useState } from 'react';
import { calculateLevel } from '@/lib/gamification';
import { Progress } from '@/components/ui/progress';

interface XPBarProps {
  xp: number;
  className?: string;
}

export function XPBar({ xp, className = '' }: XPBarProps) {
  const [mounted, setMounted] = useState(false);
  const levelInfo = calculateLevel(xp);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{levelInfo.emoji}</span>
          <span className="font-bold text-primary">
            Nível {levelInfo.level} - {levelInfo.name}
          </span>
        </div>
        <span className="text-muted-foreground">
          {xp} XP {levelInfo.nextLevelXP > 0 && `/ ${levelInfo.nextLevelXP} XP`}
        </span>
      </div>
      <Progress value={levelInfo.progress} className="h-3" />
    </div>
  );
}
