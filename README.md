# Docker Test App

Application Node.js containerisée pour tester les capacités de Docker.

## Développement local

```bash
# Démarrer avec Docker
./scripts/start.sh

# Ou manuellement
docker-compose up -d

# Arrêter
docker-compose down
```

## Déploiement sur Railway

1. **Créer un compte** sur [Railway](https://railway.app)
2. **Connecter GitHub** et sélectionner ce repository
3. **Configurer les variables d'environnement** :
   - Railway ajoutera automatiquement `DATABASE_URL` avec PostgreSQL
   - Le `PORT` est configuré automatiquement
4. **Déployer** - Railway détectera automatiquement le Dockerfile

## Variables d'environnement

Voir `.env.example` pour les variables nécessaires.

## Accès aux services

- **App** : Port configuré (3000 par défaut)
- **Health check** : `/health`
- **API** : `/api/test-db`, `/api/users`

## Structure

- `server.js` - Application Express
- `Dockerfile` - Configuration Docker
- `docker-compose.yml` - Services pour développement
- `railway.json` - Configuration Railway
- `init.sql` - Initialisation PostgreSQL