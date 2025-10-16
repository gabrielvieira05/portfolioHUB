# Water Guardian

Um fórum de discussão sobre conservação e uso consciente da água, desenvolvido com Next.js, Prisma e PostgreSQL.

## 🚀 Tecnologias

- Next.js 15
- Prisma
- PostgreSQL
- NextAuth.js
- TypeScript
- Tailwind CSS

## 📋 Pré-requisitos

- Node.js 18 ou superior
- PostgreSQL
- pnpm (gerenciador de pacotes)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/juanferreira13/waterguardian.git
cd waterguardian
```

2. Instale as dependências:
```bash
pnpm install
```

3. Configure o banco de dados PostgreSQL:
   - Instale o PostgreSQL em sua máquina
   - Crie um banco de dados chamado `water_guardian`
   - Mantenha a porta padrão (5432)

4. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto
   - Adicione as seguintes variáveis:
   ```
   DATABASE_URL="postgresql://postgres:sua_senha@localhost:5432/water_guardian"
   NEXTAUTH_SECRET="sua_chave_secreta_aqui"
   NEXTAUTH_URL="http://localhost:3000"
   ```
   (Substitua "sua_senha" pela senha do seu PostgreSQL)

5. Execute as migrações do Prisma:
```bash
npx prisma generate
npx prisma db push
```

6. Inicie o servidor de desenvolvimento:
```bash
pnpm dev
```

O projeto estará disponível em `http://localhost:3000`

## 🌟 Funcionalidades

- Registro e login de usuários
- Criação de posts no fórum
- Comentários em posts
- Interface responsiva
- Autenticação segura

## 🛠️ Estrutura do Projeto

```
waterguardian/
├── app/                    # Rotas e páginas da aplicação
│   ├── api/               # Endpoints da API
│   └── (routes)/          # Rotas da aplicação
├── components/            # Componentes React
├── lib/                   # Utilitários e configurações
├── prisma/               # Schema e migrações do Prisma
└── public/               # Arquivos estáticos
```

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.