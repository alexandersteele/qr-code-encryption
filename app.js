const QRCode = require('qrcode')
const QRCodeReader = require('qrcode-reader');
const Jimp = require("jimp");
const fs = require('fs');
const CryptoJS = require("crypto-js");


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

module.exports = encryptQR = (pathname, message, secret) => {
    return new Promise ((res, rej) => {
        try {
            res(QRCode.toFile(pathname, createEncrpytedMessage(message, secret)))
        } catch (e) {
            rej(e)
        }
    })     
}

module.exports = decryptQR = (pathname, secret) => {
    return new Promise ((res, rej) => {
        readQR(pathname)
        .then((qrData) => (
            res(CryptoJS.AES.decrypt(qrData.result, secret).toString(CryptoJS.enc.Utf8)))
        )
        .catch(e => rej(e))
    })
}

encryptQR('code_images/encrypted_code.png', "hi bradley", "abcdef").then(() => {
    decryptQR('code_images/encrypted_code.png', "abcdef").then((x) => console.log(x)) 
})
