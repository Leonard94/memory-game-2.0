import { StyledMemoryGame } from "./styled";
import Confetti from "react-confetti";
import { useMemoryGame } from "./useMemoryGame";
import { Card } from "./Card";

export const MemoryGame = () => {
  const {
    data,
    moves,
    messageText,
    showConfetti,
    isGameComplete,
    handleClick,
    handleNewGame,
  } = useMemoryGame();

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
            <Card
              key={item.id}
              item={item}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>

      {messageText && (
        <div className="notice-body">
          <div className="notice">{messageText}</div>
        </div>
      )}

      {isGameComplete && (
        <div className="victory-message">
          <p>Победа!</p>
          <p>Вы прошли игру за {moves} ходов</p>
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
