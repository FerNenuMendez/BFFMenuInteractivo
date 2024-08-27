import logger from "../middlewares/logger.js";
import axios from 'axios'

class PassService {

    async recuperarPassword(mail) {
        try {
            const response = await axios.post(`http://menu-iota-ten.vercel.app/api/password/forgot-password/`, { mail });
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