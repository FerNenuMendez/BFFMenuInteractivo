import redisClient from "../config/redisConfig.js";

const cacheMiddleware = async (req, res, next) => {
    const { key } = req.query;
    // Verificar si 'key' está definida y es una cadena
    if (!key || typeof key !== 'string') {
        console.error('Invalid cache key');
        return next();
    }

    try {
        const cacheResponse = await redisClient.get(key);

        if (cacheResponse) {
            return res.status(200).json(JSON.parse(cacheResponse));
        }

        const originalSend = res.send.bind(res);
        res.send = (body) => {
            // Verificar si 'body' es un objeto y convertirlo a JSON
            if (typeof body === 'object') {
                redisClient.set(key, JSON.stringify(body), 'cache', 3600); // Cache por 1 hora
            } else if (typeof body === 'string') {
                redisClient.set(key, body, 'cache', 3600); // Cache por 1 hora
            } else {
                console.error('Invalid body type for caching');
            }
            originalSend(body);
        };

        next();
    } catch (err) {
        console.error('Error accessing cache', err);
        next();
    }
};

export default cacheMiddleware;
