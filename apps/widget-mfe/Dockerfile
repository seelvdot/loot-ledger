# 1. Stage de build
FROM node:20-alpine AS builder
WORKDIR /app

# Instala as dependências necessárias para o build
COPY package*.json ./
COPY nx.json tsconfig.base.json ./
RUN npm ci --legacy-peer-deps

# Copia todo o monorepo (respeitando o .dockerignore)
COPY . .

# Define a variável de ambiente em tempo de compilação
ARG NX_PUBLIC_API_URL
ENV NX_PUBLIC_API_URL=$NX_PUBLIC_API_URL

# Executa o build usando o Nx
RUN npx nx build widget_mfe --configuration=production

# 2. Stage de runtime usando Nginx
FROM nginx:alpine AS runner

# Copia a configuração customizada do Nginx
COPY apps/widget-mfe/nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos estáticos compilados para o diretório padrão do Nginx
COPY --from=builder /app/dist/apps/widget-mfe /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
