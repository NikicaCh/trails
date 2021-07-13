import React from "react";
export interface GameState {
  moves: number;
  started: boolean;
  time: string;
  cards: any[];
  openedCards: number[];
  matchedCards: number[];
  mode: string;
  endGame: boolean;
  chooseLevel: boolean;
  firstScreen: boolean;
  instructions: boolean;
  paused: boolean;
  info: boolean;
}
const gameState = {} as GameState;
//status 0 - closed card; status 1 - opened card
export function gameSettings(numCards: number = 14): { cards: any[] } {
  let _cards: any[] = [];
  for (let i = 0; i < numCards; i++) {
    _cards.push({ id: i, image: "memory" + (i + 1), status: 0, cardId: i });
    _cards.push({
      id: i + 14,
      image: "memory" + (i + 1),
      status: 0,
      cardId: i
    });
  }
  _cards = shuffle(_cards);
  return { cards: _cards };
}

function shuffle(array: any[]) {
  let currentIndex = 0,
    temporaryValue,
    randomIndex;
  currentIndex = array.length;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export function numberOfCards(mode: number): number {
  switch (mode) {
    case 1:
      return 8;
    case 2:
      return 12;
    case 3:
      return 14;
  }
  return 8;
}

export function newGameState(settings: { cards: any[] }): GameState {
  let mode = "mode1";
  switch (settings.cards.length) {
    case 28:
      mode = "mode3";
      break;
    case 24:
      mode = "mode2";
      break;
    case 16:
      mode = "mode1";
      break;
  }
  const state = {
    moves: 0,
    started: false,
    time: "00:00:00",
    cards: settings.cards,
    openedCards: [],
    matchedCards: [],
    mode: mode,
    endGame: false,
    firstScreen: true,
    chooseLevel: false,
    instructions: false,
    info: false,
    paused: false
  } as GameState;
  return state;
}
export const GameStateContext = React.createContext<GameState>(gameState);
