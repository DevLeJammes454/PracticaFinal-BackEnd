const { Router } = require('express');
const {
    getResidents,
    getResidentById,
    createResident,
    updateResident,
    deleteResident
} = require('../controllers/resident.controller.js');
const { validateResident, parseJsonFields } = require('../validators/resident.validator.js');
const upload = require('../middlewares/upload.middleware.js');

const router = Router();

router.get('/', getResidents);
router.get('/:id', getResidentById);

// El orden es importante: 1. Multer, 2. Parseo, 3. Validación, 4. Controlador
const residentMiddlewares = [upload.single('foto'), parseJsonFields, validateResident];

router.post('/', residentMiddlewares, createResident);
router.put('/:id', residentMiddlewares, updateResident);
router.delete('/:id', deleteResident);

module.exports = router;
