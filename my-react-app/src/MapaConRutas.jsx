import { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '500px'
};

function MapaConRutas() {
    const [ubicacion, setUbicacion] = useState(null);
    
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    });

    // Sucursales preestablecidas
    const sucursales = [
        {
            id: 1,
            nombre_sucursal: "Dell Technologies",
            lat: 25.7907,
            lng: -80.1300,
        },
        {
            id: 2,
            nombre_sucursal: "Parts-People (Austin, TX)",
            lat: 30.2672,
            lng: -97.7431,
        },
        {
            id: 3,
            nombre_sucursal: "Best Buy",
            lat: 25.9017,
            lng: -97.4975,
        },
        {
            id: 4,
            nombre_sucursal: "Office Depot Aragon",
            lat: 19.478408139355327,
            lng: -99.09402555269637,
        }
    ];

    // Obtener ubicación actual del usuario
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUbicacion({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            },
            (error) => console.error(error),
            { enableHighAccuracy: true }
        );
    }, []);

    // Opciones para las líneas (polylines)
    const lineOptions = {
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        geodesic: true,
    };

    if (loadError) return <div>Error al cargar el mapa</div>;
    if (!isLoaded) return <div>Cargando mapa con rutas...</div>;

    return (
        <div>
            {ubicacion && (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={ubicacion}
                    zoom={5}
                >
                    {/* Marcador de tu ubicación actual */}
                    <Marker
                        position={ubicacion}
                        label="Tu ubicación"
                        icon={{
                            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                        }}
                    />

                    {/* Marcadores y líneas para cada sucursal */}
                    {sucursales.map((sucursal) => (
                        <div key={sucursal.id}>
                            {/* Marcador de la sucursal */}
                            <Marker
                                position={{ lat: sucursal.lat, lng: sucursal.lng }}
                                label={sucursal.id.toString()}
                                title={sucursal.nombre_sucursal}
                            />

                            {/* Línea desde tu ubicación hasta la sucursal */}
                            <Polyline
                                path={[
                                    ubicacion,
                                    { lat: sucursal.lat, lng: sucursal.lng }
                                ]}
                                options={lineOptions}
                            />
                        </div>
                    ))}
                </GoogleMap>
            )}
        </div>
    );
}

export default MapaConRutas;
