#!/bin/bash

echo "🚀 Démarrage de l'application Docker..."

# Vérifier si Docker est installé
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Vérifier si docker-compose est installé
if ! command -v docker-compose &> /dev/null; then
    echo "❌ docker-compose n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Arrêter les services existants
echo "🛑 Arrêt des services existants..."
docker-compose down

# Construire et démarrer les services
echo "🏗️  Construction et démarrage des services..."
docker-compose up --build -d

# Attendre que les services soient prêts
echo "⏳ Attente que les services soient prêts..."
sleep 10

# Vérifier le statut des services
echo "📊 Statut des services:"
docker-compose ps

echo ""
echo "✅ Application démarrée avec succès!"
echo "📱 Application web: http://localhost:3000"
echo "🗄️  Interface de BDD (Adminer): http://localhost:8080"
echo "🔍 Pour voir les logs: docker-compose logs -f"
echo "🛑 Pour arrêter: docker-compose down"