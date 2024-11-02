import { StyledMemoryGame } from "./styled";
import { useEffect, useState } from "react";

const DATA = [
  { title: "400", text: "Bad Request" },
  { title: "401", text: "Unauthorized" },
  { title: "403", text: "Forbidden" },
  { title: "404", text: "Not Found" },
  { title: "500", text: "Server Error" },
  { title: "502", text: "Bad Gateway" },
];

interface IData {
  id: number;
  title: string;
  text: string;
  isActive: boolean;
  isCompleted: boolean;
}

interface ISelectedCard {
  first: number | null;
  second: number | null;
}

export const MemoryGame = () => {
  const [data, setData] = useState<IData[]>(
    [...DATA, ...DATA]
      .map((item) => ({ ...item, isActive: false, isCompleted: false }))
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({ ...item, id: index }))
  );
  const [messageText, setMessageText] = useState("");
  const [selectedCard, setSelectedCard] = useState<ISelectedCard>({
    first: null,
    second: null,
  });

  const handleClick = (index: number) => {
    if (data[index].isCompleted) {
      setMessageText("Вы уже нашли пару этой карточке");
      return;
    }
    if (selectedCard.second) {
      setMessageText("Дождитесь разворота карточек");
      return;
    }

    if (data[index].isActive) {
      setMessageText("Выберите вторую карточку");
      return;
    }

    if (selectedCard.first === null) {
      setSelectedCard({ first: index, second: null });
    } else if (selectedCard.second === null && selectedCard.first !== index) {
      setSelectedCard((prev) => ({ ...prev, second: index }));
    } else {
      return;
    }

    setData((prev) =>
      prev.map((item, i) => {
        if (index === i) {
          return { ...item, isActive: true };
        }
        return item;
      })
    );
  };

  useEffect(() => {
    if (messageText.length > 0) {
      const timer = setTimeout(() => {
        setMessageText("");
      }, 1500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [messageText]);

  useEffect(() => {
    if (selectedCard.first !== null && selectedCard.second !== null) {
      const firstCard = data[selectedCard.first];
      const secondCard = data[selectedCard.second];

      if (firstCard.title === secondCard.title) {
        setData((prev) =>
          prev.map((item, index) => {
            if (index === selectedCard.first || index === selectedCard.second) {
              return { ...item, isCompleted: true };
            }
            return item;
          })
        );
        setSelectedCard({ first: null, second: null });
      } else {
        setTimeout(() => {
          setData((prev) =>
            prev.map((item, index) => {
              if (
                index === selectedCard.first ||
                index === selectedCard.second
              ) {
                return { ...item, isActive: false };
              }
              return item;
            })
          );
          setSelectedCard({ first: null, second: null });
        }, 1000);
      }
    }
  }, [selectedCard, data]);

  const isGameComplete = data.every((card) => card.isActive);

  return (
    <StyledMemoryGame>
      <div className="field">
        <div className="cards">
          {data.map((item, index) => (
            <div
              key={index}
              className={`card ${item.isActive ? "active" : ""} ${
                item.isCompleted ? "completed" : ""
              }`}
              onClick={() => handleClick(index)}
            >
              <div className="card__front" />
              <div className="card__back">
                <div className="title">{item.title}</div>
                <div className="text">{item.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="notice-body">
        {messageText.length > 0 && <div className="notice">{messageText}</div>}
      </div>
      {isGameComplete && <div>Победа! Пора за работу</div>}
    </StyledMemoryGame>
  );
};
