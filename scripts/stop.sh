#!/bin/bash

echo "🛑 Arrêt de l'application Docker..."

# Arrêter tous les services
docker-compose down

echo "🧹 Nettoyage des ressources..."

# Optionnel: supprimer les volumes (décommentez si nécessaire)
# docker-compose down -v

echo "✅ Application arrêtée avec succès!"