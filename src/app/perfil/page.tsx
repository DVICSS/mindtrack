"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Trophy, Calendar, TrendingUp, Star, LogOut, Edit } from 'lucide-react';
import { XPBar } from '@/components/custom/xp-bar';
import { getCurrentUser, signOut, getTrialDaysLeft } from '@/lib/auth';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setUser(currentUser);
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    signOut();
    router.push('/login');
  };

  const handleUpgrade = () => {
    router.push('/planos');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <User className="w-16 h-16 text-muted-foreground mx-auto" />
          <h2 className="text-2xl font-bold">Perfil não encontrado</h2>
          <p className="text-muted-foreground">Faça login para ver seu perfil</p>
        </div>
      </div>
    );
  }

  const trialDaysLeft = getTrialDaysLeft(user);
  const trialEndDate = new Date(user.trial_end).toLocaleDateString('pt-BR');

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 rounded-3xl p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-4xl font-bold glow-blue">
              {user.full_name.charAt(0).toUpperCase()}
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-3xl font-bold">{user.full_name}</h1>
                {user.plan === 'premium' && (
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold">
                    PREMIUM+
                  </span>
                )}
                {user.plan === 'pro' && (
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold">
                    PRO
                  </span>
                )}
              </div>
              <p className="text-muted-foreground">{user.email}</p>
              {user.city && user.state && (
                <p className="text-sm text-muted-foreground">
                  📍 {user.city}, {user.state}
                </p>
              )}
            </div>
          </div>

          {/* XP Bar */}
          <div className="mt-6">
            <XPBar xp={user.xp} />
          </div>
        </div>

        {/* Trial Info */}
        {user.plan === 'free' && (
          <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">Teste Gratuito</h3>
                <p className="text-sm text-muted-foreground">
                  {trialDaysLeft > 0 
                    ? `Termina em ${trialDaysLeft} dia${trialDaysLeft > 1 ? 's' : ''} (${trialEndDate})`
                    : 'Seu teste gratuito expirou'
                  }
                </p>
              </div>
              <Button
                onClick={handleUpgrade}
                className="bg-gradient-to-r from-primary to-secondary text-white font-bold"
              >
                Fazer Upgrade
              </Button>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={Trophy}
            label="XP Total"
            value={user.xp.toString()}
            color="text-primary"
          />
          <StatCard
            icon={Star}
            label="Nível Atual"
            value={user.level.toString()}
            color="text-yellow-500"
          />
          <StatCard
            icon={TrendingUp}
            label="XP Semanal"
            value={user.weekly_xp.toString()}
            color="text-green-500"
          />
          <StatCard
            icon={Calendar}
            label="Sequência de Login"
            value={`${user.login_streak} dias`}
            color="text-orange-500"
          />
        </div>

        {/* Additional Info */}
        <div className="bg-card border border-border/50 rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-bold">Informações da Conta</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Data de Criação</span>
              <span className="font-semibold">
                {new Date(user.created_at).toLocaleDateString('pt-BR')}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Último Login</span>
              <span className="font-semibold">
                {new Date(user.last_login).toLocaleDateString('pt-BR')}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Plano Atual</span>
              <span className="font-semibold capitalize">{user.plan}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground">Limite Semanal de XP</span>
              <span className="font-semibold">
                {user.plan === 'free' ? '200 XP' : 'Ilimitado'}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            disabled
            className="flex-1 flex items-center justify-center gap-2"
            variant="outline"
          >
            <Edit className="w-4 h-4" />
            Editar Perfil (em breve)
          </Button>
          {user.plan === 'free' && (
            <Button
              onClick={handleUpgrade}
              className="flex-1 bg-gradient-to-r from-primary to-secondary text-white font-bold"
            >
              Fazer Upgrade
            </Button>
          )}
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="flex-1 flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) {
  return (
    <div className="bg-card border border-border/50 rounded-2xl p-6 text-center space-y-3">
      <Icon className={`w-8 h-8 mx-auto ${color}`} />
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
