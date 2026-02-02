import './App.css' ;
import ContenedorTarjeta from "./contenedorTarjeta.jsx";
import Encabezado from "./Encabezado.jsx";
import ContenedorInformacion from "./Informacion.jsx";
import ContenedorPie from "./ContenedorPie.jsx";


function App(){
    return (
      <div className="App">
        <Encabezado />
        <ContenedorTarjeta />
        <ContenedorInformacion /> 
        <ContenedorPie />
        {/*<h1>5° A EVND :b</h1>
        <h2>Profesor:</h2>
        <h3>M.T.I. Ricardo Luna Santos</h3>
        <UserComponent />
        <ProfileComponent />
        <FeedComponent />*/}
      </div>
  )
}

function UserComponent(){
  const nombre = 'Mon';
  const apellido = 'Romero';
  const nombrecompleto = <h2>El nombre es: {nombre} y su apellido {apellido}</h2>;
  return <h1>User Component {nombrecompleto}</h1>
}

function ProfileComponent(){
    const users = [
    { id: 1, name: 'Diego', role: 'Web Developer' },
    { id: 2, name: 'Andrea', role: 'Web Designer'},
    {id: 3, name:'Pao', role: 'Team Leader'},
  ]

  return (
    <>
    <p>Lista de usuarios del sistema</p>
    <ul>{
      users.map(function(user,index){
        return(
          <li key={index}> {user.name} es un {user.role}</li>
        )
      })}
    </ul>
    </>
  )
}

function FeedComponent(){
  const materials = [
    { id: 1, material: 'Cemento'},
    { id: 2, material: 'Arena'},
    {id: 3, material:'Grava'},
    {id: 4, material:'Cal'},
  ]
  return (
    <>
    <p>Lista de materiales de construcción</p>
    <ul>{
      materials.map(function(material,index){
        return(
          <li key={index}>{material.material} es un material de construcción </li>
        )
      })}

    </ul>
    </>
  )
}

export default App
