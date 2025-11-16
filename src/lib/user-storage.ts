import fs from 'fs';
import path from 'path';

export type UserPlan = 'FREE' | 'PRO' | 'PREMIUM';
export type UserStatus = 'free' | 'trialing' | 'active';

export interface User {
  id: string;
  email: string;
  name: string;
  plan: UserPlan;
  status: UserStatus;
  trialEndsAt?: string;
  createdAt: string;
}

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');

// Garantir que o arquivo existe
function ensureUsersFile() {
  const dir = path.dirname(USERS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
  }
}

// Ler todos os usuários
export function getAllUsers(): User[] {
  ensureUsersFile();
  const data = fs.readFileSync(USERS_FILE, 'utf-8');
  return JSON.parse(data);
}

// Salvar todos os usuários
function saveUsers(users: User[]) {
  ensureUsersFile();
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Buscar usuário por ID
export function getUserById(userId: string): User | null {
  const users = getAllUsers();
  return users.find(u => u.id === userId) || null;
}

// Buscar usuário por email
export function getUserByEmail(email: string): User | null {
  const users = getAllUsers();
  return users.find(u => u.email === email) || null;
}

// Criar novo usuário com trial de 7 dias
export function createUser(email: string, name: string): User {
  const users = getAllUsers();
  
  const trialEndsAt = new Date();
  trialEndsAt.setDate(trialEndsAt.getDate() + 7);
  
  const newUser: User = {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    email,
    name,
    plan: 'FREE',
    status: 'trialing',
    trialEndsAt: trialEndsAt.toISOString(),
    createdAt: new Date().toISOString(),
  };
  
  users.push(newUser);
  saveUsers(users);
  
  return newUser;
}

// Atualizar plano do usuário
export function updateUserPlan(userId: string, newPlan: UserPlan): User | null {
  const users = getAllUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) return null;
  
  users[userIndex].plan = newPlan;
  users[userIndex].status = 'active';
  
  saveUsers(users);
  
  return users[userIndex];
}

// Atualizar usuário
export function updateUser(userId: string, updates: Partial<User>): User | null {
  const users = getAllUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) return null;
  
  users[userIndex] = { ...users[userIndex], ...updates };
  saveUsers(users);
  
  return users[userIndex];
}

// Verificar se trial expirou
export function isTrialExpired(user: User): boolean {
  if (!user.trialEndsAt) return false;
  return new Date(user.trialEndsAt) < new Date();
}
