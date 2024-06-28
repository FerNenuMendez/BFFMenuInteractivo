import { usuariosService } from '../services/user.service.js';
import logger from '../middlewares/logger.js';

export async function getController(req, res, next) {
    try {
        const usuarios = await usuariosService.buscarTodos();
        logger.info(JSON.stringify(usuarios));
        res.json(usuarios);  // Asegúrate de usar res.json para enviar la respuesta
    } catch (error) {
        logger.error(`Error message: ${error.message}`);
        logger.error(`Error stack: ${error.stack}`);
        next(error);
    }
}
