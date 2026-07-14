# 1. Stage de build
FROM node:20-alpine AS builder
WORKDIR /app

# Instala as dependências necessárias para o build
COPY package*.json ./
COPY nx.json tsconfig.base.json ./
RUN npm ci --legacy-peer-deps

# Copia todo o monorepo (respeitando o .dockerignore)
COPY . .

# Executa o build usando o Nx
RUN npx nx build loot-ledger-api --configuration=production

# 2. Stage de runtime
FROM node:20-alpine AS runner
WORKDIR /app
ENV PORT=3001
ENV NODE_ENV=production

# Copia a saída do build (código compilado e package.json gerado)
COPY --from=builder /app/dist/apps/loot-ledger-api ./dist

# Instala apenas as dependências de produção para a API
WORKDIR /app/dist
RUN npm install --omit=dev --legacy-peer-deps

EXPOSE 3001

CMD ["node", "main.js"]
