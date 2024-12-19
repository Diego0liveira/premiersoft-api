# Etapa 1: Build
FROM node:18-slim AS builder

# Atualizar pacotes e instalar dependências do sistema
RUN apt-get update && apt-get install -y bash curl netcat-openbsd

# Definir diretório de trabalho
WORKDIR /usr/src/app

# Copiar arquivos de dependências e instalar dependências
COPY package*.json ./
RUN npm install

# Copiar Prisma schema e gerar Prisma Client
COPY prisma ./prisma
RUN npx prisma generate

# Copiar o restante dos arquivos e rodar build
COPY . .
RUN npm run build

# Etapa 2: Produção
FROM node:18-slim

# Atualizar pacotes e instalar dependências para produção
RUN apt-get update && apt-get install -y bash curl netcat-openbsd

# Definir diretório de trabalho
WORKDIR /usr/src/app

# Copiar arquivos necessários da etapa de build
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/prisma ./prisma

# Copiar script wait-for-it
COPY ./wait-for-it.sh /usr/bin/wait-for-it
RUN chmod +x /usr/bin/wait-for-it

# Instalar apenas dependências de produção
RUN npm install --only=production

# Expor a porta da aplicação
EXPOSE 3000

# Esperar os serviços e iniciar a aplicação
CMD ["sh", "-c", "sleep 10 && npx prisma migrate deploy && node dist/main && node dist/microservice.js"]
