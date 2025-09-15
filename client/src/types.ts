export type XorO = 'X' | 'O'

export interface Stats {
  [playerId: number]: {
    wins: number;
    losses: number;
    draws: number;
  };
}