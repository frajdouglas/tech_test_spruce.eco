import { XorO } from "../types"

export const checkForWinnerOrDraw = (latestMoveRowIndex: number, latestMoveColumnIndex: number, board: (XorO | undefined)[][]): XorO | 'draw' | null => {
    const player: XorO = board[latestMoveRowIndex][latestMoveColumnIndex]!;
    const gridSize = board.length;

    let isHorizontalWinConditionMet = true
    for (let i = 0; i < gridSize; i++) {
        if (board[latestMoveRowIndex][i] !== player) {
            isHorizontalWinConditionMet = false
            break
        }
    }
    if (isHorizontalWinConditionMet) {
        return player
    }

    let isVerticalWinConditionMet = true
    for (let i = 0; i < gridSize; i++) {
        if (board[i][latestMoveColumnIndex] !== player) {
            isVerticalWinConditionMet = false
            break
        }
    }
    if (isVerticalWinConditionMet) {
        return player
    }

    if (latestMoveRowIndex === latestMoveColumnIndex) {
        let isDiagonalWinConditionMet = true
        for (let i = 0; i < gridSize; i++) {
            if (board[i][i] !== player) {
                isDiagonalWinConditionMet = false
                break
            }
        }
        if (isDiagonalWinConditionMet) {
            return player
        }
    }

    if (latestMoveRowIndex + latestMoveColumnIndex === gridSize - 1) {
        let isAntiDiagonalWinConditionMet = true;
        for (let i = 0; i < gridSize; i++) {
            if (board[i][gridSize - 1 - i] !== player) {
                isAntiDiagonalWinConditionMet = false;
                break;
            }
        }
        if (isAntiDiagonalWinConditionMet) {
            return player;
        }
    }

    // Check for a draw
    for (let rowIndex = 0; rowIndex < gridSize; rowIndex++) {
        for (let columnIndex = 0; columnIndex < gridSize; columnIndex++) {
            if (board[rowIndex][columnIndex] === undefined) {
                return null;
            }
        }
    }

    return 'draw'

}