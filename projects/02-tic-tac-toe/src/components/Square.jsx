// Square es el componente HIJO
export const Square = ({ children, isSelected, updateBoard, index }) => {
    const className = `square ${isSelected ? 'is-selected' : ''}`

    const handleClick = () => {
        updateBoard(index)
    }

    return (
        // Acá se hace CLIC en el div para ejecutar el updateBoard()
        <div onClick={handleClick} className={className}>
            {children}
        </div>
    )
}