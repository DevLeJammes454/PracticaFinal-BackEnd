const Joi = require('joi');

const allowedCarreras = [
    'Ingeniería en Sistemas Computacionales',
    'Ingeniería en Tecnologías de la Información',
    'Ingeniería en Informática',
    'Ingeniería en Gestión Empresarial'
];

const allowedLenguajes = [
    'JavaScript',
    'TypeScript',
    'HTML+CSS',
    'PHP',
    'Python',
    'C++',
    'C#'
];

// Creamos un esquema dinámico para los lenguajes de programación
const lenguajesSchema = Joi.object(
    allowedLenguajes.reduce((acc, lang) => {
        // Usamos Joi.boolean() para asegurarnos de que los valores sean true/false
        acc[lang] = Joi.boolean();
        return acc;
    }, {})
);

const residentSchema = Joi.object({
    nombre: Joi.string().trim().min(1).required().messages({
        'string.empty': 'El nombre no puede estar vacío.',
        'any.required': 'El campo nombre es obligatorio.'
    }),
    apellido: Joi.string().trim().min(1).required().messages({
        'string.empty': 'El apellido no puede estar vacío.',
        'any.required': 'El campo apellido es obligatorio.'
    }),
    genero: Joi.string().valid('Masculino', 'Femenino').required().messages({
        'string.empty': 'El género tiene que ser entre masculino y femenino.',
        'any.required': 'El campo género es obligatorio.'
    }),

    fechaNacimiento: Joi.date().iso().max('now').required().messages({
        'date.base': 'La fecha de nacimiento debe ser una fecha válida en formato YYYY-MM-DD.',
        'date.max': 'La fecha de nacimiento no puede ser posterior al día de hoy.',
        'any.required': 'El campo fecha de nacimiento es obligatorio.'
    }),
    telefono: Joi.string().length(10).pattern(/^[0-9]+$/).required().messages({
        'string.length': 'El teléfono debe tener exactamente 10 dígitos.',
        'string.pattern.base': 'El teléfono solo debe contener números.',
        'any.required': 'El campo teléfono es obligatorio.'
    }),
    correoElectronico: Joi.string().email().required().messages({
        'string.email': 'Debe proporcionar un correo electrónico válido.',
        'any.required': 'El campo correo electrónico es obligatorio.'
    }),
    institutoProcedencia: Joi.string().trim().min(1).required().messages({
        'string.empty': 'El instituto de procedencia no puede estar vacío.',
        'any.required': 'El campo instituto de procedencia es obligatorio.'
    }),
    carrera: Joi.string().valid(...allowedCarreras).required().messages({
        'any.only': `La carrera debe ser una de las siguientes opciones: ${allowedCarreras.join(', ')}`,
        'any.required': 'El campo carrera es obligatorio.'
    }),
    lenguajesProgramacion: lenguajesSchema.required().messages({
        'any.required': 'El campo lenguajes de programación es obligatorio.'
    }),

    notas: Joi.string().allow('').optional(),
    // No validamos el 'id' aquí porque es generado por el servidor
    id: Joi.string().uuid().optional()
});

const parseJsonFields = (req, res, next) => {
    try {
        if (req.body.lenguajesProgramacion && typeof req.body.lenguajesProgramacion === 'string') {
            req.body.lenguajesProgramacion = JSON.parse(req.body.lenguajesProgramacion);
        }
    } catch (error) {
        return res.status(400).json({ message: 'Error: El campo lenguajesProgramacion no es un JSON válido.', details: error.message });
    }
    next();
};

const validateResident = (req, res, next) => {
    const { error } = residentSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errors = error.details.map(detail => detail.message);
        return res.status(400).json({ message: 'Error de validación', errors });
    }

    next();
};

module.exports = { validateResident, parseJsonFields };
