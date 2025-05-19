import { useEffect, useState } from "react"

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false)
  // BUENA PRACTICA:
  // inicializar el ESTADO con el tipo de valor que vamos a obtener
  const [position, setPosition] = useState({ 
    x: window.innerWidth / 2, 
    y: window.innerHeight / 2
  })
  const [visibilityCircle, setVisibilityCircle] = useState('hidden')
  
  // IMPORTANTE!!!
  // la lógica va siempre dentro de los HOOKS
  // nunca podemos poner un HOOK dentro de un IF o WHILE
  
  // EFFECT: pointer move
  useEffect(() => {
    console.log('efecto', {enabled})
  
    const handleMove = (event) => {
      const {clientX, clientY} = event
      setPosition({ x: clientX, y: clientY})
    }
  
    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    // CLEANUP: limpiamos las suscripciones a eventos y dejamos todo en cero
    // se ejecuta cuando el componente se desmonta
    // y cuando cambian las dependencias antes de ejecutar el efecto de nuevo
    // TRUCO: getEventListeners(window) vemos en consola la cant de suscripciones
    return () => {
      window.removeEventListener('pointermove', handleMove)
      
    }
  }, [enabled])
  
  // EFFECT: change body className
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)

    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])

  // EFFECT: change visibility of circle
  useEffect(() => {
    setVisibilityCircle(
      enabled ? 'visible' : 'hidden'
    )
  }, [enabled])

  // NO se puede poner AFUERA un
  // window.addEventListener()
  // porque se va a ejecutar cada vez que se renderice el componente!!!
  
  return (
    <main>
      <div id='circle' style={{
        visibility: `${visibilityCircle}`,
        position: 'absolute',
        backgroundColor: '#09f',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 50,
        height:50,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}/>
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </main>
  )
}

function App() {
  return (
    <main>
      <FollowMouse />
    </main>
  )
}

export default App
