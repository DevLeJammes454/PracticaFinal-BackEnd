const { Router } = require('express');
const {
    getResidents,
    getResidentById,
    createResident,
    updateResident,
    deleteResident
} = require('../controllers/resident.controller');

const router = Router();

router.get('/', getResidents);
router.get('/:id', getResidentById);
router.post('/', createResident);
router.put('/:id', updateResident);
router.delete('/:id', deleteResident);

module.exports = router;

