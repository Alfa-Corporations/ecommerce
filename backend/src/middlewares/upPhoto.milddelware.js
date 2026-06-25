const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');

const UpPhoto = async (files) => {
    const uploadsDir = path.join(__dirname, '../../uploads');
    await fs.promises.mkdir(uploadsDir, { recursive: true });

    const uploadPromises = files.map(async (file) => {
        const timestamp = Date.now();
        const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');

        if (file.mimetype && file.mimetype.startsWith('image/')) {
            const filename = `${timestamp}-${safeName}.webp`;
            const filepath = path.join(uploadsDir, filename);

            const image = await Jimp.read(file.buffer);
            image.resize(1280, Jimp.AUTO);
            image.quality(80);
            const processedBuffer = await image.getBufferAsync(Jimp.MIME_WEBP);

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