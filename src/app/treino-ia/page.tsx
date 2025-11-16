"use client";

import { useState } from "react";
import Link from "next/link";
import { Target, Sparkles, CheckCircle2, Clock, Zap, ChevronRight } from "lucide-react";

interface Aula {
  id: number;
  titulo: string;
  modulo: string;
  sugestaoTreino: string;
}

const aulas: Aula[] = [
  { id: 1, titulo: "Guia de Mira Perfeita e Crosshair Placement", modulo: "Mira", sugestaoTreino: "15min de prática no Range mantendo crosshair na altura da cabeça" },
  { id: 2, titulo: "Como Parar de Errar Headshots", modulo: "Mira", sugestaoTreino: "20min de treino focado em one-taps e controle de recoil" },
  { id: 3, titulo: "Treinamento de Mira com Bots", modulo: "Mira", sugestaoTreino: "10min de eliminação de bots com foco em velocidade e precisão" },
  { id: 4, titulo: "Flicks e Tracking Avançado", modulo: "Mira", sugestaoTreino: "15min alternando entre flicks rápidos e tracking de alvos móveis" },
  { id: 5, titulo: "Rotina de Aquecimento Profissional", modulo: "Mira", sugestaoTreino: "20min de rotina completa: crosshair placement, flicks e spray control" },
  { id: 6, titulo: "Counter-Strafe na Prática", modulo: "Movimentação", sugestaoTreino: "10min praticando A→D→tiro até se tornar automático" },
  { id: 7, titulo: "Como se Movimentar Durante o Tiro", modulo: "Movimentação", sugestaoTreino: "15min de DM focando apenas em movimentação fluida entre tiros" },
  { id: 8, titulo: "Strafe Control e Bunny Hop", modulo: "Movimentação", sugestaoTreino: "10min praticando strafe patterns e bunny hop" },
  { id: 9, titulo: "Como Ganhar Duelo em Peek Curto", modulo: "Movimentação", sugestaoTreino: "15min alternando entre jiggle peek e wide peek" },
  { id: 10, titulo: "Como Pensar como um Pro Player", modulo: "Mindset", sugestaoTreino: "3min de visualização mental antes de cada partida" },
  { id: 11, titulo: "Controle Emocional no Competitivo", modulo: "Mindset", sugestaoTreino: "Exercício de respiração 4-7-8 entre rounds" },
  { id: 12, titulo: "Lidando com Tilt e Frustração", modulo: "Mindset", sugestaoTreino: "Regra das 3 derrotas: pare após 3 perdas seguidas" },
  { id: 13, titulo: "Trabalho em Equipe e Comunicação", modulo: "Mindset", sugestaoTreino: "Pratique callouts claros e objetivos em todas as partidas" },
  { id: 14, titulo: "Guia Completo da Jett", modulo: "Agentes", sugestaoTreino: "10min de dash + flick lateral" },
  { id: 15, titulo: "Como Jogar de Raze em Mapas Pequenos", modulo: "Agentes", sugestaoTreino: "15min praticando satchel jumps e entradas agressivas" },
  { id: 16, titulo: "Como Dominar a Sage", modulo: "Agentes", sugestaoTreino: "Estude spots de wall e slow orb em todos os mapas" },
  { id: 17, titulo: "A Arte de Jogar de Duelista", modulo: "Agentes", sugestaoTreino: "20min de DM com mentalidade agressiva" },
  { id: 18, titulo: "Como Fazer Execuções Perfeitas", modulo: "Tática", sugestaoTreino: "Pratique timing de utility e coordenação com seu time" },
  { id: 19, titulo: "Estruturas Táticas de Time Profissional", modulo: "Tática", sugestaoTreino: "Estude VODs de times profissionais e identifique padrões" },
  { id: 20, titulo: "Como Ler o Inimigo e Rotacionar Certo", modulo: "Tática", sugestaoTreino: "Analise seus próprios VODs focando em decisões de rotação" },
];

