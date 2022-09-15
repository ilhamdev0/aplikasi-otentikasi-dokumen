import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class UserController {
    public async register({ request, response }: HttpContextContract) {
        const skema = schema.create({
            username: schema.string({}, [
                rules.maxLength(128),
                rules.unique({ table: 'users', column: 'username' })
            ]),
            password: schema.string({}, [
                rules.minLength(6)
            ])
        })

        try {
            const data = await request.validate({
                schema: skema,
                messages: {
                    'required': 'Kolom {{ field }} harus diisi',
                    'username.maxLength': 'Username terlalu panjang',
                    'username.unique': 'Username sudah ada. Coba nama lain!',
                    'password.minLength': 'Password minimal {{ options.minLength}} karakter'
                }
            })

            // jika data valid, buat akun baru
            await User.create(data)
            response.redirect().toPath('/')
            //todo :: tampilkan pesan bahwa akun berhasil dibuat

        } catch (error) {
            response.badRequest(error.messages)
        }
    }

    public async login({ request, response, auth, session }: HttpContextContract) {
        const skema = schema.create({
            username: schema.string({}, [
                rules.maxLength(128)
            ]),
            password: schema.string({}, [
                rules.minLength(6)
            ])
        })

        try {
            await request.validate({
                schema: skema,
                messages: {
                    'required': 'Kolom {{ field }} harus diisi',
                    'username.maxLength': 'Username terlalu panjang',
                    'password.minLength': 'Password minimal {{ options.minLength}} karakter'
                }
            })

            const username = request.input('username')
            const password = request.input('password')

            try {
                await auth.use('web').attempt(username, password)
                session.put('username', username)
                response.redirect().toPath('/home')
            } catch {
                response.redirect().toPath('/')
                //todo :: tampilkan pesan bahwa login gagal
            }

        } catch (error) {
            response.badRequest(error.messages)
        }
    }

    public async logout({ response, auth }: HttpContextContract) {
        await auth.use('web').logout()
        response.redirect().toPath('/')
    }
}
