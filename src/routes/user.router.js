import { Router } from "express";
import { postController } from "../controllers/user.controller.js";
import { refreshToken } from "../middlewares/token.js";

export const userRouter = Router()


userRouter.post('/', postController)
