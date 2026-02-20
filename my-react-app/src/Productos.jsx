import { useEffect, useState } from 'react';
import api from './Services/api';
import './Productos.css';

function Productos(){
    return(
        <div className="ContenedorProductos"> 
        <Producto />
        </div>
        
    );
}

function Producto(){
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerProductos = async () => {
      try{
        const response = await api.get('/products');
        setProductos(response.data);
      }catch(error){
        console.error('Error al obtener productos:', error)
      }finally{
        setCargando(false);
      }
    };
    obtenerProductos();
  },[]);

  if(cargando) return <p>Cargando productos...</p>

  return( 
    <div className='Productos'>
      {productos.map((producto) => (
          <div key={producto.id}>
            <p>{producto.title}</p>
            <p>{producto.price}</p>
            <img src={producto.image}></img>
          </div>
      )
      )}
    </div>
  )
}

export default Productos;

/*
function Producto() {
  const prod = [
    {
      id: 1,
      name: 'Alienware m16',
      desc: 'Laptop gamer de alto rendimiento',
      img: 'https://cdn.cs.1worldsync.com/syndication/mediaserverredirect/14135f0eda6048d7125eee5ceda90751/original.png'
    },
    {
      id: 2,
      name: 'Alienware m18',
      desc: 'Laptop gamer con pantalla grande',
      img: 'https://assets.nvidia.partners/images/png/awm18r-9494blk-pus.png' 
    },
    {
      id: 3,
      name: 'Alienware x14',
      desc: 'Laptop gamer delgada y portátil',
      img: 'https://www.professionalwireless.com.co/wp-content/uploads/2023/06/Alienware-X14-R1-AWX14R1-7679WHT-PUS_2.png'
    },
    {
      id: 4,
      name: 'Alienware x16',
      desc: 'Laptop premium para gaming extremo',
      img: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/alienware-notebooks/alienware-x16-r1-intel/spi/ng/notebook-alienware-x16-nt-gray-relsize-500-ng.psd?fmt=png-alpha&wid=500&hei=255'
    },
    {
      id: 5,
      name: 'Alienware Aurora R15',
      desc: 'PC de escritorio para gaming',
      img: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/desktops/alienware-desktops/alienware-aurora-r15-intel/media-gallery/lunar-light-liquid-clear-panel/desktop-alienware-aurora-r15-white-liquid-clear-panel-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=360&qlt=100,1&resMode=sharp2&size=360,402&chrss=full'
    },
    {
      id: 6,
      name: 'Alienware Aurora R16',
      desc: 'PC de escritorio optimizada para eSports',
      img: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/desktops/alienware-desktops/alienware-aurora-r16/media-gallery/liquid/desktop-aw-r16-bk-lqd-cooling-gallery-3.psd?fmt=png-alpha&pscan=auto&scl=1&hei=320&wid=379&qlt=100,1&resMode=sharp2&size=379,320&chrss=full'
    },
    {
      id: 7,
      name: 'Alienware 34 Curved QD-OLED',
      desc: 'Monitor curvo ultrawide para gaming',
      img: 'https://www.notebookcheck.org/fileadmin/Notebooks/News/_nc3/Alienware_34_Curved_QD_OLED_Monitor_AW3423DW_rf_front.png'
    },
    {
      id: 8,
      name: 'Alienware 27 Gaming Monitor',
      desc: 'Monitor rápido con alta tasa de refresco',
      img: 'https://media.alienwarearena.com/media/2024/12/27-inch-Alienware-AW2725Q-Monitor.png'
    },
    {
      id: 9,
      name: 'Alienware Pro Gaming Keyboard',
      desc: 'Teclado mecánico para gamers',
      img: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/peripherals/keyboard/aw-pro-wireless-keyboard/media-galleries/dsom/keyboard-alienware-pro-bk-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&hei=320&wid=924&qlt=100,1&resMode=sharp2&size=924,320&chrss=full'
    },
    {
      id: 10,
      name: 'Alienware Tri-Mode Mouse',
      desc: 'Mouse inalámbrico para gaming competitivo',
      img: 'https://www.notebookcheck.org/fileadmin/Notebooks/News/_nc3/alienware_tri_mode_mouse_1_9.png'
    }
  ]

  return (
    <div className="Productos">

      <div className="cards">
        {prod.map(item => (
          <div className="card" key={item.id}>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <img src={item.img} alt={item.name} />
              <h4>{item.name}</h4>
            </a>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
*/