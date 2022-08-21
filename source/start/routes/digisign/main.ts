import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/digisign', 'DigisignsController.index')

    Route.get('/digisign/createform', async ({ view }) => {
        return view.render('digisign/createform')
    })

    Route.post('/digisign/create', 'DigisignsController.create')
}).middleware(['auth'])
