"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function HomePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // Usuário logado - redirecionar para dashboard
        router.push("/dashboard");
      } else {
        // Usuário não logado - redirecionar para login
        router.push("/login");
      }
    }
  }, [user, loading, router]);

  // Mostrar loading enquanto verifica autenticação
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00AEEF] mx-auto mb-4"></div>
        <p className="text-gray-400">Carregando...</p>
      </div>
    </div>
  );
}
