import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/digisign', async ({ view }) => {
        return view.render('digisign/main')
    })

    Route.get('/digisign/createform', async ({ view }) => {
        return view.render('digisign/createform')
    })

    Route.post('/digisign/create', 'DigisignsController.create')
}).middleware(['auth'])
