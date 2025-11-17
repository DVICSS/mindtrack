"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import ProtectedRoute from "@/components/ProtectedRoute";
import { User, Camera, Save, Mail, Lock, X, Check, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

function PerfilContent() {
  const { user } = useAuth();
  const router = useRouter();

  // Estados do perfil
  const [displayName, setDisplayName] = useState("");
  const [valorantNick, setValorantNick] = useState("");
  const [region, setRegion] = useState("");
  const [rank, setRank] = useState("");
  const [role, setRole] = useState("");
  const [sensitivity, setSensitivity] = useState("");
  const [dpi, setDpi] = useState("");
  const [dominantHand, setDominantHand] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  // Estados dos modais
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Estados de formulários
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Estados de feedback
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [loading, setLoading] = useState(false);

  // Carregar dados do perfil
  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Erro ao carregar perfil:", error);
        return;
      }

      if (data) {
        setDisplayName(data.display_name || "");
        setValorantNick(data.valorant_nick || "");
        setRegion(data.region || "");
        setRank(data.rank || "");
        setRole(data.role || "");
        setSensitivity(data.sensitivity || "");
        setDpi(data.dpi || "");
        setDominantHand(data.dominant_hand || "");
        setAvatarUrl(data.avatar_url || "");
      }
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
    }
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.from("profiles").upsert({
        id: user?.id,
        display_name: displayName,
        valorant_nick: valorantNick,
        region: region,
        rank: rank,
        role: role,
        sensitivity: sensitivity,
        dpi: dpi,
        dominant_hand: dominantHand,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;

      setMessage("Perfil atualizado com sucesso!");
      setMessageType("success");
    } catch (error: any) {
      setMessage(error.message || "Erro ao atualizar perfil");
      setMessageType("error");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${user?.id}-${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

      setAvatarUrl(data.publicUrl);
      setMessage("Foto atualizada! Clique em 'Salvar alterações' para confirmar.");
      setMessageType("success");
    } catch (error: any) {
      setMessage(error.message || "Erro ao fazer upload da foto");
      setMessageType("error");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleChangeEmail = async () => {
    if (newEmail !== confirmEmail) {
      setMessage("Os e-mails não coincidem");
      setMessageType("error");
      return;
    }

    if (!currentPassword) {
      setMessage("Digite sua senha atual");
      setMessageType("error");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        email: newEmail,
      });

      if (error) throw error;

      setMessage("E-mail atualizado. Use o novo e-mail no próximo login.");
      setMessageType("success");
      setShowEmailModal(false);
      setNewEmail("");
      setConfirmEmail("");
      setCurrentPassword("");
    } catch (error: any) {
      setMessage(error.message || "Erro ao atualizar e-mail");
      setMessageType("error");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("As senhas não coincidem");
      setMessageType("error");
      return;
    }

    if (newPassword.length < 6) {
      setMessage("A senha deve ter no mínimo 6 caracteres");
      setMessageType("error");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      setMessage("Senha alterada com sucesso.");
      setMessageType("success");
      setShowPasswordModal(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      setMessage(error.message || "Erro ao alterar senha");
      setMessageType("error");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-24">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Meu Perfil</h1>
          <p className="text-gray-400 text-sm">Gerencie seus dados e configurações</p>
        </div>

        {/* Mensagem de feedback */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
              messageType === "success"
                ? "bg-green-500/20 border border-green-500/50 text-green-400"
                : "bg-red-500/20 border border-red-500/50 text-red-400"
            }`}
          >
            {messageType === "success" ? (
              <Check className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <p className="text-sm">{message}</p>
          </div>
        )}

        {/* Seção de Avatar */}
        <div className="bg-[#111111] border border-[#00AEEF]/20 rounded-2xl p-6 mb-6">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-[#00AEEF]/20 flex items-center justify-center overflow-hidden border-2 border-[#00AEEF]/50">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-[#00AEEF]" />
                )}
              </div>
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 w-8 h-8 bg-[#00AEEF] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#00AEEF]/80 transition-colors"
              >
                <Camera className="w-4 h-4 text-black" />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>
            <p className="text-sm text-gray-400">Clique no ícone para alterar foto</p>
          </div>
        </div>

        {/* Informações Básicas */}
        <div className="bg-[#111111] border border-[#00AEEF]/20 rounded-2xl p-6 mb-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-[#00AEEF]" />
            Informações Básicas
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">E-mail de login</label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#00AEEF]/20 rounded-xl text-gray-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Nome de exibição</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Como você quer ser chamado"
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#00AEEF]/20 rounded-xl focus:border-[#00AEEF] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Nickname no Valorant</label>
              <input
                type="text"
                value={valorantNick}
                onChange={(e) => setValorantNick(e.target.value)}
                placeholder="Seu nick no jogo"
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#00AEEF]/20 rounded-xl focus:border-[#00AEEF] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Região/Servidor</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#00AEEF]/20 rounded-xl focus:border-[#00AEEF] focus:outline-none transition-colors"
              >
                <option value="">Selecione</option>
                <option value="BR">Brasil</option>
                <option value="NA">América do Norte</option>
                <option value="LATAM">LATAM</option>
                <option value="EU">Europa</option>
                <option value="AP">Ásia-Pacífico</option>
              </select>
            </div>
          </div>
        </div>

        {/* Dados do Jogador */}
        <div className="bg-[#111111] border border-[#00AEEF]/20 rounded-2xl p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">Dados do Jogador</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Rank atual</label>
              <select
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#00AEEF]/20 rounded-xl focus:border-[#00AEEF] focus:outline-none transition-colors"
              >
                <option value="">Selecione</option>
                <option value="Ferro">Ferro</option>
                <option value="Bronze">Bronze</option>
                <option value="Prata">Prata</option>
                <option value="Ouro">Ouro</option>
                <option value="Platina">Platina</option>
                <option value="Diamante">Diamante</option>
                <option value="Ascendente">Ascendente</option>
                <option value="Imortal">Imortal</option>
                <option value="Radiante">Radiante</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Função principal</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#00AEEF]/20 rounded-xl focus:border-[#00AEEF] focus:outline-none transition-colors"
              >
                <option value="">Selecione</option>
                <option value="Duelista">Duelista</option>
                <option value="Controlador">Controlador</option>
                <option value="Sentinela">Sentinela</option>
                <option value="Iniciador">Iniciador</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Sensibilidade</label>
                <input
                  type="text"
                  value={sensitivity}
                  onChange={(e) => setSensitivity(e.target.value)}
                  placeholder="Ex: 0.35"
                  className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#00AEEF]/20 rounded-xl focus:border-[#00AEEF] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">DPI</label>
                <input
                  type="text"
                  value={dpi}
                  onChange={(e) => setDpi(e.target.value)}
                  placeholder="Ex: 800"
                  className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#00AEEF]/20 rounded-xl focus:border-[#00AEEF] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Mão dominante</label>
              <select
                value={dominantHand}
                onChange={(e) => setDominantHand(e.target.value)}
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#00AEEF]/20 rounded-xl focus:border-[#00AEEF] focus:outline-none transition-colors"
              >
                <option value="">Selecione</option>
                <option value="Destro">Destro</option>
                <option value="Canhoto">Canhoto</option>
              </select>
            </div>
          </div>
        </div>

        {/* Botões Principais */}
        <div className="space-y-4">
          <button
            onClick={handleSaveProfile}
            disabled={loading}
            className="w-full px-6 py-4 bg-[#00AEEF] text-black font-bold rounded-xl hover:bg-[#00AEEF]/90 transition-all duration-300 shadow-lg shadow-[#00AEEF]/50 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            {loading ? "Salvando..." : "Salvar alterações"}
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setShowEmailModal(true)}
              className="px-6 py-3 bg-transparent border-2 border-[#00AEEF] text-[#00AEEF] font-bold rounded-xl hover:bg-[#00AEEF]/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Alterar e-mail
            </button>

            <button
              onClick={() => setShowPasswordModal(true)}
              className="px-6 py-3 bg-transparent border-2 border-[#00AEEF] text-[#00AEEF] font-bold rounded-xl hover:bg-[#00AEEF]/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Lock className="w-5 h-5" />
              Alterar senha
            </button>
          </div>
        </div>
      </div>

      {/* Modal Alterar E-mail */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#111111] border border-[#00AEEF]/30 rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Alterar E-mail</h3>
              <button
                onClick={() => setShowEmailModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Novo e-mail</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="novo@email.com"
                  className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#00AEEF]/20 rounded-xl focus:border-[#00AEEF] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Confirmar novo e-mail</label>
                <input
                  type="email"
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                  placeholder="novo@email.com"
                  className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#00AEEF]/20 rounded-xl focus:border-[#00AEEF] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Senha atual</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#00AEEF]/20 rounded-xl focus:border-[#00AEEF] focus:outline-none transition-colors"
                />
              </div>

              <button
                onClick={handleChangeEmail}
                disabled={loading}
                className="w-full px-6 py-3 bg-[#00AEEF] text-black font-bold rounded-xl hover:bg-[#00AEEF]/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Salvando..." : "Salvar novo e-mail"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Alterar Senha */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#111111] border border-[#00AEEF]/30 rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Alterar Senha</h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Senha atual</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#00AEEF]/20 rounded-xl focus:border-[#00AEEF] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Nova senha</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#00AEEF]/20 rounded-xl focus:border-[#00AEEF] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Confirmar nova senha</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#00AEEF]/20 rounded-xl focus:border-[#00AEEF] focus:outline-none transition-colors"
                />
              </div>

              <button
                onClick={handleChangePassword}
                disabled={loading}
                className="w-full px-6 py-3 bg-[#00AEEF] text-black font-bold rounded-xl hover:bg-[#00AEEF]/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Salvando..." : "Salvar nova senha"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Perfil() {
  return (
    <ProtectedRoute>
      <PerfilContent />
    </ProtectedRoute>
  );
}
