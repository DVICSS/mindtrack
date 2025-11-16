"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, isTrialExpired } from '@/lib/auth';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const user = getCurrentUser();

    // Não autenticado
    if (!user) {
      router.push('/login');
      return;
    }

    // Trial expirado
    if (isTrialExpired(user)) {
      const currentPath = window.location.pathname;
      // Permitir acesso apenas a planos e perfil
      if (!['/planos', '/perfil', '/login', '/cadastro'].includes(currentPath)) {
        router.push('/planos?expired=true');
      }
    }
  }, [router]);

  return <>{children}</>;
}
