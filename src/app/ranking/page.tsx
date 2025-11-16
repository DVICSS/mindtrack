"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Trophy, Medal, Award, TrendingUp } from "lucide-react";

const MOCK_RANKING = [
  { posicao: 1, nome: "ProPlayer123", xp: 15000, nivel: 30 },
  { posicao: 2, nome: "GamerPro", xp: 12500, nivel: 25 },
  { posicao: 3, nome: "Radiant_King", xp: 11000, nivel: 22 },
  { posicao: 4, nome: "Immortal_Ace", xp: 9500, nivel: 19 },
  { posicao: 5, nome: "DiamondPlayer", xp: 8000, nivel: 16 },
  { posicao: 6, nome: "PlatinumStar", xp: 7200, nivel: 14 },
  { posicao: 7, nome: "GoldRush", xp: 6500, nivel: 13 },
  { posicao: 8, nome: "SilverBullet", xp: 5800, nivel: 11 },
  { posicao: 9, nome: "BronzeWarrior", xp: 5000, nivel: 10 },
  { posicao: 10, nome: "IronGiant", xp: 4500, nivel: 9 },
];

export default function RankingPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState({ xp: 0, nivel: 1, posicao: 0 });

  useEffect(() => {
    const currentUser = localStorage.getItem("mindtrack_current_user");
    if (!currentUser) {
      router.push("/login");
      return;
    }
    
    const userData = JSON.parse(currentUser);
    setUser(userData);

    // Calcular XP e nível do usuário
    const treinos = JSON.parse(localStorage.getItem("mindtrack_treinos") || "[]");
    const treinosConcluidos = treinos.filter((t: any) => 
      t.exercicios.every((e: any) => e.concluido)
    ).length;

    const xp = treinosConcluidos * 100;
    const nivel = Math.floor(xp / 500) + 1;
    const posicao = MOCK_RANKING.length + 1;

    setUserStats({ xp, nivel, posicao });
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00AEEF]"></div>
      </div>
    );
  }

  const getMedalIcon = (posicao: number) => {
    if (posicao === 1) return <Trophy className="w-6 h-6 text-yellow-400" />;
    if (posicao === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (posicao === 3) return <Medal className="w-6 h-6 text-orange-600" />;
    return <Award className="w-6 h-6 text-[#00AEEF]" />;
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">Ranking</h1>
        <p className="text-gray-400 mb-8">Veja sua posição entre os jogadores</p>

        {/* Sua Posição */}
        <div className="bg-gradient-to-br from-[#00AEEF]/20 to-[#000000] border border-[#00AEEF]/30 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Sua Posição</p>
              <h2 className="text-4xl font-bold text-[#00AEEF]">#{userStats.posicao}</h2>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400 mb-1">Nível {userStats.nivel}</p>
              <p className="text-2xl font-bold">{userStats.xp} XP</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
            <TrendingUp className="w-4 h-4 text-green-400" />
            Continue treinando para subir no ranking!
          </div>
        </div>

        {/* Top 10 */}
        <div className="bg-[#111111] border border-[#00AEEF]/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">Top 10 Jogadores</h2>
          <div className="space-y-3">
            {MOCK_RANKING.map((player) => (
              <div
                key={player.posicao}
                className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-300 ${
                  player.posicao <= 3
                    ? 'bg-gradient-to-r from-[#00AEEF]/10 to-transparent border border-[#00AEEF]/30'
                    : 'bg-[#0A0A0A] hover:bg-[#151515]'
                }`}
              >
                <div className="flex items-center justify-center w-12">
                  {getMedalIcon(player.posicao)}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">{player.nome}</h3>
                  <p className="text-sm text-gray-400">Nível {player.nivel}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#00AEEF]">{player.xp} XP</p>
                  <p className="text-xs text-gray-500">#{player.posicao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Informação */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Complete treinos para ganhar XP e subir no ranking!</p>
          <p className="mt-1">Cada treino concluído = 100 XP</p>
        </div>
      </div>
    </div>
  );
}
