//generar un Id random
export  const generarId =()=>{
    const random = Math.random().toString(36).substring(2)
    const fecha = Date.now().toString(36)
    return random + fecha
}
//tomar los milisegundos para generar un formato de fecha
export  const formatearFecha = fecha => {
const fechaNueva = new Date(fecha);
const opciones = {
year : 'numeric',
month : 'long',
day : '2-digit',
}
return fechaNueva.toLocaleDateString('es-ES', opciones);
}