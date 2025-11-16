import { getUserData, setUserData, addXPHistory, canGainWeeklyXP, getRanking, resetWeeklyXP as resetWeeklyXPStorage } from './storage';
import { XP_REWARDS, calculateLevel } from './gamification';

export async function addXP(
  userId: string,
  actionType: 'watch_class' | 'daily_training' | 'complete_routine' | 'rank_up' | 'daily_login',
  description: string
): Promise<{ success: boolean; xpGained: number; leveledUp: boolean; newLevel?: number }> {
  try {
    // Buscar dados do usuário
    const userData = getUserData();
    
    if (!userData || userData.id !== userId) {
      return { success: false, xpGained: 0, leveledUp: false };
    }

    // Verificar limite semanal
    if (!canGainWeeklyXP(userId)) {
      return { success: false, xpGained: 0, leveledUp: false };
    }

    // Calcular XP ganho
    const xpGained = XP_REWARDS[actionType.toUpperCase().replace('_', '_') as keyof typeof XP_REWARDS];
    const oldLevel = calculateLevel(userData.xp).level;
    const newXP = userData.xp + xpGained;
    const newLevel = calculateLevel(newXP).level;
    const leveledUp = newLevel > oldLevel;

    // Atualizar dados do usuário
    const updated = setUserData({
      xp: newXP,
      level: newLevel,
      weekly_xp: userData.weekly_xp + xpGained,
    });

    if (!updated) {
      return { success: false, xpGained: 0, leveledUp: false };
    }

    // Registrar histórico
    addXPHistory({
      user_id: userId,
      xp_gained: xpGained,
      action_type: actionType,
      description,
    });

    return { success: true, xpGained, leveledUp, newLevel: leveledUp ? newLevel : undefined };
  } catch (error) {
    console.error('Erro ao adicionar XP:', error);
    return { success: false, xpGained: 0, leveledUp: false };
  }
}

export async function updateLoginStreak(userId: string): Promise<void> {
  try {
    const userData = getUserData();
    
    if (!userData || userData.id !== userId) return;

    const lastLogin = new Date(userData.last_login);
    const today = new Date();
    const diffDays = Math.floor((today.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24));

    let newStreak = userData.login_streak;
    if (diffDays === 1) {
      newStreak += 1;
      await addXP(userId, 'daily_login', 'Login diário consecutivo');
    } else if (diffDays > 1) {
      newStreak = 1;
    }

    setUserData({
      last_login: today.toISOString(),
      login_streak: newStreak,
    });
  } catch (error) {
    console.error('Erro ao atualizar streak:', error);
  }
}

export async function getWeeklyRanking(limit: number = 10) {
  try {
    return getRanking(limit);
  } catch (error) {
    console.error('Erro ao buscar ranking:', error);
    return [];
  }
}

export async function resetWeeklyXP(): Promise<void> {
  try {
    resetWeeklyXPStorage();
  } catch (error) {
    console.error('Erro ao resetar XP semanal:', error);
  }
}
