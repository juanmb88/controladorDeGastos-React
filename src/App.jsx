import { useState, useEffect } from 'react';
import Header from '../componentes/Header';
import Filtros from '../componentes/Filtros';
import ListadoGastos from '../componentes/ListadoGastos';
import Modal from '../componentes/Modal';
import {generarId} from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg';

function App() {
  /////////////////////////////////////USE STATES///////////////////////////////////

  const [gastos, setGastos] = useState(
    //si existe en LS, inicialo con lo que hay en LS pero convertido en un arreglo,sino inicia vacio
     localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')): []
  )
 
  const [presupuesto, setPresupuesto] = useState(
   Number( localStorage.getItem('presupuesto')) ?? 0
  );
  const [esValidoPresupuesto, setEsValidoPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastoEditar, setGastoEditar] = useState({});
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);


  
/////////////////////////////////////USE EFFECTS///////////////////////////////////
  useEffect(() => {
        if(Object.keys(gastoEditar).length > 0)
        setModal(true)

        setTimeout(() => {
          setAnimarModal(true) 
      }, 600);
  }, [gastoEditar]);

  useEffect(() => {//Se ejecuta cunando cambia presupuesto
      localStorage.setItem( 'presupuesto', presupuesto ?? 0) 
  }, [presupuesto]);

  useEffect(() => {//Se ejecuta cunando cambia gastos
    localStorage.setItem( 'gastos',JSON.stringify(gastos) ?? 0) 
  }, [gastos]);

  useEffect(() => {//Se carga una sola vez cuando carga la app
    const presupuestoLS = Number(localStorage.getItem('presupuesto') )?? 0
    if(presupuestoLS > 0){
      setEsValidoPresupuesto(true)
    }
  }, []);

  useEffect(() => {
      if(filtro){
        const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)
        setGastosFiltrados(gastosFiltrados)
      }
  }, [filtro])
  

//////////////////////////////////FUNCIONES////////////////////////////////////

  const handleModal = () => {
        setModal(true)
        setGastoEditar({})

        setTimeout(() => {
          setAnimarModal(true) 
      }, 600);
  };

  const eliminarGasto = id => {
        const gastosActualizados = gastos.filter( gasto => gasto.id !== id)
        setGastos(gastosActualizados)
  };

  const guardarGasto = gasto => {
      if(gasto.id){
        const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState )
        setGastos(gastosActualizados)
        setGastoEditar({})
      }else{
          gasto.id = generarId();
          gasto.fecha = Date.now();//retornar la fecha en la q se genera ese objeto
          setGastos([...gastos,gasto])//agrego el gasto con id generado
      }
      setAnimarModal(false) //animacion de cerrar el modal
      setTimeout(() => {
          setModal(false)    
        }, 700);
  };

    
  return (
    <div className = { modal ? 'fijar' : " "}>
      <Header
        gastos = {gastos}
        setGastos = {setGastos}
        presupuesto = {presupuesto}
        setPresupuesto = {setPresupuesto}
        esValidoPresupuesto = {esValidoPresupuesto}
        setEsValidoPresupuesto = {setEsValidoPresupuesto} />
        
        { esValidoPresupuesto && (
          <>
            <main>
              <Filtros
                  filtro = {filtro}
                  setFiltro = {setFiltro}
              />
              <ListadoGastos gastos = {gastos}
                             setGastoEditar = {setGastoEditar}
                             eliminarGasto = {eliminarGasto}
                             filtro = {filtro}
                             gastosFiltrados = {gastosFiltrados} />
            </main>
            
            <div className='nuevo-gasto'> 
              <img  src = {IconoNuevoGasto} alt = "icono nuevo gasto" onClick = {handleModal} />
            </div>
          </>
        ) } 

      { modal && <Modal 
                      gastoEditar = {gastoEditar}
                      setModal = {setModal}
                      animarModal = {animarModal}
                      setAnimarModal = {setAnimarModal} 
                      guardarGasto = {guardarGasto}
                      setGastoEditar = { setGastoEditar}  /> } 

    </div>
  )
}

export default App
