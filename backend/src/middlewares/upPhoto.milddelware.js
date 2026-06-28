const fs = require('fs');
const path = require('path');

const UpPhoto = async (files) => {
    // 1. Ruta absoluta de la carpeta de subidas
    const uploadsDir = path.join(__dirname, '../../uploads');

    // 2. Crear el directorio nativamente si no existe
    await fs.promises.mkdir(uploadsDir, { recursive: true });

    // 3. Procesar cada archivo en paralelo
    const uploadPromises = files.map(async (file) => {
        const timestamp = Date.now();

        // Sanitizar el nombre original para evitar problemas con caracteres extraños
        const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');

        // Conservar el formato/extensión original que viene desde el frontend
        const filename = `${timestamp}-${safeName}`;
        const filepath = path.join(uploadsDir, filename);

        // 4. Guardar el buffer crudo directamente en el servidor de forma nativa
        await fs.promises.writeFile(filepath, file.buffer);

        // Retornar la URL limpia para tu base de datos
        return `/uploads/${encodeURIComponent(filename)}`;
    });

    return Promise.all(uploadPromises);
};

module.exports = UpPhoto;
