const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      }
    : {
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'testdb',
        user: process.env.DB_USER || 'testuser',
        password: process.env.DB_PASSWORD || 'testpass',
        port: process.env.DB_PORT || 5432,
      }
);

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Docker Test App</title></head>
      <body>
        <h1>Application de test Docker</h1>
        <p>Serveur Node.js en cours d'exécution dans un conteneur Docker</p>
        <p>Port: ${port}</p>
        <p>Environment: ${process.env.NODE_ENV || 'development'}</p>
        <div>
          <h2>Actions disponibles:</h2>
          <button onclick="testDb()">Tester la base de données</button>
          <button onclick="getUsers()">Lister les utilisateurs</button>
          <button onclick="addUser()">Ajouter un utilisateur</button>
        </div>
        <div id="result"></div>
        <script>
          async function testDb() {
            try {
              const response = await fetch('/api/test-db');
              const data = await response.json();
              document.getElementById('result').innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
            } catch (error) {
              document.getElementById('result').innerHTML = '<p style="color: red;">Erreur: ' + error.message + '</p>';
            }
          }

          async function getUsers() {
            try {
              const response = await fetch('/api/users');
              const data = await response.json();
              document.getElementById('result').innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
            } catch (error) {
              document.getElementById('result').innerHTML = '<p style="color: red;">Erreur: ' + error.message + '</p>';
            }
          }

          async function addUser() {
            const name = prompt('Nom de l\\'utilisateur:');
            if (name) {
              try {
                const response = await fetch('/api/users', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ name })
                });
                const data = await response.json();
                document.getElementById('result').innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
              } catch (error) {
                document.getElementById('result').innerHTML = '<p style="color: red;">Erreur: ' + error.message + '</p>';
              }
            }
          }
        </script>
      </body>
    </html>
  `);
});

app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() as current_time, version() as version');
    res.json({
      success: true,
      data: result.rows[0],
      message: 'Connexion à la base de données réussie'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'Erreur de connexion à la base de données'
    });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        error: 'Le nom est requis'
      });
    }
    
    const result = await pool.query(
      'INSERT INTO users (name, created_at) VALUES ($1, NOW()) RETURNING *',
      [name]
    );
    
    res.json({
      success: true,
      data: result.rows[0],
      message: 'Utilisateur créé avec succès'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Serveur démarré sur http://0.0.0.0:${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});