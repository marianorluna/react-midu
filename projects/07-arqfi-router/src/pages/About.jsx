import { Link } from '../Link'

export default function AboutPage() {
    return (
        <>
            <h1>About</h1>
            <div>
                <img src="../public/arqfi.svg" alt="Logo de ARQFI" />
                <p>¡Hola! Soy ARQFI y estoy creando un clon de React Router</p>
            </div>
            <Link to='/' >Ir a Home</Link>
        </>
    )
}