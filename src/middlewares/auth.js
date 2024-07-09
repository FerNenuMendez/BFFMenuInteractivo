import { compareSync } from "bcrypt";

export function soloRoles(roles) {
  return async function (req, res, next) {
    if (roles.includes(req.user.rol)) {
      return next()
    }
    const typedError = new Error('No tenes permiso asignado para esto')
    typedError['type'] = 'FAILED_AUTHORIZATION'
    next(typedError)
  }
}

export function hasheadaSonIguales(recibida, almacenada) {
  if (!recibida) throw new Error('cannot hash invalid parameter:' + recibida)
  return compareSync(recibida, almacenada)
}

