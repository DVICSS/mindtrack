"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Play, ExternalLink } from "lucide-react";

const AULAS = [
  {
    categoria: "Mira",
    videos: [
      { id: "kHS4iTkGNco", titulo: "Como melhorar sua mira", descricao: "Técnicas essenciais para precisão" },
      { id: "z8UeF9lJHYg", titulo: "Treino de mira avançado", descricao: "Exercícios para jogadores experientes" },
      { id: "tDnvZogQDPk", titulo: "Sensibilidade perfeita", descricao: "Encontre sua sens ideal" },
    ],
  },
  {
    categoria: "Movimentação",
    videos: [
      { id: "F1Qw5Z1B0gc", titulo: "Movimentação básica", descricao: "Fundamentos de movimento" },
      { id: "GNNZ90goBbs", titulo: "Strafe e peek", descricao: "Domine os peeks" },
      { id: "rxGJQulBqvc", titulo: "Posicionamento avançado", descricao: "Onde ficar em cada situação" },
    ],
  },
  {
    categoria: "Noção",
    videos: [
      { id: "xjJpJewov7o", titulo: "Game sense básico", descricao: "Entenda o jogo" },
      { id: "p1hjv8NMpTw", titulo: "Leitura de jogo", descricao: "Antecipe os inimigos" },
      { id: "zYxB88KGkLo", titulo: "Economia e rotações", descricao: "Decisões inteligentes" },
    ],
  },
  {
    categoria: "Agentes",
    videos: [
      { id: "0EBzGsyhQhc", titulo: "Guia de duelistas", descricao: "Jett, Reyna, Phoenix" },
      { id: "0wb3C5vSL7M", titulo: "Guia de sentinelas", descricao: "Sage, Cypher, Killjoy" },
      { id: "wBirX9jgeFI", titulo: "Guia de controladores", descricao: "Omen, Brimstone, Viper" },
    ],
  },
];

export default function AulasPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = localStorage.getItem("mindtrack_current_user");
    if (!currentUser) {
      router.push("/login");
      return;
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00AEEF]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-2">Aulas</h1>
        <p className="text-gray-400 mb-8">Aprenda com os melhores</p>

        <div className="space-y-8">
          {AULAS.map((categoria) => (
            <div key={categoria.categoria}>
              <h2 className="text-2xl font-bold mb-4 text-[#00AEEF]">{categoria.categoria}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categoria.videos.map((video) => (
                  <div
                    key={video.id}
                    className="bg-[#111111] border border-[#00AEEF]/20 rounded-xl overflow-hidden hover:border-[#00AEEF]/50 transition-all duration-300 group"
                  >
                    <div className="relative aspect-video bg-[#0A0A0A]">
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                        alt={video.titulo}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-12 h-12 text-[#00AEEF]" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold mb-2">{video.titulo}</h3>
                      <p className="text-sm text-gray-400 mb-4">{video.descricao}</p>
                      <a
                        href={`https://www.youtube.com/watch?v=${video.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#00AEEF] hover:text-[#00AEEF]/80 transition-colors text-sm font-semibold"
                      >
                        Assistir
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
