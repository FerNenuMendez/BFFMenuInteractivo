import jwt from 'jsonwebtoken'
import { hashSync, compareSync, genSaltSync } from "bcrypt";
import { JWT_PRIVATE_KEY } from "./config.js";

export function hashear(frase) {
    if (!frase) throw new Error('cannot has invalid parameter:' + frase)
    return hashSync(frase, genSaltSync(10))
}

export function hasheadaSonIguales(recibida, almacenada) {
    if (!recibida) throw new Error('cannot hash invalid parameter:' + recibida)
    return compareSync(recibida, almacenada)
}

//JWT

export function encriptar(data) {
    return new Promise((resolve, reject) => {
        if (!data) {
            const typedError = new Error('No JWT encode!')
            typedError['type'] = 'Error Interno de API'
            return reject(typedError)
        }
        jwt.sign(data, JWT_PRIVATE_KEY, { expiresIn: '1200000' }, (err, encoded) => {
            if (err) {
                const typedError = new Error(err.message)
                typedError['type'] = 'Error Interno de API'
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
        jwt.verify(token, JWT_PRIVATE_KEY, (err, decoded) => {
            if (err) {
                reject(err)
            } else {
                resolve(decoded)
            }
        })
    })
}