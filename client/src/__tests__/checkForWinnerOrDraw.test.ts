import { checkForWinnerOrDraw } from '../utils/checkForWinnerOrDraw';
import { XorO } from '../types';
describe('checkForWinnerOrDraw', () => {

  test('should return the player when there is a horizontal win', () => {
    const board = [
      ['X', 'X', 'X'],
      [undefined, 'O', undefined],
      [undefined, 'O', undefined],
    ] as (XorO | undefined)[][];
    expect(checkForWinnerOrDraw(0, 2, board)).toBe('X');
  });

  test('should return the player when there is a vertical win', () => {
    const board = [
      ['X', 'O', undefined],
      ['X', 'O', undefined],
      ['X', undefined, undefined],
    ] as (XorO | undefined)[][];
    expect(checkForWinnerOrDraw(2, 0, board)).toBe('X');
  });

  test('should return the player when there is a main diagonal win', () => {
    const board = [
      ['O', 'X', undefined],
      [undefined, 'O', undefined],
      [undefined, undefined, 'O'],
    ] as (XorO | undefined)[][];
    expect(checkForWinnerOrDraw(2, 2, board)).toBe('O');
  });

  test('should return the player when there is an anti-diagonal win', () => {
    const board = [
      ['X', 'O', 'O'],
      [undefined, 'O', undefined],
      ['O', 'X', 'X'],
    ] as (XorO | undefined)[][];
    expect(checkForWinnerOrDraw(2, 0, board)).toBe('O');
  });

  test('should return "draw" when the board is full with no winner', () => {
    const board = [
      ['X', 'O', 'X'],
      ['X', 'O', 'O'],
      ['O', 'X', 'X'],
    ] as (XorO | undefined)[][];
    expect(checkForWinnerOrDraw(2, 2, board)).toBe('draw');
  });

  test('should return null when the game is still in progress', () => {
    const board = [
      ['X', 'O', undefined],
      ['X', 'O', undefined],
      [undefined, undefined, undefined],
    ] as (XorO | undefined)[][];
    expect(checkForWinnerOrDraw(1, 1, board)).toBe(null);
  });
});