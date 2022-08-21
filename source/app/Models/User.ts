import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, beforeCreate, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import { keypair_generator } from 'App/Logic/rsa'
import Digisign from 'App/Models/Digisign'

export default class User extends BaseModel {
    @column({ isPrimary: true })
    public id: string

    @column()
    public username: string

    @column({ serializeAs: null })
    public password: string

    @column()
    public privatekey: string

    @column()
    public rememberMeToken?: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    // relation
    @hasMany(() => Digisign, {
        foreignKey: 'creator'
    })
    public digisigns: HasMany<typeof Digisign>

    @beforeCreate()
    public static async uuid(User: User) {
        User.id = uuidv4()
        User.privatekey = keypair_generator()
    }

    @beforeSave()
    public static async hashPassword(User: User) {
        if (User.$dirty.password) {
            User.password = await Hash.make(User.password)
        }
    }
}
