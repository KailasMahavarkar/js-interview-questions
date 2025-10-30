import type { BoardVisibilityType, Position } from "./types";

export const createInitialVisibility = (rows: number, cols: number): BoardVisibilityType => {
    return Array.from({ length: rows }, () => Array(cols).fill(false));
};

export const cloneVisibility = (visibility: BoardVisibilityType): BoardVisibilityType => {
    return visibility.map(row => [...row]);
};

export const areSamePosition = (pos1: Position | null, pos2: Position): boolean => {
    return pos1 !== null && pos1.row === pos2.row && pos1.col === pos2.col;
};