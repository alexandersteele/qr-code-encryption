
var QRCode = require('qrcode')
var QrCode = require('qrcode-reader');
var Jimp = require("jimp");
var fs = require('fs');

QRCode.toFile('code_images/code.png', 'hi brad', async() => {
    const qrData = await readQR();
    console.log(qrData.result);
})

const readQR = async () => {
    var buffer = fs.readFileSync('code_images/code.png');
    const image = await Jimp.read(buffer);
    const qr = new QrCode();
    const resultPromise = new Promise((res, rej) => {
        qr.callback = (err, result) => {
            res(result);
        };
        qr.decode(image.bitmap);
    });
    const result = await resultPromise;
    return result;
};
