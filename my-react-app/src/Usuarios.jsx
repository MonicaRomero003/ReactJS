import { useEffect, useState } from 'react';
import api from './Services/api';
import './Usuarios.css';
import RegistrarUsuarios from './RegistrarUsuarios';

function Usuarios(){
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const obtenerUsuarios = async () => {
      try{
        const response = await api.get('/users');
        setUsuarios(response.data);
      }catch(error){
        console.error('Error al obtener usuarios:', error)
      }finally{
        setCargando(false);
      }
    };
  useEffect(() => {
    obtenerUsuarios();
  },[]);
    
  if(cargando) return <p>Cargando usuarios...</p>

    return(
        <div className="ContenedorUsuarios"> 
  <RegistrarUsuarios       
        usuarioEditado={usuarioSeleccionado} 
        limpiarSeleccion={() => setUsuarioSeleccionado(null)} 
        onActualizacionExitosa={obtenerUsuarios}/>
        <Usuario />
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
            <tr>
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
