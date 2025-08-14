# ==== Этап 1: Сборка ====
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_API_URL
ARG VITE_MEDIA_URL
ARG VITE_WEBSOCKET_UTL
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_MEDIA_URL=$VITE_MEDIA_URL
ENV VITE_WEBSOCKET_UTL=$VITE_WEBSOCKET_UTL

RUN npm run build

# ==== Этап 2: Сервер для статики ====
FROM nginx:1.27-alpine

# Копируем собранные файлы React
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
