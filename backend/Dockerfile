# Étape 1 : Utiliser l'image officielle de Node.js
FROM node:22.11.0

# Étape 2 : Définir le répertoire de travail dans le container
WORKDIR /usr/src/app

# Étape 3 : Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Étape 4 : Installer les dépendances du projet
RUN npm install

# Étape 5 : Copier tout le code de l'application
COPY . .

# Étape 6 : Exposer le port sur lequel l'application écoute
EXPOSE 5000

CMD ["npm", "start"]

