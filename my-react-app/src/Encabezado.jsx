import miLogo from "./assets/logo.png";
import facebook from "./assets/RS/facebook.png";
import whatsapp from "./assets/RS/whatsapp.png";
import tiktok from "./assets/RS/tiktok.png";
import youtube from "./assets/RS/youtube.png";
import instagram from "./assets/RS/insta.png";

import './Encabezado.css';

function Encabezado() {
    return (
        <div className="Encabezado">
            <div>
                <Logo/>
                <Menu/>
                <Redes/>
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

function Menu(){
    return (
    <div className="menuDiv">
        <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Acerca de</a></li>
            <li><a href="#">Productos</a></li>
            <li><a href="#">Contacto</a></li>   
            <li><a href="#">Sucursales</a></li>
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
export default Encabezado;