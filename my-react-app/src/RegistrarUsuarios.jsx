import { useState, useEffect } from 'react';
import axios from 'axios';
import './RegistrarUsuarios.css';

const API_USUARIOS = 'http://localhost:8000/api/usuarios';

function RegistrarUsuarios({usuarioEditado, limpiarSeleccion, onActualizacionExitosa, soloCliente = false}) {
  return (
    <div>  
        <h1 className="h1">Registrar Usuarios</h1>
        <div className="divForm">
        <RegistroU 
          usuarioEditado={usuarioEditado}
          limpiarSeleccion={limpiarSeleccion}
          onActualizacionExitosa={onActualizacionExitosa}
          soloCliente={soloCliente}
        />
        </div>
        
    </div>
  );
}

  function RegistroU({usuarioEditado, limpiarSeleccion, onActualizacionExitosa, soloCliente = false}) {
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
        setRol(soloCliente ? 'cliente' : (usuarioEditado.rol ?? ''));
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
      const nombreLimpio = nombre.trim();
      const direccionLimpia = direccion.trim();
      const telefonoLimpio = telefono.trim();
      const emailLimpio = email.trim();
      const passwordLimpia = password.trim();

      if (!nombreLimpio || !direccionLimpia || !telefonoLimpio || !emailLimpio || !passwordLimpia) {
        alert('No dejes campos vacíos.');
        return;
      }

      const nuevoUsuario = {
        nombre: nombreLimpio,
        direccion: direccionLimpia,
        telefono: telefonoLimpio,
        email: emailLimpio,
        password: passwordLimpia,
        rol: soloCliente ? 'cliente' : rol,
        fecha_registro: new Date().toISOString(),
      };
      try{
        if(usuarioEditado){
          const response = await axios.put(`${API_USUARIOS}/${usuarioEditado.id}`, nuevoUsuario);
          console.log('Usuario actualizado:', response.data);
          alert('Usuario actualizado con éxito');
          limpiarSeleccion();
        }else{
          const response = await axios.post(API_USUARIOS, nuevoUsuario);
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
      <input type="text" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

      <label>Direccion:</label>
      <input type="text" name="direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />

      <label>Telefono:</label>
      <input type="text" name="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />

            <label>Email:</label>
      <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label>Password:</label> 
      <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

      {!soloCliente && (
        <>
          <label>Rol:</label>
          <select name="rol" value={rol} onChange={(e) => setRol(e.target.value)}>
            <option value="cliente">cliente</option>
            <option value="admin">admin</option>
          </select>
        </>
      )}

      {soloCliente && <input type="hidden" name="rol" value="cliente" />}

      <button type="submit">{usuarioEditado ? 'Actualizar' : 'Registrar'}</button>
        </form>
    )
}


export default RegistrarUsuarios;