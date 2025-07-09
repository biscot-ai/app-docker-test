#!/bin/bash

echo "🧹 Nettoyage complet Docker..."

# Arrêter tous les services
docker-compose down -v

# Supprimer les images liées au projet
echo "🗑️  Suppression des images du projet..."
docker rmi docker-test-app:latest 2>/dev/null || true

# Nettoyer les conteneurs arrêtés
echo "🗑️  Nettoyage des conteneurs arrêtés..."
docker container prune -f

# Nettoyer les images non utilisées
echo "🗑️  Nettoyage des images non utilisées..."
docker image prune -f

# Nettoyer les volumes non utilisés
echo "🗑️  Nettoyage des volumes non utilisés..."
docker volume prune -f

# Nettoyer les réseaux non utilisés
echo "🗑️  Nettoyage des réseaux non utilisés..."
docker network prune -f

echo "✅ Nettoyage terminé!"