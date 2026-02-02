import miLogo from "./assets/logo.png";

import './ContenedorPie.css' ;

function ContenedorPie(){
    return(
       <footer className='ContenedorPie'>
        <Pie/>
        <img src={miLogo} alt="Logo" />
        <Pie2/>
       </footer>
    )
}
function Pie(){
    return(
    <div className="Pie">
    <p>Copyright © 2025</p>
    </div>
    )  
}
function Pie2(){
    return(
    <div className="Pie2">
    <p>thealienware.com.mx</p>
    </div>
    )  
}
export default ContenedorPie;