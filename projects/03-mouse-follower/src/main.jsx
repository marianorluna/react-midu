import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // El STRICTMODE se usa en desarrollo para visualizar posibles errores
  // en producción lo ignora, como si no existiese
  // por lo tanto, se puede quitar o dejar sin problemas
  <StrictMode>
    <App />
  </StrictMode>,
)
