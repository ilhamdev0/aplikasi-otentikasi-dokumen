import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import User from 'App/Models/User'
import Digisign from 'App/Models/Digisign'
import { qrcode_string, qrcode_png } from "App/Logic/qrcode"
import { uploaded, pdfeditor, savePDF } from "App/Logic/pdf"
import Drive from '@ioc:Adonis/Core/Drive'

export default class DocumentsController {
    public async halaman_upload({ view, session }: HttpContextContract) {
        const username = session.get('username')

        // load dokumen yang ada di server
        const dokumen = uploaded(Application.tmpPath(`uploads/${username}/pengesahan`))

        if (dokumen.length) {
            const obj = { data: dokumen }
            return view.render('pengesahan/upload', obj)
        } else {
            const obj = { data: false }
            return view.render('pengesahan/upload', obj)
        }
    }

    public async addfile({ request, response, session }: HttpContextContract) {
        const username = session.get('username')

        const files = request.files('dokumen', {
            size: '50mb',
            extnames: ['pdf'],
        })

        // tidak ada file yang diupload
        if (!files) {
            //todo :: tampilkan pesan untuk mengupload file
            return
        }

        for (const dokumen of files) {
            if (dokumen.isValid) {
                await dokumen.move(Application.tmpPath(`uploads/${username}/pengesahan`), {
                    overwrite: true
                })
            }
        }

        response.redirect().toPath('/pengesahan/upload')
    }

    public async halaman_pilih_digisign({ view, session }: HttpContextContract) {
        //load seluruh digisign yang telah dibuat oleh user
        const username = session.get('username')
        const db = await User.findBy('username', username)
        await db?.load('digisigns')
        const obj = { data: db?.digisigns }

        return view.render('pengesahan/digisign', obj)

    }

    public async digisign({ request, response, session }: HttpContextContract) {
        const username = session.get('username')
        const id = request.input('id')

        // cek apakah data signature dibuat oleh user yang bersangkutan
        const digisigndb = await Digisign.findOrFail(id)
        const userdb = await User.findOrFail(digisigndb?.creator)
        const cek = userdb?.username === username

        if (!cek) {
            return response.send("Error!")
        }

        // buat qr code dari signature
        const signature = digisigndb?.signature
        const qrcode = qrcode_string(signature)

        qrcode_png(qrcode, Application.tmpPath(`uploads/${username}/pengesahan`))

        response.redirect().toPath(`/pengesahan/editor/${id}`)
    }

    public async halaman_editor({ request, response, view, session, params }: HttpContextContract) {
        const username = session.get('username')
        const halaman = session.get('halaman')
        const ukuranQR = session.get('ukuranqr')
        const x_pos = session.get('x')
        const y_pos = session.get('y')
        const edited_path = session.get('edited')

        const semuadokumen = uploaded(Application.tmpPath(`uploads/${username}/pengesahan`))
        const dokumen = semuadokumen[0]

        if (edited_path) {
            const obj = {
                url: edited_path,
                halaman: halaman,
                ukuranQR: ukuranQR,
                x_pos: x_pos,
                y_pos: y_pos
            }
    
            return view.render('pengesahan/editor', obj)
        }
        
        const url = `uploads/${username}/pengesahan/${dokumen.nama}`
        const obj = {url: url}
        
        return view.render('pengesahan/editor', obj)
    }

    public async editor({ request, response, view, session, params }: HttpContextContract) {
        const username = session.get('username')
        const halaman = request.input('halaman')
        const ukuranQR = parseFloat(request.input('ukuran'))
        const x_pos = request.input('x')
        const y_pos = request.input('y')

        const semuadokumen = uploaded(Application.tmpPath(`uploads/${username}/pengesahan`))
        const dokumen = semuadokumen[0]

        // load file digisign
        const qrcode = await Drive.get(`./${username}/pengesahan/digisign.png`)

        const { data, nama } = await pdfeditor(dokumen, qrcode, halaman, ukuranQR, x_pos, y_pos)
        const url = `uploads/${username}/pengesahan/hasil/${nama}`

        savePDF(
            data,
            Application.tmpPath(url)
        )

        //session current config
        session.put('halaman', halaman)
        session.put('ukuranqr', ukuranQR)
        session.put('x', x_pos)
        session.put('y', y_pos)
        session.put('edited', url)

        response.redirect().back()
    }
}
