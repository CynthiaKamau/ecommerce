FROM node:alpine as builder
WORKDIR '/app/ecommerce'
COPY package.json /app/ecommerce
RUN npm install
COPY . /app/ecommerce
RUN ["npm", "run", "build"]

FROM nginx
COPY --from=builder /app/ecommerce/build /usr/share/nginx/html