import { useState, useEffect } from 'react';
import axios from 'axios';
import './RegistrarProductos.css';

const API_PRODUCTOS = 'http://localhost:8000/api/productos';
const API_CATEGORIAS = 'http://localhost:8000/api/categorias';

function RegistrarProductos({productoEditado, limpiarSeleccion, onActualizacionExitosa}) {
  return (
    <div>  
        <h1 className="h1">Registrar Productos</h1>
        <div className="divForm">
        <RegistroP 
          productoEditado={productoEditado}
          limpiarSeleccion={limpiarSeleccion}
          onActualizacionExitosa={onActualizacionExitosa}
        />
        </div>
        
    </div>
  );
}

  function RegistroP({productoEditado, limpiarSeleccion, onActualizacionExitosa}) {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [idCategoria, setIdCategoria] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [cargandoCategorias, setCargandoCategorias] = useState(true);

    useEffect(() => {
      const obtenerCategorias = async () => {
        try {
          const response = await axios.get(API_CATEGORIAS);
          const datos = Array.isArray(response.data) ? response.data : response.data?.categorias ?? [];
          setCategorias(datos);
        } catch (error) {
          console.error('Error al obtener categorías:', error);
        } finally {
          setCargandoCategorias(false);
        }
      };
      obtenerCategorias();
    }, []);

    useEffect(() => {
      if(productoEditado){
        setNombre(productoEditado.nombre ?? '');
        setDescripcion(productoEditado.descripcion ?? '');
        setImagen(productoEditado.imagen ?? '');
        setPrecio(productoEditado.precio ?? '');
        setStock(productoEditado.stock ?? '');
        setIdCategoria(productoEditado.id_categoria ?? '');
      } else {
        resetForm();
      }
    }, [productoEditado]);

    const resetForm = () => {
      setNombre('');
      setDescripcion('');
      setImagen('');
      setPrecio('');
      setStock('');
      setIdCategoria('');
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const nombreLimpio = nombre.trim();
      const descripcionLimpia = descripcion.trim();
      const imagenLimpia = imagen.trim();
      const precioNumero = Number(precio);
      const stockNumero = Number(stock);
      const categoriaSeleccionada = Number(idCategoria);

      if (!nombreLimpio || !descripcionLimpia || !imagenLimpia || !precio || !stock || !idCategoria) {
        alert('No dejes campos vacíos.');
        return;
      }

      const nuevoProducto = {
        nombre: nombreLimpio,
        descripcion: descripcionLimpia,
        imagen: imagenLimpia,
        precio: precioNumero,
        stock: stockNumero,
        id_categoria: categoriaSeleccionada,
      };
      try{
        if(productoEditado){
          const response = await axios.put(`${API_PRODUCTOS}/${productoEditado.id}`, nuevoProducto);
          console.log('Producto actualizado:', response.data);
          alert('Producto actualizado con éxito');
          limpiarSeleccion();
        } else {
          const response = await axios.post(API_PRODUCTOS, nuevoProducto);
          console.log('Producto registrado:', response.data);
          alert('Producto registrado con éxito');
        }
        resetForm();
        if (onActualizacionExitosa){
          onActualizacionExitosa();
        }
      } catch(error){
        console.error('Error al registrar producto:', error);
        alert('Error al procesar la solicitud');
      }
    };

    return(
        <form onSubmit={handleSubmit} className="formularioProductos">
        <label>Nombre del producto:</label>
        <input type="text" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

        <label>Descripción:</label> 
        <input type="text" name="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />

        <label>Imagen:</label>
        <input type="text" name="imagen" value={imagen} onChange={(e) => setImagen(e.target.value)} required />

        <label>Precio:</label>
        <input type="number" name="precio" value={precio} onChange={(e) => setPrecio(e.target.value)} required />

        <label>Stock:</label>
        <input type="number" name="stock" value={stock} onChange={(e) => setStock(e.target.value)} required />

        <label>Categoría:</label>
        {cargandoCategorias ? (
          <p>Cargando categorías...</p>
        ) : (
          <select name="id_categoria" value={idCategoria} onChange={(e) => setIdCategoria(e.target.value)} required>
            <option value="">-- Selecciona una categoría --</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.id} - {categoria.nombre}
              </option>
            ))}
          </select>
        )}

            <button type="submit" name="registrar">{productoEditado ? 'Actualizar' : 'Registrar'}</button>
            {productoEditado && <button type="button" onClick={limpiarSeleccion}>Cancelar</button>}
        </form>
    );
}


export default RegistrarProductos;