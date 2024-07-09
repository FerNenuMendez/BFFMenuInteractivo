import { usuariosService } from '../services/user.service.js';
import logger from '../middlewares/logger.js';

export async function getController(req, res, next) {
    try {
        const usuarios = await usuariosService.buscarTodos();
        logger.info(JSON.stringify(usuarios));
        res.json(usuarios);
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
        logger.info(usuario);
        res.status(200).json(result);
    } catch (error) {
        logger.error(`Error message: ${error.message}`);
        logger.error(`Error stack: ${error.stack}`);
        next(error);
    }
}