import logger from "../middlewares/logger.js";
import axios from 'axios'

class UsuariosService {
    async buscarTodos() {
        try {
            const response = await axios.get('http://menu-iota-ten.vercel.app/api/clientes/');
            if (response.data && response.data.status === 'success') {
                logger.info(response.data.payload);
                return response.data.payload;
            } else {
                logger.error('Unexpected response format');
                throw new Error('Unexpected response format');
            }
        } catch (error) {
            logger.error('Error fetching data from external API:', error);
            throw new Error('Failed to fetch data');
        }
    }
    async registrar(data) {
        try {
            // Registrar los datos antes de enviarlos para asegurarse de que están en el formato correcto
            logger.info(`Sending data: ${JSON.stringify(data)}`);

            const response = await axios.post('http://menu-iota-ten.vercel.app/api/clientes/', data);
            if (response.data && response.data.status === 'success') {
                logger.info(response.data.payload);
                return response.data.payload;
            } else {
                logger.error('Unexpected response format');
                throw new Error('Unexpected response format');
            }
        } catch (error) {
            logger.error('Error fetching data from external API:', error);
            throw new Error('Failed to fetch data');
        }
    }
}

export const usuariosService = new UsuariosService();