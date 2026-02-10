import './Productos.css';

function Productos(){
    return(
        <div className="ContenedorProductos"> 
        <Producto  />
        </div>
        
    );
}

function Producto() {
  const prod = [
    {
      id: 1,
      name: 'Alienware m16',
      desc: 'Laptop gamer de alto rendimiento',
      img: 'https://i.dell.com/sites/csimages/App-Merchandizing_Images/all/alienware-m16.png',
      link: 'https://www.dell.com/alienware'
    },
    {
      id: 2,
      name: 'Alienware m18',
      desc: 'Laptop gamer con pantalla grande',
      img: 'https://i.dell.com/sites/csimages/App-Merchandizing_Images/all/alienware-m18.png',
      link: 'https://www.dell.com/alienware'
    },
    {
      id: 3,
      name: 'Alienware x14',
      desc: 'Laptop gamer delgada y portátil',
      img: 'https://i.dell.com/sites/csimages/App-Merchandizing_Images/all/alienware-x14.png',
      link: 'https://www.dell.com/alienware'
    },
    {
      id: 4,
      name: 'Alienware x16',
      desc: 'Laptop premium para gaming extremo',
      img: 'https://i.dell.com/sites/csimages/App-Merchandizing_Images/all/alienware-x16.png',
      link: 'https://www.dell.com/alienware'
    },
    {
      id: 5,
      name: 'Alienware Aurora R15',
      desc: 'PC de escritorio para gaming',
      img: 'https://i.dell.com/sites/csimages/App-Merchandizing_Images/all/alienware-aurora-r15.png',
      link: 'https://www.dell.com/alienware'
    },
    {
      id: 6,
      name: 'Alienware Aurora R16',
      desc: 'PC de escritorio optimizada para eSports',
      img: 'https://i.dell.com/sites/csimages/App-Merchandizing_Images/all/alienware-aurora-r16.png',
      link: 'https://www.dell.com/alienware'
    },
    {
      id: 7,
      name: 'Alienware 34 Curved QD-OLED',
      desc: 'Monitor curvo ultrawide para gaming',
      img: 'https://i.dell.com/sites/csimages/App-Merchandizing_Images/all/alienware-34-curved.png',
      link: 'https://www.dell.com/alienware'
    },
    {
      id: 8,
      name: 'Alienware 27 Gaming Monitor',
      desc: 'Monitor rápido con alta tasa de refresco',
      img: 'https://i.dell.com/sites/csimages/App-Merchandizing_Images/all/alienware-27-gaming-monitor.png',
      link: 'https://www.dell.com/alienware'
    },
    {
      id: 9,
      name: 'Alienware Pro Gaming Keyboard',
      desc: 'Teclado mecánico para gamers',
      img: 'https://i.dell.com/sites/csimages/App-Merchandizing_Images/all/alienware-pro-keyboard.png',
      link: 'https://www.dell.com/alienware'
    },
    {
      id: 10,
      name: 'Alienware Tri-Mode Mouse',
      desc: 'Mouse inalámbrico para gaming competitivo',
      img: 'https://i.dell.com/sites/csimages/App-Merchandizing_Images/all/alienware-tri-mode-mouse.png',
      link: 'https://www.dell.com/alienware'
    }
  ]

  return (
    <div className="Productos">
      <h3>Lista de Productos</h3>

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

export default Productos;