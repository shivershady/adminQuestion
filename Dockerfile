FROM node:lts-alpine as build-dist
WORKDIR app
COPY package.json /app
RUN yarn
COPY . /app
RUN yarn run build

FROM nginx:stable-alpine
WORKDIR website
COPY --from=build-dist ./app/build /website
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]