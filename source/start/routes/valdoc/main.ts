import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/valdoc', async ({ view }) => {
        return view.render('valdoc')
    })

    Route.post('/valdoc', async ({ request }) => {
        return "logic validasi dokumen"
    })
}).middleware(['auth'])