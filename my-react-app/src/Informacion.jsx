import './Informacion.css';

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
            <p>Inspiración del nombre: La serie The X-Files, lo que llevó a la estética alienígena y nombres como Area-51, Aurora y Hangar 18.</p>
            <p>Propietario actual: Dell Technologies (adquirió Alienware en 2006).</p>
            <p>Sede inicial: The Hammocks, Miami, Florida.</p>
            <a href="#">Ver más</a>
        </div>    
    )
}
        

export default ContenedorInformacion;