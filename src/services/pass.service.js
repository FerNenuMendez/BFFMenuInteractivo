import logger from "../middlewares/logger.js";
import axios from 'axios'

class PassService {

    async recuperarPassword(mail) {
        try {
            const response = await axios.post(`http://menu-iota-ten.vercel.app/api/password/forgot-password/`, { mail: mail });
            logger.info(`Respuesta de la API externa: ${JSON.stringify(response.data, null, 2)}`);
            if (response.data && response.data.status === 'success') {
                logger.info(response.data);
                return response.data;
            } else if (response.data && response.data.error) {
                logger.error(`Error devuelto por la API externa: ${response.data.error}`);
                throw new Error(response.data.error);
            } else {
                logger.error('Unexpected response format');
                throw new Error('Unexpected response format');
            }
        } catch (error) {
            logger.error('Error fetching data from external API:', error);
            throw new Error('Failed to fetch data');
        }
    }

    async guardarPassword(token, password) {
        try {
            const response = await axios.post(`http://menu-iota-ten.vercel.app/api/password/reset-password/${token}`, password);
            if (response.data && response.data.status === 'success') {
                logger.info(response.data);
                return response.data
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

export const passwordService = new PassService()