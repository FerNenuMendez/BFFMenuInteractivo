import axios from 'axios';
import https from 'https';
import logger from '../middlewares/logger.js';


export async function getController(req, res, next) {
    try {
        const response = await axios.get('http://menu-iota-ten.vercel.app/api/clientes/');
        logger.info(response.data);
        res.json(response.data);
    } catch (error) {
        logger.error(`Error message: ${error.message}`);
        logger.error(`Error stack: ${error.stack}`);
        next(error);
    }
}
