-- Script d'initialisation de la base de données
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertion de quelques données de test
INSERT INTO users (name) VALUES 
    ('Alice'),
    ('Bob'),
    ('Charlie')
ON CONFLICT DO NOTHING;