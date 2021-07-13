import React from "react";
import {
  GameState,
  GameStateContext,
  newGameState,
  gameSettings,
  numberOfCards
} from "./GameState";
import Card from "./Card";
import GameHeader from "./GameHeader";
import GameOver from "./GameOver"
import RestartScreen from "./RestartScreen";


let currentTime: string;

const MemoryGame = (props: any) => {
  const ctxState = React.useContext(GameStateContext);
  let [gameState, setGameState] = React.useState(ctxState);
  let flipInterval: any;

  const onMount = async () => {
    gameState = newGameState(gameSettings(12));
    gameState.started = true;
    setGameState({ ...gameState } as GameState);
  };

   
  React.useEffect(() => {
    onMount();
    // eslint-disable-next-line
  }, []);

  let checkedmatched = () => {
    if (gameState.openedCards.length === 2) {
      let card1 = gameState.cards.find(
        card => card.id === gameState.openedCards[0]
      );
      let card2 = gameState.cards.find(
        card => card.id === gameState.openedCards[1]
      );
      if (card1.cardId === card2.cardId) {
        gameState.matchedCards.push(gameState.openedCards[0]);
        gameState.matchedCards.push(gameState.openedCards[1]);
        card1.status = 3;
        card2.status = 3;
        gameState.openedCards = [];
      }
    }
  };

  let compareOpenedCards = (): any[] => {
    let cards = gameState.cards;
    if (gameState.openedCards.length === 2) {
      checkedmatched();
      gameState.openedCards = [];
      cards = gameState.cards.map(card => {
        if (card.status !== 3) {
          card.status = 0;
        }
        return card;
      });
    }
    return cards;
  };
  let onCardClick = (id: number) => {
    clearInterval(flipInterval);
    gameState.cards = compareOpenedCards();
    let card = gameState.cards.find(card => card.id === id);
    card.status = 1;
    gameState.openedCards.push(id);
    gameState.moves += 1;
    checkedmatched();
    if (gameState.matchedCards.length === gameState.cards.length) {
      gameState.started = false;
      gameState.endGame = true;
      gameState.time = currentTime;
      clearInterval(flipInterval);
    }
    setGameState({ ...gameState } as GameState);
  };

  const checkOpenedCards = () => {
    clearInterval(flipInterval);
    if (gameState.openedCards && gameState.openedCards.length === 2) {
      flipInterval = setInterval(function() {
        clearInterval(flipInterval);
        gameState.cards = compareOpenedCards();
        setGameState({ ...gameState } as GameState);
      }, 3000);
    }
  };
  React.useEffect(() => {
    checkOpenedCards();
  });
  let setTime = (time: string) => {
    gameState.time = time;
    currentTime = time;
  };
  let startGame = (mode: number) => {
    let numCards = numberOfCards(mode);
    gameState = newGameState(gameSettings(numCards));
    gameState.started = true;
    gameState.firstScreen = false;
    setGameState({ ...gameState } as GameState);
  };
  let setChooseLevel = () => {
    gameState.chooseLevel = true;
    setGameState({ ...gameState } as GameState);
  }
  return (
    <div className="memory-game">

      {!gameState.instructions && gameState.firstScreen && (
        <RestartScreen
          className="restart-screen"
          time={0}
          moves={0}
          restart={startGame}
          first={true}
        />
      )}
      {!gameState.firstScreen &&  (
        <div className="no-overflow">
          {
            !gameState.endGame
            ?<GameHeader
            moves={gameState.moves}
            time={gameState.time}
            started={gameState.started}
            paused={gameState.paused}
            setTime={setTime}
            />
            : <div className="mainHeader">Вело Меморија</div>
          }
          
          <div className="playground">
            {gameState.cards && !gameState.endGame &&
              gameState.cards.map((card, ind) => (
                <Card
                  card={card}
                  mode={gameState.mode}
                  status={card.status}
                  key={ind}
                  onCardClick={onCardClick}
                />
              ))}
          </div>
          {gameState.endGame
          && !gameState.chooseLevel && (
            <GameOver
              className="restart-screen"
              time={gameState.time}
              moves={gameState.moves}
              restart={setChooseLevel}
            />
          )}
          {gameState.chooseLevel && (
            <RestartScreen
              className="restart-screen"
              time={gameState.time}
              moves={gameState.moves}
              restart={startGame}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
