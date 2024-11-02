export interface IData {
  id: number;
  title: string;
  text: string;
  isActive: boolean;
  isCompleted: boolean;
}

export interface ISelectedCard {
  first: number | null;
  second: null | number;
}
