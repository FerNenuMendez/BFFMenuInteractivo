import logger from "../middlewares/logger.js";
import axios from 'axios'

class PassService {

    async recuperarPassword(mail) {
        try {
            const response = await axios.post('http://menu-iota-ten.vercel.app/api/password/forgot-password/', { mail });
            logger.info(`Respuesta de la API externa: ${response.data}`);

            if (response.status === 200 && response.data === 'Mail de recuperacion de contraseña enviado') {
                return { message: response.data };
            } else {
                logger.error('Unexpected response format');
                throw new Error('Unexpected response format');
            }
        } catch (error) {
            logger.error('Error fetching data from external API:', error);
            // Reenvía el error con el código de estado si está disponible
            if (error.response && error.response.status) {
                throw new Error(`Error ${error.response.status}: ${error.response.data || error.message}`);
            } else {
                throw new Error('Failed to fetch data');
            }
        }
    }

    async guardarPassword(token, password) {
        try {
            const response = await axios.post(`http://menu-iota-ten.vercel.app/api/password/reset-password/${token}`, { password: password });
            logger.info(`Respuesta de la API externa: ${response.data}`);
            if (response.status === 200 && response.data === 'Password cambiada correctamente') {
                logger.info('Proceso de recuperación de contraseña exitoso');
                return { message: response.data };
            } else {
                logger.error('Unexpected response format');
                throw new Error('Unexpected response format');
            }
        } catch (error) {
            logger.error('Error fetching data from external API:', error);
            // Reenvía el error con el código de estado si está disponible
            if (error.response && error.response.status) {
                throw new Error(`Error ${error.response.status}: ${error.response.data || error.message}`);
            } else {
                throw new Error('Failed to fetch data');
            }
        }
    }
}

export const passwordService = new PassService()