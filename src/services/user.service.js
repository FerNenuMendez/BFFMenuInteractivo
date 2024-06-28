import logger from "../middlewares/logger.js";
import axios from 'axios'

class UsuariosService {
    async buscarTodos(req, res) {
        try {
            const response = await axios.get('http://menu-iota-ten.vercel.app/api/clientes/');
            if (response.data && response.data.status === 'success') {
                logger.info(response.data.payload)
                res.json(response.data.payload);
            } else {
                logger.error('Unexpected response format')
                res.status(500).json({ error: 'Unexpected response format' });
            }
        } catch (error) {
            logger.error('Error fetching data from external API:', error);
            res.status(500).json({ error: 'Failed to fetch data' });
        }
    }
}

export const usuariosService = new UsuariosService()