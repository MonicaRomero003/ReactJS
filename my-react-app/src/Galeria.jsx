import './Galeria.css';
function Galeria(){
    return(
        <div className="ContenedorGaleria"> 
        <GaleInicio  />
        </div>
        
    );
}

function GaleInicio(){
    return(
        <div className="Galeria"> 
            <Producto imagen="https://cdn.cs.1worldsync.com/syndication/mediaserverredirect/14135f0eda6048d7125eee5ceda90751/original.png"/> 
            <Producto imagen="https://assets.nvidia.partners/images/png/awm18r-9494blk-pus.png"/> 
            <Producto  imagen="https://www.professionalwireless.com.co/wp-content/uploads/2023/06/Alienware-X14-R1-AWX14R1-7679WHT-PUS_2.png"/> 
            <Producto  imagen="https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/alienware-notebooks/alienware-x16-r1-intel/spi/ng/notebook-alienware-x16-nt-gray-relsize-500-ng.psd?fmt=png-alpha&wid=500&hei=255"/> 
            <Producto  imagen="https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/desktops/alienware-desktops/alienware-aurora-r15-intel/media-gallery/lunar-light-liquid-clear-panel/desktop-alienware-aurora-r15-white-liquid-clear-panel-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=360&qlt=100,1&resMode=sharp2&size=360,402&chrss=full"/> 
            <Producto  imagen="https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/desktops/alienware-desktops/alienware-aurora-r16/media-gallery/liquid/desktop-aw-r16-bk-lqd-cooling-gallery-3.psd?fmt=png-alpha&pscan=auto&scl=1&hei=320&wid=379&qlt=100,1&resMode=sharp2&size=379,320&chrss=full"/> 
            <Producto  imagen="https://www.notebookcheck.org/fileadmin/Notebooks/News/_nc3/Alienware_34_Curved_QD_OLED_Monitor_AW3423DW_rf_front.png"/> 
            <Producto   imagen="https://media.alienwarearena.com/media/2024/12/27-inch-Alienware-AW2725Q-Monitor.png"/> 
            <Producto   imagen="https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/peripherals/keyboard/aw-pro-wireless-keyboard/media-galleries/dsom/keyboard-alienware-pro-bk-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&hei=320&wid=924&qlt=100,1&resMode=sharp2&size=924,320&chrss=full"/>
            <Producto   imagen="https://www.notebookcheck.org/fileadmin/Notebooks/News/_nc3/alienware_tri_mode_mouse_1_9.png"/> 
        </div>
    )
}

function Producto(props){
    return(
        <div className="Producto">
            <img src={props.imagen} alt="Imagen de la galeria"/>
            <h3>{props.titulo}</h3>
            </div>
    )

}


export default Galeria;