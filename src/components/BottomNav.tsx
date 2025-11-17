"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Dumbbell,
  TrendingUp,
  GraduationCap,
  Video,
  MessageSquare,
  Trophy,
  User,
} from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Início" },
    { href: "/treinos", icon: Dumbbell, label: "Treinos" },
    { href: "/progresso", icon: TrendingUp, label: "Progresso" },
    { href: "/aulas", icon: GraduationCap, label: "Aulas" },
    { href: "/vods", icon: Video, label: "VODs" },
    { href: "/chat-ia", icon: MessageSquare, label: "Chat IA" },
    { href: "/ranking", icon: Trophy, label: "Ranking" },
    { href: "/perfil", icon: User, label: "Perfil" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#0A0A0A] border-t border-[#00AEEF]/20 z-50">
      <div className="container mx-auto px-2">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "text-[#00AEEF] bg-[#00AEEF]/10"
                    : "text-gray-400 hover:text-white hover:bg-[#111111]"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
