import {useState} from 'react'
import Mensaje from "./Mensaje"

const NuevoPresupuesto = ({ presupuesto, setPresupuesto,setEsValidoPresupuesto }) => {
  //este useState es local, no lo requiero en el app.jsx 
    const [ mensaje, setMensaje ] = useState("");
//Validar que sea solo numero lo ingresado por cliente
    const handlePresupuesto = (e) =>{
        e.preventDefault();

        if(!presupuesto || presupuesto < 0 ) {
            setMensaje('No es un presupuesto valido')
           return
        }
        setMensaje('')//reinicio de presupuesto para que quede en 0
        setEsValidoPresupuesto(true)
        
    }
  return (
    <div className='contenedor-presupuesto contenedor sombra'>

        <form onSubmit={handlePresupuesto} className='formulario'>
            <div className="campo">
                <label htmlFor="">Definir presupuesto</label>

                <input type="number" 
                       className='nuevo-presupuesto ' 
                       placeholder='Añade tu presupuesto'
                       value={presupuesto}
                       onChange={(e) => setPresupuesto(Number(e.target.value))}
                    />
            </div>

         <input type = "submit" value = ' Añadir' />

         {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        </form>
    </div>
  )
}

export default NuevoPresupuesto