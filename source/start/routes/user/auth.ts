import Route from '@ioc:Adonis/Core/Route'

Route.get('/register', async ({ view }) => {
    return view.render('register')
})

Route.post('/register','UserController.register')
Route.post('/login','UserController.login')