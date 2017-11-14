FROM nginx:stable-alpine
ADD ./dist /usr/share/nginx/html
EXPOSE 80
