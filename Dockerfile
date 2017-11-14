FROM fnichol/uhttpd
ADD ./dist /www
EXPOSE 80
