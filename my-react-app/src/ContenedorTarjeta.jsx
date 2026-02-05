import './ContenedorTarjetas.css';
import imgTarjeta1 from "./assets/Recursos/pc.png";
import imgTarjeta2 from "./assets/Recursos/pc2.png";
import imgTarjeta3 from "./assets/Recursos/pc3.png";
import imgTarjeta4 from "./assets/Recursos/pc4.png";


function ContenedorTarjeta() {
    return (
        <div className="ContenedorTarjeta">
            <Tarjeta titulo="Marcianware" descripcion="Una cosito" img={imgTarjeta1}/>
            <Tarjeta titulo="Alienware" descripcion="Una pc de alta gama" img={imgTarjeta2}/>
            <Tarjeta titulo="Olaware" descripcion="Una copia de la pc de alta gama" img={imgTarjeta3}/>
            <Tarjeta titulo="Cosoware" descripcion="Ni idea bro" img={imgTarjeta4}/> 
        </div>
    );
}

function Tarjeta(props){
    return(
        <div className="Tarjeta">
            <img src={props.img} alt="Imagen de la tarjeta"/>
            <h3>{props.titulo}</h3>
            <p>{props.descripcion}</p>
            <a href="#">Ver más</a>
            </div>
    )

}

export default ContenedorTarjeta;