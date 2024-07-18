import redisClient from "../config/redisConfig.js";

const cacheMiddleware = async (req, res, next) => {
    const { key } = req.query;

    try {
        const cacheResponse = await redisClient.get(key);

        if (cacheResponse) {
            return res.status(200).json(JSON.parse(cacheResponse));
        }

        // Sobrescribe res.send para almacenar la respuesta en cache
        const originalSend = res.send.bind(res);
        res.send = (body) => {
            redisClient.set(key, JSON.stringify(body), 'EX', 3600); // Cache por 1 hora
            originalSend(body);
        };

        next();
    } catch (err) {
        console.error('Error accessing cache', err);
        next();
    }
};

export default cacheMiddleware;
