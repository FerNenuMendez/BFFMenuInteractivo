import { usuariosService } from '../services/user.service.js';
import logger from '../middlewares/logger.js';
import { newToken } from '../middlewares/token.js'


export async function postController(req, res, next) {
    try {
        const data = req.body;
        const cliente = await usuariosService.verificarCliente(data);
        logger.info(cliente);
        req.user = cliente
        // newToken
        next()
    } catch (error) {
        logger.error(`Error message: ${error.message}`);
        logger.error(`Error stack: ${error.stack}`);
        next(error);
    }
    res.sendStatus(200)
}

logger.info('Session Controller Cargado')