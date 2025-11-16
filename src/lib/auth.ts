"use client";

// Sistema de autenticação local (Local Storage)

export interface User {
  id: string;
  full_name: string;
  email: string;
  password_hash: string;
  address?: string;
  city?: string;
  state?: string;
  plan: "free" | "pro" | "premium";
  trial_start: string;
  trial_end: string;
  created_at: string;
  xp: number;
  level: number;
  weekly_xp: number;
  login_streak: number;
  last_login: string;
}

export interface Session {
  is_authenticated: boolean;
  user_id: string | null;
}

export interface PasswordReset {
  email: string;
  code: string;
  expires_at: string;
  attempts: number;
  cooldown_until?: string;
}

// Hash simples (SHA-256 via Web Crypto API)
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Gerar UUID simples
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Obter usuários do localStorage
function getUsers(): User[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('mindtrack_users');
  return data ? JSON.parse(data) : [];
}

// Salvar usuários no localStorage
function saveUsers(users: User[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('mindtrack_users', JSON.stringify(users));
}

// Obter sessão
export function getSession(): Session {
  if (typeof window === 'undefined') return { is_authenticated: false, user_id: null };
  const data = localStorage.getItem('mindtrack_session');
  return data ? JSON.parse(data) : { is_authenticated: false, user_id: null };
}

// Salvar sessão
function saveSession(session: Session): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('mindtrack_session', JSON.stringify(session));
}

// Obter password resets
function getPasswordResets(): PasswordReset[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('mindtrack_password_resets');
  return data ? JSON.parse(data) : [];
}

