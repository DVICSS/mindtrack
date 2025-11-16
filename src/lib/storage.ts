"use client";

// Sistema de armazenamento local para MINDTRACK
// Substitui completamente o Supabase

import type { User } from './auth';

// ============================================
// INTERFACES
// ============================================

export interface UserData {
  id: string;
  full_name: string;
  email: string;
  xp: number;
  level: number;
  weekly_xp: number;
  login_streak: number;
  last_login: string;
  plan: 'free' | 'pro' | 'premium';
  elo?: string;
  agent?: string;
  avatar_url?: string;
}

export interface XPHistory {
  id: string;
  user_id: string;
  xp_gained: number;
  action_type: 'watch_class' | 'daily_training' | 'complete_routine' | 'rank_up' | 'daily_login';
  description: string;
  created_at: string;
}

export interface RankingEntry {
  user_id: string;
  name: string;
  avatar_url?: string;
  level: number;
  elo?: string;
  weekly_xp: number;
  plan: string;
  rank_position: number;
}

// ============================================
// FUNÇÕES DE ARMAZENAMENTO LOCAL
// ============================================

// Verificar se está no navegador
function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

// Gerar UUID simples
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// ============================================
// USUÁRIOS
// ============================================

export function getUserData(): UserData | null {
  if (!isBrowser()) return null;
  
  const session = localStorage.getItem('mindtrack_session');
  if (!session) return null;
  
  const { user_id } = JSON.parse(session);
  if (!user_id) return null;
  
  const users = localStorage.getItem('mindtrack_users');
  if (!users) return null;
  
  const usersList: User[] = JSON.parse(users);
  const user = usersList.find(u => u.id === user_id);
  
  if (!user) return null;
  
  return {
    id: user.id,
    full_name: user.full_name,
    email: user.email,
    xp: user.xp,
    level: user.level,
    weekly_xp: user.weekly_xp,
    login_streak: user.login_streak,
    last_login: user.last_login,
    plan: user.plan,
  };
}

export function setUserData(data: Partial<UserData>): boolean {
  if (!isBrowser()) return false;
  
  const session = localStorage.getItem('mindtrack_session');
  if (!session) return false;
  
  const { user_id } = JSON.parse(session);
  if (!user_id) return false;
  
  const users = localStorage.getItem('mindtrack_users');
  if (!users) return false;
  
  const usersList: User[] = JSON.parse(users);
  const userIndex = usersList.findIndex(u => u.id === user_id);
  
  if (userIndex === -1) return false;
  
  // Atualizar dados do usuário
  usersList[userIndex] = {
    ...usersList[userIndex],
    ...data,
  };
  
  localStorage.setItem('mindtrack_users', JSON.stringify(usersList));
  return true;
}

// ============================================
// RANKING
// ============================================

export function getRanking(limit: number = 10): RankingEntry[] {
  if (!isBrowser()) return [];
  
  const users = localStorage.getItem('mindtrack_users');
  if (!users) return [];
  
  const usersList: User[] = JSON.parse(users);
  
  // Ordenar por weekly_xp (decrescente)
  const sorted = [...usersList]
    .sort((a, b) => b.weekly_xp - a.weekly_xp)
    .slice(0, limit);
  
  // Mapear para formato de ranking
  return sorted.map((user, index) => ({
    user_id: user.id,
    name: user.full_name,
    avatar_url: undefined,
    level: user.level,
    elo: undefined,
    weekly_xp: user.weekly_xp,
    plan: user.plan,
    rank_position: index + 1,
  }));
}

export function updateRanking(newData: Partial<UserData>): boolean {
  return setUserData(newData);
}

// ============================================
// PROGRESSO E XP
// ============================================

export function saveProgress(userId: string, xp: number, aulasConcluidas?: number): boolean {
  if (!isBrowser()) return false;
  
  const users = localStorage.getItem('mindtrack_users');
  if (!users) return false;
  
  const usersList: User[] = JSON.parse(users);
  const userIndex = usersList.findIndex(u => u.id === userId);
  
  if (userIndex === -1) return false;
  
  // Atualizar XP e nível
  usersList[userIndex].xp = xp;
  
  // Calcular nível baseado no XP
  let level = 1;
  if (xp >= 1000) level = 5;
  else if (xp >= 700) level = 4;
  else if (xp >= 400) level = 3;
  else if (xp >= 200) level = 2;
  
  usersList[userIndex].level = level;
  
  localStorage.setItem('mindtrack_users', JSON.stringify(usersList));
  return true;
}

// ============================================
// HISTÓRICO DE XP
// ============================================

export function getXPHistory(userId: string): XPHistory[] {
  if (!isBrowser()) return [];
  
  const history = localStorage.getItem('mindtrack_xp_history');
  if (!history) return [];
  
  const historyList: XPHistory[] = JSON.parse(history);
  return historyList.filter(h => h.user_id === userId);
}

export function addXPHistory(entry: Omit<XPHistory, 'id' | 'created_at'>): boolean {
  if (!isBrowser()) return false;
  
  const history = localStorage.getItem('mindtrack_xp_history');
  const historyList: XPHistory[] = history ? JSON.parse(history) : [];
  
  const newEntry: XPHistory = {
    ...entry,
    id: generateUUID(),
    created_at: new Date().toISOString(),
  };
  
  historyList.push(newEntry);
  localStorage.setItem('mindtrack_xp_history', JSON.stringify(historyList));
  
  return true;
}

// ============================================
// RESET SEMANAL
// ============================================

export function resetWeeklyXP(): boolean {
  if (!isBrowser()) return false;
  
  const users = localStorage.getItem('mindtrack_users');
  if (!users) return false;
  
  const usersList: User[] = JSON.parse(users);
  
  // Resetar weekly_xp de todos os usuários
  usersList.forEach(user => {
    user.weekly_xp = 0;
  });
  
  localStorage.setItem('mindtrack_users', JSON.stringify(usersList));
  return true;
}

// ============================================
// VERIFICAÇÃO DE LIMITES
// ============================================

export function canGainWeeklyXP(userId: string): boolean {
  if (!isBrowser()) return false;
  
  const users = localStorage.getItem('mindtrack_users');
  if (!users) return false;
  
  const usersList: User[] = JSON.parse(users);
  const user = usersList.find(u => u.id === userId);
  
  if (!user) return false;
  
  // Usuários free têm limite de 200 XP por semana
  if (user.plan === 'free' && user.weekly_xp >= 200) {
    return false;
  }
  
  return true;
}

// ============================================
// ESTATÍSTICAS
// ============================================

export function getUserStats(userId: string) {
  if (!isBrowser()) return null;
  
  const users = localStorage.getItem('mindtrack_users');
  if (!users) return null;
  
  const usersList: User[] = JSON.parse(users);
  const user = usersList.find(u => u.id === userId);
  
  if (!user) return null;
  
  const history = getXPHistory(userId);
  
  return {
    total_xp: user.xp,
    weekly_xp: user.weekly_xp,
    level: user.level,
    login_streak: user.login_streak,
    total_actions: history.length,
    classes_watched: history.filter(h => h.action_type === 'watch_class').length,
    trainings_completed: history.filter(h => h.action_type === 'daily_training').length,
    routines_completed: history.filter(h => h.action_type === 'complete_routine').length,
  };
}

// ============================================
// MODO OFFLINE
// ============================================

export function isOnline(): boolean {
  if (!isBrowser()) return false;
  return navigator.onLine;
}

export function getOfflineMessage(): string {
  return "📶 Modo offline: ranking local carregado.";
}
