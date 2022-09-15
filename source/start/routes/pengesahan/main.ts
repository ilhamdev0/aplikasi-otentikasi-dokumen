import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/pengesahan/upload', 'DocumentsController.halaman_upload')
    Route.post('/pengesahan/upload', 'DocumentsController.addfile')

    Route.get('/pengesahan/digisign', 'DocumentsController.halaman_pilih_digisign')
    Route.post('/pengesahan/digisign', 'DocumentsController.digisign')
    
    Route.get('/pengesahan/editor/:id', 'DocumentsController.halaman_editor')
    Route.post('/pengesahan/editor', 'DocumentsController.editor')
}).middleware(['auth'])
