"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MessageSquare, Send, Bot } from "lucide-react";

export default function ChatPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState("");
  const [chat, setChat] = useState<Array<{ tipo: 'user' | 'bot'; texto: string }>>([
    { tipo: 'bot', texto: 'Olá! Sou seu coach de Valorant. Como posso te ajudar hoje?' }
  ]);

  useEffect(() => {
    const currentUser = localStorage.getItem("mindtrack_current_user");
    if (!currentUser) {
      router.push("/login");
      return;
    }
    setLoading(false);
  }, [router]);

  const enviarMensagem = () => {
    if (!mensagem.trim()) return;

    // Adicionar mensagem do usuário
    const novoChat = [...chat, { tipo: 'user' as const, texto: mensagem }];
    setChat(novoChat);
    setMensagem("");

    // Simular resposta do bot
    setTimeout(() => {
      const respostas = [
        "Ótima pergunta! Para melhorar sua mira, recomendo treinar 15 minutos diários no Aim Lab focando em Gridshot e Microshot.",
        "Sobre sensibilidade, o ideal é encontrar um valor que permita fazer um giro de 180° com um movimento do mouse. Teste entre 0.3 e 0.5 com 800 DPI.",
        "Para melhorar seu posicionamento, sempre pense em ter cobertura e ângulos de escape. Nunca fique exposto a múltiplos ângulos.",
        "Game sense vem com experiência. Assista VODs de profissionais e analise suas próprias partidas para identificar padrões.",
        "Para controle de spray, pratique no The Range. Comece devagar e aumente a velocidade gradualmente mantendo a precisão.",
      ];
      
      const resposta = respostas[Math.floor(Math.random() * respostas.length)];
      setChat([...novoChat, { tipo: 'bot', texto: resposta }]);
    }, 1000);
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
      <div className="container mx-auto px-4 max-w-4xl h-[calc(100vh-200px)] flex flex-col">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Chat IA</h1>
          <p className="text-gray-400">Seu coach pessoal de Valorant</p>
        </div>

        {/* Chat Container */}
        <div className="flex-1 bg-[#111111] border border-[#00AEEF]/20 rounded-2xl p-6 overflow-y-auto mb-4">
          <div className="space-y-4">
            {chat.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3 ${msg.tipo === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.tipo === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-[#00AEEF]/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-[#00AEEF]" />
                  </div>
                )}
                <div
                  className={`max-w-[70%] p-4 rounded-2xl ${
                    msg.tipo === 'user'
                      ? 'bg-[#00AEEF] text-black'
                      : 'bg-[#0A0A0A] text-white border border-[#00AEEF]/20'
                  }`}
                >
                  <p className="text-sm">{msg.texto}</p>
                </div>
                {msg.tipo === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="flex gap-3">
          <input
            type="text"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && enviarMensagem()}
            placeholder="Digite sua pergunta..."
            className="flex-1 px-4 py-3 bg-[#111111] border border-[#00AEEF]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00AEEF]"
          />
          <button
            onClick={enviarMensagem}
            className="px-6 py-3 bg-[#00AEEF] text-black font-bold rounded-lg hover:bg-[#00AEEF]/90 transition-all duration-300 shadow-lg shadow-[#00AEEF]/50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">
          Plano FREE: 10 mensagens por dia | Upgrade para PRO para mensagens ilimitadas
        </p>
      </div>
    </div>
  );
}
