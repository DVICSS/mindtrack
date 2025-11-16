'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getCurrentUser, updatePlan, getTrialDaysLeft } from '@/lib/auth';
import { Star, Check, Zap, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PlanosClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const expired = searchParams.get('expired');
  const source = searchParams.get('source') || 'app';
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

  const handleUpgrade = (plan: 'pro' | 'premium') => {
    if (!user) return;
    updatePlan(user.id, plan);
    alert(`Plano ${plan.toUpperCase()} ativado com sucesso!`);
    router.push('/aulas');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  const trialDaysLeft = user ? getTrialDaysLeft(user) : 0;

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          {expired && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 mb-6">
              <p className="font-semibold">⚠️ Seu teste gratuito terminou</p>
              <p className="text-sm">Escolha um plano para continuar treinando</p>
            </div>
          )}

          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Escolha seu Plano
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Evolua seu jogo com treinos personalizados e análise de IA
          </p>

          {user?.plan === 'free' && trialDaysLeft > 0 && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary">
              <Zap className="w-4 h-4" />
              Dias restantes do seu teste: {trialDaysLeft}
            </div>
          )}
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Free Plan */}
          <div className="p-8 rounded-2xl bg-card border border-border/50 space-y-6">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Gratuito</h3>
              <p className="text-3xl font-bold">R$ 0</p>
              <p className="text-sm text-muted-foreground">Teste de 7 dias</p>
            </div>

            <ul className="space-y-3">
              <Feature text="Acesso às categorias Mira e Mindset" />
              <Feature text="20 aulas públicas" />
              <Feature text="Chat IA básico" />
              <Feature text="Limite de 200 XP por semana" />
              <Feature text="Sem análise de VODs" disabled />
              <Feature text="Sem treinos personalizados" disabled />
            </ul>

            <Button
              disabled={user?.plan === 'free'}
              className="w-full"
              variant="outline"
            >
              {user?.plan === 'free' ? 'Plano Atual' : 'Plano Gratuito'}
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary space-y-6 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold">
              Mais Popular
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-blue">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Pro</h3>
              <p className="text-3xl font-bold">R$ 29,90</p>
              <p className="text-sm text-muted-foreground">por mês</p>
            </div>

            <ul className="space-y-3">
              <Feature text="Todas as aulas e VODs" />
              <Feature text="Chat IA avançado" />
              <Feature text="Análise de VODs ilimitada" />
              <Feature text="XP ilimitado" />
              <Feature text="Ranking global" />
              <Feature text="Treinos personalizados" />
            </ul>

            <Button
              onClick={() => handleUpgrade('pro')}
              disabled={user?.plan === 'pro' || user?.plan === 'premium'}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold"
            >
              {user?.plan === 'pro' ? 'Plano Atual' : 'Assinar Pro'}
            </Button>
          </div>

          {/* Premium Plan */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500 space-y-6">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Premium+</h3>
              <p className="text-3xl font-bold">R$ 59,90</p>
              <p className="text-sm text-muted-foreground">por mês</p>
            </div>

            <ul className="space-y-3">
              <Feature text="Tudo do Pro" />
              <Feature text="IA avançada com análise profunda" />
              <Feature text="Treinos personalizados diários" />
              <Feature text="Coach humano (1x por semana)" />
              <Feature text="Prioridade no suporte" />
              <Feature text="Selo Premium+ no ranking" />
            </ul>

            <Button
              onClick={() => handleUpgrade('premium')}
              disabled={user?.plan === 'premium'}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold"
            >
              {user?.plan === 'premium' ? 'Plano Atual' : 'Assinar Premium+'}
            </Button>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl font-bold text-center">Perguntas Frequentes</h2>
          <div className="space-y-3">
            <FAQItem
              question="Posso cancelar a qualquer momento?"
              answer="Sim! Você pode cancelar seu plano quando quiser, sem multas ou taxas."
            />
            <FAQItem
              question="O que acontece quando o teste gratuito termina?"
              answer="Após 7 dias, você precisará escolher um plano pago para continuar acessando o conteúdo."
            />
            <FAQItem
              question="Posso fazer upgrade do meu plano?"
              answer="Sim! Você pode fazer upgrade a qualquer momento e pagar apenas a diferença proporcional."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ text, disabled = false }: { text: string; disabled?: boolean }) {
  return (
    <li className={`flex items-start gap-2 ${disabled ? 'opacity-50' : ''}`}>
      <Check className={`w-5 h-5 flex-shrink-0 ${disabled ? 'text-muted-foreground' : 'text-primary'}`} />
      <span className="text-sm">{text}</span>
    </li>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="p-4 rounded-lg bg-card border border-border/50">
      <h3 className="font-semibold mb-2">{question}</h3>
      <p className="text-sm text-muted-foreground">{answer}</p>
    </div>
  );
}
