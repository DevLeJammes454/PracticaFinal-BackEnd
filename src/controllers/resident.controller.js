const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dbFilePath = path.join(__dirname, '../../data/db.json');

// Helper para leer los datos del JSON
const readData = async () => {
    try {
        const data = await fs.readFile(dbFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // Si el archivo no existe o está vacío, devolvemos un array vacío
        if (error.code === 'ENOENT') {
            return [];
        }
        throw error;
    }
};

// Helper para escribir los datos en el JSON
const writeData = async (data) => {
    await fs.writeFile(dbFilePath, JSON.stringify(data, null, 2));
};

// GET /api/residentes
const getResidents = async (req, res) => {
    const residents = await readData();
    res.json(residents);
};

// GET /api/residentes/:id
const getResidentById = async (req, res) => {
    const residents = await readData();
    const resident = residents.find(r => r.id === req.params.id);
    if (!resident) {
        return res.status(404).json({ message: 'Residente no encontrado' });
    }
    res.json(resident);
};

// POST /api/residentes
const createResident = async (req, res) => {
    const residents = await readData();

    const newResident = {
        id: uuidv4(), // Generamos un ID único
        ...req.body,
        foto: req.file ? req.file.path.replace(/\\/g, "/") : '' // Guardamos la ruta del archivo o un string vacío
    };

    // Los campos numéricos de multipart/form-data llegan como string, los convertimos
    if (newResident.telefono) {
        newResident.telefono = String(newResident.telefono);
    }

    residents.push(newResident);
    await writeData(residents);
    res.status(201).json(newResident);
};

// PUT /api/residentes/:id
const updateResident = async (req, res) => {
    let residents = await readData();
    const residentIndex = residents.findIndex(r => r.id === req.params.id);

    if (residentIndex === -1) {
        return res.status(404).json({ message: 'Residente no encontrado' });
    }

    const oldResident = residents[residentIndex];
    const updatedResident = { ...oldResident, ...req.body };

    // Si se sube un nuevo archivo, actualizamos la ruta y borramos el anterior (si existía)
    if (req.file) {
        if (oldResident.foto) {
            fs.unlink(path.resolve(oldResident.foto)).catch(err => console.error("No se pudo borrar la foto anterior:", err));
        }
        updatedResident.foto = req.file.path.replace(/\\/g, "/");
    }

    if (updatedResident.telefono) {
        updatedResident.telefono = String(updatedResident.telefono);
    }

    residents[residentIndex] = updatedResident;
    await writeData(residents);
    res.json(updatedResident);
};

// DELETE /api/residentes/:id
const deleteResident = async (req, res) => {
    let residents = await readData();
    const residentIndex = residents.findIndex(r => r.id === req.params.id);
    if (residentIndex === -1) {
        return res.status(404).json({ message: 'Residente no encontrado' });
    }

    const residentToDelete = residents[residentIndex];
    if (residentToDelete.foto) {
        fs.unlink(path.resolve(residentToDelete.foto)).catch(err => console.error("No se pudo borrar la foto:", err));
    }
    
    residents = residents.filter(r => r.id !== req.params.id);
    await writeData(residents);
    res.status(204).send(); // 204 No Content
};

module.exports = {
    getResidents,
    getResidentById,
    createResident,
    updateResident,
    deleteResident
};
