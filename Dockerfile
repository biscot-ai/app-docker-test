# Utilise l'image officielle Node.js
FROM node:18-alpine

# Définit le répertoire de travail
WORKDIR /app

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm ci --omit=dev

# Copie le reste des fichiers de l'application
COPY . .

# Crée un utilisateur non-root pour la sécurité
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Change le propriétaire des fichiers
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose le port 3000
EXPOSE 3000

# Définit les variables d'environnement par défaut
ENV NODE_ENV=production
ENV PORT=3000

# Commande de démarrage
CMD ["node", "server.js"]