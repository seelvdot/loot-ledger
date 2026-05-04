# 🦾 Loot Ledger // Financial Cyber-Ops

[![Nx Monorepo](https://img.shields.io/badge/Nx-Monorepo-blueviolet?style=for-the-badge&logo=nx)](https://nx.dev)
[![Next.js](https://img.shields.io/badge/Next.js_16-App_Router-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![NestJS](https://img.shields.io/badge/NestJS_11-API-E0234E?style=for-the-badge&logo=nestjs)](https://nestjs.com)
[![Radix UI](https://img.shields.io/badge/Radix_UI-Design_System-2EAADC?style=for-the-badge&logo=radix-ui)](https://www.radix-ui.com/)

> **Loot Ledger** é um sistema de gerenciamento financeiro desenvolvido para o **Tech Challenge da FIAP (Fase 1)**. Ele combina uma arquitetura robusta em monorepo com uma interface futurista baseada na estética Cyberpunk/Neon.

---

## 🛠️ Arquitetura e Design System

O projeto utiliza o ecossistema **Nx** para gerenciar um monorepo moderno e escalável, com foco total em modularização e separação de interesses.

### 🎨 Design System & UI

A base visual e funcional do projeto foi construída utilizando o **Radix UI Themes**. Escolhemos o Radix como fundação por ser um sistema de componentes _headless_ de alta qualidade, que nos permitiu:

- **Acessibilidade Nativa**: Todos os componentes (Modais, Selects, Dropdowns) seguem os padrões WAI-ARIA.
- **Customização Total**: Utilizamos as primitivas do Radix integradas ao **Tailwind CSS v4** para criar a identidade visual Cyberpunk sem sacrificar a semântica.
- **Consistência**: O Design System é compartilhado entre as aplicações através de uma biblioteca dedicada (`libs/ui`), garantindo que a experiência visual seja idêntica em qualquer parte do ecossistema.

### 🏗️ Tech Stack

- **Frontend (`apps/loot-ledger-ui`)**: Next.js 16 (App Router), Radix UI, Tailwind CSS v4 e React 19.
- **Backend (`apps/loot-ledger-api`)**: NestJS 11 com arquitetura modular e persistência em memória isolada por sessão de usuário.
- **Shared UI (`libs/ui`)**: Biblioteca de componentes compartilhados baseada no Radix UI.

---

## 🚀 Como Executar o Projeto

Certifique-se de ter o **Node.js (v20+)** instalado em sua máquina.

### 1. Clonar e Instalar

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Entre na pasta
cd loot-ledger

# Instale as dependências
npm install
```

### 2. Rodar o Ambiente de Desenvolvimento

Você pode rodar ambos (Frontend e Backend) simultaneamente com um único comando:

```bash
npm run dev
```

Ou rodar individualmente:

```bash
# Apenas o Frontend (acessível em http://localhost:3000)
npm run dev:ui

# Apenas o Backend (acessível em http://localhost:3001/api)
npm run dev:api
```

---

## 🧪 Estrutura de Pastas

```text
apps/
  ├── loot-ledger-api/    # Backend NestJS (API Rest)
  └── loot-ledger-ui/     # Frontend Next.js (App Router)
libs/
  └── ui/                 # Design System (Radix UI + Tailwind)
```

## 👨‍💻 Autor

Desenvolvido como parte do **Postech - Tech Challenge da FIAP**.

---

_SYSTEM_STATUS: OPERATIONAL // LEDGER_SYNC: OK_
