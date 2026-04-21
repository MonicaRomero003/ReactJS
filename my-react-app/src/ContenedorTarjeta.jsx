import AcercaDe from './AcercaDe';
import Productos from './Productos';
import Galeria from './Galeria';
import Contacto from './Contacto';
import Sucursales from './Sucursales';
import Usuarios from './Usuarios';
import Carrito from './Carrito';
import PropTypes from 'prop-types';
import './ContenedorTarjetas.css';
import Login from './Login';
import RegistrarUsuarios from './RegistrarUsuarios';
import RegistrarProductos from './RegistrarProductos';
import Categorias from './Categorias';
import { useAuth } from './AuthContext.jsx';

function ContenedorTarjeta({vista, cambiarVista}) {
    const { isLoggedIn, rol } = useAuth();
    const isAdmin = rol === 'admin';
    
    const vistas = {
        "Inicio": <Inicio/>,
        "AcercaDe": <AcercaDe/>,
        "Productos": <Productos/>,
        "Galeria": <Galeria/>,
        "Contacto": <Contacto/>,
        "Sucursales": <Sucursales/>,
        "Usuarios": isAdmin ? <Usuarios/> : <Inicio/>,
        "Carrito": <Carrito/>,
        "Login": <Login cambiarVista={cambiarVista}/>,
        "RegistrarUsuarios": <RegistrarUsuarios soloCliente={true}/>,
        "RegistrarProductos": isAdmin ? <RegistrarProductos/> : <Inicio/>,
        "Categorias": isLoggedIn ? <Categorias/> : <Inicio/>
    }
    return (
        <div className="ContenedorTarjeta">
            {vistas[vista] || <Inicio/>}
        </div>
    );
}

function Inicio(){
    return(
        <div className="Inicio">
            <Tarjeta titulo="Marcianware" descripcion="Una cosito" imagen="https://blogs.windows.com/wp-content/uploads/sites/2/2016/09/aw17_tobil_lnb_00120rb55_gy.png"/>
            <Tarjeta titulo="Alienware" descripcion="Una pc de alta gama" imagen="https://www.notebookcheck.net/fileadmin/_processed_/webp/Notebooks/News/_nc3/laptop_alienware_x15_r2_nonlit_touchpad_gallery_7-q82-w240-h.webp"/>
            <Tarjeta titulo="Olaware" descripcion="Una copia de la pc de alta gama" imagen="https://www.jonpeddie.com/wp-content/uploads/2023/08/Alien_R16_001.png"/>
            <Tarjeta titulo="Cosoware" descripcion="Ni idea bro" imagen="https://s3.ap-southeast-1.amazonaws.com/uploads-store/uploads/all/eNMeIdPJN13EKbXnTaXfaxpXaTTjtEFo2LDttJqM.png"/> 
        </div>
    );
        
}

function Tarjeta(props){
    return(
        <div className="Tarjeta">
            <img src={props.imagen} alt="Imagen de la tarjeta"/>
            <h3>{props.titulo}</h3>
            <p>{props.descripcion}</p>
            <a href="#">Ver más</a>
            </div>
    )

}

ContenedorTarjeta.propTypes = {
    vista: PropTypes.string.isRequired,
    cambiarVista: PropTypes.func.isRequired
};

export default ContenedorTarjeta;