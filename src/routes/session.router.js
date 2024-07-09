import { Router } from "express";
import { postController } from "../controllers/session.controller.js";

export const sessionRouter = Router()

sessionRouter.post('/', postController)