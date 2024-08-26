import { Router, json, urlencoded } from 'express'
import { respuestasMejoradas } from '../middlewares/resp.js'
import { manejoDeErrores } from '../middlewares/manejoDeErrores.js'
import { userRouter } from './user.router.js'
import { sessionRouter } from './session.router.js'
import { resetPRouter } from './resetP.router.js'

export const apiRouter = Router()

apiRouter.use(respuestasMejoradas)
apiRouter.use(manejoDeErrores)
apiRouter.use(json())
apiRouter.use(urlencoded({ extended: true }))

apiRouter.use('/user', userRouter)
apiRouter.use('/session', sessionRouter)
apiRouter.use('/password', resetPRouter)


apiRouter.get('/', (req, res) => {
    res.send('Api Router funcionando OK')
})