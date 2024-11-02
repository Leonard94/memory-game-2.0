import { IData } from "./types";

interface CardProps {
  item: IData;
  onClick: () => void;
}

export const Card = ({ item, onClick }: CardProps) => (
  <div
    className={`card ${item.isActive ? "active" : ""} ${
      item.isCompleted ? "completed" : ""
    }`}
    onClick={onClick}
  >
    <div className="card__front" />
    <div className="card__back">
      <div className="title">{item.title}</div>
      <div className="text">{item.text}</div>
    </div>
  </div>
);
