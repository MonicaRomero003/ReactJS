import "./RegistrarProductos.css";

function RegistrarProductos() {
  return (
    <div>  
        <h1 className="h1">Registrar Productos</h1>
        <div className="divForm">
        <RegistroP />
        </div>
        
    </div>
  );

  function RegistroP() {
    return(
        <form className="formularioProductos">
            <label>Nombre del producto:</label>
            <input type="text" name="title"></input>
            <label>Precio:</label>
            <input type="number" name="price"></input>
            <label>Descripción:</label> 
            <input type="text" name="description"></input>
            <label>Categoria:</label>
            <input type="text" name="category"></input>
            <label>Imagen:</label>
            <input type="text" name="image"></input>
            <button type="submit" name="registrar">Registrar</button>
        </form>
    )
}
}

export default RegistrarProductos;