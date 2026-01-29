FROM node:22-alpine as build

WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

# Run
FROM nginx:stable-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]