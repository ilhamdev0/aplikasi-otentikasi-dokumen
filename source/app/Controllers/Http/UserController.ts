import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class UserController {
    public async register({ request, response }: HttpContextContract) {
        const skema = schema.create({
            username: schema.string({}, [
                rules.maxLength(128)
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
                    'password.minLength': 'Password minimal {{ options.minLength}} karakter'
                }
            })

            // jika data valid, buat akun baru
            const akun = await User.create(data)
            response.redirect('/')

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
        } catch (error) {
            response.badRequest(error.messages)
        }

        const username = request.input('username')
        const password = request.input('password')

        try {
            await auth.use('web').attempt(username, password)
            response.redirect('/home')
        } catch {
            return response.badRequest('Invalid credentials')
            //todo :: redirect kembali ke login form
        }
    }
}
