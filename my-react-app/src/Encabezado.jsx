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
                <Logo />
                <Menu />
                <Redes />
            </div>
            <h2>Bienvenidooooooo</h2> 
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
    <nav>
        <ul>
            <li>Inicio</li>
            <li>Acerca de</li>
            <li>Productos</li>
            <li>Contacto</li>   
            <li>Sucursales</li>
        </ul>
    </nav>
    );
}

function Redes(){
    return (
        <div className="Redes">
            <ul>
                <li><img src={facebook} alt="Facebook logo" /></li>
                <li><img src={whatsapp} alt="WhatsApp logo" /></li>
                <li><img src={tiktok} alt="TikTok logo" /></li>
                <li><img src={youtube} alt="YouTube logo" /></li>
                <li><img src={instagram} alt="Instagram logo" /></li>
            </ul>
        </div>
    );
}
export default Encabezado;