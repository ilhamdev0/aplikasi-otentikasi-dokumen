import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import {keypair_generator} from "../../Logic/keypair"

export default class DigisignsController {
    public async create({ request, response }: HttpContextContract) {
        //todo :: ambil data dari form
        const form = request.body()
        //todo :: load keypair
        //todo :: encrypt data menggunakan keypair
        //todo :: simpan ke db
        //todo :: redirect ke halaman digisign

        return response.send({ data: form })
    }
}
