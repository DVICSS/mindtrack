"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Target, Clock, User, Sparkles } from "lucide-react";

interface Aula {
  id: number;
  titulo: string;
  descricao: string;
  professor: string;
  nivel: string;
  duracao: string;
  modulo: string;
  videoUrl: string;
  sugestaoTreino: string;
}

const aulas: Aula[] = [
  // MIRA
  {
    id: 1,
    titulo: "DICAS PARA INICIANTES E MINHAS CONFIGURAÇÕES",
    descricao: "Aprenda com Frtt as configurações ideais de mira, sensibilidade e HUD para jogar melhor.",
    professor: "Frtt",
    nivel: "Iniciante",
    duracao: "Automática",
    modulo: "Mira",
    videoUrl: "https://www.youtube.com/embed/FUI1Mk4v6X8",
    sugestaoTreino: "15 minutos de aquecimento com bots e foco em headshots."
  },
  {
    id: 2,
    titulo: "COMO MELHORAR MUITO NO VALORANT – AULA COMPLETA DE MIRA",
    descricao: "Aula completa de mira e posicionamento para elevar sua precisão.",
    professor: "Frtt",
    nivel: "Intermediário",
    duracao: "Automática",
    modulo: "Mira",
    videoUrl: "https://www.youtube.com/embed/tWy5Y8jwHB4",
    sugestaoTreino: "20 minutos de flicks curtos e transições de alvo."
  },
  
  // MOVIMENTAÇÃO
  {
    id: 3,
    titulo: "OS 4 NÍVEIS DE MOVIMENTAÇÃO – DO NOOB AO PRO",
    descricao: "Entenda cada estágio da movimentação no Valorant e como dominar o controle total do personagem.",
    professor: "Frtt",
    nivel: "Todos os níveis",
    duracao: "Automática",
    modulo: "Movimentação",
    videoUrl: "https://www.youtube.com/embed/FUI1Mk4v6X8",
    sugestaoTreino: "10 minutos de strafe + counter-strafe e 10 minutos de peeks curtos."
  },
  {
    id: 4,
    titulo: "AULA 1 – MONTANDO UM SETUP PRA JOGAR VALORANT!",
    descricao: "Aprenda a preparar seu setup, sensibilidade e posicionamento de teclado para máxima performance.",
    professor: "Frtt",
    nivel: "Iniciante",
    duracao: "Automática",
    modulo: "Movimentação",
    videoUrl: "https://www.youtube.com/embed/odo6KsEUz48",
    sugestaoTreino: "Ajuste postura e configuração antes de cada treino de mira."
  },
  {
    id: 5,
    titulo: "AULA 2 – VOCÊ PRECISA MUDAR ESSAS CONFIGURAÇÕES NO SEU VALORANT!",
    descricao: "Configurações otimizadas para movimentação suave e mira mais estável.",
    professor: "Frtt",
    nivel: "Intermediário",
    duracao: "Automática",
    modulo: "Movimentação",
    videoUrl: "https://www.youtube.com/embed/mUfOcTNLF_0",
    sugestaoTreino: "15 minutos de movimentação em mapas de treino com foco em precisão pós-movimento."
  },
  
  // NOÇÃO / ESTRATÉGIA
  {
    id: 6,
    titulo: "CARREGUE SUAS PARTIDAS COMO O FRTT – ANÁLISE DE JOGO",
    descricao: "Entenda como analisar seu próprio jogo e tomar decisões mais inteligentes.",
    professor: "Frtt",
    nivel: "Intermediário",
    duracao: "Automática",
    modulo: "Noção / Estratégia",
    videoUrl: "https://www.youtube.com/embed/Ph_NG_ZNuu0",
    sugestaoTreino: "Revise uma partida sua e anote os erros de rotação."
  },
  {
    id: 7,
    titulo: "FRTTT EXPLICA COMO SUBIR DE ELO NO VALORANT",
    descricao: "Estratégias mentais e táticas para subir de elo de forma constante.",
    professor: "Frtt",
    nivel: "Todos os níveis",
    duracao: "Automática",
    modulo: "Noção / Estratégia",
    videoUrl: "https://www.youtube.com/embed/VZZ4yA_LuSc",
    sugestaoTreino: "3 partidas aplicando comunicação e calma sob pressão."
  },
  {
    id: 8,
    titulo: "MANUAL DO VALORANT #8 – CYPHER",
    descricao: "Tixinha explica o agente Cypher e ensina táticas de armadilhas e posicionamento.",
    professor: "Tixinha",
    nivel: "Intermediário",
    duracao: "Automática",
    modulo: "Noção / Estratégia",
    videoUrl: "https://www.youtube.com/embed/gzCxQ1LPqpE",
    sugestaoTreino: "Crie setups de câmera e fio armadilha em 2 mapas diferentes."
  },
  {
    id: 9,
    titulo: "CONFIGURANDO SEU JOGO – TUTORIAL INICIANTE",
    descricao: "Guia rápido de configurações essenciais para estabilidade e FPS.",
    professor: "Frtt",
    nivel: "Iniciante",
    duracao: "Automática",
    modulo: "Noção / Estratégia",
    videoUrl: "https://www.youtube.com/embed/odo6KsEUz48",
    sugestaoTreino: "Teste seu desempenho com treinos curtos entre cada ajuste."
  },
  {
    id: 10,
    titulo: "COMO FAZER SEU TREINO DIÁRIO FUNCIONAR",
    descricao: "Frtt ensina como montar e seguir uma rotina de treinos realista e eficaz.",
    professor: "Frtt",
    nivel: "Todos os níveis",
    duracao: "Automática",
    modulo: "Noção / Estratégia",
    videoUrl: "https://www.youtube.com/embed/iY0nmaZxCAI",
    sugestaoTreino: "Faça o treino completo proposto no vídeo, anotando acertos e falhas."
  }
];

