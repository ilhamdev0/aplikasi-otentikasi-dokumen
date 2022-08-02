/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

// Custom Route
import "./routes/user/login"
import "./routes/digisign/main"
import "./routes/newdoc/main"
import "./routes/valdoc/main"

Route.get('/', async ({ view }) => {
    // todo :: jika sudah login maka alihkan ke route dashboard
    return view.render('login')
})

Route.get('/home', async ({ view }) => {
    // todo :: jika belum login maka alihkan ke route login
    return view.render('dashboard')
})

Route.get('/newdoc', async ({ view }) => {
    // todo :: jika belum login maka alihkan ke route login
    return view.render('newdoc')
})

Route.post('/newdoc', async ({ request }) => {
    // todo :: jika belum login maka alihkan ke route login
    return "logic pengesahan dokumen baru"
})
