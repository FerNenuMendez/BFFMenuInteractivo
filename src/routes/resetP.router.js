import { Router } from "express";
import { postRequestNewPasswordController, postResetPasswordController } from '../controllers/password.controller.js'

export const resetPRouter = Router()

resetPRouter.post('/forgot-password/', postRequestNewPasswordController)
resetPRouter.post('/reset-password/:token', postResetPasswordController)

resetPRouter.get('/test', (req, res) => {
    res.send('Api Funcionando OK')
})