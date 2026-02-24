import { useEffect, useState } from 'react';
import api from './Services/api';
import './Carrito.css';

function Carritos(){
    return(
        <div className="ContenedorCarrito"> 
        <Carrito />
        </div>
        
    );
}

function Carrito(){
  const [carritos, setCarritos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerCarritos = async () => {
      try{
        const response = await api.get('/carts');
        setCarritos(response.data);
      }catch(error){
        console.error('Error al obtener carritos:', error)
      }finally{
        setCargando(false);
      }
    };
    obtenerCarritos();
  },[]);

  if(cargando) return <p>Cargando carritos...</p>

  return( 
    <div className='Carritos'>
      {carritos.map((carrito) => (
        <div className='tarjetaCarro'>
          <h3>Carrito ID: {carrito.id}</h3>
          <p>Usuario ID: {carrito.usuario_id}</p>
          <p>Fecha: {carrito.date}</p>
            <p>Productos:</p>
            <ul>
                {carrito.products.map((producto, index) => (
                    <li key={index}>
                        Producto ID: {producto.product_id}, 
                        Cantidad: {producto.quantity}
                    </li>
                ))}
            </ul>
        </div>
      ))}
    </div>
  )
}

export default Carritos;