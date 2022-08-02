import Route from '@ioc:Adonis/Core/Route'

Route.get('/newdoc', async ({ view }) => {
    // todo :: jika belum login maka alihkan ke route login
    return view.render('newdoc')
})

Route.post('/newdoc', async ({ request }) => {
    // todo :: jika belum login maka alihkan ke route login
    return "logic pengesahan dokumen baru"
})