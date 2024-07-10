import { usuariosService } from '../services/user.service.js';
import { newToken } from '../middlewares/token.js'
import logger from '../middlewares/logger.js';


export async function postController(req, res, next) {
    try {
        const data = req.body;
        const cliente = await usuariosService.verificarCliente(data);
        logger.info(cliente);
        req.user = JSON.parse(cliente)
        await newToken(req, res)
    } catch (error) {
        logger.error(`Error message: ${error.message}`);
        logger.error(`Error stack: ${error.stack}`);
        next(error);
    }
}

logger.info('Session Controller Cargado')