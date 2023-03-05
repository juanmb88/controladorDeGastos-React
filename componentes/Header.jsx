import ControlPresupuesto from './ControlPresupuesto';
import NuevoPresupuesto from './NuevoPresupuesto';

const Header = ( { presupuesto,
                   setPresupuesto,
                   esValidoPresupuesto,
                   setEsValidoPresupuesto,
                   gastos,
                   setGastos }) => {

  return (
     <header>
         <h1>Planificador de Gastos </h1>

         { esValidoPresupuesto ? ( <ControlPresupuesto presupuesto = { presupuesto }
                                                       setPresupuesto = {setPresupuesto}
                                                       gastos = {gastos}
                                                       setGastos = {setGastos}
                                                       setEsValidoPresupuesto = {setEsValidoPresupuesto} />
    ) : ( 
       <NuevoPresupuesto 
                    presupuesto = {presupuesto}
                    setPresupuesto = {setPresupuesto}
                    setEsValidoPresupuesto = {setEsValidoPresupuesto}
                    ControlPresupuesto = {ControlPresupuesto} />               
        ) }
    </header>
  )
}

export default Header;