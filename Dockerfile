# Используем официальный образ Node.js
FROM node:20

# Устанавливаем рабочую директорию
WORKDIR /zumi-backend

# Копируем package.json и package-lock.json в контейнер
COPY package*.json ./

# Устанавливаем зависимости с помощью npm
RUN npm install
RUN npm install -g @nestjs/cli

# Копируем все файлы проекта в контейнер
COPY . .

# Проверяем установленную версию npm
RUN npm -v

# Строим проект с использованием локальной версии NestJS CLI
RUN npx nest build

# Открываем порт 3000 для приложения
EXPOSE 3000

# Запускаем приложение с помощью pm2
CMD ["npm", "run", "pm2:dev"]
