# Используем официальный образ Nginx
FROM nginx:alpine

# Устанавливаем рабочую директорию
WORKDIR /usr/share/nginx/html

# Удаляем дефолтные файлы Nginx
RUN rm -rf ./*

# Копируем содержимое проекта в контейнер
COPY . .

# Контейнер будет слушать порт 80
EXPOSE 80

# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]
