import { encriptar, desencriptar } from "./crypto.js";
import logger from '../middlewares/logger.js'

const cookieOpts = { httpOnly: true, maxAge: 1000 * 60 * 60 /*1hs*/, signed: true }

export async function newToken(req, res) {
    try {
        const data = {
            id: req.user.id,
            mail: req.user.mail,
            nombre: req.user.nombre,
            apellido: req.user.apellido,
            cuit: req.user.cuit,
            tiendas: req.user.tiendas,
            timestamp: Date.now()
        }
        const token = await encriptar(data)
        res.status(201).send({ token: token })
    } catch (error) {
        logger.error(`Error message: ${error.message}`)
        res.status(500).send({ error: 'Failed to generate token' });
    }
}

export async function refreshToken(req, res, next) {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(400).send({ error: 'Token is required' });
        }
        const decryptedData = await desencriptar(token);
        if (!decryptedData) {
            return res.status(401).send({ error: 'Invalid token' });
        }
        const newData = {
            user: decryptedData.user,
            nombre: decryptedData.nombre,
            timestamp: Date.now()
        };
        const newToken = await encriptar(newData);
        res.setHeader('Authorization', `Bearer ${newToken}`);
        next();
    } catch (error) {
        logger.error(`Error message: ${error.message}`);
        logger.error(`Error stack: ${error.stack}`);
        res.status(500).send({ error: 'Failed to refresh token' });
    }
}

export function deleteTokenFromCookie(req, res, next) {
    res.clearCookie('sessionID', cookieOpts)
}