import { Router } from "express";
import { getController } from "../controllers/user.controller.js";

export const userRouter = Router()

userRouter.get('/', getController);
