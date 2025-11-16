"use client";

import { useState } from "react";
import { Trophy, Target, Flame, Brain, MessageCircle, Video, Award, Lock, Sparkles } from "lucide-react";

interface Achievement {
  id: number;
  icon: any;
  title: string;
  description: string;
  unlocked: boolean;
  date?: Date;
  progress?: number;
  total?: number;
}

export default function ConquistasPage() {
  const [achievements] = useState<Achievement[]>([
    {
      id: 1,
      icon: Target,
      title: "🎯 Primeiro Tiro",
      description: "Completou o primeiro treino",
      unlocked: true,
      date: new Date("2024-01-15"),
    },
    {
      id: 2,
      icon: Flame,
      title: "🔥 Streak de Fogo",
      description: "7 dias seguidos de treino",
      unlocked: true,
      date: new Date("2024-01-20"),
    },
    {
      id: 3,
      icon: Brain,
      title: "🧠 Mente de Aço",
      description: "30 dias seguidos de foco",
      unlocked: false,
      progress: 15,
      total: 30,
    },
    {
      id: 4,
      icon: MessageCircle,
      title: "💬 Mentor",
      description: "Ajudou 10 jogadores na comunidade",
      unlocked: false,
      progress: 3,
      total: 10,
    },
    {
      id: 5,
      icon: Video,
      title: "🎥 Analista",
      description: "Enviou 5 vídeos para VOD",
      unlocked: true,
      date: new Date("2024-01-18"),
    },
    {
      id: 6,
      icon: Trophy,
      title: "🏆 Top 10",
      description: "Entrou no ranking semanal",
      unlocked: false,
      progress: 0,
      total: 1,
    },
    {
      id: 7,
      icon: Award,
      title: "⭐ Veterano",
      description: "60 dias de uso do app",
      unlocked: false,
      progress: 22,
      total: 60,
    },
    {
      id: 8,
      icon: Sparkles,
      title: "✨ Lendário",
      description: "Desbloqueou todas as conquistas",
      unlocked: false,
      progress: 3,
      total: 8,
    },
  ]);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;
  const progressPercentage = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-2">
            <Trophy className="w-4 h-4" />
            Sistema de Conquistas
          </div>
          <h1 className="text-4xl font-bold mb-2">Suas Conquistas</h1>
          <p className="text-muted-foreground">
            Desbloqueie badges e mostre sua evolução
          </p>
        </div>

        {/* Progress Overview */}
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">
                {unlockedCount} / {totalCount}
              </h2>
              <p className="text-sm text-muted-foreground">Conquistas desbloqueadas</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">{progressPercentage}%</div>
              <p className="text-xs text-muted-foreground">Progresso total</p>
            </div>
          </div>
          <div className="w-full h-3 bg-card/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 glow-blue"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>

        {/* Motivational Message */}
        <div className="mt-12 p-8 rounded-2xl bg-card border border-border/50 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4 glow-blue">
            <Flame className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Continue Evoluindo!</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Cada conquista desbloqueada representa seu progresso e dedicação. 
            Continue treinando e alcance novos patamares!
          </p>
        </div>
      </div>
    </div>
  );
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const Icon = achievement.icon;
  const isLocked = !achievement.unlocked;

  return (
    <div
      className={`p-6 rounded-2xl border transition-all duration-300 ${
        isLocked
          ? "bg-card/30 border-border/30 opacity-60"
          : "bg-card border-primary/30 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 glow-blue-subtle"
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
            isLocked
              ? "bg-card border border-border/50"
              : "bg-gradient-to-br from-primary to-secondary glow-blue"
          }`}
        >
          {isLocked ? (
            <Lock className="w-7 h-7 text-muted-foreground" />
          ) : (
            <Icon className="w-7 h-7 text-white" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold mb-1 truncate">{achievement.title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>

          {achievement.unlocked && achievement.date && (
            <div className="flex items-center gap-2 text-xs text-primary">
              <Trophy className="w-3 h-3" />
              Desbloqueado em {achievement.date.toLocaleDateString("pt-BR")}
            </div>
          )}

          {!achievement.unlocked && achievement.progress !== undefined && achievement.total && (
            <div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>Progresso</span>
                <span>
                  {achievement.progress} / {achievement.total}
                </span>
              </div>
              <div className="w-full h-2 bg-card/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary/50 to-secondary/50 transition-all duration-500"
                  style={{
                    width: `${(achievement.progress / achievement.total) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {achievement.unlocked && (
        <div className="mt-4 pt-4 border-t border-border/30">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-primary">
            <Sparkles className="w-3 h-3" />
            Conquista Desbloqueada!
          </div>
        </div>
      )}
    </div>
  );
}
