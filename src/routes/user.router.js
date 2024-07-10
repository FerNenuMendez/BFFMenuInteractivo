import { Router } from "express";
import { getController, postController } from "../controllers/user.controller.js";
import { refreshToken } from "../middlewares/token.js";

export const userRouter = Router()


userRouter.post('/', postController)
