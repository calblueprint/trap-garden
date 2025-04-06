// animations.ts
import { keyframes } from 'styled-components';

export const popOffAnimation = keyframes`
  0% {
    transform: translateY(0) translateX(0) scale(1);
    opacity: 1;
  }
  5% {
    transform: translateY(-1vh) translateX(1vw) scale(1.05);
    opacity: 1;
  }
  10% {
    transform: translateY(-2vh) translateX(2vw) scale(1.08);
    opacity: 1;
  }
  15% {
    transform: translateY(-3vh) translateX(4vw) scale(1.1);
    opacity: 1;
  }
  20% {
    transform: translateY(-2vh) translateX(6vw) scale(1.12);
    opacity: 1;
  }
  25% {
    transform: translateY(-1vh) translateX(8vw) scale(1.15);
    opacity: 1;
  }
  30% {
    transform: translateY(0vh) translateX(10vw) scale(1.18);
    opacity: 1;
  }
  35% {
    transform: translateY(2vh) translateX(11vw) scale(1.2);
    opacity: 1;
  }
  40% {
    transform: translateY(4vh) translateX(12vw) scale(1.2);
    opacity: 1;
  }
  45% {
    transform: translateY(6vh) translateX(13vw) scale(1.2);
    opacity: 1;
  }
  50% {
    transform: translateY(8vh) translateX(13vw) scale(1.2);
    opacity: 1;
  }
  55% {
    transform: translateY(11vh) translateX(13vw) scale(1.2);
    opacity: 1;
  }
  60% {
    transform: translateY(14vh) translateX(14vw) scale(1.2);
    opacity: 1;
  }
  65% {
    transform: translateY(18vh) translateX(14vw) scale(1.2);
    opacity: 1;
  }
  70% {
    transform: translateY(24vh) translateX(15vw) scale(1.2);
    opacity: 1;
  }
  75% {
    transform: translateY(30vh) translateX(15vw) scale(1.2);
    opacity: 1;
  }
  80% {
    transform: translateY(35vh) translateX(15vw) scale(1.2);
    opacity: 1;
  }
  85% {
    transform: translateY(40vh) translateX(16vw) scale(1.2);
    opacity: 1;
  }
  90% {
    transform: translateY(45vh) translateX(16vw) scale(1.2);
    opacity: 1;
  }
  95% {
    transform: translateY(51vh) translateX(16vw) scale(1.2);
    opacity: 1;
  }
  100% {
    transform: translateY(58vh) translateX(16vw) scale(1.2);
    opacity: 0; /* Fade out as it falls off */
  }
`;
