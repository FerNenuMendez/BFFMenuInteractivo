export function manejoDeErrores(error, req, res, next) {
  let statusCode = 500; // Default
  let errorMessage = "Internal Server Error";

  // Registro del error para depuración
  console.error('Error recibido:', error);

  // Extraer código de estado del mensaje de error si está disponible
  if (error.message && error.message.startsWith('Error ')) {
    const parts = error.message.split(':');
    const codeMatch = parts[0].match(/\d+/);
    if (codeMatch) {
      statusCode = parseInt(codeMatch[0], 10);
      errorMessage = parts.slice(1).join(':').trim() || error.message;
    }
  }

  // Manejo adicional para estados específicos
  switch (statusCode) {
    case 400:
      errorMessage = "Bad Request";
      break;
    case 401:
      errorMessage = "Unauthorized";
      break;
    case 404:
      errorMessage = "Not Found";
      break;
    case 407:
      errorMessage = "Authentication Required";
      break;
    case 408:
      errorMessage = "Request Timeout";
      break;
    case 500:
      errorMessage = "Internal Server Error";
      break;
    case 503:
      errorMessage = "Service Unavailable";
      break;
    case 522:
      errorMessage = "Connection Timed Out";
      break;
    default:
      statusCode = 500;
      errorMessage = "Internal Server Error";
      break;
  }

  res.status(statusCode).json({
    status: errorMessage,
    error: error.message,
    message: "Hubo un error en el servidor, intente más tarde. Si el error persiste, contacte al proveedor del servicio."
  });
}




