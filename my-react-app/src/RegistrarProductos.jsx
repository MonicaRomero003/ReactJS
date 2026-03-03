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
}

  function RegistroP() {
      /*const {productos, setProductos} = useState({
      title: '',
      price: '',
      description: '',
      category: '',
      image: ''
    });

    const handleChange = (e) => {
      setProductos({
        ...productos,
        [e.target.name]: e.target.value
      });
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      try{
        const response = await api.post('/products', productos);
        setProductos(response.data);
        alert('Producto registrado con éxito');
        console.log(productos);
        setProductos({
          title: '',
          price: '',
          description: '',
          category: '',
          image: ''
        });
      } catch(error){
        console.error('Error al registrar producto:', error);
      }
 */
    return(
        <form onSubmit={handleSubmit} className="formularioProductos">
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


export default RegistrarProductos;