import { StyledMemoryGame } from "./styled";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

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
  const initializeGame = () => {
    return [...DATA, ...DATA]
      .map((item) => ({ ...item, isActive: false, isCompleted: false }))
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({ ...item, id: index }));
  };

  const [moves, setMoves] = useState(0);
  const [data, setData] = useState<IData[]>(initializeGame());
  const [messageText, setMessageText] = useState("");
  const [selectedCard, setSelectedCard] = useState<ISelectedCard>({
    first: null,
    second: null,
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const isGameComplete = data.every((card) => card.isActive);

  const handleClick = (index: number) => {
    if (isGameComplete) {
      return;
    }

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

    if (selectedCard.first !== null) {
      setMoves((prev) => prev + 1);
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

  useEffect(() => {
    if (isGameComplete) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isGameComplete]);

  const handleNewGame = () => {
    setData(initializeGame());
    setSelectedCard({ first: null, second: null });
    setShowConfetti(false);
    setMoves(0);
    setMessageText("");
  };

  return (
    <StyledMemoryGame>
      <div className="game_info">
        <div className="moves">Ходов: {moves}</div>
        <button className="new-game-btn" onClick={handleNewGame}>
          Новая игра
        </button>
      </div>
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
      {isGameComplete && (
        <div className="victory-message">
          <p>Победа!</p> <p>Вы прошли игру за {moves} ходов</p>
          <p>Пора за работу!</p>
        </div>
      )}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={1000}
          gravity={0.2}
          colors={["#F1A53F", "#364758", "#bfe6f1", "#4CAF50"]}
        />
      )}
    </StyledMemoryGame>
  );
};
