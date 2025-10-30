import React, { useState, useCallback } from 'react';
import './memorygame.css';
import type { Position, GameBoardProps, MemoryGameProps, GameState } from './types';
import { createInitialVisibility, cloneVisibility, areSamePosition } from './utils';
const DEFAULT_FLIP_DURATION = 1000;
const INITIAL_POSITION: Position | null = null;


const GameBoard: React.FC<GameBoardProps> = React.memo(({
    rows,
    cols,
    board,
    visibility,
    onCellClick,
    isClickDisabled
}) => {
    const handleCellClick = useCallback((row: number, col: number) => {
        if (isClickDisabled || visibility[row][col]) {
            return;
        }
        onCellClick(row, col);
    }, [isClickDisabled, visibility, onCellClick]);

    return (
        <div className="game-container">
            {Array.from({ length: rows }, (_, rowIndex) => (
                <div key={rowIndex} className="game-row">
                    {Array.from({ length: cols }, (_, colIndex) => {
                        const isVisible = visibility[rowIndex][colIndex];
                        const cellValue = board[rowIndex][colIndex];

                        return (
                            <button
                                type="button"
                                onClick={() => handleCellClick(rowIndex, colIndex)}
                                key={`${rowIndex}-${colIndex}`}
                                className={`piece ${isVisible ? 'visible' : 'hidden'}`}
                                disabled={isClickDisabled || isVisible}
                                aria-label={isVisible ? `Card ${cellValue}` : 'Hidden card'}
                            >
                                {isVisible && cellValue}
                            </button>
                        );
                    })}
                </div>
            ))}
        </div>
    );
});


const MemoryGame: React.FC<MemoryGameProps> = ({
    initialBoardConfig,
    flipDurationMs = DEFAULT_FLIP_DURATION
}) => {
    const rowCount = initialBoardConfig.length;
    const colCount = rowCount > 0 ? initialBoardConfig[0].length : 0;
    const totalPairs = (rowCount * colCount) / 2;

    const [gameState, setGameState] = useState<GameState>({
        board: initialBoardConfig,
        visibility: createInitialVisibility(rowCount, colCount),
        firstSelection: INITIAL_POSITION,
        isProcessing: false,
        matchedPairs: 0
    });

    const isGameWon = gameState.matchedPairs === totalPairs;

    const handleMatch = useCallback((firstPos: Position, secondPos: Position) => {
        setGameState(prev => {
            const newVisibility = cloneVisibility(prev.visibility);
            newVisibility[firstPos.row][firstPos.col] = true;
            newVisibility[secondPos.row][secondPos.col] = true;

            return {
                ...prev,
                visibility: newVisibility,
                firstSelection: INITIAL_POSITION,
                isProcessing: false,
                matchedPairs: prev.matchedPairs + 1
            };
        });
    }, []);

    const handleMismatch = useCallback((firstPos: Position, secondPos: Position) => {
        setGameState(prev => {
            const newVisibility = cloneVisibility(prev.visibility);
            newVisibility[secondPos.row][secondPos.col] = true;
            return { ...prev, visibility: newVisibility };
        });

        setTimeout(() => {
            setGameState(prev => {
                const newVisibility = cloneVisibility(prev.visibility);
                newVisibility[firstPos.row][firstPos.col] = false;
                newVisibility[secondPos.row][secondPos.col] = false;

                return {
                    ...prev,
                    visibility: newVisibility,
                    firstSelection: INITIAL_POSITION,
                    isProcessing: false
                };
            });
        }, flipDurationMs);
    }, [flipDurationMs]);

    const handleCellClick = useCallback((row: number, col: number) => {
        const currentPosition: Position = { row, col };

        if (areSamePosition(gameState.firstSelection, currentPosition)) {
            return;
        }

        if (gameState.firstSelection === null) {
            setGameState(prev => {
                const newVisibility = cloneVisibility(prev.visibility);
                newVisibility[row][col] = true;

                return {
                    ...prev,
                    visibility: newVisibility,
                    firstSelection: currentPosition
                };
            });
            return;
        }

        setGameState(prev => ({ ...prev, isProcessing: true }));

        const firstValue = gameState.board[gameState.firstSelection.row][gameState.firstSelection.col];
        const secondValue = gameState.board[row][col];

        if (firstValue === secondValue) {
            handleMatch(gameState.firstSelection, currentPosition);
        } else {
            handleMismatch(gameState.firstSelection, currentPosition);
        }
    }, [gameState.firstSelection, gameState.board, handleMatch, handleMismatch]);

    const resetGame = useCallback(() => {
        setGameState({
            board: initialBoardConfig,
            visibility: createInitialVisibility(rowCount, colCount),
            firstSelection: INITIAL_POSITION,
            isProcessing: false,
            matchedPairs: 0
        });
    }, [initialBoardConfig, rowCount, colCount]);

    return (
        <div className="board">
            {isGameWon && (
                <div className="victory-banner">
                    <h2>Congratulations! You won! 🎉</h2>
                    <button onClick={resetGame} className="reset-button">
                        Play Again
                    </button>
                </div>
            )}

            <div className="game-stats">
                <span>Matched: {gameState.matchedPairs} / {totalPairs}</span>
            </div>

            <GameBoard
                rows={rowCount}
                cols={colCount}
                board={gameState.board}
                visibility={gameState.visibility}
                onCellClick={handleCellClick}
                isClickDisabled={gameState.isProcessing || isGameWon}
            />
        </div>
    );
};

export default MemoryGame;