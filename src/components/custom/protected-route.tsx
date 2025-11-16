"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Lock } from "lucide-react";

// Mock user - em produção, isso viria de um contexto de autenticação
const MOCK_USER = {
  id: "user_123",
  email: "usuario@exemplo.com",
  name: "Usuário Teste",
  plan: "FREE" as const,
  status: "trialing" as const,
  trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  createdAt: new Date().toISOString(),
};

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPlan: 'PRO' | 'PREMIUM';
}

export function ProtectedRoute({ children, requiredPlan }: ProtectedRouteProps) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = () => {
    // Simular verificação de autenticação
    const user = MOCK_USER;

    // Se não está logado
    if (!user) {
      router.push('/login?redirect=' + encodeURIComponent(window.location.pathname));
      return;
    }

    // Verificar se trial expirou
    const isTrialExpired = user.trialEndsAt 
      ? new Date(user.trialEndsAt) < new Date() 
      : false;

    // Se está em trial e não expirou, permite acesso
    if (user.status === 'trialing' && !isTrialExpired) {
      setHasAccess(true);
      setIsChecking(false);
      return;
    }

    // Verificar plano
    if (requiredPlan === 'PRO') {
      // Permite PRO ou PREMIUM
      if (user.plan === 'PRO' || user.plan === 'PREMIUM') {
        setHasAccess(true);
        setIsChecking(false);
        return;
      }
    }

    if (requiredPlan === 'PREMIUM') {
      // Permite apenas PREMIUM
      if (user.plan === 'PREMIUM') {
        setHasAccess(true);
        setIsChecking(false);
        return;
      }
    }

    // Caso contrário, redireciona para assinaturas
    router.push('/assinaturas?bloqueado=1');
  };

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Shield className="w-12 h-12 text-primary mx-auto animate-pulse" />
          <p className="text-muted-foreground">Verificando acesso...</p>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md text-center space-y-4">
          <Lock className="w-16 h-16 text-muted-foreground mx-auto" />
          <h2 className="text-2xl font-bold">Acesso Restrito</h2>
          <p className="text-muted-foreground">
            Você não tem permissão para acessar este conteúdo.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
