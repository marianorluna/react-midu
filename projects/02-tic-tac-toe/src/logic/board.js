import { WINNER_COMBOS } from '../constants.js'

// Método para chequear si alguien ganó
export const checkWinnerFrom = (boardToCheck) => {
// revisamos todas las combinaciones ganadoras
// para ver si X u O ganó
for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (
    boardToCheck[a] &&
    boardToCheck[a] === boardToCheck[b] &&
    boardToCheck[a] === boardToCheck[c]        
    ) {
    return boardToCheck[a]
    }
}
// si no hay ganador
return null
}

// Función que determina si hay empate al final
export const checkEndGame = (newBoard) => {
// revisamos si hay un empate
// si no hay más espacios vacíos en el tablero
return newBoard.every((square) => square !== null)
}