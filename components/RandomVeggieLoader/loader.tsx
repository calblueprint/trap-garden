// RandomVeggieLoader.tsx
'use client';

import React, { useMemo } from 'react';
import styled, { keyframes } from 'styled-components';

/* ——————————————————— layout constants ——————————————————— */
const HEADER_HEIGHT = 60; // keep in sync with your header
const W = 100; // veggie width
const H = 90; // veggie height

/* ——————————————————— bounce keyframes ——————————————————— */
const xBounce = keyframes`
  from { left: 0; }
  to   { left: calc(100% - ${W}px); }
`;
const yBounce = keyframes`
  from { top: 0; }
  to   { top: calc(100% - ${H}px); }
`;

/* ——————————————————— play-area overlay ——————————————————— */
const Overlay = styled.div`
  position: fixed;
  top: ${HEADER_HEIGHT}px;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 9999;
`;

/* ——————————————————— veggie base ——————————————————— */
const VeggieBase = styled.div`
  width: ${W}px;
  height: ${H}px;
  position: absolute;
  animation:
    ${xBounce} 1.5s linear infinite alternate,
    ${yBounce} 1.9s linear infinite alternate;
  border-radius: 50% 50% 45% 45% / 55% 55% 45% 45%;
  overflow: visible; /* stems/leaves can stick out */
`;

/* ═══════════════════════ 1. TOMATO ═══════════════════════ */
const Tomato = styled(VeggieBase)`
  background: radial-gradient(circle at 50% 35%, #ff8666 0%, tomato 70%);

  &::after {
    /* green stem */
    content: '';
    position: absolute;
    top: -14px;
    left: 50%;
    transform: translateX(-50%) rotate(15deg);
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-bottom: 20px solid #2e8b57;
  }
`;

/* ═══════════════════════ 2. BEET ═══════════════════════ */
const Beet = styled(VeggieBase)`
  background: radial-gradient(circle at 50% 35%, #94408a 0%, #5d1152 70%);

  /* skinny root */
  &::before {
    content: '';
    position: absolute;
    bottom: -18px;
    left: 50%;
    width: 4px;
    height: 18px;
    background: #5d1152;
    transform: translateX(-50%) rotate(6deg);
    border-radius: 2px;
  }

  /* forked leaves */
  &::after {
    content: '';
    position: absolute;
    top: -22px;
    left: 50%;
    width: 0;
    height: 0;
    transform: translateX(-50%);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 22px solid #3fa34d;
    filter: blur(0.3px);
  }
`;

/* ——————————————————— random picker ——————————————————— */
const veggies = [Tomato, Beet];

export default function RandomVeggieLoader() {
  const Loader = useMemo(
    () => veggies[Math.floor(Math.random() * veggies.length)],
    [],
  );

  return (
    <Overlay>
      <Loader />
    </Overlay>
  );
}
