"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, Star, Zap, Crown, ExternalLink } from "lucide-react";

export default function AssinaturasPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [planoSelecionado, setPlanoSelecionado] = useState("");

  useEffect(() => {
    const currentUser = localStorage.getItem("mindtrack_current_user");
    if (!currentUser) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(currentUser));
    setLoading(false);
  }, [router]);

  const ativarPlano = () => {
    if (!planoSelecionado) {
      alert("Selecione um plano");
      return;
    }

    // Atualizar usuário
    const usersData = localStorage.getItem("mindtrack_users");
    const users = usersData ? JSON.parse(usersData) : [];
    
    const updatedUsers = users.map((u: any) => {
      if (u.id === user.id) {
        return { ...u, plano: planoSelecionado };
      }
      return u;
    });

    localStorage.setItem("mindtrack_users", JSON.stringify(updatedUsers));
    
    const updatedUser = { ...user, plano: planoSelecionado };
    localStorage.setItem("mindtrack_current_user", JSON.stringify(updatedUser));
    
    setUser(updatedUser);
    setMostrarModal(false);
    alert(`Plano ${planoSelecionado} ativado com sucesso!`);
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
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Escolha seu Plano</h1>
          <p className="text-gray-400">
            Plano atual: <span className="text-[#00AEEF] font-semibold">{user?.plano || "FREE"}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* FREE */}
          <div className="bg-[#111111] border border-[#00AEEF]/20 rounded-2xl p-8">
            <div className="text-center mb-6">
              <Star className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">GRÁTIS</h2>
              <p className="text-3xl font-bold text-[#00AEEF]">R$ 0</p>
              <p className="text-sm text-gray-500">para sempre</p>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-sm">
                <Check className="w-5 h-5 text-[#00AEEF]" />
                Chat IA limitado (10 msg/dia)
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="w-5 h-5 text-[#00AEEF]" />
                Aulas básicas
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="w-5 h-5 text-[#00AEEF]" />
                Treinos limitados (3/semana)
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="w-5 h-5 text-[#00AEEF]" />
                Progresso básico
              </li>
            </ul>

            <button
              disabled
              className="w-full py-3 bg-gray-700 text-gray-400 font-bold rounded-lg cursor-not-allowed"
            >
              Plano Atual
            </button>
          </div>

          {/* PRO */}
          <div className="bg-gradient-to-br from-[#00AEEF]/20 to-[#000000] border-2 border-[#00AEEF] rounded-2xl p-8 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#00AEEF] text-black text-xs font-bold rounded-full">
              MAIS POPULAR
            </div>
            
            <div className="text-center mb-6">
              <Zap className="w-12 h-12 text-[#00AEEF] mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">PRO</h2>
              <p className="text-3xl font-bold text-[#00AEEF]">R$ 29,90</p>
              <p className="text-sm text-gray-500">por mês</p>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-sm">
                <Check className="w-5 h-5 text-[#00AEEF]" />
                Chat IA ilimitado
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="w-5 h-5 text-[#00AEEF]" />
                Todas as aulas
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="w-5 h-5 text-[#00AEEF]" />
                Treinos ilimitados
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="w-5 h-5 text-[#00AEEF]" />
                Análise de progresso avançada
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="w-5 h-5 text-[#00AEEF]" />
                Suporte prioritário
              </li>
            </ul>

            <a
              href="https://lastlink.com/p/C6D7515D5/checkout-payment/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#00AEEF] text-black font-bold rounded-lg hover:bg-[#00AEEF]/90 transition-all duration-300 shadow-lg shadow-[#00AEEF]/50 flex items-center justify-center gap-2 mb-3"
            >
              Assinar PRO
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={() => {
                setPlanoSelecionado("PRO");
                setMostrarModal(true);
              }}
              className="w-full py-2 bg-transparent border border-[#00AEEF] text-[#00AEEF] font-semibold rounded-lg hover:bg-[#00AEEF]/10 transition-all duration-300"
            >
              Já assinei
            </button>
          </div>

          {/* PREMIUM */}
          <div className="bg-[#111111] border border-yellow-500/50 rounded-2xl p-8">
            <div className="text-center mb-6">
              <Crown className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">PREMIUM</h2>
              <p className="text-3xl font-bold text-yellow-500">R$ 49,90</p>
              <p className="text-sm text-gray-500">por mês</p>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-sm">
                <Check className="w-5 h-5 text-yellow-500" />
                Tudo do PRO
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="w-5 h-5 text-yellow-500" />
                Análise de VODs personalizada
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="w-5 h-5 text-yellow-500" />
                Coaching 1-on-1 mensal
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="w-5 h-5 text-yellow-500" />
                Acesso antecipado a features
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="w-5 h-5 text-yellow-500" />
                Badge exclusivo
              </li>
            </ul>

            <a
              href="https://lastlink.com/p/C8713235F/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-all duration-300 shadow-lg shadow-yellow-500/50 flex items-center justify-center gap-2 mb-3"
            >
              Assinar PREMIUM
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={() => {
                setPlanoSelecionado("PREMIUM");
                setMostrarModal(true);
              }}
              className="w-full py-2 bg-transparent border border-yellow-500 text-yellow-500 font-semibold rounded-lg hover:bg-yellow-500/10 transition-all duration-300"
            >
              Já assinei
            </button>
          </div>
        </div>

        {/* Modal */}
        {mostrarModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-[#111111] border border-[#00AEEF]/20 rounded-2xl p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold mb-4">Ativar Plano {planoSelecionado}</h3>
              <p className="text-gray-400 mb-6">
                Confirme que você já realizou a compra do plano {planoSelecionado} e deseja ativá-lo agora.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setMostrarModal(false)}
                  className="flex-1 py-3 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={ativarPlano}
                  className="flex-1 py-3 bg-[#00AEEF] text-black font-bold rounded-lg hover:bg-[#00AEEF]/90 transition-all"
                >
                  Ativar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