// Salvar password resets
function savePasswordResets(resets: PasswordReset[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('mindtrack_password_resets', JSON.stringify(resets));
}

// Criar conta
export async function signUp(data: {
  full_name: string;
  email: string;
  password: string;
  address?: string;
  city?: string;
  state?: string;
}): Promise<{ user: User | null; error: string | null }> {
  const users = getUsers();
  const emailLower = data.email.toLowerCase();

  // Verificar e-mail único
  if (users.find(u => u.email === emailLower)) {
    return { user: null, error: 'E-mail já cadastrado' };
  }

  // Validar senha
  if (data.password.length < 8) {
    return { user: null, error: 'Senha deve ter no mínimo 8 caracteres' };
  }
  if (!/\d/.test(data.password)) {
    return { user: null, error: 'Senha deve conter pelo menos 1 número' };
  }
  if (!/[a-zA-Z]/.test(data.password)) {
    return { user: null, error: 'Senha deve conter pelo menos 1 letra' };
  }

  const password_hash = await hashPassword(data.password);
  const now = new Date();
  const trial_end = new Date(now);
  trial_end.setDate(trial_end.getDate() + 7);

  const newUser: User = {
    id: generateUUID(),
    full_name: data.full_name,
    email: emailLower,
    password_hash,
    address: data.address,
    city: data.city,
    state: data.state,
    plan: 'free',
    trial_start: now.toISOString(),
    trial_end: trial_end.toISOString(),
    created_at: now.toISOString(),
    xp: 0,
    level: 1,
    weekly_xp: 0,
    login_streak: 1,
    last_login: now.toISOString(),
  };

  users.push(newUser);
  saveUsers(users);

  // Auto-login
  saveSession({ is_authenticated: true, user_id: newUser.id });

  return { user: newUser, error: null };
}

// Login
export async function signIn(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
  const users = getUsers();
  const emailLower = email.toLowerCase();
  const password_hash = await hashPassword(password);

  const user = users.find(u => u.email === emailLower && u.password_hash === password_hash);

  if (!user) {
    return { user: null, error: 'E-mail ou senha incorretos' };
  }

  // Atualizar last_login e streak
  const now = new Date();
  const lastLogin = new Date(user.last_login);
  const diffDays = Math.floor((now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    user.login_streak += 1;
  } else if (diffDays > 1) {
    user.login_streak = 1;
  }

  user.last_login = now.toISOString();
  saveUsers(users);

  saveSession({ is_authenticated: true, user_id: user.id });

  return { user, error: null };
}

// Logout
export function signOut(): void {
  saveSession({ is_authenticated: false, user_id: null });
}

// Obter usuário atual
export function getCurrentUser(): User | null {
  const session = getSession();
  if (!session.is_authenticated || !session.user_id) return null;

  const users = getUsers();
  return users.find(u => u.id === session.user_id) || null;
}

// Atualizar plano
export function updatePlan(userId: string, plan: "free" | "pro" | "premium"): void {
  const users = getUsers();
  const user = users.find(u => u.id === userId);
  if (user) {
    user.plan = plan;
    saveUsers(users);
  }
}

// Solicitar código de recuperação
export function requestPasswordReset(email: string): { code: string | null; error: string | null; cooldown?: number } {
  const users = getUsers();
  const emailLower = email.toLowerCase();

  if (!users.find(u => u.email === emailLower)) {
    return { code: null, error: 'Usuário não encontrado' };
  }

  const resets = getPasswordResets();
  const existing = resets.find(r => r.email === emailLower);

  // Rate-limit
  if (existing?.cooldown_until) {
    const cooldownDate = new Date(existing.cooldown_until);
    const now = new Date();
    if (cooldownDate > now) {
      const secondsLeft = Math.ceil((cooldownDate.getTime() - now.getTime()) / 1000);
      return { code: null, error: `Aguarde ${secondsLeft} segundos para solicitar novo código`, cooldown: secondsLeft };
    }
  }

  // Gerar código de 6 dígitos
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const now = new Date();
  const expires_at = new Date(now);
  expires_at.setMinutes(expires_at.getMinutes() + 15);
  const cooldown_until = new Date(now);
  cooldown_until.setSeconds(cooldown_until.getSeconds() + 60);

  const newReset: PasswordReset = {
    email: emailLower,
    code,
    expires_at: expires_at.toISOString(),
    attempts: 0,
    cooldown_until: cooldown_until.toISOString(),
  };

  // Remover reset antigo e adicionar novo
  const filteredResets = resets.filter(r => r.email !== emailLower);
  filteredResets.push(newReset);
  savePasswordResets(filteredResets);

  return { code, error: null };
}

// Verificar código e redefinir senha
export async function resetPassword(email: string, code: string, newPassword: string): Promise<{ success: boolean; error: string | null }> {
  const resets = getPasswordResets();
  const emailLower = email.toLowerCase();
  const reset = resets.find(r => r.email === emailLower);

  if (!reset) {
    return { success: false, error: 'Código inválido' };
  }

  // Verificar expiração
  const now = new Date();
  const expiresAt = new Date(reset.expires_at);
  if (now > expiresAt) {
    return { success: false, error: 'Código expirado' };
  }

  // Verificar tentativas
  if (reset.attempts >= 5) {
    return { success: false, error: 'Número máximo de tentativas excedido' };
  }

  // Verificar código
  if (reset.code !== code) {
    reset.attempts += 1;
    savePasswordResets(resets);
    return { success: false, error: 'Código incorreto' };
  }

  // Validar nova senha
  if (newPassword.length < 8) {
    return { success: false, error: 'Senha deve ter no mínimo 8 caracteres' };
  }
  if (!/\d/.test(newPassword)) {
    return { success: false, error: 'Senha deve conter pelo menos 1 número' };
  }
  if (!/[a-zA-Z]/.test(newPassword)) {
    return { success: false, error: 'Senha deve conter pelo menos 1 letra' };
  }

  // Atualizar senha
  const users = getUsers();
  const user = users.find(u => u.email === emailLower);
  if (!user) {
    return { success: false, error: 'Usuário não encontrado' };
  }

  user.password_hash = await hashPassword(newPassword);
  saveUsers(users);

  // Remover reset
  const filteredResets = resets.filter(r => r.email !== emailLower);
  savePasswordResets(filteredResets);

  return { success: true, error: null };
}

// Verificar se trial expirou
export function isTrialExpired(user: User): boolean {
  if (user.plan !== 'free') return false;
  const now = new Date();
  const trialEnd = new Date(user.trial_end);
  return now > trialEnd;
}

// Calcular dias restantes do trial
export function getTrialDaysLeft(user: User): number {
  if (user.plan !== 'free') return 0;
  const now = new Date();
  const trialEnd = new Date(user.trial_end);
  const diffTime = trialEnd.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}
