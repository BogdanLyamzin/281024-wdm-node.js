# ==== Этап 1: Сборка ====
FROM node:22-alpine AS builder

# Рабочая директория
WORKDIR /app

# Устанавливаем только prod-зависимости для сборки
COPY package*.json tsconfig.json ./
RUN npm ci

# Копируем исходники и компилируем TypeScript
COPY src ./src
RUN npm run build

# ==== Этап 2: Запуск ====
FROM node:22-alpine

WORKDIR /app

# Копируем только нужные файлы для запуска
COPY package*.json ./
RUN npm ci --omit=dev

# Копируем собранный код с предыдущего этапа
COPY --from=builder /app/dist ./dist

# Создаём temp для multer
RUN mkdir -p /app/temp

EXPOSE 3000 5000

# Запуск приложения
CMD ["node", "dist/index.js"]
