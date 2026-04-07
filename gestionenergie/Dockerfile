# Étape 1 : build
FROM node:20-alpine as build

WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code source
COPY . .

# Build de l'application React
RUN npm run build

# Étape 2 : serveur Nginx
FROM nginx:alpine

# Copier le build React vers le dossier Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copier le fichier de configuration Nginx si tu en as un
COPY ../default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]