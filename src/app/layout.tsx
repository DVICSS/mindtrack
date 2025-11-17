import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Home, Zap, TrendingUp, Play, MessageSquare, BookOpen, Trophy, Star, User } from "lucide-react";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MINDTRACK - Treine sua mente. Aumente sua mira.",
  description: "App gamer de treinamento inteligente para jogadores de Valorant e FPS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-[#0A0A0A]`}
      >
        <AuthProvider>
          {/* Header */}
          <header className="sticky top-0 z-50 border-b border-[#00AEEF]/20 backdrop-blur-lg bg-[#0A0A0A]/90">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00AEEF] to-[#0088CC] flex items-center justify-center shadow-lg shadow-[#00AEEF]/50">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">MINDTRACK</h1>
                    <p className="text-xs text-gray-400">Treine sua mente. Aumente sua mira.</p>
                  </div>
                </Link>

                {/* Upgrade Button */}
                <Link 
                  href="/assinaturas"
                  className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#00AEEF] to-[#0088CC] rounded-full text-white font-semibold hover:shadow-lg hover:shadow-[#00AEEF]/50 transition-all duration-300"
                >
                  <Star className="w-4 h-4" />
                  Upgrade PRO
                </Link>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Bottom Navigation */}
          <nav className="sticky bottom-0 z-50 border-t border-[#00AEEF]/20 backdrop-blur-lg bg-[#0A0A0A]/90">
            <div className="container mx-auto px-2">
              <div className="flex items-center justify-around py-3">
                <NavItem href="/" icon={Home} label="Início" />
                <NavItem href="/treinos" icon={Zap} label="Treinos" />
                <NavItem href="/progresso" icon={TrendingUp} label="Progresso" />
                <NavItem href="/aulas" icon={BookOpen} label="Aulas" />
                <NavItem href="/vods" icon={Play} label="VODs" />
                <NavItem href="/chat" icon={MessageSquare} label="Chat IA" />
                <NavItem href="/ranking" icon={Trophy} label="Ranking" />
                <NavItem href="/perfil" icon={User} label="Perfil" />
              </div>
            </div>
          </nav>
        </AuthProvider>
      </body>
    </html>
  );
}

function NavItem({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
  return (
    <Link 
      href={href}
      className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg hover:bg-[#00AEEF]/10 transition-all duration-200 group"
    >
      <Icon className="w-5 h-5 text-gray-400 group-hover:text-[#00AEEF] transition-colors" />
      <span className="text-xs text-gray-400 group-hover:text-[#00AEEF] transition-colors">{label}</span>
    </Link>
  );
}
