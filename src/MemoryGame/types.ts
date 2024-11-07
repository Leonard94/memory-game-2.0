export interface IData {
  id: number;
  title: string;
  text: string;
  isActive: boolean;
  isCompleted: boolean;
  imgUrl: string;
}

export interface ISelectedCard {
  first: number | null;
  second: null | number;
}
