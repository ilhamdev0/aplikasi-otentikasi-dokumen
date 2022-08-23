const QRCode = require('qrcode')

export const qrcode_string = (signature) => {
    return QRCode.toString(signature, {
        type: 'svg',
        errorCorrectionLevel: 'L',
        version: 12
    }, (err, hasil) => hasil)
}

export const qrcode_file = () => {

}