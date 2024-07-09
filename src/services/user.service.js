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
    static async registrar(data) {
        try {
            // Validar datos
            if (!data.nombre || !data.apellido || !data.dni || !data.telefono || !data.mail || !data.password || !data.domicilio || !data.cuit) {
                throw new Error('Todos los campos son obligatorios');
            }
            // Imprimir datos a enviar para verificar
            console.info('Enviando datos:', JSON.stringify(data));
            const response = await axios.post('http://menu-iota-ten.vercel.app/api/clientes/', data);
            return response.data;
        } catch (error) {
            console.error('Error al registrar usuario:', error.message);
            if (error.response) {
                // El servidor respondió con un código de estado que no está en el rango 2xx
                console.error('Datos de la respuesta del error:', error.response.data);
                console.error('Código de estado:', error.response.status);
                console.error('Encabezados:', error.response.headers);
            } else if (error.request) {
                // La solicitud fue hecha pero no se recibió respuesta
                console.error('No se recibió respuesta:', error.request);
            } else {
                // Algo pasó al configurar la solicitud que desencadenó un error
                console.error('Error al configurar la solicitud:', error.message);
            }
            throw new Error('Failed to fetch data');
        }
    }
    async verificarCliente({ mail, password }) {
        try {
            // const user = await this.findOne({ mail }) buscar el usuario con buscarUno(id)
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