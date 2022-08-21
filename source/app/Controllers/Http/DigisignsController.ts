import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { objtotext } from "App/Logic/digisign"
import { encrypt } from "App/Logic/rsa"
import { hash } from "App/Logic/hash"
import User from 'App/Models/User'
import Digisign from 'App/Models/Digisign'

export default class DigisignsController {
    public async create({ request, response, session }: HttpContextContract) {
        //ambil data dari form dan session lalu ubah ke satu teks tunggal
        const form = request.body()
        const username = session.get('username')
        delete form['label']
        const merge = {username, ...form}
        const input = objtotext(merge)

        // load label
        const label = request.input('label')

        //load id & privatekey
        const db = await User.findBy('username', username)
        const privatekey = db?.privatekey
        const userid = db?.id

        //encrypt input
        const digisign = encrypt(input,privatekey)

        //buat hash dari digital signature
        const digest = hash(digisign)

        //simpan ke db
        const data = {
            label: label,
            creator: userid,
            data: digisign,
            hash: digest
        }

        await Digisign.create(data)

        //redirect ke halaman digisign
        response.redirect().toPath('/digisign')
    }
}
