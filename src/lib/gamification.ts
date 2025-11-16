// Sistema de Gamificação - XP e Níveis

export const XP_REWARDS = {
  WATCH_CLASS: 10,
  DAILY_TRAINING: 15,
  COMPLETE_ROUTINE: 30,
  RANK_UP: 50,
  DAILY_LOGIN: 5,
} as const;

export const LEVELS = [
  { level: 1, name: 'Novato', minXP: 0, maxXP: 199, emoji: '⭐' },
  { level: 2, name: 'Competidor', minXP: 200, maxXP: 399, emoji: '🥈' },
  { level: 3, name: 'Avançado', minXP: 400, maxXP: 699, emoji: '🏆' },
  { level: 4, name: 'Elite', minXP: 700, maxXP: 999, emoji: '🔥' },
  { level: 5, name: 'Lenda', minXP: 1000, maxXP: Infinity, emoji: '👑' },
] as const;

export const WEEKLY_XP_LIMITS = {
  free: 200,
  pro: Infinity,
  premium: Infinity,
} as const;

export function calculateLevel(xp: number): { level: number; name: string; emoji: string; progress: number; nextLevelXP: number } {
  const currentLevel = LEVELS.find(l => xp >= l.minXP && xp <= l.maxXP) || LEVELS[LEVELS.length - 1];
  
  const progress = currentLevel.maxXP === Infinity 
    ? 100 
    : ((xp - currentLevel.minXP) / (currentLevel.maxXP - currentLevel.minXP + 1)) * 100;
  
  const nextLevelXP = currentLevel.maxXP === Infinity ? 0 : currentLevel.maxXP + 1;
  
  return {
    level: currentLevel.level,
    name: currentLevel.name,
    emoji: currentLevel.emoji,
    progress: Math.round(progress),
    nextLevelXP,
  };
}

export function canGainXP(weeklyXP: number, plan: 'free' | 'pro' | 'premium'): boolean {
  const limit = WEEKLY_XP_LIMITS[plan];
  return weeklyXP < limit;
}

export function getMotivationalMessage(): string {
  const messages = [
    '⚔️ "Mente afiada, mira precisa."',
    '🎯 "Cada treino te aproxima do topo."',
    '💪 "Consistência é a chave do sucesso."',
    '🔥 "Treine como um pro, jogue como um lenda."',
    '⚡ "Seu foco define seu elo."',
    '🧠 "Mentalidade vence partidas."',
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

export function getDailyFocus(): string {
  const focuses = ['Mira', 'Movimentação', 'Estratégia'];
  return focuses[Math.floor(Math.random() * focuses.length)];
}
