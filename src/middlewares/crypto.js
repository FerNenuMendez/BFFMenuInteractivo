import jwt from 'jsonwebtoken'
import { compareSync } from "bcrypt";
import { JWT_P_K } from "../config/config.js";
import logger from './logger.js';


export function hasheadaSonIguales(recibida, almacenada) {
    if (!recibida) throw new Error('cannot hash invalid parameter:' + recibida)
    return compareSync(recibida, almacenada)
}

//JWT

export function encriptar(data) {
    return new Promise((resolve, reject) => {
        if (!data) {
            const typedError = new Error('No JWT encode!')
            logger.error('Error Interno de API')
            return reject(typedError)
        }
        jwt.sign(data, JWT_P_K, { expiresIn: '1200000' }, (err, encoded) => {
            if (err) {
                const typedError = new Error(err.message)
                logger.error('Error Interno de API')
                reject(typedError)
            } else {
                resolve(encoded)
            }
        })
    })
}

export function desencriptar(token) {
    return new Promise((resolve, reject) => {
        if (!token) {
            return reject(new Error('no token to decode!'))
        }
        jwt.verify(token, JWT_P_K, (err, decoded) => {
            if (err) {
                reject(err)
            } else {
                resolve(decoded)
            }
        })
    })
}