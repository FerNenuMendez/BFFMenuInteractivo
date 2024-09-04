import { passwordService } from '../services/pass.service.js'
import logger from '../middlewares/logger.js'

export async function postRequestNewPasswordController(req, res, next) {
    try {
        const { mail } = req.body;
        const result = await passwordService.recuperarPassword(mail);
        logger.info(`Resultado: ${result.message}`);
        res.status(200).json({ message: result.message });
    } catch (error) {
        logger.error(`Error message: ${error.message}`);
        logger.error(`Error stack: ${error.stack}`);
        res.status(404).json({ error: error.message })
    }
}

export async function postResetPasswordController(req, res, next) {
    try {
        const { password } = req.body
        const { token } = req.params
        const result = await passwordService.guardarPassword(token, password)
        logger.info(`Resultado: ${result.message}`);
        res.status(200).json({ message: result.message });
    } catch (error) {
        logger.error(`Error message: ${error.message}`);
        logger.error(`Error stack: ${error.stack}`);
        res.status(404).json({ error: error.message })
    }
}

logger.info('Pass Controller Cargado')