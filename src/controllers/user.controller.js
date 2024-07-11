import { usuariosService } from '../services/user.service.js';
import logger from '../middlewares/logger.js';
import { refreshToken } from '../middlewares/token.js';


export async function getController(req, res, next) {
    try {
        refreshToken(req, res)
        logger.info(req.user)
        return req.user
    } catch (error) {
        logger.error(`Error message: ${error.message}`);
        logger.error(`Error stack: ${error.stack}`);
        next(error);
    }
}

export async function postController(req, res, next) {
    try {
        const data = req.body;
        const result = await usuariosService.registrar(data);
        logger.info(result);
        res.status(200).json(result);
    } catch (error) {
        logger.error(`Error message: ${error.message}`);
        logger.error(`Error stack: ${error.stack}`);
        next(error);
    }
}

logger.info('User Controller Cargado')