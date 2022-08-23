import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import 'App/Models/User'
import User from 'App/Models/User'

export default class Digisign extends BaseModel {
    @column({ isPrimary: true })
    public id: string

    @column()
    public creator: string

    @column()
    public label: string

    @column()
    public signature: string

    @column()
    public hash: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    // relation
    @belongsTo(() => User, {
        localKey: 'creator'
    })
    public user: BelongsTo<typeof User>

    @beforeCreate()
    public static async uuid(User: User) {
        User.id = uuidv4()
    }
}
