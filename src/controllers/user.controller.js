import { usuariosService } from '../services/user.service.js';
import { refreshToken } from '../middlewares/token.js';
import logger from '../middlewares/logger.js';


// CURRENT
export async function getController(req, res, next) {
    try {
        await refreshToken(req, res, async (err) => {
            if (err) return next(err);
            const user = req.user
            logger.info(JSON.stringify(user));
            return res.status(200).send(req.user);
        });
    } catch (error) {
        logger.error(`Error message: ${error.message}`);
        logger.error(`Error stack: ${error.stack}`);
        next(error);
    }
}

// CREAR USUARIOS
export async function postController(req, res, next) {
    try {
        const data = req.body;
        const result = await usuariosService.registrar(data);
        logger.info(JSON.stringify(result));
        res.status(200).json(result);
    } catch (error) {
        logger.error(`Error message: ${error.message}`);
        logger.error(`Error stack: ${error.stack}`);
        next(error);
    }
}

//CREAR TIENDA
export async function postCrearTiendaController(req, res, next) {
    try {
        const { id } = req.params
        const data = req.body
        const result = await usuariosService.crearTienda(id, data)
        logger.info(JSON.stringify(result))
        res.status(200).json(result)
    } catch (error) {
        logger.error(`Error message: ${error.message}`);
        logger.error(`Error stack: ${error.stack}`);
        next(error);
    }
}


logger.info('User Controller Cargado')