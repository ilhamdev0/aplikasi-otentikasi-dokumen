import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/digisign', 'DigisignsController.index')
    Route.post('/digisign/editform', 'DigisignsController.edit')

    Route.get('/digisign/createform', async ({ view }) => {
        return view.render('digisign/createform')
    })

    Route.get('/digisign/info/:id', 'DigisignsController.info')
    Route.post('/digisign/create', 'DigisignsController.create')
    Route.post('/digisign/update', 'DigisignsController.update')
    Route.post('/digisign/delete', 'DigisignsController.delete')
}).middleware(['auth'])
