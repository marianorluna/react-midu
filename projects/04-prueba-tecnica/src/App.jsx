import './App.css'
import { useCatImage } from "./hooks/useCatImage"
import { useCatFact } from "./hooks/useCatFact"
import RecargarPagina from "./components/RecargarPagina"

export function App() {
    const { fact, refreshRandomFact} = useCatFact()
    const { imageURL } = useCatImage({ fact })

    const handleClick = async () => {
        refreshRandomFact()
    }

    return (
        <main>
            <h1>App de gatitos</h1>
            <button onClick={handleClick}>Actualizar (servicio)</button>
            {fact && <p>{fact}</p>}
            {imageURL && <img src={imageURL} alt={`Image extracted using the first three words for ${fact}`} />}
            <RecargarPagina />
        </main>
    )
}