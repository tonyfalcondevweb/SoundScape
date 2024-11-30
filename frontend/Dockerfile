# Étape 1 : Utiliser l'image officielle Node.js pour Vite.js
FROM node:22.11.0

# Étape 2 : Créer un répertoire de travail dans le conteneur
WORKDIR /app

# Étape 3 : Copier package.json et package-lock.json
COPY package*.json ./

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier tout le reste du code du client
COPY . .

# Étape 6 : Exposer le port 5173 pour développement
EXPOSE 5173

# Étape 7 : Lancer le serveur de développement de Vite.js
CMD ["npm", "run", "dev"]
