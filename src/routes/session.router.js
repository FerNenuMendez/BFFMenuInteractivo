import { Router } from "express";
import { deleteController, postController } from "../controllers/session.controller.js";


export const sessionRouter = Router()

//Test
sessionRouter.get('/test', (req, res) => {
    res.send('Session Router funcionando OK')
})
//LOGIN
sessionRouter.post('/', postController)
//LOGOUT
sessionRouter.delete('/current', deleteController)

