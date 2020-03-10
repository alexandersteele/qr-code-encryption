const QRCodeReader = require('qrcode-reader');
const Jimp = require("jimp");
const fs = require('fs');
const CryptoJS = require("crypto-js");
const QRCode = require('qrcode')

const createEncrpytedMessage = (input, secret) => CryptoJS.AES.encrypt(input, secret).toString();

const readQR = async (file) => {
    var buffer = fs.readFileSync(file);
    const image = await Jimp.read(buffer);
    const qr = new QRCodeReader();
    const resultPromise = new Promise((res, rej) => {
        qr.callback = (err, result) => res(result);
        qr.decode(image.bitmap);
    });
    return await resultPromise;
};

const decryptQR = (pathname, secret) => {
    if (typeof secret === 'undefined') {
        console.log("Undefined secret key...")
    } else {
        return new Promise ((res, rej) => {
            readQR(pathname)
            .then((qrData) => (
                res(CryptoJS.AES.decrypt(qrData.result, secret).toString(CryptoJS.enc.Utf8)))
            )
            .catch(e => rej(e))
        })
    }
}

const encryptQR = (pathname, message, secret) => {
    
    return new Promise ((res, rej) => {
        try {
            secret ? res(QRCode.toFile(pathname, createEncrpytedMessage(message, secret))) : 
                res(QRCode.toFile(pathname, message))
        } catch (e) {
            rej(e)
        }
    }) 
}

module.exports = {decryptQR, encryptQR};

