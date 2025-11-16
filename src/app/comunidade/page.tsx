"use client";

import { useState } from "react";
import { Users, Heart, MessageCircle, Search, Filter, Plus, Flame } from "lucide-react";

interface Post {
  id: number;
  author: string;
  elo: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  tags: string[];
  timestamp: string;
}

export default function ComunidadePage() {
  const [filter, setFilter] = useState<string>("all");
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "ProGamer123",
      elo: "Diamante 2",
      content: "Finalmente consegui 80% de headshot no treino de hoje! A dica do counter-strafe funcionou demais 🎯",
      likes: 45,
      comments: 12,
      tags: ["#mira", "#evolução"],
      timestamp: "Há 2 horas",
    },
    {
      id: 2,
      author: "ValorantKing",
      elo: "Platina 1",
      content: "Análise do meu VOD mostrou que eu estava peeking muito largo. Depois de ajustar, já ganhei 3 ranked seguidas! 🔥",
      likes: 67,
      comments: 23,
      tags: ["#análiseVOD", "#tática"],
      timestamp: "Há 5 horas",
    },
    {
      id: 3,
      author: "AimMaster",
      elo: "Ascendente 3",
      content: "Dica rápida: pratiquem jiggle peek por 10 minutos todo dia. Mudou meu jogo completamente!",
      likes: 89,
      comments: 34,
      tags: ["#movimentação", "#dica"],
      timestamp: "Há 1 dia",
    },
  ]);

  const badges = [
    { emoji: "🥇", name: "Primeiro Post", count: 234 },
    { emoji: "🔥", name: "Streak Social", count: 156 },
    { emoji: "💬", name: "Mentor", count: 89 },
  ];

  const topPlayers = [
    { name: "ProGamer123", elo: "Diamante 2", points: 1250 },
    { name: "ValorantKing", elo: "Platina 1", points: 1180 },
    { name: "AimMaster", elo: "Ascendente 3", points: 1050 },
  ];

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold">
            <Users className="w-4 h-4" />
            Comunidade MINDTRACK
          </div>
          <h1 className="text-4xl font-bold">Feed Social</h1>
          <p className="text-muted-foreground">
            Compartilhe sua evolução e aprenda com outros jogadores
          </p>
        </div>

        {/* Create Post Button */}
        <button className="w-full p-4 bg-gradient-to-r from-primary to-secondary rounded-2xl text-white font-bold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" />
          Criar Novo Post
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all duration-200 ${
                  filter === "all"
                    ? "bg-gradient-to-r from-primary to-secondary text-white"
                    : "bg-card border border-border/50 hover:border-primary/50"
                }`}
              >
                Todos
              </button>
              {["#mira", "#movimentação", "#tática", "#análiseVOD", "#mentalidade"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setFilter(tag)}
                  className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all duration-200 ${
                    filter === tag
                      ? "bg-gradient-to-r from-primary to-secondary text-white"
                      : "bg-card border border-border/50 hover:border-primary/50"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Posts */}
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-card border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 animate-fade-in"
                >
                  {/* Author Info */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                        {post.author[0]}
                      </div>
                      <div>
                        <p className="font-bold">{post.author}</p>
                        <p className="text-xs text-muted-foreground">{post.elo}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                  </div>

                  {/* Content */}
                  <p className="mb-4 text-foreground/90">{post.content}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors group"
                    >
                      <Heart className="w-5 h-5 text-muted-foreground group-hover:text-red-500 transition-colors" />
                      <span className="text-sm font-semibold">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors group">
                      <MessageCircle className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-sm font-semibold">{post.comments}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="bg-card border border-border/50 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4">Conquistas</h3>
              <div className="space-y-3">
                {badges.map((badge) => (
                  <div
                    key={badge.name}
                    className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{badge.emoji}</span>
                      <span className="text-sm font-semibold">{badge.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{badge.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Players */}
            <div className="bg-card border border-border/50 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Flame className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold">Top da Semana</h3>
              </div>
              <div className="space-y-3">
                {topPlayers.map((player, idx) => (
                  <div
                    key={player.name}
                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/50"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        idx === 0
                          ? "bg-yellow-500 text-black"
                          : idx === 1
                          ? "bg-gray-400 text-black"
                          : "bg-orange-600 text-white"
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{player.name}</p>
                      <p className="text-xs text-muted-foreground">{player.elo}</p>
                    </div>
                    <span className="text-xs font-bold text-primary">{player.points}pts</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
