import { EVENTS } from "./consts"
import { useEffect, useState, Children } from "react"
import Page404 from "./404"
import { match } from 'path-to-regexp'


export function Router({ children, routes = [], defaultComponent: DefaultComponent = () => <Page404 /> }) {
    const [currentPath, setCurrentPath] = useState(window.location.pathname)

    useEffect(() => {
        // Creamos la constante para asegurarnos de poder quitar el evento
        const onLocationChange = () => {
            setCurrentPath(window.location.pathname)
        }

        window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
        window.addEventListener(EVENTS.POPSTATE, onLocationChange)

        return () => {
            window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
            window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
        }
    }, [])

    let routeParams = {}

    // add routes from children <Route /> components
    const routesFromChildren = Children.map(children, ({ props, type }) => {
        const { name } = type
        const isRoute = name === 'Route'

        return isRoute ? props : null
    })

    const routesToUse = routes.concat(routesFromChildren).filter(Boolean)

    console.log(routesFromChildren)

    const Page = routesToUse.find(({ path }) => {
        if (path === currentPath) return true

        // hemos usado path-to-regexp
        // para poder detectar rutas dinámicas como por ejemplo
        // /search/:query
        const matcherUrl = match(path, { decode: decodeURIComponent })
        const matched = matcherUrl(currentPath)
        if (!matched) return false

        routeParams = matched.params
        return true
    })?.Component

    return Page
        ? <Page routeParams={routeParams} />
        : <DefaultComponent routeParams={routeParams} />
}