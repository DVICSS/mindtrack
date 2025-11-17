# 🎮 MINDTRACK

**Treine sua mente. Aumente sua mira.**

Aplicativo gamer de treinamento inteligente para jogadores de Valorant e FPS, com design moderno (preto + azul neon), autenticação completa e sistema de perfil personalizado.

---

## 🚀 Tecnologias

- **Next.js 14** (App Router)
- **Supabase** (Autenticação + Banco de Dados + Storage)
- **TypeScript**
- **Tailwind CSS**
- **Lucide Icons**

---

## 📋 Funcionalidades

### ✅ Autenticação Completa
- Login com e-mail e senha
- Registro de novos usuários
- Logout seguro
- Proteção de rotas (apenas usuários autenticados)
- Persistência de sessão

### ✅ Sistema de Perfil
- **Foto de perfil**: Upload de avatar com armazenamento no Supabase Storage
- **Informações básicas**:
  - E-mail de login (somente leitura)
  - Nome de exibição
  - Nickname no Valorant
  - Região/Servidor
- **Dados do jogador**:
  - Rank atual
  - Função principal (Duelista, Controlador, Sentinela, Iniciador)
  - Sensibilidade do mouse
  - DPI
  - Mão dominante (Destro/Canhoto)
- **Segurança**:
  - Alterar e-mail de login (com confirmação)
  - Alterar senha (com validação mínima de 6 caracteres)
  - Senha nunca é exibida na tela

### 🎯 Outras Funcionalidades
- Treinos personalizados por IA
- Acompanhamento de progresso
- 20 aulas organizadas em categorias
- Chat IA (coach de Valorant)
- VODs de análises
- Sistema de ranking
- Planos de assinatura (Grátis, Pro, Premium)

---

## 🔧 Como Funciona

### 1. Login e Autenticação
1. Acesse `/login` para fazer login
2. Ou clique em "Criar conta" para se registrar em `/register`
3. Após login, você será redirecionado para `/dashboard`
4. Todas as rotas principais são protegidas e exigem autenticação

### 2. Perfil do Usuário
1. Clique na aba "Perfil" na barra de navegação inferior
2. **Alterar foto**:
   - Clique no ícone de câmera no avatar
   - Selecione uma imagem do seu dispositivo
   - A foto será enviada automaticamente para o Supabase Storage
   - Clique em "Salvar alterações" para confirmar
3. **Editar informações**:
   - Preencha os campos desejados
   - Clique em "Salvar alterações"
4. **Alterar e-mail**:
   - Clique em "Alterar e-mail"
   - Digite o novo e-mail duas vezes
   - Confirme com sua senha atual
   - Use o novo e-mail no próximo login
5. **Alterar senha**:
   - Clique em "Alterar senha"
   - Digite a senha atual
   - Digite a nova senha duas vezes (mínimo 6 caracteres)
   - Confirme a alteração

### 3. Treinos Personalizados
1. Acesse a aba "Treinos"
2. Responda às perguntas sobre seu elo, agente favorito e habilidade
3. Receba um treino personalizado com 4-6 exercícios
4. Marque como concluído ao finalizar

### 4. Progresso
1. Acesse a aba "Progresso"
2. Visualize seus dias ativos, treinos concluídos e melhorias
3. Acompanhe sua evolução com gráficos

### 5. Aulas
- 20 aulas organizadas em 4 categorias:
  - **Mira**: 3 aulas
  - **Movimentação**: 3 aulas
  - **Noção**: 3 aulas
  - **Agentes**: 3 aulas
- Cada aula tem thumbnail, título, descrição e link para YouTube

### 6. Assinaturas
- **Grátis**: Chat IA limitado, aulas básicas, treinos limitados
- **Pro**: Treinos ilimitados, Chat IA ilimitado, todas as aulas
  - Link: https://lastlink.com/p/C6D7515D5/checkout-payment/
- **Premium**: Tudo do Pro + benefícios futuros exclusivos
  - Link: https://lastlink.com/p/C8713235F/
- **Ativação manual**: Clique em "Já assinei" e escolha seu plano

---

## 🗄️ Estrutura do Banco de Dados

### Tabela: `profiles`
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  display_name TEXT,
  valorant_nick TEXT,
  region TEXT,
  rank TEXT,
  role TEXT,
  sensitivity TEXT,
  dpi TEXT,
  dominant_hand TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Storage Bucket: `avatars`
- Bucket público para armazenar fotos de perfil
- Acesso direto via URL pública

---

## 🎨 Design

### Tema Escuro Gamer
- **Fundo principal**: `#0A0A0A` (preto profundo)
- **Azul neon**: `#00AEEF` (cor primária)
- **Textos**: Branco e cinza claro
- **Cards**: Fundo `#111111` com borda azul neon
- **Botões**: Azul neon com glow e hover effects
- **Layout**: Mobile-first, responsivo

### Componentes Visuais
- Cards com bordas arredondadas e glow azul
- Botões com transições suaves
- Ícones minimalistas (Lucide)
- Tipografia moderna (Geist Sans)
- Navegação inferior fixa com 8 abas

---

## 🔐 Segurança

- **RLS (Row Level Security)**: Usuários só acessam seus próprios dados
- **Autenticação Supabase**: Sistema robusto e seguro
- **Validações**: Campos obrigatórios e validações de senha
- **Proteção de rotas**: Middleware para verificar autenticação
- **Senhas**: Nunca exibidas na interface

---

## 🛠️ Configuração

### Variáveis de Ambiente
As variáveis já foram configuradas automaticamente pela Lasy:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### Instalação
```bash
npm install
npm run dev
```

Acesse: http://localhost:3000

---

## 📱 Navegação

### Barra Inferior (8 abas)
1. **Início**: Dashboard principal
2. **Treinos**: Geração de treinos personalizados
3. **Progresso**: Acompanhamento de evolução
4. **Aulas**: 20 aulas em vídeo
5. **VODs**: Análises de partidas
6. **Chat IA**: Coach virtual de Valorant
7. **Ranking**: Classificação de usuários
8. **Perfil**: Gerenciamento de conta e dados

---

## 🎯 Próximos Passos

- [ ] Implementar sistema de XP e níveis
- [ ] Adicionar notificações push
- [ ] Criar sistema de conquistas
- [ ] Integrar API do Valorant para estatísticas reais
- [ ] Adicionar modo escuro/claro (toggle)
- [ ] Implementar sistema de amigos

---

## 📄 Licença

Este projeto é privado e de uso exclusivo.

---

## 🤝 Suporte

Para dúvidas ou problemas, entre em contato com o desenvolvedor.

---

**Desenvolvido com ❤️ para gamers que querem evoluir no Valorant**
