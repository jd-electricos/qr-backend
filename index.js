// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/sequelize.js');
const app = express();
const uploadRoutes = require('./routes/driveRoutes.js');
// Middleware
app.use(cors());
app.use(express.json());
// Rutas
app.use('/api/drive', uploadRoutes);
// Sincronizar modelos con la base de datos
sequelize.sync({ alter: true })
  .then(() => console.log('Tablas sincronizadas con éxito'))
  .catch(err => console.error('Error al sincronizar tablas:', err));
// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});