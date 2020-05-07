FROM node:alpine3.11

COPY . /app
WORKDIR /app

RUN yarn && yarn build

FROM nginx:stable-alpine
COPY --from=0 /app/public /usr/share/nginx/html

# support running as arbitrary user which belongs to the root group
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx

# users are not allowed to listen on privileged ports
RUN sed -i.bak 's/listen\(.*\)80;/listen\18081;/' /etc/nginx/conf.d/default.conf
EXPOSE 8081

# comment user directive as master process can be run as a regular user anyhow
RUN sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf

RUN addgroup nginx root
USER nginx
