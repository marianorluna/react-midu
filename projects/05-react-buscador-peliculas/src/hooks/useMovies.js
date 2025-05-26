import { useRef, useState, useMemo, useCallback } from "react";
//import withResults from "../mocks/with-results.json";
// import withoutResults from '../mocks/no-results.json'
import { searchMovies } from "../services/movies";

export function useMovies({ search, sort }) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // este useRef es para evitar que se haga una búsqueda si el valor de search no ha cambiado
    // es decir, si el usuario no ha escrito nada nuevo en el input de búsqueda
    // esto es útil para evitar hacer peticiones innecesarias a la API
    const previousSearch = useRef(search);

    // el USECALLBACK es igual al USEMEMO, sólo que es para funciones
    const getMovies = useCallback(
        // Acá pasamos el SEARCH por parámetro para que se pueda usar en la función
        // y así evitar que se haga una búsqueda si el valor de search no ha cambiado
        // además, usamos useMemo para que esta función no se re-cree en cada renderizado
        // y así evitar que se haga una búsqueda innecesaria
        async ({search}) => {
            if (search === previousSearch.current) return;

            try {
                setLoading(true);
                setError(null);
                previousSearch.current = search;
                const newMovies = await searchMovies(search);
                setMovies(newMovies);   
            } catch (e) {
                setError(e.message);
                setMovies([]);
            } finally {
                setLoading(false);
            }
    }, [])
    
    // Si sort es true, ordenamos las películas por título
    // const getSortedMovies = () => {
    //     console.log('getSortedMovies');
    //     const sortedMovies = sort
    //         ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
    //         : movies;
    //     return sortedMovies;
    // }

    // Usamos USEMEMO para evitar que se re-calculen las películas ordenadas en cada renderizado
    // a menos que cambien las dependencias (movies o sort)
    const sortedMovies = useMemo( () => { 
        return sort
        ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
        : movies;
    }, [movies, sort]);
    
    return { movies: sortedMovies, getMovies, loading, error };
}