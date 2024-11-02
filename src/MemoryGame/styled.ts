import styled from 'styled-components';

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

.cards {
    display: grid;
    grid-template-columns: repeat(4, 100px);
    grid-template-rows: repeat(3, 100px);
    grid-gap: 20px;
}

.card {
    position: relative;
    perspective: 1000px;
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
    transition: .4s;
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
    background: #F1A53F;
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

`