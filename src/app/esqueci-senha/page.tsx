"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { requestPasswordReset, resetPassword } from '@/lib/auth';
import { Zap, Mail, Lock, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<'request' | 'verify'>('request');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleRequestCode = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = requestPasswordReset(email);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    if (result.code) {
      setGeneratedCode(result.code);
      setStep('verify');
    }

    setLoading(false);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }

    const result = await resetPassword(email, code, newPassword);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    if (result.success) {
      alert('Senha alterada com sucesso!');
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-blue">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            MINDTRACK
          </h1>
          <p className="text-muted-foreground">
            {step === 'request' ? 'Recuperar senha' : 'Redefinir senha'}
          </p>
        </div>

        {/* Card */}
        <div className="p-8 rounded-2xl bg-card border border-border/50 shadow-xl space-y-6">
          {step === 'request' ? (
            // Etapa A - Solicitar código
            <form onSubmit={handleRequestCode} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-primary to-secondary text-white font-bold"
              >
                {loading ? 'Enviando...' : 'Enviar código'}
              </Button>

              <div className="text-center text-sm">
                <Link
                  href="/login"
                  className="text-primary hover:underline"
                >
                  Voltar para login
                </Link>
              </div>
            </form>
          ) : (
            // Etapa B - Verificar código e redefinir
            <div className="space-y-6">
              {/* Mostrar código gerado */}
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 space-y-3">
                <p className="text-sm text-muted-foreground">
                  Seu código de recuperação:
                </p>
                <div className="flex items-center justify-between gap-3">
                  <code className="text-2xl font-bold text-primary tracking-wider">
                    {generatedCode}
                  </code>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={handleCopyCode}
                    className="flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copiado
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copiar
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Válido por 15 minutos
                </p>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Código de 6 dígitos</Label>
                  <Input
                    id="code"
                    type="text"
                    placeholder="123456"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    maxLength={6}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nova senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Mínimo 8 caracteres"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Mínimo 8 caracteres, 1 número e 1 letra
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Digite a senha novamente"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-primary to-secondary text-white font-bold"
                >
                  {loading ? 'Redefinindo...' : 'Redefinir senha'}
                </Button>

                <div className="text-center text-sm">
                  <button
                    type="button"
                    onClick={() => setStep('request')}
                    className="text-primary hover:underline"
                  >
                    Solicitar novo código
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
