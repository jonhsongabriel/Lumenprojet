FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . /app
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /var/www/html
EXPOSE 80
