import logger from "../middlewares/logger.js";
import axios from 'axios'
import { hasheadaSonIguales } from "../middlewares/auth.js";
import { buscarPorId } from "../middlewares/utils.js";

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
    async buscarUno(id) {
        try {
            const clientes = await axios.get('http://menu-iota-ten.vercel.app/api/clientes/');
            if (clientes.data && clientes.data.status === 'success') {
                logger.info(clientes.data.payload);
                const clientesDB = clientes.data.payload
                const clienteBuscado = buscarPorId(clientesDB, id)
                return clienteBuscado
            }
        } catch (error) {
            logger.error('Error fetching data from external API:', error);
            throw new Error('Failed to fetch data');
        }
    }
    async registrar(data) {
        try {
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

    async verificarCliente({ mail, password }) {
        try {
            const user = await this.findOne({ mail })
            if (!user) {
                const typedError = new Error('Autenticacion Fallida')
                logger.error("error de autenticacion: No existe el usuario")
                throw typedError
            }
            if (!hasheadaSonIguales(password, user.password)) {
                const typedError = new Error('Autenticacion Fallida')
                logger.error("error de autenticacion: La contraseña es incorrecta")
                throw typedError
            }
        } catch (error) {
            logger.error('Error fetching data from external API:', error);
            throw new Error('Failed to fetch data');
        }

    }
}

export const usuariosService = new UsuariosService();