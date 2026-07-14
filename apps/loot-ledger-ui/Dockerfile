# 1. Stage de build
FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Instala as dependências necessárias para o build
COPY package*.json ./
COPY nx.json tsconfig.base.json ./
RUN npm ci --legacy-peer-deps

# Copia todo o monorepo (respeitando o .dockerignore)
COPY . .

# Define as variáveis de ambiente em tempo de compilação (Next.js as embutirá no bundle client-side)
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_WIDGET_MFE_URL

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_WIDGET_MFE_URL=$NEXT_PUBLIC_WIDGET_MFE_URL

# Executa o build usando o Nx
RUN npx nx build loot-ledger-ui --configuration=production

# 2. Stage de runtime
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Instala apenas as dependências de produção
COPY package*.json ./
RUN npm ci --only=production --legacy-peer-deps

# Copia os arquivos gerados no build e a pasta public
COPY --from=builder /app/apps/loot-ledger-ui/.next ./apps/loot-ledger-ui/.next
COPY --from=builder /app/apps/loot-ledger-ui/public ./apps/loot-ledger-ui/public

EXPOSE 3000

# Inicia o Next.js apontando para a pasta do build
CMD ["npx", "next", "start", "apps/loot-ledger-ui"]
