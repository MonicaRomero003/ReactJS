import './Sucursales.css';
function Sucursales(){
    return(
        <div className="ContenedorSucursal"> 
        <Sucur  />
        </div>
        
    );
}

function Sucur(){
    return(
        <div className="Sucursales">
            <h3>Alienware se ha consolidado como una de las marcas más queridas por los gamers, apoyando equipos de esports y ofreciendo hardware capaz de manejar los títulos más exigentes con fluidez y estilo</h3>
            <p>Fundadores: Nelson González y Alex Águila.</p>
            <p>Inspiración del nombre: La serie The X-Files, lo que llevó a la estética alienígena y nombres como Area-51, Aurora y Hangar 18.</p>
           
            
        </div>
    )
}
export default Sucursales;