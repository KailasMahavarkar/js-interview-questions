export type BoardType = number[][];
export type BoardVisibilityType = boolean[][];

export interface Position {
    row: number;
    col: number;
}

export interface MemoryGameProps {
    initialBoardConfig: BoardType;
    flipDurationMs?: number;
}

export interface GameBoardProps {
    rows: number;
    cols: number;
    board: BoardType;
    visibility: BoardVisibilityType;
    onCellClick: (row: number, col: number) => void;
    isClickDisabled: boolean;
}

export interface GameState {
    board: BoardType;
    visibility: BoardVisibilityType;
    firstSelection: Position | null;
    isProcessing: boolean;
    matchedPairs: number;
}
