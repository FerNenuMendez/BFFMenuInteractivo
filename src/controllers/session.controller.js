import { usuariosService } from '../services/user.service.js';
import { newToken, deleteTokenFromCookie } from '../middlewares/token.js'
import logger from '../middlewares/logger.js';

//CREAR SESSION
export async function postController(req, res, next) {
    try {
        const data = req.body;
        const cliente = await usuariosService.verificarCliente(data);
        logger.info(`Cliente: ${JSON.stringify(cliente, null, 2)}`);
        req.user = JSON.parse(cliente)
        await newToken(req, res)
    } catch (error) {
        logger.error(`Error message: ${error.message}`);
        logger.error(`Error stack: ${error.stack}`);
        next(error);
    }
}
//CERRAR SESSION
export async function deleteController(req, res) {
    deleteTokenFromCookie,
        (req, res) => {
            res.sendStatus(204)
        }
}

logger.info('Session Controller Cargado')