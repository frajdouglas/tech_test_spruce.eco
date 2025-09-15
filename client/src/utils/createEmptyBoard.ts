
import { XorO } from "../types"
export const createEmptyBoard = (size: number): (XorO | undefined)[][] => {
    return Array(size).fill(null).map(() => Array(size).fill(undefined))
}