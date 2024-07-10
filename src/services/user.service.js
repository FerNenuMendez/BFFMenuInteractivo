import logger from "../middlewares/logger.js";
import axios from 'axios'
import { hasheadaSonIguales } from "../middlewares/crypto.js";


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
            const cliente = await axios.get(`http://menu-iota-ten.vercel.app/api/clientes/id/${id}`);
            if (cliente.data && cliente.data.status === 'success') {
                logger.info(cliente.data.payload);
                return cliente
            }
        } catch (error) {
            logger.error('Error fetching data from external API:', error);
            throw new Error('Failed to fetch data');
        }
    }

    async registrar(data) {
        try {
            const response = await axios.post('http://menu-iota-ten.vercel.app/api/clientes/', data);
            return response.data;
        } catch (error) {
            logger.error('Error fetching data from external API:', error);
            throw new Error('Failed to fetch data');
        }
    }

    async verificarCliente({ mail, password }) {
        try {
            const user = await axios.get(`http://menu-iota-ten.vercel.app/api/clientes/mail/${mail}`)
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