export default function AulaDetalhePage() {
  const params = useParams();
  const router = useRouter();
  const aulaId = parseInt(params.id as string);
  const aula = aulas.find((a) => a.id === aulaId);

  if (!aula) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Aula não encontrada</h1>
          <Link
            href="/aulas"
            className="text-primary hover:underline flex items-center gap-2 justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para aulas
          </Link>
        </div>
      </div>
    );
  }

  const getModuloIcon = (modulo: string) => {
    switch (modulo) {
      case "Mira": return "🎯";
      case "Movimentação": return "🕹️";
      case "Noção / Estratégia": return "🧠";
      default: return "📚";
    }
  };

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case "Iniciante": return "text-green-500 bg-green-500/10 border-green-500/20";
      case "Intermediário": return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      case "Avançado": return "text-red-500 bg-red-500/10 border-red-500/20";
      default: return "text-primary bg-primary/10 border-primary/20";
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Botão Voltar */}
        <Link
          href="/aulas"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para aulas
        </Link>

        {/* Vídeo Player */}
        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black mb-6 shadow-2xl">
          <iframe
            width="100%"
            height="100%"
            src={aula.videoUrl}
            title={aula.titulo}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>

        {/* Informações da Aula */}
        <div className="bg-card border border-border/50 rounded-2xl p-6 mb-6">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-sm font-semibold text-primary">
              {getModuloIcon(aula.modulo)} {aula.modulo}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getNivelColor(aula.nivel)}`}>
              {aula.nivel}
            </span>
            <span className="px-3 py-1 bg-card border border-border/50 rounded-full text-sm flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {aula.duracao}
            </span>
          </div>

          <h1 className="text-3xl font-bold mb-3">{aula.titulo}</h1>
          
          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <User className="w-4 h-4" />
            <span className="text-sm">
              Professor: <strong className="text-foreground">{aula.professor}</strong>
            </span>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">
            {aula.descricao}
          </p>

          {/* Botão Assistir no Canal */}
          <a
            href={aula.videoUrl.replace("/embed/", "/watch?v=")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50"
          >
            <ExternalLink className="w-5 h-5" />
            Assistir no canal oficial
          </a>
        </div>

        {/* Sugestão de Treino */}
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Sugestão de Treino</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {aula.sugestaoTreino}
          </p>
        </div>

        {/* Créditos */}
        <div className="bg-card/50 border border-border/30 rounded-xl p-4 mb-6 text-center">
          <p className="text-xs text-muted-foreground">
            📺 <strong>Conteúdo público original</strong> — usado apenas para fins educacionais com crédito total ao criador.
            <br />
            Todos os direitos pertencem a <strong>{aula.professor}</strong>.
          </p>
        </div>

        {/* CTA Treino Personalizado */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-center text-white">
          <Sparkles className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3">
            Gerar Treino Personalizado com IA
          </h2>
          <p className="mb-6 opacity-90">
            Use a IA COACH MINDTRACK para criar uma rotina completa baseada nesta aula e no seu perfil.
          </p>
          <Link
            href="/treino-ia"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-full font-bold hover:shadow-xl transition-all duration-300"
          >
            <Target className="w-5 h-5" />
            Gerar Meu Treino
          </Link>
        </div>
      </div>
    </div>
  );
}
