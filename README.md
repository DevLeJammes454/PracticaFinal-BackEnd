# Softwareland - API de Registro de Residentes

Este proyecto contiene el backend para la aplicación de registro de residentes de "softwareland". Provee una API RESTful para gestionar (crear, leer, actualizar y eliminar) los registros de los residentes, incluyendo la subida de sus fotos de perfil.

## Características

- **API REST Completa:** Endpoints para todas las operaciones CRUD (Crear, Leer, Actualizar, Eliminar).
- **Persistencia en JSON:** Los datos se almacenan de forma persistente en un archivo `data/db.json`.
- **Validación de Datos:** Se utiliza `Joi` para asegurar que los datos enviados a la API cumplan con el formato y las reglas requeridas.
- **Manejo de Archivos:** Implementación de `multer` para la subida de imágenes de perfil de los residentes.
- **Servidor de Desarrollo:** Configurado con `nodemon` para reinicio automático durante el desarrollo.

## Tecnologías Utilizadas

- Node.js
- Express.js
- Joi - Para validación de esquemas de datos.
- Multer - Para manejo de `multipart/form-data` (subida de archivos).
- UUID - Para la generación de identificadores únicos.
- CORS - Para habilitar peticiones desde otros dominios.

## Instalación y Puesta en Marcha

Sigue estos pasos para tener una copia del proyecto corriendo localmente.

1.  **Clonar el Repositorio**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd PracticaFinal-BackEnd
    ```

2.  **Instalar Dependencias**
    Abre una terminal en la raíz del proyecto y ejecuta:
    ```bash
    npm install
    ```

3.  **Crear Carpetas Necesarias**
    Asegúrate de que existan las siguientes carpetas en la raíz del proyecto:
    - `data/` (con un archivo `db.json` vacío `[]` dentro)
    - `uploads/`

4.  **Ejecutar el Servidor**
    Para iniciar el servidor en modo de desarrollo, ejecuta:
    ```bash
    npm run dev
    ```
    El servidor estará corriendo en `http://localhost:3000`.

## Endpoints de la API

La URL base para todos los endpoints es `http://localhost:3000/api/residentes`.

### Obtener todos los residentes
- **Método:** `GET`
- **URL:** `/`

### Obtener un residente por ID
- **Método:** `GET`
- **URL:** `/:id`

### Crear un nuevo residente
- **Método:** `POST`
- **URL:** `/`
- **Body:** `multipart/form-data` con los campos del modelo de residente. El campo `foto` debe ser de tipo `File`.

### Actualizar un residente
- **Método:** `PUT`
- **URL:** `/:id`
- **Body:** `multipart/form-data` con los campos a actualizar.

### Eliminar un residente
- **Método:** `DELETE`
- **URL:** `/:id`

## Modelo de Datos (Residente)

| Campo                       | Tipo de Dato | Tipo de Campo | Opciones (si aplica)                                                                                                                                                           |
| :-------------------------- | :----------- | :------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `nombre`                    | String       | Input         | —                                                                                                                                                                              |
| `apellido`                  | String       | Input         | —                                                                                                                                                                              |
| `genero`                    | String       | Radio Button  | `Masculino` / `Femenino`                                                                                                                                                       |
| `fechaNacimiento`           | Date String  | Date Input    | No puede ser después de hoy                                                                                                                                                    |
| `telefono`                  | Number       | Input         | 10 dígitos exactos                                                                                                                                                             |
| `correoElectronico`         | String       | Input         | —                                                                                                                                                                              |
| `foto`                      | File         | File Input    | —                                                                                                                                                                              |
| `institutoProcedencia`      | String       | Input         | —                                                                                                                                                                              |
| `carrera`                   | String       | Select        | - Ingeniería en Sistemas Computacionales <br> - Ingeniería en Tecnologías de la Información <br> - Ingeniería en Informática <br> - Ingeniería en Gestión Empresarial             |
| `lenguajesProgramacion`     | Object Bool  | Checkbox      | - JavaScript <br> - TypeScript <br> - HTML+CSS <br> - PHP <br> - Python <br> - C++ <br> - C#                                                                                     |
| `notas`                     | String       | TextArea      | —                                                                                                                                                                              |
