import { PDFDocument } from 'pdf-lib'
const dirTree = require("directory-tree");
import { string } from '@ioc:Adonis/Core/Helpers'
const fs = require('fs-extra');

const posisi = (max_width: number, max_height: number, qr_width: number, qr_height: number, x_percent: number, y_percent: number): object => {
    return {
        x: (max_width - qr_width) * (x_percent / 100),
        y: (max_height - qr_height) * (y_percent / 100)
    }
}

// load semua dokumen yang ada di server
export const uploaded = (path) => {
    let fileuploaded = dirTree(
        path, {
        extensions: /\.pdf/,
        attributes: ['size'],
        exclude: /hasil/
    }
    ).children

    if (fileuploaded.length) {
        fileuploaded = fileuploaded.map(elm => ({ nama: elm.name, ukuran: string.prettyBytes(elm.size, { unitSeparator: ' ' }), path: elm.path }));
    }

    return fileuploaded
}

export const pdfeditor = async (
    doc,
    readQR: Buffer,
    hal: number,
    ukuranQR: number,
    x: number,
    y: number
) => {

    const readPDF = fs.readFileSync(doc.path)

    const dokumen = await PDFDocument.load(readPDF)
    const digisign = await dokumen.embedPng(readQR)

    const halaman = dokumen.getPages()
    const editHalaman = halaman[hal - 1]
    const size = digisign.scale(ukuranQR)

    const posisi_qrcode = posisi(
        editHalaman.getWidth(),
        editHalaman.getHeight(),
        size.width,
        size.height,
        x,
        y
    )

    editHalaman.drawImage(digisign, { ...posisi_qrcode, ...{ width: size.width, height: size.height, } })

    const hasil = {
        nama: doc.nama,
        data: await dokumen.save()
    }

    return hasil
}

export const savePDF = (dokumen, path) => {
    fs.outputFileSync(path, dokumen);
}