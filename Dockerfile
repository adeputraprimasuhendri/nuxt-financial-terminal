FROM node:24-alpine AS builder

ARG ENV=development

WORKDIR /app

COPY . .

RUN cp -f .server.env.${ENV} .env

RUN npm install

RUN npm run build

RUN npm run generate

# ---------- Stage 2: Nginx ----------
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy generated Nuxt files
COPY --from=builder /app/dist /usr/share/nginx/html

COPY .server/vhost.conf /etc/nginx/conf.d/vhost.conf

# Expose port
EXPOSE 8080

# Run nginx
CMD ["nginx", "-g", "daemon off;"]