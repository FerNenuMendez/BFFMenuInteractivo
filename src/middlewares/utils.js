export function buscarPorId(array, id) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id === id) {
            return array[i];
        }
    }
    return null; // Retorna null si no se encuentra el objeto
}