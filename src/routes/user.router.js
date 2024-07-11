import { Router } from "express";
import { getController, postController } from "../controllers/user.controller.js";
import { refreshToken } from "../middlewares/token.js";

export const userRouter = Router()

//Test
userRouter.get('/test', (req, res) => {
    res.send('User Router funcionando OK')
})
//Current
userRouter.get('/current', getController)
//Crear Usuario
userRouter.post('/', postController)
