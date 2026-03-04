import { useEffect, useState } from 'react';
import api from './Services/api';
import './Usuarios.css';
import RegistrarUsuarios from './RegistrarUsuarios';

function Usuarios(){
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  
  const obtenerUsuarios = async () => {
      try{
        setCargando(true);
        setError(null);
        const response = await api.get('/users');
        setUsuarios(response.data);
      }catch(error){
        console.error('Error al obtener usuarios:', error);
        setError('Error al cargar los usuarios. Por favor, intenta de nuevo.');
      }finally{
        setCargando(false);
      }
    };
  
  const removerUsuario = async (id) => {
    try{
      await api.delete(`/users/${id}`);
      obtenerUsuarios();
    }catch(error){
      console.error('Error al eliminar usuario:', error);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  },[]);
    
  if(cargando) return <p>Cargando usuarios...</p>;
  if(error) return <div><p>{error}</p><button onClick={obtenerUsuarios}>Reintentar</button></div>;
  if(usuarios.length === 0) return <p>No hay usuarios disponibles.</p>;

    return(
        <div className="ContenedorUsuarios"> 
  <RegistrarUsuarios       
        usuarioEditado={usuarioSeleccionado} 
        limpiarSeleccion={() => setUsuarioSeleccionado(null)} 
        onActualizacionExitosa={obtenerUsuarios}/>
        <div className='Usuarios'>

        <table border="1" width="600">
            <tr> 
                <th width="100"> ID </th> 
                <th> Email </th>
                <th> UserName </th>
                <th> Password </th>
                <th > Nombre </th>
                <th> Segundo nombre </th>
                <th> Telefono </th>
                <th>Acciones</th>
            </tr>
            {usuarios.map((usuario) => (
            <tr key={usuario.id}>
                <th>{usuario.id}</th>
                <th>{usuario.email}</th>
                <th>{usuario.username}</th>
                <th>{usuario.password}</th>
                <th>{usuario.name.firstname}</th>
                <th>{usuario.name.lastname}</th>
                <th>{usuario.phone}</th>
                <th><button onClick={() => setUsuarioSeleccionado(usuario)}>Editar</button>
                <button onClick={() => removerUsuario(usuario.id)}>Eliminar</button></th>
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
