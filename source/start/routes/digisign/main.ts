import Route from '@ioc:Adonis/Core/Route'

Route.get('/digisign', async ({ view }) => {
    return view.render('digisign/main')
})

Route.get('/digisign/newform', async ({ view }) => {
    return view.render('digisign/newform')
})

Route.post('/digisign/new', 'DigisignsController.newdigisign')
