import { passwordService } from '../services/pass.service.js'
import logger from '../middlewares/logger.js'

export async function postRequestNewPasswordController(req, res, next) {
    try {
        const { mail } = req.body;
        const result = await passwordService.recuperarPassword(mail)
        logger.info(`Correo recibido en controller: ${mail}`);
        res.status(200).json(result);
    } catch (error) {
        logger.error(`Error message: ${error.message}`);
        logger.error(`Error stack: ${error.stack}`);
        next(error);
    }
}

export async function postResetPasswordController(req, res, next) {
    try {
        const { password } = req.body
        const { params } = req.params
        const result = await passwordService.guardarPassword(params, password)
        logger.info(result);
        res.status(200).json(result);
    } catch (error) {
        logger.error(`Error message: ${error.message}`);
        logger.error(`Error stack: ${error.stack}`);
        next(error);
    }
}

logger.info('Pass Controller Cargado')