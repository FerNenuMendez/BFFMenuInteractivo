import { encriptar } from "./crypto.js";
import logger from '../middlewares/logger.js'

const cookieOpts = { httpOnly: true, maxAge: 1000 * 60 * 60 /*1hs*/, signed: true }

export async function newToken(req, res) {
    try {
        const data = {
            user: req.user.mail,
            nombre: req.user.nombre,
            timestamp: Date.now()
        }
        const token = await encriptar(data)
        res.status(201).send({ token: token })
    } catch (error) {
        logger.error(`Error message: ${error.message}`)
        res.status(500).send({ error: 'Failed to generate token' });
    }
}


export function deleteTokenFromCookie(req, res, next) {
    res.clearCookie('sessionID', cookieOpts)
}