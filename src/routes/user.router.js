import { Router } from "express";
import { getController, postController } from "../controllers/user.controller.js";
import { refreshToken } from "../middlewares/token.js";
import cacheMiddleware from "../middlewares/cacheMiddleware.js"

export const userRouter = Router()

//Test
userRouter.get('/test', (req, res) => {
    res.send('User Router funcionando OK')
})
//Current
userRouter.get('/current', refreshToken, cacheMiddleware, getController)
//Crear Usuario
userRouter.post('/', postController)
