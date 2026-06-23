const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const UpPhoto = async (files) => {
    const uploadsDir = path.join(__dirname, '../../uploads');
    await fs.promises.mkdir(uploadsDir, { recursive: true });

    const uploadPromises = files.map(async (file) => {
        const timestamp = Date.now();
        const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');

        if (file.mimetype && file.mimetype.startsWith('image/')) {
            const filename = `${timestamp}-${safeName}.webp`;
            const filepath = path.join(uploadsDir, filename);

            const processedBuffer = await sharp(file.buffer)
                .resize({ width: 1280, withoutEnlargement: true })
                .webp({ quality: 80 })
                .toBuffer();

            await fs.promises.writeFile(filepath, processedBuffer);
            return `/uploads/${encodeURIComponent(filename)}`;
        }

        // non-image fallback: save raw buffer
        const filename = `${timestamp}-${safeName}`;
        const filepath = path.join(uploadsDir, filename);
        await fs.promises.writeFile(filepath, file.buffer);
        return `/uploads/${encodeURIComponent(filename)}`;
    });

    return Promise.all(uploadPromises);
};

module.exports = UpPhoto;