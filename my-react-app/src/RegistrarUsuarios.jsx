import {useState, useEffect} from 'react';
import api from './Services/api';
import "./RegistrarUsuarios.css"
function RegistrarUsuarios({usuarioEditado, limpiarSeleccion, onActualizacionExitosa}) {
  return (
    <div>  
        <h1 className="h1">Registrar Usuarios</h1>
        <div className="divForm">
        <RegistroU 
          usuarioEditado={usuarioEditado}
          limpiarSeleccion={limpiarSeleccion}
          onActualizacionExitosa={onActualizacionExitosa}
        />
        </div>
        
    </div>
  );
}

  function RegistroU({usuarioEditado, limpiarSeleccion, onActualizacionExitosa}) {
    const[username,setUsername] = useState('');
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');

    useEffect (()=>{
      if(usuarioEditado){
        setUsername(usuarioEditado.username);
        setEmail(usuarioEditado.email);
        setPassword(usuarioEditado.password);
      } else{
        resetForm();
      }
    }, [usuarioEditado]);

    const resetForm = () => {
      setUsername('');
      setEmail('');
      setPassword('');
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const nuevoUsuario = {username, email, password}
      try{
        if(usuarioEditado){
          const response = await api.put(`/users/${usuarioEditado.id}`, nuevoUsuario);
          console.log('Usuario actualizado:', response.data);
          alert('Usuario actualizado con éxito');
          limpiarSeleccion();
        }else{
          const response = await api.post('/users', nuevoUsuario);
          console.log('Usuario registrado:', response.data);
          alert('Usuario registrado con éxito');
          
        }
        resetForm();
        if (onActualizacionExitosa){
          onActualizacionExitosa();
        }
      }catch(error){
        console.error('Error al registrar usuario:', error);
        alert('Error al procesar la solicitud');
      }
    }

    return(
        <form onSubmit={handleSubmit} className="formularioProductos">
            <label>UserName:</label>
            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
            <label>Email:</label>
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <label>Password:</label> 
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <button type="submit">Registrar</button>
        </form>
    )
}


export default RegistrarUsuarios;