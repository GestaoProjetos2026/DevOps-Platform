# ---------- build ----------
FROM node:20-alpine AS builder

WORKDIR /app

# 1. Instala as dependências do sistema necessárias para compilar pacotes nativos (C++/SQLite)
RUN apk add --no-cache python3 make g++

# Copy package info
COPY package*.json ./
# Install ALL dependencies (including devDependencies needed for typescript)
RUN npm install

# Copy source code
COPY . .

# Build typescript code
RUN npm run build

# ---------- runtime ----------
FROM node:20-alpine

WORKDIR /app

# 2. Instala as ferramentas de build novamente para a instalação de produção
RUN apk add --no-cache python3 make g++

# Copy package info for runtime install
COPY package*.json ./
# Install ONLY production dependencies (reduces image size)
RUN npm install --omit=dev

# 3. Remove as ferramentas de compilação após a instalação para manter a imagem final leve e segura
RUN apk del python3 make g++

# Copy compiled code from builder
COPY --from=builder /app/dist ./dist

# Expose backend port
EXPOSE 3001
ENV PORT=3001
ENV DB_TYPE=postgres

CMD ["npm", "start"]