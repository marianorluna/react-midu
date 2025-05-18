import { useState } from 'react'
import confetti from 'canvas-confetti'

import { Square } from './components/Square.jsx'
import { TURNS } from './constants.js'
import { checkWinnerFrom, checkEndGame } from './logic/board.js'
import { WinerModal } from './components/WinnerModal.jsx'
import { saveGameToStorage, resetGameStorage } from './logic/storage/index.js'

// App es el componente PADRE (principal)
function App() {
  // Los HOOKS siempre siempre van en el cuerpo del componente
  // nunca nunca en un IF, WHILE, etc
  // Esto se hace con un CALLBACK dentro del useState
  
  // ESTADO inicial
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })
  
  // ESTADO que indica el turno actual
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  
  // ESTADO que indica un ganador
  // null indica que no hay ganador y false es un empate
  const [winner, setWinner] = useState(null)

  // Función que resetea a los valores iniciales
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  const updateBoard = (index) => {
    // no actualizamos esta posición si ya tiene algo
    // o si ya hay un ganador
    if(board[index] || winner) return

    // Creamos un nuevo BOARD porque NUNCA hay que mutar
    // ni las PROPS ni los ESTADOS originales
    const newBoard = [...board]  // lo podemos hacer con un spread operator
    newBoard[index] = turn  // puede ser X o O
    // Los datos deben ser nuevos y los modificamos con este SET
    setBoard(newBoard)
    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // guardar aquí la partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })
    // revisar si hay un ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)  // actualiza el ESTADO que es asíncrono
      } else if (checkEndGame(newBoard)) {
        setWinner(false)  // esto significa que es un empate
    }
  }
  
  // Este es el renderizado de la APP
  return (
    // Renderizamos cada uno de los square dentro del tablero
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {
          // en el MAP, square es la primera posición
          // también lo podemos reemplazar por un "_"
          board.map((square, index) => {
            return (
              <Square 
                key={index}
                index={index}
                // Le pasamos el updateBoard como prop
                // Se pasa la función sin ejecutar, para que se ejecute sólo
                // cuando nosotros querramos (con el onClick)
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      
      {/* Hacemos un renderizado condicional */}
      <WinerModal resetGame={resetGame} winner={winner}/>

    </main>
  )
}

export default App
