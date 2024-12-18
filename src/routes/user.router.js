import { Router } from "express";
import { getController, postController } from "../controllers/user.controller.js";
import { refreshToken } from "../middlewares/token.js";


export const userRouter = Router()

//TEST
userRouter.get("/test", (req, res) => {
    res.send("User Router funcionando OK")
})
//CURRENT
userRouter.get("/current", refreshToken, getController)
//CREAR USUARIO
userRouter.post("/", postController)
//CREAR TIENDA 
userRouter.post("/")
