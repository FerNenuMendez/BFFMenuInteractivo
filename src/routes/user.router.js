import { Router } from "express";
import { getController, postController } from "../controllers/user.controller.js";

export const userRouter = Router()

userRouter.get('/', getController);
userRouter.post('/', postController)
