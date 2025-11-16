"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Zap, Mail, Lock, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    // Validações básicas
    if (!email || !senha) {
      setErro("Preencha todos os campos");
      setLoading(false);
      return;
    }

    try {
      // Login com Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      });

      if (error) {
        setErro("Email ou senha incorretos");
        setLoading(false);
        return;
      }

      if (data.user) {
        // Redirecionar para dashboard
        router.push("/dashboard");
      }
    } catch (error: any) {
      setErro(error.message || "Erro ao fazer login");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#00AEEF] to-[#0088CC] mb-4 shadow-lg shadow-[#00AEEF]/50">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">MINDTRACK</h1>
          <p className="text-gray-400">Treine sua mente. Aumente sua mira.</p>
        </div>

        {/* Formulário */}
        <div className="bg-[#111111] border border-[#00AEEF]/20 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Entrar</h2>

          {erro && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm">{erro}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#0A0A0A] border border-[#00AEEF]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00AEEF] transition-colors"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#0A0A0A] border border-[#00AEEF]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00AEEF] transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Esqueci a senha */}
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-[#00AEEF] hover:text-[#00AEEF]/80 transition-colors"
              >
                Esqueci a senha
              </button>
            </div>

            {/* Botão Entrar */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#00AEEF] text-black font-bold rounded-lg hover:bg-[#00AEEF]/90 transition-all duration-300 shadow-lg shadow-[#00AEEF]/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          {/* Criar conta */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Não tem uma conta?{" "}
              <Link href="/register" className="text-[#00AEEF] hover:text-[#00AEEF]/80 font-semibold transition-colors">
                Criar conta
              </Link>
            </p>
          </div>
        </div>

        {/* Nota sobre esqueci a senha */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Para recuperar sua senha, entre em contato com o suporte
          </p>
        </div>
      </div>
    </div>
  );
}
