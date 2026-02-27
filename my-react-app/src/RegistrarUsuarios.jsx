import "./RegistrarUsuarios.css"
function RegistrarUsuarios() {
  return (
    <div>  
        <h1 className="h1">Registrar Usuarios</h1>
        <div className="divForm">
        <RegistroU />
        </div>
        
    </div>
  );

  function RegistroU() {
    return(
        <form className="formularioProductos">
            <label>UserName:</label>
            <input type="text" name="username"></input>
            <label>Email:</label>
            <input type="email" name="email"></input>
            <label>Password:</label> 
            <input type="password" name="password"></input>
            <button type="submit" name="registrar">Registrar</button>
        </form>
    )
}
}

export default RegistrarUsuarios;