import React from "react";
const GameOver = (props: any) => {
  let onClick1 = () => {
    props.restart(1);
  };

  return (
    <div className="restartScreenBg">
      <div className="bg"></div>
      <div className="restartScreen">
          <div className="gameOverScreen-back">
                <div className="newGame-header">
                    <span>Одлично!</span>
                </div>
                <div className="results">
                    <span>Број на потези: {props.moves}</span>
                </div>
                <div className="results">
                    <span>Време: {props.time}</span>
                </div>
            <div>
            <button
              className="newGame-btn"
              onClick={onClick1}
            >
                Започни нова игра
            </button>
          </div>
        </div>
      </div>
    </div >
  );
};

export default GameOver;
