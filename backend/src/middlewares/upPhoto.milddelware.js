const { S3Client } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const UpPhoto = async (files) => {
    const uploadPromises = files.map(async (file) => {
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        const upload = new Upload({
            client: s3Client,
            params,
        });

        const result = await upload.done();
        return result.Location || `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${encodeURIComponent(file.originalname)}`;
    });

    return Promise.all(uploadPromises);
};

module.exports = UpPhoto;