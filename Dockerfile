#официальный образ node.js
FROM node:23

#рабочая директория
WORKDIR /

#копируем package- и package-lock.json
COPY package*.json ./

#устанавливаем зависимости
RUN npm install

#копируем остальные файлы
COPY . .

#порт
EXPOSE 3000

#запуск
CMD ["node", "dist/index.js"]

