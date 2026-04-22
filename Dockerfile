# ---------- build ----------
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---------- runtime ----------
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

# 👉 MUDA AQUI se for Vite (dist ao invés de build)
COPY --from=builder /app/build /usr/share/nginx/html

# SPA fix (evita 404/403 em rotas)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
