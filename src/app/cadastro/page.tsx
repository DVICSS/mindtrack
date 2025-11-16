"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Zap, User, Mail, Lock, AlertCircle, CheckCircle } from "lucide-react";

export default function CadastroPage() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCadastro = (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    // Validações
    if (!nome || !email || !senha || !confirmarSenha) {
      setErro("Preencha todos os campos");
      setLoading(false);
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve ter no mínimo 6 caracteres");
      setLoading(false);
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem");
      setLoading(false);
      return;
    }

    // Verificar se email já existe
    const usersData = localStorage.getItem("mindtrack_users");
    const users = usersData ? JSON.parse(usersData) : [];

    const emailExiste = users.find((u: any) => u.email === email);
    if (emailExiste) {
      setErro("Este email já está cadastrado");
      setLoading(false);
      return;
    }

    // Criar novo usuário
    const novoUsuario = {
      id: Date.now().toString(),
      nome,
      email,
      senha,
      plano: "FREE",
      xp: 0,
      nivel: 1,
      treinosConcluidos: 0,
      diasAtivos: 0,
      criadoEm: new Date().toISOString(),
    };

    users.push(novoUsuario);
    localStorage.setItem("mindtrack_users", JSON.stringify(users));

    // Fazer login automático
    localStorage.setItem("mindtrack_current_user", JSON.stringify(novoUsuario));

    // Redirecionar para home
    router.push("/");
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
          <p className="text-gray-400">Crie sua conta e comece a treinar</p>
        </div>

        {/* Formulário */}
        <div className="bg-[#111111] border border-[#00AEEF]/20 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Criar Conta</h2>

          {erro && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm">{erro}</span>
            </div>
          )}

          <form onSubmit={handleCadastro} className="space-y-4">
            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nome Completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#0A0A0A] border border-[#00AEEF]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00AEEF] transition-colors"
                  placeholder="Seu nome"
                />
              </div>
            </div>

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
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
            </div>

            {/* Confirmar Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirmar Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#0A0A0A] border border-[#00AEEF]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00AEEF] transition-colors"
                  placeholder="Digite a senha novamente"
                />
              </div>
            </div>

            {/* Botão Criar Conta */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#00AEEF] text-black font-bold rounded-lg hover:bg-[#00AEEF]/90 transition-all duration-300 shadow-lg shadow-[#00AEEF]/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Criando conta..." : "Criar Conta"}
            </button>
          </form>

          {/* Já tem conta */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Já tem uma conta?{" "}
              <Link href="/login" className="text-[#00AEEF] hover:text-[#00AEEF]/80 font-semibold transition-colors">
                Entrar
              </Link>
            </p>
          </div>
        </div>

        {/* Benefícios */}
        <div className="mt-6 bg-[#111111] border border-[#00AEEF]/20 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-white mb-3">Ao criar sua conta você terá:</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle className="w-4 h-4 text-[#00AEEF]" />
              Treinos personalizados
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle className="w-4 h-4 text-[#00AEEF]" />
              Acompanhamento de progresso
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle className="w-4 h-4 text-[#00AEEF]" />
              Acesso a aulas e VODs
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle className="w-4 h-4 text-[#00AEEF]" />
              Chat com IA especializada
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
