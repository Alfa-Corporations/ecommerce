const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const UpPhoto = (files) => {
    const result = [];
    const promises = files.map((file, i) => {
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype
        };
        return new Promise((resolve, reject) => {
            s3.upload(params, (error, data) => {
                if (error) {
                    reject(error);
                }
                result.push(data.Location);
                resolve();
            });
        });
    });
    return Promise.all(promises).then(() => result);
}

module.exports = UpPhoto;