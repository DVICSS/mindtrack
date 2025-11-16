"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { Zap, ChevronRight, Play, BookOpen } from "lucide-react";
import LogoutButton from "@/components/LogoutButton";

function DashboardContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Banner Principal */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#00AEEF]/20 to-[#000000] border border-[#00AEEF]/30 p-8 md:p-12 mb-8">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-glow">
              Bem-vindo ao MindTrack
            </h1>
            <p className="text-lg text-gray-300 mb-6">
              Olá, <span className="text-[#00AEEF] font-semibold">{user?.email}</span>
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/treinos"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#00AEEF] text-black font-bold rounded-full hover:bg-[#00AEEF]/90 transition-all duration-300 shadow-lg shadow-[#00AEEF]/50"
              >
                <Zap className="w-5 h-5" />
                Gerar Treino Personalizado
              </Link>
              <LogoutButton />
            </div>
          </div>
        </div>

        {/* Sugestão de Treino Diário */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#111111] border border-[#00AEEF]/20 rounded-2xl p-6 hover:border-[#00AEEF]/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#00AEEF]/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#00AEEF]" />
              </div>
              <h3 className="text-xl font-bold">Treino do Dia</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Treino focado em mira e controle de spray
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <ChevronRight className="w-4 h-4 text-[#00AEEF]" />
                Aim Lab - 15 minutos
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <ChevronRight className="w-4 h-4 text-[#00AEEF]" />
                Deathmatch - 20 minutos
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <ChevronRight className="w-4 h-4 text-[#00AEEF]" />
                Spray Control - 10 minutos
              </li>
            </ul>
            <Link
              href="/treinos"
              className="inline-flex items-center gap-2 text-[#00AEEF] hover:text-[#00AEEF]/80 transition-colors"
            >
              Iniciar treino
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Últimas Aulas Assistidas */}
          <div className="bg-[#111111] border border-[#00AEEF]/20 rounded-2xl p-6 hover:border-[#00AEEF]/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#00AEEF]/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-[#00AEEF]" />
              </div>
              <h3 className="text-xl font-bold">Continue Aprendendo</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-[#0A0A0A] rounded-lg hover:bg-[#151515] transition-colors cursor-pointer">
                <div className="w-16 h-12 bg-[#00AEEF]/10 rounded flex items-center justify-center">
                  <Play className="w-6 h-6 text-[#00AEEF]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Como melhorar sua mira</p>
                  <p className="text-xs text-gray-500">Categoria: Mira</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#0A0A0A] rounded-lg hover:bg-[#151515] transition-colors cursor-pointer">
                <div className="w-16 h-12 bg-[#00AEEF]/10 rounded flex items-center justify-center">
                  <Play className="w-6 h-6 text-[#00AEEF]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Movimentação avançada</p>
                  <p className="text-xs text-gray-500">Categoria: Movimentação</p>
                </div>
              </div>
            </div>
            <Link
              href="/aulas"
              className="inline-flex items-center gap-2 text-[#00AEEF] hover:text-[#00AEEF]/80 transition-colors mt-4"
            >
              Ver todas as aulas
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Cards de Acesso Rápido */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickAccessCard
            href="/progresso"
            icon="📊"
            title="Progresso"
            description="Veja sua evolução"
          />
          <QuickAccessCard
            href="/aulas"
            icon="🎓"
            title="Aulas"
            description="20 aulas disponíveis"
          />
          <QuickAccessCard
            href="/vods"
            icon="🎬"
            title="VODs"
            description="Análises de pros"
          />
          <QuickAccessCard
            href="/ranking"
            icon="🏆"
            title="Ranking"
            description="Veja sua posição"
          />
        </div>
      </div>
    </div>
  );
}

function QuickAccessCard({ href, icon, title, description }: { href: string; icon: string; title: string; description: string }) {
  return (
    <Link
      href={href}
      className="bg-[#111111] border border-[#00AEEF]/20 rounded-xl p-4 hover:border-[#00AEEF]/50 hover:bg-[#151515] transition-all duration-300 group"
    >
      <div className="text-3xl mb-2">{icon}</div>
      <h4 className="font-bold text-sm mb-1 group-hover:text-[#00AEEF] transition-colors">{title}</h4>
      <p className="text-xs text-gray-500">{description}</p>
    </Link>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
