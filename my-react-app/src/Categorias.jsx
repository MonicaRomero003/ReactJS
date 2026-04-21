import { useEffect, useState } from 'react';
import axios from 'axios';
import './Categorias.css';
import { useAuth } from './AuthContext.jsx';

const API_CATEGORIAS = 'http://localhost:8000/api/categorias';

function Categorias() {
    const { isLoggedIn } = useAuth();
    const [categorias, setCategorias] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    const obtenerCategorias = async () => {
        try {
            setCargando(true);
            setError('');
            const response = await axios.get(API_CATEGORIAS);
            const datosCategorias = Array.isArray(response.data)
                ? response.data
                : response.data?.categories ?? response.data?.categorias ?? [];

            setCategorias(datosCategorias);
        } catch (error) {
            console.error('Error al obtener categorías:', error);
            setError('No se pudieron cargar las categorías en este momento.');
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        if (!isLoggedIn) {
            setCategorias([]);
            setCargando(false);
            return;
        }

        obtenerCategorias();
    }, [isLoggedIn]);

    if (!isLoggedIn) {
        return null;
    }

    return (
        <section className="CategoriasSeccion">
            <div className="CategoriasHero">
                <p className="CategoriasEyebrow">Explora el menú</p>
                <h1>Categorías</h1>
            </div>

            {cargando && (
                <div className="CategoriasEstado">
                    <div className="CategoriasLoader"></div>
                    <p>Cargando categorías...</p>
                </div>
            )}

            {!cargando && error && (
                <div className="CategoriasEstado CategoriasEstadoError">
                    <p>{error}</p>
                    <button onClick={obtenerCategorias}>Reintentar</button>
                </div>
            )}

            {!cargando && !error && (
                <div className="CategoriasGrid">
                    {categorias.map((categoria) => (
                        <article className="CategoriaCard" key={categoria.id ?? categoria.idCategory ?? categoria.nombre}>
                            <div className="CategoriaImagenWrap">
                                <div className="CategoriaBadge">#{categoria.id ?? categoria.idCategory ?? 'N/A'}</div>
                            </div>

                            <div className="CategoriaContenido">
                                <span className="CategoriaBadge">Categoría</span>
                                <h2>{categoria.nombre ?? categoria.strCategory ?? 'Sin nombre'}</h2>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}

export default Categorias;