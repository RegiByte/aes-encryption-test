const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const secret = 'some super secret pass';
const IV_LENGTH = 16;
const encryptEncoding = 'base64';

const secretBuffer = Buffer.from(Buffer.from(secret, 'utf8').toString('base64'), 'utf8');

const encrypt = text => {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(algorithm, secretBuffer, iv);
    const encrypted = cipher.update(text);
    const finalEncrypted = Buffer.concat([encrypted, cipher.final()]);
    return `${iv.toString(encryptEncoding)}:${finalEncrypted.toString(encryptEncoding)}`
};

const decrypt = text => {
    const [iv, encryptedText] = text.split(':').map(part => Buffer.from(part, encryptEncoding));
    const decipher = crypto.createDecipheriv(algorithm, secretBuffer, iv);
    const decrypted = decipher.update(encryptedText);
    const finalDecrypted = Buffer.concat([decrypted, decipher.final()]);
    return finalDecrypted.toString('utf8')
};

module.exports = {
    encrypt,
    decrypt
};
