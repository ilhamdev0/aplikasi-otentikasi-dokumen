import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.get('/db', async () => {
    const data = await HealthCheck.getReport()
    const info = data.report.lucid.meta
    return info
})
