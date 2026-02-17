import miLogo from "./assets/logo.png";
import facebook from "./assets/RS/facebook.png";
import whatsapp from "./assets/RS/whatsapp.png";
import tiktok from "./assets/RS/tiktok.png";
import youtube from "./assets/RS/youtube.png";
import instagram from "./assets/RS/insta.png";
import PropTypes from 'prop-types';

import './Encabezado.css';
import Clima from "./Clima";

function Encabezado({cambiarVista}) {
    return (
        <div className="Encabezado">
            <div>
                <Logo/>
                <Menu cambiarVista={cambiarVista} />
                <Redes/>
            </div> 
            <div className="divClima">
            <Clima  />
            </div>
        </div>
    );
}

function Logo(){
    return (
        <div className="Logo">
            <img src={miLogo} alt="React Logo" />
        </div>
    );
}

function Menu({cambiarVista}){
    return (
    <div className="menuDiv">
        <ul>
            <li onClick={() => cambiarVista("Inicio")}>Inicio</li>
            <li onClick={() => cambiarVista("AcercaDe")}>Acerca de</li>
            <li onClick={() => cambiarVista("Productos")}>Productos</li>
            <li onClick={() => cambiarVista("Galeria")}>Galeria</li>
            <li onClick={() => cambiarVista("Contacto")}>Contacto</li>   
            <li onClick={() => cambiarVista("Sucursales")}>Sucursales</li>
        </ul>
         
    </div>
    );
}

function Redes(){
    return (
        <div className="redesDiv">
            <ul>
                <li><a href="#"><img src={facebook} alt="Facebook logo" /></a></li>
                <li><a href="#"><img src={whatsapp} alt="WhatsApp logo" /></a></li>
                <li><a href="#"><img src={tiktok} alt="TikTok logo" /></a></li>
                <li><a href="#"><img src={youtube} alt="YouTube logo" /></a></li>
                <li><a href="#"><img src={instagram} alt="Instagram logo" /></a></li>
            </ul>
            
        </div>
    );
}

Encabezado.propTypes = {
    cambiarVista: PropTypes.func.isRequired
};

Menu.propTypes = {
    cambiarVista: PropTypes.func.isRequired
};

export default Encabezado;