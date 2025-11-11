import React, { useState } from 'react'
type BoardType = number[][];
type ElementCoordinateType = { x: number, y: number };

const getOneCount = (board: BoardType) => {
    let count = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] === 1) {
                count++;
            }
        }
    }

    return count;
}

const isCoordinateFilled = (matrixCallOrder: Array<ElementCoordinateType> = [], rowIndex: number, colIndex: number) => {
    return matrixCallOrder.find((element) => element.x === rowIndex && element.y === colIndex);
}

const Matrix = () => {
    const board = [[1, 1, 1], [1, 0, 1], [1, 0, 0]];
    const onesCount = getOneCount(board);
    const [matrix, setMatrix] = useState(board);
    const [matrixClickOrder, setMatrixClickOrder] = useState<Array<ElementCoordinateType>>([]);

    const handleClickElement = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, rowIndex: number, colIndex: number) => {
        event.preventDefault();

        if (matrix[rowIndex][colIndex] === 1) {
            // if its already filled we do nothing
            if (isCoordinateFilled(matrixClickOrder, rowIndex, colIndex)) {
                return;
            }

            const newCallOrder = [...matrixClickOrder];
            newCallOrder.push({
                x: rowIndex,
                y: colIndex
            })
            setMatrixClickOrder(newCallOrder)

            // if its last element
            if (onesCount === matrixClickOrder.length + 1) {
                for (let i = 0; i < matrixClickOrder.length + 1; i++) {
                    setTimeout(() => {
                        setMatrixClickOrder(prev => {
                            return prev.slice(1);
                        });
                    }, 500 * (i + 1))
                }
            }
        }
    }

    const getActiveElemetClasses = (rowIndex, colIndex) => {
        return isCoordinateFilled(matrixClickOrder, rowIndex, colIndex) ? `element-active` : ''
    }

    return (
        <div className='matrix'>
            {
                matrix.map((arr, rowIndex) => {
                    return (
                        <div className='row' key={rowIndex}>
                            {
                                arr.map((element, colIndex) => {
                                    return (
                                        <div
                                            key={`${rowIndex}_${colIndex}`}
                                            onClick={(e) => handleClickElement(e, rowIndex, colIndex)}
                                            className={`element ${getActiveElemetClasses(rowIndex, colIndex)}`}
                                        >
                                            {element === 1 ? element : ''}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Matrix