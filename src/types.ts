export interface Participant {
  id: string;
  name: string;
  guess: number;
}

export interface RankedResult {
  participant: Participant;
  distance: number;
}

export interface GameState {
  participants: Participant[];
  target?: number;
  results?: RankedResult[];
}

