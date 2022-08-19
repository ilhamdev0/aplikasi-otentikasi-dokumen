import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/newdoc', async ({ view }) => {
        return view.render('newdoc')
    })
    
    Route.post('/newdoc', async ({ request }) => {
        return "logic pengesahan dokumen baru"
    })
}).middleware(['auth'])
