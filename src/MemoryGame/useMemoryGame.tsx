import { useState, useEffect } from "react";
import { IData, ISelectedCard } from "./types";
import {
  GAME_DATA,
  CARD_FLIP_DELAY,
  MESSAGE_DURATION,
  CONFETTI_DURATION,
} from "./constants";

export const useMemoryGame = () => {
  const initializeGame = () => {
    return [...GAME_DATA, ...GAME_DATA]
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

  const isGameComplete = data.every((card) => card.isCompleted);

  useEffect(() => {
    if (messageText.length > 0) {
      const timer = setTimeout(() => {
        setMessageText("");
      }, MESSAGE_DURATION);

      return () => clearTimeout(timer);
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
        }, CARD_FLIP_DELAY);
      }
    }
  }, [selectedCard, data]);

  useEffect(() => {
    if (isGameComplete) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, CONFETTI_DURATION);

      return () => clearTimeout(timer);
    }
  }, [isGameComplete]);

  const handleClick = (index: number) => {
    if (
      isGameComplete ||
      data[index].isCompleted ||
      selectedCard.second ||
      data[index].isActive
    ) {
      const messages = {
        completed: "Вы уже нашли пару этой карточке",
        waiting: "Дождитесь разворота карточек",
        active: "Выберите вторую карточку",
      };

      setMessageText(
        data[index].isCompleted
          ? messages.completed
          : selectedCard.second
          ? messages.waiting
          : messages.active
      );
      return;
    }

    if (selectedCard.first !== null) {
      setMoves((prev) => prev + 1);
    }

    setSelectedCard((prev) => ({
      first: prev.first === null ? index : prev.first,
      second: prev.first !== null && prev.first !== index ? index : null,
    }));

    setData((prev) =>
      prev.map((item, i) => (i === index ? { ...item, isActive: true } : item))
    );
  };

  const handleNewGame = () => {
    setData(initializeGame());
    setSelectedCard({ first: null, second: null });
    setShowConfetti(false);
    setMoves(0);
    setMessageText("");
  };

  return {
    data,
    moves,
    messageText,
    showConfetti,
    isGameComplete,
    handleClick,
    handleNewGame,
  };
};
