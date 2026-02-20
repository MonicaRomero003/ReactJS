import './Informacion.css';
import Mapa from './Mapa';
import MapaGeo from './MapaGeo.jsx';
import MapaConRutas from './MapaConRutas.jsx';
function ContenedorInformacion(){
    return(
        <Informacion />
    )
}

function Informacion(){
  return(
       <div className="Info">
            <h3>Alienware se ha consolidado como una de las marcas más queridas por los gamers, apoyando equipos de esports y ofreciendo hardware capaz de manejar los títulos más exigentes con fluidez y estilo</h3>
            <p>Fundadores: Nelson González y Alex Águila.</p>
            <MapaConRutas />
        </div>    
    )
}

export default ContenedorInformacion;