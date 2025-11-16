"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Zap } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    elo: "",
    agente: "",
    proPlayer: "",
  });

  const elos = ["Ferro", "Bronze", "Prata", "Ouro", "Platina", "Diamante", "Ascendente", "Imortal", "Radiante"];
  const agentes = ["Jett", "Reyna", "Phoenix", "Raze", "Yoru", "Neon", "Sage", "Killjoy", "Cypher", "Chamber", "Sova", "Breach", "Skye", "KAY/O", "Fade", "Omen", "Brimstone", "Viper", "Astra", "Harbor"];
  const proPlayers = ["Aspas", "TenZ", "Derke", "Yay", "Cned", "Less", "Sacy", "Saadhak", "Pancada", "Cauanzin"];

  const handleSubmit = () => {
    // Simula geração de rotina pela IA
    localStorage.setItem("userProfile", JSON.stringify(formData));
    router.push("/treinos");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-4">
            <Zap className="w-4 h-4" />
            Onboarding Inteligente
          </div>
          <h1 className="text-4xl font-bold mb-2">Configure seu perfil</h1>
          <p className="text-muted-foreground">A IA vai criar uma rotina personalizada para você</p>
        </div>

        <div className="bg-card border border-border/50 rounded-2xl p-8 space-y-8">
          {/* Progress Bar */}
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                  s <= step ? "bg-gradient-to-r from-primary to-secondary" : "bg-muted"
                }`}
              />
            ))}
          </div>

          {/* Step 1: Elo */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-2xl font-bold">Qual seu elo atual?</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {elos.map((elo) => (
                  <button
                    key={elo}
                    onClick={() => setFormData({ ...formData, elo })}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.elo === elo
                        ? "border-primary bg-primary/10 text-primary font-bold"
                        : "border-border hover:border-primary/50 hover:bg-primary/5"
                    }`}
                  >
                    {elo}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Agente */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-2xl font-bold">Qual seu agente principal?</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
                {agentes.map((agente) => (
                  <button
                    key={agente}
                    onClick={() => setFormData({ ...formData, agente })}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.agente === agente
                        ? "border-primary bg-primary/10 text-primary font-bold"
                        : "border-border hover:border-primary/50 hover:bg-primary/5"
                    }`}
                  >
                    {agente}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Pro Player */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-2xl font-bold">Qual pro player te inspira?</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {proPlayers.map((player) => (
                  <button
                    key={player}
                    onClick={() => setFormData({ ...formData, proPlayer: player })}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.proPlayer === player
                        ? "border-primary bg-primary/10 text-primary font-bold"
                        : "border-border hover:border-primary/50 hover:bg-primary/5"
                    }`}
                  >
                    {player}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 rounded-xl border border-border hover:bg-muted transition-all duration-200"
              >
                Voltar
              </button>
            )}
            
            <button
              onClick={() => {
                if (step < 3) {
                  setStep(step + 1);
                } else {
                  handleSubmit();
                }
              }}
              disabled={
                (step === 1 && !formData.elo) ||
                (step === 2 && !formData.agente) ||
                (step === 3 && !formData.proPlayer)
              }
              className="ml-auto px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-bold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {step === 3 ? "Gerar Rotina" : "Próximo"}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Preview */}
        {formData.elo && formData.agente && formData.proPlayer && (
          <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 animate-fade-in">
            <h3 className="font-bold mb-2 text-primary">Prévia da sua rotina:</h3>
            <p className="text-sm text-foreground/80">
              Você é <span className="font-bold text-primary">{formData.elo}</span>, joga de{" "}
              <span className="font-bold text-secondary">{formData.agente}</span> e se inspira em{" "}
              <span className="font-bold text-primary">{formData.proPlayer}</span>. Seu treino será focado em{" "}
              {formData.agente === "Jett" || formData.agente === "Reyna" ? "flicks rápidos e movimentação agressiva" : "posicionamento estratégico e controle de mapa"}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
