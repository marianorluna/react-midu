export const saveGameToStorage = ({board, turn}) => {
    // Guardamos el juego en el localStorage
    window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('turn', turn)
}

export const resetGameStorage = () => {
    // Limpiamos el localStorage
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
}