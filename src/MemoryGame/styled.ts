import styled from "styled-components";

export const StyledMemoryGame = styled.div`
  height: 100vh;
  font-family: "Roboto", sans-serif;
  background: #bfe6f1;
  margin: 0;
  padding: 0;

  .field {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 100%;
  }

  .game_info {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    gap: 20px;

    .moves {
      font-size: 18px;
      font-weight: 500;
      color: #364758;
      background: white;
      padding: 10px 20px;
      border-radius: 10px;
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    }

    .new-game-btn {
      font-size: 18px;
      font-weight: 500;
      color: white;
      background: #364758;
      padding: 10px 20px;
      border-radius: 10px;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);

      &:hover {
        background: #f1a53f;
        transform: translateY(-2px);
      }

      &:active {
        transform: translateY(0);
      }
    }
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(4, 100px);
    grid-template-rows: repeat(4, 100px);
    grid-gap: 20px;
  }

  .card {
    position: relative;
    perspective: 1000px;
  }

  .frame {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .frame img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Сохраняет пропорции и заполняет контейнер */
    display: block;
  }

  .title {
    font-size: 14px;
    font-weight: 400;
  }

  .text {
    font-size: 12px;
    font-weight: 300;
  }

  .card__front,
  .card__back {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    border-radius: 50%;
    backface-visibility: hidden;
    pointer-events: none;
    transition: 0.4s;
  }

  .card__front {
    background: #364758;
  }

  .card__back {
    transform: rotateY(180deg);
    font-size: 24px;
    font-weight: 500;
    color: white;
  }

  .card.active .card__front {
    transform: rotateY(180deg);
  }

  .card.active .card__back {
    transform: rotateY(360deg);
    background: #f1a53f;
  }

  .card.completed .card__back {
    opacity: 0.5;
  }

  .notice-body {
    position: fixed;
    bottom: 40px;
    right: 40px;
  }

  .notice {
    font-size: 16px;
    background: white;
    padding: 10px 20px;
    border-radius: 10px;
    font-weight: 400;
    line-height: 140%;
    box-shadow: 0px 5px 20px 2px rgba(34, 60, 80, 0.3);
    margin: 20px 0;
    transition: all 1s ease;
    color: #364758;
  }

  .victory-message {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px 40px;
    border-radius: 10px;
    font-size: 24px;
    font-weight: 500;
    color: #364758;
    box-shadow: 0px 5px 20px 2px rgba(34, 60, 80, 0.3);
    z-index: 1000;
    animation: fadeIn 0.5s ease-out;

    p {
      text-align: center;
      margin: 0;

      &:first-child {
        font-size: 28px;
        margin-bottom: 10px;
      }

      &:nth-child(2),
      &:nth-child(3) {
        font-size: 16px;
        margin-bottom: 4px;
      }
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -40%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
`;
