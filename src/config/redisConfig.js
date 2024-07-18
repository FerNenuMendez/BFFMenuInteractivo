import { createClient } from 'redis';
import logger from '../middlewares/logger.js'
import dotenv from 'dotenv';

dotenv.config();

const password = `${process.env.redis_KEY}`

const redisClient = createClient({

    password: password,
    socket: {
        host: `${process.env.redis_HOST}`,
        port: process.env.redis_PORT
    }
});

redisClient.on('error', (err) => {
    logger.error('Redis Client Error', err);
});

redisClient.connect().then(() => {
    logger.info('Conectado a Redis');
}).catch(err => {
    logger.error('Redis Connection Error', err);
});

export default redisClient;