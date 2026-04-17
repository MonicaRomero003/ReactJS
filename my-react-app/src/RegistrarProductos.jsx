import { useState, useEffect } from 'react';
import api from './Services/api';
import './RegistrarProductos.css';

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
      const nuevoProducto = {
        nombre,
        descripcion,
        imagen,
        precio,
        stock,
        id_categoria: idCategoria,
      };
      try{
        if(productoEditado){
          const response = await api.put(`/productos/${productoEditado.id}`, nuevoProducto);
          console.log('Producto actualizado:', response.data);
          alert('Producto actualizado con éxito');
          limpiarSeleccion();
        } else {
          const response = await api.post('/productos', nuevoProducto);
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

        <label>ID Categoría:</label>
        <input type="number" name="id_categoria" value={idCategoria} onChange={(e) => setIdCategoria(e.target.value)} required />

            <button type="submit" name="registrar">{productoEditado ? 'Actualizar' : 'Registrar'}</button>
            {productoEditado && <button type="button" onClick={limpiarSeleccion}>Cancelar</button>}
        </form>
    );
}


export default RegistrarProductos;