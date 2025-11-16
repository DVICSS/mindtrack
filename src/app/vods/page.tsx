"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Play, ExternalLink } from "lucide-react";

const VODS = [
  { id: "abc123", titulo: "Análise: Como subir de elo", canal: "Gaules", descricao: "Dicas para ranqueada" },
  { id: "def456", titulo: "VOD Review: Jett no Ascent", canal: "Nobru", descricao: "Posicionamento e timing" },
  { id: "ghi789", titulo: "Como jogar de Sage", canal: "Aspas", descricao: "Guia completo" },
  { id: "jkl012", titulo: "Melhores jogadas da semana", canal: "Valorant Brasil", descricao: "Highlights incríveis" },
  { id: "mno345", titulo: "Treino de mira profissional", canal: "TenZ", descricao: "Rotina de treino" },
  { id: "pqr678", titulo: "Análise tática: Split", canal: "Sacy", descricao: "Estratégias avançadas" },
];

export default function VODsPage() {
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
        <h1 className="text-3xl font-bold mb-2">VODs</h1>
        <p className="text-gray-400 mb-8">Análises de criadores brasileiros</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VODS.map((vod) => (
            <div
              key={vod.id}
              className="bg-[#111111] border border-[#00AEEF]/20 rounded-xl overflow-hidden hover:border-[#00AEEF]/50 transition-all duration-300 group"
            >
              <div className="relative aspect-video bg-gradient-to-br from-[#00AEEF]/20 to-[#000000] flex items-center justify-center">
                <Play className="w-16 h-16 text-[#00AEEF] opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-1">{vod.titulo}</h3>
                <p className="text-sm text-[#00AEEF] mb-2">{vod.canal}</p>
                <p className="text-sm text-gray-400 mb-4">{vod.descricao}</p>
                <button className="inline-flex items-center gap-2 text-[#00AEEF] hover:text-[#00AEEF]/80 transition-colors text-sm font-semibold">
                  Assistir
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
