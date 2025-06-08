// Permite hacer importaciones dinámicas
// para sólo cargar lo que estamos renderizando
import { lazy, Suspense } from 'react'

import './App.css'
import HomePage from './pages/Home'
// import AboutPage from './pages/About' <-- esto sería estático
import Page404 from './404'
import SearchPage from './pages/Search'

import { Router } from './Router'
import { Route } from './Routes'

const LazyHomePage = lazy(() => import('./pages/Home.jsx')) // import dinámico (devuelve una promesa)
const LazyAboutPage = lazy(() => import('./pages/About.jsx')) // import dinámico (devuelve una promesa)

const appRoutes = [
  {
    path: '/search/:query',
    Component: SearchPage
  }
]

function App() {

  return (
    <main>
      <Suspense fallback={null}>
        <Router routes={appRoutes} defaultComponent={Page404}>
          <Route path='/' Component={LazyHomePage} />
          <Route path='/about' Component={LazyAboutPage} />
        </Router>
      </Suspense>
    </main>
  )
}

export default App
