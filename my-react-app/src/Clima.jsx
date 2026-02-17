//20.238582977410715, -97.9569394116991
import { useEffect, useState} from "react";
import './Clima.css';

function Clima(){
    const[clima, setClima] = useState(null);
    const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
    console.log(API_KEY)
    const lat = 20.238582977410715
    const lng = -97.9569394116991

    useEffect(()=>{
        fetch( `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&lang=es`)
        .then((res)=> res.json())
        .then((data)=>{
            console.log(data);
            setClima(data);
        })
        .catch((error)=> console.error("Error",error));
    },[])
    return(
        <div className="contenedorClima">
            {
                clima ? (
                    <>
                    <p>{clima.name} </p>
                    <p>Temperatura: {clima.main.temp} °C </p>
                    <p>Humedad: {clima.main.humidity}</p>
                    <p>Descripcion: {clima.weather[0].description}</p>
                    </>
                ):(
                    <p>Cargando clima ...</p>
                )
            }
        </div>
    )
}

export default Clima;