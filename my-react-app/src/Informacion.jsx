import './Informacion.css';
import Mapa from './Mapa';
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
            <Mapa lat={19.478408139355327} lng={-99.09402555269637} nombre_sucursal="Office Depot Aragon" />
        </div>    
    )
}

export default ContenedorInformacion;