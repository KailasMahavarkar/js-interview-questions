import MemoryGame from './MemoryGame'

const MemoryGameExample = () => {

    const boardGame = [
        [1, 1, 2],
        [2, 3, 3],
        [4, 4, 0]
    ]

    return (
        <div>
            <MemoryGame
                initialBoardConfig={boardGame}
            />
        </div>
    )
}

export default MemoryGameExample