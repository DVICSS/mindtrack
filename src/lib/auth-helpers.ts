import { User, UserPlan, isTrialExpired } from './user-storage';

export interface AuthResult {
  allowed: boolean;
  redirectTo?: string;
  reason?: string;
}

/**
 * Verifica se o usuário tem permissão para acessar um recurso baseado no plano
 * @param user - Usuário atual (null se não logado)
 * @param requiredPlan - Plano mínimo necessário ('PRO' ou 'PREMIUM')
 * @returns Resultado da verificação com redirecionamento se necessário
 */
export function requirePlan(user: User | null, requiredPlan: UserPlan): AuthResult {
  // Se não está logado, redireciona para login
  if (!user) {
    return {
      allowed: false,
      redirectTo: '/login?redirect=' + encodeURIComponent(typeof window !== 'undefined' ? window.location.pathname : ''),
      reason: 'not_logged_in',
    };
  }

  // Se está em trial e não expirou, permite acesso
  if (user.status === 'trialing' && !isTrialExpired(user)) {
    return { allowed: true };
  }

  // Se o plano requerido é PRO
  if (requiredPlan === 'PRO') {
    // Permite PRO ou PREMIUM
    if (user.plan === 'PRO' || user.plan === 'PREMIUM') {
      return { allowed: true };
    }
  }

  // Se o plano requerido é PREMIUM
  if (requiredPlan === 'PREMIUM') {
    // Permite apenas PREMIUM
    if (user.plan === 'PREMIUM') {
      return { allowed: true };
    }
  }

  // Caso contrário, redireciona para assinaturas
  return {
    allowed: false,
    redirectTo: '/assinaturas?bloqueado=1',
    reason: 'insufficient_plan',
  };
}

/**
 * Verifica se o usuário pode acessar conteúdo PRO
 */
export function canAccessPro(user: User | null): boolean {
  return requirePlan(user, 'PRO').allowed;
}

/**
 * Verifica se o usuário pode acessar conteúdo PREMIUM
 */
export function canAccessPremium(user: User | null): boolean {
  return requirePlan(user, 'PREMIUM').allowed;
}

/**
 * Retorna o nome amigável do plano
 */
export function getPlanDisplayName(plan: UserPlan): string {
  const names: Record<UserPlan, string> = {
    FREE: 'Gratuito',
    PRO: 'PRO',
    PREMIUM: 'PREMIUM',
  };
  return names[plan];
}

/**
 * Retorna o status amigável do usuário
 */
export function getStatusDisplayName(user: User): string {
  if (user.status === 'trialing') {
    if (isTrialExpired(user)) {
      return 'Trial Expirado';
    }
    const daysLeft = Math.ceil(
      (new Date(user.trialEndsAt!).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    return `Trial (${daysLeft} dias restantes)`;
  }
  
  if (user.status === 'active') {
    return 'Ativo';
  }
  
  return 'Gratuito';
}
