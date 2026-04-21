import { useEffect, useState } from 'react';
import axios from 'axios';
import './Usuarios.css';
import RegistrarUsuarios from './RegistrarUsuarios';
import { useAuth } from './AuthContext.jsx';

const API_USUARIOS = 'http://localhost:8000/api/usuarios';

function Usuarios(){
  const { rol } = useAuth();
  const isAdmin = rol === 'admin';
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  
  const obtenerUsuarios = async () => {
      try{
        setCargando(true);
        setError(null);
        const response = await axios.get(API_USUARIOS);
        setUsuarios(Array.isArray(response.data) ? response.data : response.data?.usuarios ?? []);
      }catch(error){
        console.error('Error al obtener usuarios:', error);
        setError('Error al cargar los usuarios. Por favor, intenta de nuevo.');
      }finally{
        setCargando(false);
      }
    };
  
  const removerUsuario = async (id) => {
    try{
      await axios.delete(`${API_USUARIOS}/${id}`);
      obtenerUsuarios();
    }catch(error){
      console.error('Error al eliminar usuario:', error);
    }
  };

  const handleActualizacionExitosa = () => {
    obtenerUsuarios();
    setMostrarFormulario(false);
    setUsuarioSeleccionado(null);
  };

  const handleCancelar = () => {
    setMostrarFormulario(false);
    setUsuarioSeleccionado(null);
  };

  useEffect(() => {
    obtenerUsuarios();
  },[]);
    
  if(cargando) return <p>Cargando usuarios...</p>;
  if(error) return <div><p>{error}</p><button onClick={obtenerUsuarios}>Reintentar</button></div>;
  if(usuarios.length === 0) return <p>No hay usuarios disponibles.</p>;

    return(
        <div className="ContenedorUsuarios"> 
          {isAdmin && (
            <button className="BtnAgregarUsuario" onClick={() => setMostrarFormulario(!mostrarFormulario)}>
              {mostrarFormulario ? 'Ocultar formulario' : 'Agregar usuario'}
            </button>
          )}
          {mostrarFormulario && isAdmin && (
            <RegistrarUsuarios       
              usuarioEditado={usuarioSeleccionado} 
              limpiarSeleccion={handleCancelar} 
              onActualizacionExitosa={handleActualizacionExitosa}
            />
          )}
        <div className='Usuarios'>

        <table border="1" width="600">
            <tr> 
                <th width="100"> ID </th> 
                <th> Nombre </th>
                <th> Direccion </th>
                <th> Telefono </th>
                <th> Email </th>
                <th > Password </th>
                <th> Rol </th>
                <th> Fecha registro </th>
                
            </tr>
            {usuarios.map((usuario) => (
            <tr key={usuario.id}>
                <th>{usuario.id}</th>
                <th>{usuario.nombre}</th>
                <th>{usuario.direccion}</th>
                <th>{usuario.telefono}</th>
                <th>{usuario.email}</th>
                <th>{usuario.password}</th>
                <th>{usuario.rol}</th>
                <th>{usuario.fecha_registro}</th>
                {isAdmin && (
                  <th><button onClick={() => {setUsuarioSeleccionado(usuario); setMostrarFormulario(true);}}>Editar</button>
                  <button onClick={() => removerUsuario(usuario.id)}>Eliminar</button></th>
                )}
            </tr>
                  )
      )}
            </table>

    </div>
        </div>
        
    );
}
// esto nosirve,arregalo moni del futuro





export default Usuarios;
