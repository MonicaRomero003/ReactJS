import {useState, useEffect} from 'react';
import api from './Services/api';
import "./RegistrarProductos.css";

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
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
      if(productoEditado){
        setTitle(productoEditado.title);
        setPrice(productoEditado.price);
        setDescription(productoEditado.description);
        setCategory(productoEditado.category);
        setImage(productoEditado.image);
      } else {
        resetForm();
      }
    }, [productoEditado]);

    const resetForm = () => {
      setTitle('');
      setPrice('');
      setDescription('');
      setCategory('');
      setImage('');
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const nuevoProducto = {title, price, description, category, image};
      try{
        if(productoEditado){
          const response = await api.put(`/products/${productoEditado.id}`, nuevoProducto);
          console.log('Producto actualizado:', response.data);
          alert('Producto actualizado con éxito');
          limpiarSeleccion();
        } else {
          const response = await api.post('/products', nuevoProducto);
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
            <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required></input>
            <label>Precio:</label>
            <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} required></input>
            <label>Descripción:</label> 
            <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} required></input>
            <label>Categoria:</label>
            <input type="text" name="category" value={category} onChange={(e) => setCategory(e.target.value)} required></input>
            <label>Imagen:</label>
            <input type="text" name="image" value={image} onChange={(e) => setImage(e.target.value)} required></input>
            <button type="submit" name="registrar">{productoEditado ? 'Actualizar' : 'Registrar'}</button>
            {productoEditado && <button type="button" onClick={limpiarSeleccion}>Cancelar</button>}
        </form>
    );
}


export default RegistrarProductos;