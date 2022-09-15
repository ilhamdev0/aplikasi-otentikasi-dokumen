const QRCode = require('qrcode')
const svg2img = require('svg2img');
const fs = require('fs-extra');

export const qrcode_string = (signature) => {
    const qrcode = QRCode.toString(signature, {
        type: 'svg',
        errorCorrectionLevel: 'L',
        version: 12
    }, (err, hasil) => hasil)

    const qrcode_transparent = qrcode.replace(`fill="#ffffff"`, `fill="#ffffff" fill-opacity="0"`)

    return qrcode_transparent
}

export const qrcode_png = (qrcode, path) => {
    const filepath = `${path}/digisign.png`

    svg2img(qrcode, {
        resvg: {
            fitTo: {
                mode: 'height', // or height
                value: 480,
            },
        }
    }, (error, buffer) => {
        fs.outputFileSync(filepath, buffer)
    });
}