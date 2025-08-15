const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directorio donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
        // Genera un nombre de archivo único para evitar colisiones
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Filtro para aceptar solo ciertos tipos de archivos de imagen
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const mimetype = allowedTypes.test(file.mimetype);
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    }
    cb(new Error('Error: ¡Solo se permiten archivos de imagen (jpeg, jpg, png, gif)!'));
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 1024 * 1024 * 5 } }); // Límite de 5MB

module.exports = upload;
