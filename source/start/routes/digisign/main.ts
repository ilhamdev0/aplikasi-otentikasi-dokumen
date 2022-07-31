import Route from '@ioc:Adonis/Core/Route'

Route.get('/digisign', async ({ view }) => {
    return view.render('digisign/main')
})

Route.get('/digisign/new', async ({ view }) => {
    return view.render('digisign/new')
})

Route.post('/digisign/new', async ({ request }) => {
    return "logic new digisign"
})