# ⚽ SoccerInfo - Dashboard de Gestão Esportiva

Um sistema moderno e completo para gerenciamento de times, jogos e resultados esportivos, desenvolvido com **Next.js 16**, **TypeScript** e **Prisma**. O projeto inclui autenticação segura, upload de imagens e um dashboard interativo.

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando as melhores práticas e ferramentas mais recentes do ecossistema React:

-   **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
-   **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
-   **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)
-   **ORM:** [Prisma](https://www.prisma.io/) (v7)
-   **Autenticação:** [NextAuth.js v5 (Auth.js)](https://authjs.dev/)
-   **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/)
-   **Validação:** [Zod](https://zod.dev/)
-   **Uploads:** Vercel Blob / Cloudinary
-   **Criptografia:** BcryptJS

## 📂 Estrutura do Projeto

A estrutura de pastas segue o padrão do Next.js App Router:

```bash
src/
├── actions/        # Server Actions (Lógica de backend)
├── api/            # Route Handlers (API Endpoints)
├── app/            # Páginas e Layouts (App Router)
│   ├── (private)/  # Rotas protegidas (Dashboard, Times, Jogos)
│   └── (public)/   # Rotas públicas (Login, Registro)
├── components/     # Componentes Reutilizáveis
├── generated/      # Cliente Prisma gerado
├── lib/            # Configurações de bibliotecas (Prisma, Utils)
├── types/          # Definições de Tipos e Interfaces
└── prisma/         # Schema do Banco de Dados e Migrations
```

## 🛠️ Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

*   [Node.js](https://nodejs.org/) (versão 20 ou superior recomendada)
*   [PostgreSQL](https://www.postgresql.org/) (Local ou via Docker)
*   Gerenciador de pacotes NPM (geralmente vem com o Node)

## ⚙️ Configuração e Instalação

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/seu-usuario/soccerinfo.git
    cd soccerinfo
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**

    Crie um arquivo `.env` na raiz do projeto e preencha com as suas configurações (baseado no exemplo abaixo):

    ```env
    # Conexão com o Banco de Dados (PostgreSQL)
    DATABASE_URL="postgresql://usuario:senha@localhost:5432/soccerinfo?schema=public"

    # Segredo para Autenticação (Gere um com: openssl rand -base64 32)
    AUTH_SECRET="seu_segredo_super_seguro"
    
    # URL da Aplicação (Em produção, use o domínio real)
    AUTH_URL="http://localhost:3000"

    # Configurações de Upload (Se estiver usando Cloudinary ou Vercel Blob)
    BLOB_READ_WRITE_TOKEN=""
    # ou
    CLOUDINARY_URL=""
    ```

4.  **Configure o Banco de Dados (Prisma):**

    Gere o cliente do Prisma e execute as migrações para criar as tabelas:

    ```bash
    # Gera os artefatos do Prisma (Client)
    npx prisma generate

    # Aplica as migrações ao banco de dados
    npx prisma migrate dev --name init
    ```

## ▶️ Executando o Projeto

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

O aplicativo estará disponível em [http://localhost:3000](http://localhost:3000).

## 🗃️ Modelagem de Dados

O sistema possui as seguintes entidades principais:

*   **User:** Usuários do sistema (autenticação via credenciais ou OAuth).
*   **Teams:** Times de futebol (Nome, Logo).
*   **Games:** Partidas (Data, Time da Casa, Time Visitante, Placar, Status).

## 🔒 Autenticação

O projeto utiliza **NextAuth.js v5** para gerenciar sessões.
*   Rotas dentro de `(private)` requerem login.
*   Middleware configurado em `auth.config.ts` protege as rotas.

## 🤝 Contribuição

1.  Faça um Fork do projeto
2.  Crie uma Branch para sua Feature (`git checkout -b feature/MinhaFeature`)
3.  Faça o Commit (`git commit -m 'Adicionando uma nova feature'`)
4.  Faça o Push (`git push origin feature/MinhaFeature`)
5.  Abra um Pull Request

---

Desenvolvido com 💙 usando Next.js