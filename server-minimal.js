const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

console.log('=== MINIMAL SERVER STARTING ===');
console.log('Port:', port);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('All env vars:', Object.keys(process.env).length);

app.get('/', (req, res) => {
  res.json({
    message: 'Server is running!',
    port: port,
    env: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`=== SERVER STARTED ON PORT ${port} ===`);
}).on('error', (err) => {
  console.error('=== SERVER ERROR ===', err);
  process.exit(1);
});