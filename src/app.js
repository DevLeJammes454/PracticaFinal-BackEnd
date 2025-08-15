const express = require('express');
const cors = require('cors');
const residentRoutes = require('./routers/resident.routes');

const app = express();

// Middlewares
app.use(cors()); // Permite la comunicación entre dominios
app.use(express.json()); // Permite al servidor entender JSON en el body de las peticiones

// Servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static('uploads'));

// Rutas
app.use('/api/residentes', residentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;
