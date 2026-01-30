import './ContenedorTarjetas.css';
import imgTarjeta from "./assets/Recursos/pc.png";

function ContenedorTarjeta() {
    return (
        <div className="ContenedorTarjeta">
            <Tarjeta />
            <Tarjeta />
            <Tarjeta />
            <Tarjeta /> 
        </div>
    );
}

function Tarjeta(){
    return(
        <div className="Tarjeta">
            <img src={imgTarjeta} alt="Imagen de la tarjeta"/>
            <h3>Marcianoware</h3>
            <p>una lokura de pc</p>
            <a href="#">Ver más</a>
            </div>
    )

}

export default ContenedorTarjeta;