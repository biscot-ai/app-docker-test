# Commandes Docker utiles pour cette application

## Construction et démarrage

```bash
# Construire l'image Docker
docker build -t docker-test-app .

# Démarrer tous les services avec docker-compose
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter tous les services
docker-compose down

# Arrêter et supprimer les volumes
docker-compose down -v
```

## Commandes de base Docker

```bash
# Lister les conteneurs en cours d'exécution
docker ps

# Lister toutes les images
docker images

# Entrer dans un conteneur
docker exec -it <container_name> /bin/sh

# Voir les logs d'un conteneur
docker logs <container_name>

# Supprimer un conteneur
docker rm <container_name>

# Supprimer une image
docker rmi <image_name>
```

## Commandes spécifiques à cette app

```bash
# Reconstruire uniquement l'app
docker-compose up --build app

# Redémarrer uniquement la base de données
docker-compose restart postgres

# Voir les logs de l'app uniquement
docker-compose logs -f app

# Exécuter des commandes dans le conteneur de l'app
docker-compose exec app sh

# Exécuter des commandes SQL dans PostgreSQL
docker-compose exec postgres psql -U testuser -d testdb
```

## Nettoyage

```bash
# Nettoyer les conteneurs arrêtés
docker container prune

# Nettoyer les images non utilisées
docker image prune

# Nettoyer les volumes non utilisés
docker volume prune

# Nettoyer tout ce qui n'est pas utilisé
docker system prune -a
```

## Accès aux services

- Application web: http://localhost:3000
- Adminer (interface de BDD): http://localhost:8080
- Base de données PostgreSQL: localhost:5432