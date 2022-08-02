import Route from '@ioc:Adonis/Core/Route'

Route.get('/valdoc', async ({ view }) => {
    // todo :: jika belum login maka alihkan ke route login
    return view.render('valdoc')
})

Route.post('/valdoc', async ({ request }) => {
    // todo :: jika belum login maka alihkan ke route login
    return "logic validasi dokumen"
})