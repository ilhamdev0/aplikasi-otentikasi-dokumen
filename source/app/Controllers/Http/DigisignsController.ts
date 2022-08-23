import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { serialize } from "App/Logic/serialize"
import { encrypt, decrypt } from "App/Logic/rsa"
import { hash } from "App/Logic/hash"
import { qrcode_string } from "App/Logic/qrcode"
import User from 'App/Models/User'
import Digisign from 'App/Models/Digisign'

export default class DigisignsController {
    public async index({ view, session }: HttpContextContract) {
        //load seluruh digisign yang telah dibuat oleh user
        const username = session.get('username')
        const db = await User.findBy('username', username)
        await db?.load('digisigns')
        const obj = { data: db?.digisigns }

        return view.render('digisign/main', obj)
    }

    public async edit({ request, view, session }: HttpContextContract) {
        const username = session.get('username')

        // load privatekey
        const userdb = await User.findBy('username', username)
        const privatekey = userdb?.privatekey

        // load label & signature
        const digisigndb = await Digisign.findOrFail(request.input('id'))
        const digisignid = request.input('id')
        const label = digisigndb?.label
        const signature = digisigndb?.signature

        // decrypt signature lalu ubah ke object
        const dataori = JSON.parse(decrypt(signature, privatekey))

        const data = { ...dataori, id: digisignid, label: label }
        const obj = { data: data }
        return view.render('digisign/editform', obj)
    }

    public async info({ view, response, session, params }: HttpContextContract) {
        try {
            const username = session.get('username')

            // cek apakah data signature dibuat oleh user yang bersangkutan
            const digisigndb = await Digisign.findOrFail(params.id)
            const userdb = await User.findOrFail(digisigndb?.creator)
            const cek = userdb?.username === username

            if (cek) {
                // buat qr code dari signature
                const signature = digisigndb?.signature
                const qrcode = { qrcode: qrcode_string(signature) }

                // insert qrcode sebagai field baru
                const obj = { ...digisigndb?.$attributes, ...qrcode }
                const data = { data: obj }

                return view.render('digisign/info', data)
            }
        } catch (error) {
            response.badRequest(error.message)
        }
    }

    public async create({ request, response, session }: HttpContextContract) {
        // load data yang diperlukan lalu ubah menjadi text
        const data = {
            username: session.get('username'),
            kode: request.input('kode'),
            timestamp: new Date().getTime()
        }

        const inputsignature = serialize(data)

        // load label
        const label = request.input('label')

        // load id & privatekey
        const db = await User.findBy('username', data.username)
        const privatekey = db?.privatekey
        const userid = db?.id

        // encrypt input
        const signature = encrypt(inputsignature, privatekey)

        // buat text hash dari digital signature
        const digest = hash(signature)

        // simpan ke db
        const dbdata = {
            label: label,
            creator: userid,
            signature: signature,
            hash: digest
        }

        await Digisign.create(dbdata)

        //redirect ke halaman digisign
        response.redirect().toPath('/digisign')
    }

    public async update({ request, response, session }: HttpContextContract) {
        try {
            const username = session.get('username')

            // cek apakah data signature dibuat oleh user yang bersangkutan
            const digisigndb = await Digisign.findOrFail(request.input('id'))
            const userdb = await User.findOrFail(digisigndb?.creator)
            const cek = userdb?.username === username

            if (cek) {
                // load privatekey
                const userdb = await User.findBy('username', username)
                const privatekey = userdb?.privatekey

                // decrypt signature lalu ubah ke object
                const signature = digisigndb?.signature
                const dataori = JSON.parse(decrypt(signature, privatekey))

                const kodeunikdb = dataori.kode
                const kodeunik = request.input('kode')
                const kodeunikberubah = kodeunikdb !== kodeunik

                // jika kode unik berubah maka update digital signature
                if (kodeunikberubah) {
                    // load data yang diperlukan lalu ubah menjadi text
                    const data = {
                        username: username,
                        kode: kodeunik,
                        timestamp: new Date().getTime()
                    }

                    const inputsignature = serialize(data)

                    // encrypt input
                    const signature = encrypt(inputsignature, privatekey)

                    // buat text hash dari digital signature
                    const digest = hash(signature)

                    // simpan perubahan
                    await digisigndb.merge({
                        signature: signature,
                        hash: digest
                    }).save()
                }

                // update data lain
                await digisigndb.merge({
                    label: request.input('label')
                }).save()

                response.redirect().toPath('/digisign')
                //todo :: tampilkan pesan bahwa data berhasil diupdate
            }
        } catch (error) {
            response.badRequest(error.message)
        }
    }

    public async delete({ request, response, session }: HttpContextContract) {
        try {
            const username = session.get('username')

            // cek apakah data signature dibuat oleh user yang bersangkutan
            const digisigndb = await Digisign.findOrFail(request.input('id'))
            const userdb = await User.findOrFail(digisigndb?.creator)
            const cek = userdb?.username === username

            if (cek) {
                await digisigndb?.delete()

                response.redirect().toPath('/digisign')
                //todo :: tampilkan pesan bahwa digisign berhasil dihapus
            }
        } catch (error) {
            response.badRequest(error.message)
        }
    }
}