export default function TreinoIAPage() {
  const [aulasSelecionadas, setAulasSelecionadas] = useState<number[]>([]);
  const [treinoGerado, setTreinoGerado] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleAula = (id: number) => {
    setAulasSelecionadas((prev) =>
      prev.includes(id) ? prev.filter((aulaId) => aulaId !== id) : [...prev, id]
    );
  };

  const gerarTreino = () => {
    if (aulasSelecionadas.length === 0) {
      alert("Selecione pelo menos uma aula para gerar o treino!");
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      const aulasSelecionadasData = aulas.filter((aula) => aulasSelecionadas.includes(aula.id));
      
      // Agrupar por módulo
      const modulosCount: { [key: string]: number } = {};
      aulasSelecionadasData.forEach((aula) => {
        modulosCount[aula.modulo] = (modulosCount[aula.modulo] || 0) + 1;
      });

      // Determinar foco principal
      const moduloPrincipal = Object.keys(modulosCount).reduce((a, b) =>
        modulosCount[a] > modulosCount[b] ? a : b
      );

      // Gerar treino personalizado
      let treino = `🎯 **TREINO PERSONALIZADO GERADO**\n\n`;
      treino += `📊 **Análise do seu foco:**\n`;
      treino += `Você assistiu ${aulasSelecionadas.length} aula(s), com ênfase em **${moduloPrincipal}**.\n\n`;
      
      treino += `⏱️ **ROTINA COMPLETA (${calcularTempoTotal(aulasSelecionadasData)}min):**\n\n`;

      // Mira
      const aulasMira = aulasSelecionadasData.filter((a) => a.modulo === "Mira");
      if (aulasMira.length > 0) {
        treino += `🎯 **MIRA (${aulasMira.length * 15}min):**\n`;
        aulasMira.forEach((aula) => {
          treino += `• ${aula.sugestaoTreino}\n`;
        });
        treino += `📍 Recomendação: The Range (modo Eliminate 50)\n\n`;
      }

      // Movimentação
      const aulasMovimentacao = aulasSelecionadasData.filter((a) => a.modulo === "Movimentação");
      if (aulasMovimentacao.length > 0) {
        treino += `🕹️ **MOVIMENTAÇÃO (${aulasMovimentacao.length * 12}min):**\n`;
        aulasMovimentacao.forEach((aula) => {
          treino += `• ${aula.sugestaoTreino}\n`;
        });
        treino += `📍 Recomendação: Deathmatch ou Custom Game\n\n`;
      }

      // Mindset
      const aulasMindset = aulasSelecionadasData.filter((a) => a.modulo === "Mindset");
      if (aulasMindset.length > 0) {
        treino += `🧠 **MINDSET (${aulasMindset.length * 5}min):**\n`;
        aulasMindset.forEach((aula) => {
          treino += `• ${aula.sugestaoTreino}\n`;
        });
        treino += `📍 Recomendação: Pratique antes e durante as partidas\n\n`;
      }

      // Agentes
      const aulasAgentes = aulasSelecionadasData.filter((a) => a.modulo === "Agentes");
      if (aulasAgentes.length > 0) {
        treino += `🧩 **AGENTES (${aulasAgentes.length * 15}min):**\n`;
        aulasAgentes.forEach((aula) => {
          treino += `• ${aula.sugestaoTreino}\n`;
        });
        treino += `📍 Recomendação: Custom Game para lineups e mecânicas\n\n`;
      }

      // Tática
      const aulasTatica = aulasSelecionadasData.filter((a) => a.modulo === "Tática");
      if (aulasTatica.length > 0) {
        treino += `🗺️ **TÁTICA (${aulasTatica.length * 10}min):**\n`;
        aulasTatica.forEach((aula) => {
          treino += `• ${aula.sugestaoTreino}\n`;
        });
        treino += `📍 Recomendação: Assista VODs e pratique em 5-stack\n\n`;
      }

      treino += `💡 **DICAS DE CONCENTRAÇÃO:**\n`;
      treino += `• Faça pausas de 5min a cada 30min de treino\n`;
      treino += `• Mantenha hidratação constante\n`;
      treino += `• Foque em qualidade, não quantidade\n`;
      treino += `• Respire fundo antes de cada sessão\n\n`;

      treino += `⚡ **Mente afiada, mira precisa. Treine como um pro.**`;

      setTreinoGerado(treino);
      setIsGenerating(false);
    }, 2000);
  };

  const calcularTempoTotal = (aulas: Aula[]): number => {
    let total = 0;
    aulas.forEach((aula) => {
      if (aula.modulo === "Mira") total += 15;
      else if (aula.modulo === "Movimentação") total += 12;
      else if (aula.modulo === "Mindset") total += 5;
      else if (aula.modulo === "Agentes") total += 15;
      else if (aula.modulo === "Tática") total += 10;
    });
    return total;
  };

  const getModuloIcon = (modulo: string) => {
    switch (modulo) {
      case "Mira": return "🎯";
      case "Movimentação": return "🕹️";
      case "Mindset": return "🧠";
      case "Agentes": return "🧩";
      case "Tática": return "🗺️";
      default: return "📚";
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-4">
            <Target className="w-4 h-4" />
            Guia de Treino IA
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Monte seu treino ideal
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Selecione as aulas que você assistiu e a IA criará uma rotina personalizada com base nos temas e no seu perfil.
          </p>
        </div>

        {/* Seleção de Aulas */}
        {!treinoGerado && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-primary" />
              Selecione as aulas que você assistiu
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {aulas.map((aula) => (
                <button
                  key={aula.id}
                  onClick={() => toggleAula(aula.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    aulasSelecionadas.includes(aula.id)
                      ? "border-primary bg-primary/10"
                      : "border-border/50 bg-card hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      aulasSelecionadas.includes(aula.id)
                        ? "border-primary bg-primary"
                        : "border-border"
                    }`}>
                      {aulasSelecionadas.includes(aula.id) && (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{getModuloIcon(aula.modulo)}</span>
                        <span className="text-xs font-semibold text-primary">{aula.modulo}</span>
                      </div>
                      <h3 className="font-semibold text-sm leading-tight">{aula.titulo}</h3>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Botão Gerar */}
            <div className="text-center">
              <button
                onClick={gerarTreino}
                disabled={aulasSelecionadas.length === 0 || isGenerating}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-full text-white font-bold text-lg hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed glow-blue"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Gerando treino...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Gerar Treino Personalizado
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
              {aulasSelecionadas.length > 0 && (
                <p className="text-sm text-muted-foreground mt-3">
                  {aulasSelecionadas.length} aula(s) selecionada(s)
                </p>
              )}
            </div>
          </div>
        )}

        {/* Treino Gerado */}
        {treinoGerado && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-blue">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Seu Treino Personalizado</h2>
                  <p className="text-sm text-muted-foreground">Gerado pela IA COACH MINDTRACK</p>
                </div>
              </div>

              <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                  {treinoGerado}
                </pre>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setTreinoGerado(null);
                  setAulasSelecionadas([]);
                }}
                className="px-6 py-3 bg-card border border-border/50 rounded-xl font-semibold hover:border-primary/50 transition-all duration-200"
              >
                Gerar Novo Treino
              </button>
              
              <Link
                href="/aulas"
                className="px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 text-center"
              >
                Ver Mais Aulas
              </Link>
            </div>
          </div>
        )}

        {/* CTA para Aulas */}
        {!treinoGerado && (
          <div className="mt-12 text-center p-8 rounded-2xl bg-card border border-border/50">
            <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Ainda não assistiu nenhuma aula?</h3>
            <p className="text-muted-foreground mb-4">
              Confira nosso catálogo completo de aulas de referência com os melhores pro players.
            </p>
            <Link
              href="/aulas"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/20 rounded-xl text-primary font-semibold hover:bg-primary/20 transition-all duration-200"
            >
              Ver Aulas Disponíveis
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
