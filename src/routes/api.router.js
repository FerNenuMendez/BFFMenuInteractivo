import { Router, json, urlencoded } from 'express'
import { respuestasMejoradas } from '../middlewares/resp.js'
import { manejoDeErrores } from '../middlewares/manejoDeErrores.js'
import { userRouter } from './user.router.js'

export const apiRouter = Router()

apiRouter.use(respuestasMejoradas)
apiRouter.use(manejoDeErrores)
apiRouter.use(json())
apiRouter.use(urlencoded({ extended: true }))

apiRouter.use('/usuarios', userRouter)


apiRouter.get('/', (req, res) => {
    res.send('Api Router funcionando OK')
})