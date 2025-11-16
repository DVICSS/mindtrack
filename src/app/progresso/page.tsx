"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TrendingUp, Calendar, Zap, Award, BarChart3 } from "lucide-react";

export default function ProgressoPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    diasAtivos: 0,
    treinosConcluidos: 0,
    xpTotal: 0,
    nivel: 1,
  });

  useEffect(() => {
    const currentUser = localStorage.getItem("mindtrack_current_user");
    if (!currentUser) {
      router.push("/login");
      return;
    }
    
    const userData = JSON.parse(currentUser);
    setUser(userData);

    // Calcular estatísticas
    const treinos = JSON.parse(localStorage.getItem("mindtrack_treinos") || "[]");
    const treinosConcluidos = treinos.filter((t: any) => 
      t.exercicios.every((e: any) => e.concluido)
    ).length;

    const diasAtivos = calcularDiasAtivos(treinos);
    const xpTotal = treinosConcluidos * 100;
    const nivel = Math.floor(xpTotal / 500) + 1;

    setStats({
      diasAtivos,
      treinosConcluidos,
      xpTotal,
      nivel,
    });

    setLoading(false);
  }, [router]);

  const calcularDiasAtivos = (treinos: any[]) => {
    const datas = treinos.map(t => new Date(t.criadoEm).toDateString());
    return new Set(datas).size;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00AEEF]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Seu Progresso</h1>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<Calendar className="w-6 h-6" />}
            label="Dias Ativos"
            value={stats.diasAtivos}
            color="blue"
          />
          <StatCard
            icon={<Zap className="w-6 h-6" />}
            label="Treinos Concluídos"
            value={stats.treinosConcluidos}
            color="blue"
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6" />}
            label="XP Total"
            value={stats.xpTotal}
            color="blue"
          />
          <StatCard
            icon={<Award className="w-6 h-6" />}
            label="Nível"
            value={stats.nivel}
            color="blue"
          />
        </div>

        {/* Gráfico de Progresso */}
        <div className="bg-[#111111] border border-[#00AEEF]/20 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-[#00AEEF]" />
            <h2 className="text-xl font-bold">Progresso Semanal</h2>
          </div>
          
          <div className="space-y-4">
            {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((dia, index) => {
              const progresso = Math.random() * 100; // Mock data
              return (
                <div key={dia}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">{dia}</span>
                    <span className="text-sm text-[#00AEEF] font-semibold">
                      {Math.round(progresso)}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-[#0A0A0A] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#00AEEF] to-[#0088CC] rounded-full transition-all duration-500"
                      style={{ width: `${progresso}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Melhorias */}
        <div className="bg-[#111111] border border-[#00AEEF]/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Suas Melhorias</h2>
          <div className="space-y-4">
            <MelhoriaItem
              titulo="Mira"
              antes="65%"
              depois="82%"
              melhoria="+17%"
            />
            <MelhoriaItem
              titulo="Movimentação"
              antes="58%"
              depois="74%"
              melhoria="+16%"
            />
            <MelhoriaItem
              titulo="Game Sense"
              antes="70%"
              depois="85%"
              melhoria="+15%"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: any) {
  return (
    <div className="bg-[#111111] border border-[#00AEEF]/20 rounded-xl p-4 hover:border-[#00AEEF]/50 transition-all duration-300">
      <div className="flex items-center gap-2 mb-2 text-[#00AEEF]">
        {icon}
      </div>
      <p className="text-2xl font-bold mb-1">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

function MelhoriaItem({ titulo, antes, depois, melhoria }: any) {
  return (
    <div className="p-4 bg-[#0A0A0A] rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">{titulo}</h3>
        <span className="text-sm text-green-400 font-semibold">{melhoria}</span>
      </div>
      <div className="flex items-center gap-4 text-sm text-gray-400">
        <span>Antes: {antes}</span>
        <span>→</span>
        <span className="text-[#00AEEF]">Agora: {depois}</span>
      </div>
    </div>
  );
}
