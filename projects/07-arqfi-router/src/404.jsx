import { Link } from "./Link";

export default function Page404() {
    return (
        <>
            <div>
                <h1>This is NOT fine</h1>
                <img src="https://media1.tenor.com/images/c19221aadc35a843324b19e5db1c3ca7/tenor.gif?itemid=12307212" alt="Gif del perro de This is NOT fine" />
            </div>
            <Link to='/'>Volver a la Home</Link>
        </>
    )
}