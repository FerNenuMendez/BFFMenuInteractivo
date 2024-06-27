import { Router } from "express";
import { postController } from "../controllers/user.controller.js";

export const userRouter = Router()

userRouter.post('/', postController)
