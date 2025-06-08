import { BUTTON, EVENTS } from './consts'

export function navigate(href) {
    // Cambio la URL pero no refresco la página con el objeto history
    // Se puede confirmar en el favicon, que no parpadea cuando navego
    window.history.pushState({}, '', href)
    // Crear un evento personalizado para avisar
    const navigationEvent = new Event(EVENTS.PUSHSTATE)
    window.dispatchEvent(navigationEvent)
}

export function Link({ target, to, ...props }) {
    const handleClick = (event) => {
        // Hacemos un preventDefault para que funcione como SPA
        
        const isMainEvent = event.button === BUTTON.PRIMARY // primary click
        const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
        const isManageableEvent = target === undefined || target === '_self'
        
        if (isMainEvent && isManageableEvent && !isModifiedEvent) {
            event.preventDefault()
            navigate(to)
        }

    }

    return <a onClick={handleClick} href={to} target={target} {...props}></a>
}