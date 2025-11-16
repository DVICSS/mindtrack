"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, Target, Clock, CheckCircle, ChevronRight } from "lucide-react";

interface Exercicio {
  nome: string;
  tempo: string;
  objetivo: string;
  concluido: boolean;
}

interface Treino {
  id: string;
  elo: string;
  agente: string;
  habilidade: string;
  exercicios: Exercicio[];
  criadoEm: string;
}

export default function TreinosPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [treinos, setTreinos] = useState<Treino[]>([]);
  
  // Form state
  const [elo, setElo] = useState("");
  const [agente, setAgente] = useState("");
  const [habilidade, setHabilidade] = useState("");

  useEffect(() => {
    const currentUser = localStorage.getItem("mindtrack_current_user");
    if (!currentUser) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(currentUser));
    
    // Carregar treinos salvos
    const treinosSalvos = localStorage.getItem("mindtrack_treinos");
    if (treinosSalvos) {
      setTreinos(JSON.parse(treinosSalvos));
    }
    
    setLoading(false);
  }, [router]);

  const gerarTreino = () => {
    if (!elo || !agente || !habilidade) {
      alert("Preencha todos os campos");
      return;
    }

    const exercicios = gerarExercicios(habilidade);
    
    const novoTreino: Treino = {
      id: Date.now().toString(),
      elo,
      agente,
      habilidade,
      exercicios,
      criadoEm: new Date().toISOString(),
    };

    const novosTreinos = [novoTreino, ...treinos];
    setTreinos(novosTreinos);
    localStorage.setItem("mindtrack_treinos", JSON.stringify(novosTreinos));
    setMostrarFormulario(false);
  };

  const gerarExercicios = (habilidade: string): Exercicio[] => {
    const exerciciosPorHabilidade: Record<string, Exercicio[]> = {
      mira: [
        { nome: "Aim Lab - Gridshot", tempo: "10 min", objetivo: "Melhorar precisão e velocidade", concluido: false },
        { nome: "Deathmatch", tempo: "20 min", objetivo: "Aplicar mira em situações reais", concluido: false },
        { nome: "The Range - Bots", tempo: "15 min", objetivo: "Treinar headshots", concluido: false },
        { nome: "Aim Lab - Microshot", tempo: "10 min", objetivo: "Precisão em alvos pequenos", concluido: false },
      ],
      movimentacao: [
        { nome: "Strafe Practice", tempo: "15 min", objetivo: "Melhorar movimento lateral", concluido: false },
        { nome: "Peek Training", tempo: "10 min", objetivo: "Dominar peeks e counter-strafe", concluido: false },
        { nome: "Jump Spots", tempo: "10 min", objetivo: "Aprender posições elevadas", concluido: false },
        { nome: "Movement Drills", tempo: "15 min", objetivo: "Fluidez e velocidade", concluido: false },
      ],
      spray: [
        { nome: "Spray Control - Vandal", tempo: "15 min", objetivo: "Controlar recuo da Vandal", concluido: false },
        { nome: "Spray Control - Phantom", tempo: "15 min", objetivo: "Controlar recuo da Phantom", concluido: false },
        { nome: "Spray Transfer", tempo: "10 min", objetivo: "Transferir spray entre alvos", concluido: false },
        { nome: "Burst Fire Practice", tempo: "10 min", objetivo: "Melhorar rajadas curtas", concluido: false },
      ],
      "leitura de jogo": [
        { nome: "VOD Review", tempo: "30 min", objetivo: "Analisar suas partidas", concluido: false },
        { nome: "Map Study", tempo: "20 min", objetivo: "Estudar callouts e posições", concluido: false },
        { nome: "Pro Match Analysis", tempo: "20 min", objetivo: "Aprender com profissionais", concluido: false },
        { nome: "Timing Practice", tempo: "15 min", objetivo: "Entender timings do mapa", concluido: false },
      ],
      "game sense": [
        { nome: "Unrated Focused", tempo: "40 min", objetivo: "Praticar decisões conscientes", concluido: false },
        { nome: "Economy Study", tempo: "15 min", objetivo: "Entender economia do jogo", concluido: false },
        { nome: "Utility Practice", tempo: "20 min", objetivo: "Dominar habilidades do agente", concluido: false },
        { nome: "Rotation Drills", tempo: "15 min", objetivo: "Melhorar rotações", concluido: false },
      ],
    };

    return exerciciosPorHabilidade[habilidade] || [];
  };

  const marcarConcluido = (treinoId: string, exercicioIndex: number) => {
    const novosTreinos = treinos.map(treino => {
      if (treino.id === treinoId) {
        const novosExercicios = [...treino.exercicios];
        novosExercicios[exercicioIndex].concluido = !novosExercicios[exercicioIndex].concluido;
        return { ...treino, exercicios: novosExercicios };
      }
      return treino;
    });
    
    setTreinos(novosTreinos);
    localStorage.setItem("mindtrack_treinos", JSON.stringify(novosTreinos));
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Treinos Personalizados</h1>
            <p className="text-gray-400">Gerados especialmente para você</p>
          </div>
          <button
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="px-6 py-3 bg-[#00AEEF] text-black font-bold rounded-lg hover:bg-[#00AEEF]/90 transition-all duration-300 shadow-lg shadow-[#00AEEF]/50"
          >
            <Zap className="w-5 h-5 inline mr-2" />
            Novo Treino
          </button>
        </div>

        {/* Formulário */}
        {mostrarFormulario && (
          <div className="bg-[#111111] border border-[#00AEEF]/20 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Gerar Treino Personalizado</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Seu Elo</label>
                <select
                  value={elo}
                  onChange={(e) => setElo(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#00AEEF]/20 rounded-lg text-white focus:outline-none focus:border-[#00AEEF]"
                >
                  <option value="">Selecione seu elo</option>
                  <option value="Ferro">Ferro</option>
                  <option value="Bronze">Bronze</option>
                  <option value="Prata">Prata</option>
                  <option value="Ouro">Ouro</option>
                  <option value="Platina">Platina</option>
                  <option value="Diamante">Diamante</option>
                  <option value="Ascendente">Ascendente</option>
                  <option value="Imortal">Imortal</option>
                  <option value="Radiante">Radiante</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Agente Favorito</label>
                <input
                  type="text"
                  value={agente}
                  onChange={(e) => setAgente(e.target.value)}
                  placeholder="Ex: Jett, Reyna, Sage..."
                  className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#00AEEF]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00AEEF]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Habilidade para Melhorar</label>
                <select
                  value={habilidade}
                  onChange={(e) => setHabilidade(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#00AEEF]/20 rounded-lg text-white focus:outline-none focus:border-[#00AEEF]"
                >
                  <option value="">Selecione uma habilidade</option>
                  <option value="mira">Mira</option>
                  <option value="movimentacao">Movimentação</option>
                  <option value="spray">Spray Control</option>
                  <option value="leitura de jogo">Leitura de Jogo</option>
                  <option value="game sense">Game Sense</option>
                </select>
              </div>

              <button
                onClick={gerarTreino}
                className="w-full py-3 bg-[#00AEEF] text-black font-bold rounded-lg hover:bg-[#00AEEF]/90 transition-all duration-300"
              >
                Gerar Treino
              </button>
            </div>
          </div>
        )}

        {/* Lista de Treinos */}
        <div className="space-y-6">
          {treinos.length === 0 ? (
            <div className="text-center py-12">
              <Target className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Nenhum treino gerado ainda</p>
              <p className="text-sm text-gray-500 mt-2">Clique em "Novo Treino" para começar</p>
            </div>
          ) : (
            treinos.map((treino) => (
              <div key={treino.id} className="bg-[#111111] border border-[#00AEEF]/20 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Treino de {treino.habilidade}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>Elo: {treino.elo}</span>
                      <span>•</span>
                      <span>Agente: {treino.agente}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      {new Date(treino.criadoEm).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {treino.exercicios.map((exercicio, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border transition-all duration-300 ${
                        exercicio.concluido
                          ? 'bg-[#00AEEF]/10 border-[#00AEEF]/50'
                          : 'bg-[#0A0A0A] border-[#00AEEF]/20'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => marcarConcluido(treino.id, index)}
                          className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            exercicio.concluido
                              ? 'bg-[#00AEEF] border-[#00AEEF]'
                              : 'border-gray-600 hover:border-[#00AEEF]'
                          }`}
                        >
                          {exercicio.concluido && <CheckCircle className="w-4 h-4 text-black" />}
                        </button>
                        <div className="flex-1">
                          <h4 className={`font-semibold mb-1 ${exercicio.concluido ? 'line-through text-gray-500' : ''}`}>
                            {exercicio.nome}
                          </h4>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {exercicio.tempo}
                            </span>
                            <span className="flex items-center gap-1">
                              <Target className="w-4 h-4" />
                              {exercicio.objetivo}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
