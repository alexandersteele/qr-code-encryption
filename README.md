# qr-code-encryption
![npm](https://img.shields.io/npm/v/qr-code-encryption)
![NPM](https://img.shields.io/npm/l/qr-code-encryption)
![node](https://img.shields.io/node/v/qr-code-encryption)


## Install
```
npm install qr-code-encryption
```

## Usage

#### Encrypt QR Codes
To encrypt data into a QR code:
* Insert the desired image location (if placed in a subfolder, please create this yourself) as the first parameter
* Insert the data (or message) as the second parameter
* Add a secret key as the third parameter
* (optional: add a callback to execute after the encryption has finished)

```
const { encryptQR } = require('qr-code-encryption');
encryptQR('code_images/encrypted_code.png', "hi bradley", "abcdef").then(() => {
    //code
})

```

#### Decrypt QR Codes
To decrypt a QR code:
* Insert the desired image location (if placed in a subfolder, please create this yourself) as the first parameter
* Add a secret key as the second parameter
* Add a callback to extract the message

```
const {decryptQR} = require('qr-code-encryption');
decryptQR('code_images/encrypted_code.png', "abcdef").then((msg) => console.log(msg))
````