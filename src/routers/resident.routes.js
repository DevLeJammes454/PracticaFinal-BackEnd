const { Router } = require('express');
const {
    getResidents,
    getResidentById,
    createResident,
    updateResident,
    deleteResident
} = require('../controllers/resident.controller.js');
const { validateResident } = require('../validators/resident.validator.js');

const router = Router();

router.get('/', getResidents);
router.get('/:id', getResidentById);
router.post('/', validateResident, createResident);
router.put('/:id', validateResident, updateResident);
router.delete('/:id', deleteResident);

module.exports = router;
