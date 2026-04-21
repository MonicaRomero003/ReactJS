import { useEffect, useState } from 'react';
import axios from 'axios';
import './Carrito.css';
import { useAuth } from './AuthContext.jsx';

const API_CARRITOS = 'http://localhost:8000/api/carritos';
const API_DETALLES = 'http://localhost:8000/api/carrito-detalle';
const API_PRODUCTOS = 'http://localhost:8000/api/productos';
const API_USUARIOS = 'http://localhost:8000/api/usuarios';

function Carritos(){
    return(
        <div className="ContenedorCarrito"> 
        <Carrito />
        </div>
        
    );
}

function Carrito(){
  const { userId, rol } = useAuth();
  const isAdmin = rol === 'admin';
  const [carritos, setCarritos] = useState([]);
  const [detalles, setDetalles] = useState({});
  const [cantidadesEditadas, setCantidadesEditadas] = useState({});
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const mapaProductos = productos.reduce((acumulado, producto) => {
    acumulado[producto.id] = producto;
    return acumulado;
  }, {});

  const mapaUsuarios = usuarios.reduce((acumulado, usuario) => {
    acumulado[usuario.id] = usuario;
    return acumulado;
  }, {});

  const obtenerCarritos = async () => {
    try{
      setCargando(true);
      setError('');
      const rutaCarritos = isAdmin || !userId
        ? API_CARRITOS
        : `${API_CARRITOS}?id_usuario=${userId}`;

      const [respuestaCarritos, respuestaProductos, respuestaUsuarios] = await Promise.all([
        axios.get(rutaCarritos),
        axios.get(API_PRODUCTOS),
        axios.get(API_USUARIOS),
      ]);
      const datos = Array.isArray(respuestaCarritos.data) ? respuestaCarritos.data : respuestaCarritos.data?.carritos ?? [];
      setCarritos(datos);
      setProductos(Array.isArray(respuestaProductos.data) ? respuestaProductos.data : respuestaProductos.data?.productos ?? []);
      setUsuarios(Array.isArray(respuestaUsuarios.data) ? respuestaUsuarios.data : respuestaUsuarios.data?.usuarios ?? []);
    }catch(error){
      console.error('Error al obtener carritos:', error);
      setError('No se pudieron cargar los carritos.');
    }finally{
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerCarritos();
  },[userId, isAdmin]);

  const obtenerDetalles = async (carritoId) => {
    try {
      const response = await axios.get(`${API_DETALLES}?id_carrito=${carritoId}`);
      const datos = Array.isArray(response.data) ? response.data : [];
      setCantidadesEditadas((prevCantidades) => {
        const siguientesCantidades = { ...prevCantidades };
        datos.forEach((detalle) => {
          if (siguientesCantidades[detalle.id] === undefined) {
            siguientesCantidades[detalle.id] = detalle.cantidad;
          }
        });
        return siguientesCantidades;
      });
      setDetalles((prevDetalles) => ({
        ...prevDetalles,
        [carritoId]: datos,
      }));
      setCarritoAbierto(carritoId);
    } catch (error) {
      console.error('Error al obtener detalles del carrito:', error);
      alert('No se pudieron cargar los detalles del carrito');
    }
  };

  const alternarDetalles = (carritoId) => {
    if (carritoAbierto === carritoId) {
      setCarritoAbierto(null);
      return;
    }

    if (!detalles[carritoId]) {
      obtenerDetalles(carritoId);
      return;
    }

    setCarritoAbierto(carritoId);
  };

  const eliminarProductoDelCarrito = async (detalleId, carritoId) => {
    try {
      await axios.delete(`${API_DETALLES}/${detalleId}`);
      await Promise.all([
        obtenerCarritos(),
        obtenerDetalles(carritoId),
      ]);
    } catch (error) {
      console.error('Error al eliminar producto del carrito:', error);
      alert('No se pudo eliminar el producto del carrito');
    }
  };

  const modificarCantidadProducto = async (detalleId, carritoId) => {
    try {
      const cantidadNueva = Number(cantidadesEditadas[detalleId]);

      if (!Number.isInteger(cantidadNueva) || cantidadNueva < 1) {
        alert('La cantidad debe ser un número mayor a 0');
        return;
      }

      const detalleActual = detalles[carritoId]?.find((detalle) => detalle.id === detalleId);

      if (!detalleActual) {
        alert('No se encontró el producto en el carrito');
        return;
      }

      await axios.put(`${API_DETALLES}/${detalleId}`, {
        id_carrito: detalleActual.id_carrito,
        id_producto: detalleActual.id_producto,
        precio_unitario: detalleActual.precio_unitario,
        cantidad: cantidadNueva,
      });

      await Promise.all([
        obtenerCarritos(),
        obtenerDetalles(carritoId),
      ]);
    } catch (error) {
      console.error('Error al modificar cantidad del producto:', error);
      alert('No se pudo modificar la cantidad');
    }
  };

  if(cargando) return <p>Cargando carritos...</p>

  if(error) return <p className="error">{error}</p>

  return( 
    <div className='Carritos'>
      {isAdmin && <p className="CarritosAdminNotice">Viendo todos los carritos del sistema.</p>}
      {carritos.length === 0 ? (
        <p>No hay carritos disponibles</p>
      ) : (
        carritos.map((carrito) => (
          <div className='tarjetaCarro' key={carrito.id}>
            <h3>Carrito ID: {carrito.id}</h3>
            <p>Usuario: {carrito.id_usuario} - {mapaUsuarios[carrito.id_usuario]?.nombre ?? 'Sin nombre'}</p>
            <p>Fecha: {new Date(carrito.fecha_creacion).toLocaleDateString()}</p>
            <p>Total: ${parseFloat(carrito.total).toFixed(2)}</p>
            <button onClick={() => alternarDetalles(carrito.id)}>Ver detalles</button>
            <button>Eliminar carrito</button>
            {carritoAbierto === carrito.id && (
              <div className="CarritoDetalles">
                <h4>Detalles del carrito</h4>
                {detalles[carrito.id]?.length > 0 ? (
                  <ul>
                    {detalles[carrito.id].map((detalle) => {
                      const producto = mapaProductos[detalle.id_producto];
                      return (
                        <li key={detalle.id}>
                          <strong>{producto?.nombre ?? `Producto ${detalle.id_producto}`}</strong>
                          <span> | Cantidad: </span>
                          <input
                            type="number"
                            min="1"
                            value={cantidadesEditadas[detalle.id] ?? detalle.cantidad}
                            onChange={(e) => setCantidadesEditadas((prev) => ({
                              ...prev,
                              [detalle.id]: e.target.value,
                            }))}
                          />
                          <span> | Precio: ${parseFloat(detalle.precio_unitario).toFixed(2)}</span>
                          <button onClick={() => modificarCantidadProducto(detalle.id, carrito.id)}>
                            Modificar cantidad
                          </button>
                          <button onClick={() => eliminarProductoDelCarrito(detalle.id, carrito.id)}>
                            Borrar producto
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p>Este carrito no tiene productos todavía.</p>
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  )
}

export default Carritos;