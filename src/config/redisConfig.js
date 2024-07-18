import { createClient } from 'redis';
import logger from '../middlewares/logger.js'
import dotenv from 'dotenv';

dotenv.config();

const password = `${process.env.redis_KEY}`

const redisClient = createClient({

    password: `${process.env.redis_KEY}`,
    socket: {
        host: `${process.env.redis_HOST}`,
        port: process.env.redis_PORT
    }
});

redisClient.on('error', (err) => {
    console.error('Redis Client Error', err);
});

redisClient.connect();
logger.info('User cache listo')

export default redisClient;