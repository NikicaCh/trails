import React from "react";
import { GameState, GameStateContext } from "./GameState";
import MemoryGame from "./MemoryGame";

const Game = () => {
  let gameState = {} as GameState;
  return (
    <div>
      <GameStateContext.Provider value={gameState}>
        <MemoryGame />
      </GameStateContext.Provider>
    </div>
  );
};

export default Game;