import { useState, useEffect } from 'react';
import api from './Services/api';
import './RegistrarUsuarios.css';

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
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState('cliente');

    useEffect(() => {
      if(usuarioEditado){
        setNombre(usuarioEditado.nombre ?? '');
        setDireccion(usuarioEditado.direccion ?? '');
        setTelefono(usuarioEditado.telefono ?? '');
        setEmail(usuarioEditado.email ?? '');
        setPassword(usuarioEditado.password ?? '');
        setRol(usuarioEditado.rol ?? '');
      } else{
        resetForm();
      }
    }, [usuarioEditado]);

    const resetForm = () => {
      setNombre('');
      setDireccion('');
      setTelefono('');
      setEmail('');
      setPassword('');
      setRol('cliente');
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const nuevoUsuario = {
        nombre,
        direccion,
        telefono,
        email,
        password,
        rol,
      };
      try{
        if(usuarioEditado){
          const response = await api.put(`/usuarios/${usuarioEditado.id}`, nuevoUsuario);
          console.log('Usuario actualizado:', response.data);
          alert('Usuario actualizado con éxito');
          limpiarSeleccion();
        }else{
          const response = await api.post('/usuarios', nuevoUsuario);
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
      <label>Nombre:</label>
      <input type="text" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />

      <label>Direccion:</label>
      <input type="text" name="direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} />

      <label>Telefono:</label>
      <input type="text" name="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />

            <label>Email:</label>
      <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label>Password:</label> 
      <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <label>Rol:</label>
      <select name="rol" value={rol} onChange={(e) => setRol(e.target.value)}>
        <option value="cliente">cliente</option>
        <option value="admin">admin</option>
      </select>

      <button type="submit">{usuarioEditado ? 'Actualizar' : 'Registrar'}</button>
        </form>
    )
}


export default RegistrarUsuarios;