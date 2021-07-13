import React from "react";
let interval: any;
const GameHeader = (props: any) => {
  let [headerState, setHeaderState] = React.useState({
    seconds: 0,
    time: "00:00:00",
    started: false,
    paused: false
  });

  let setGameTimer = () => {
    clearInterval(interval);
    interval = setInterval(function() {
      if (headerState.started && !headerState.paused) {
        headerState.seconds += 1;
        calcTime();
        setHeaderState({ ...headerState });
      }
    }, 1000);
  };
  const onMount = async () => {
    setHeaderState({ ...headerState });
  };

  React.useEffect(() => {
    onMount();
    // eslint-disable-next-line
  }, []);
  // eslint-disable-next-line
  React.useEffect(() => {
    if (props.paused !== headerState.paused) {
      headerState.paused = props.paused;
      clearInterval(interval);
      if (!headerState.paused) {
        setGameTimer();
      }
    }
    if (props.started !== headerState.started) {
      headerState.started = props.started;
      if (headerState.started) {
        clearInterval(interval);
        headerState.seconds = 0;
        headerState.time = "00:00:00";
        setGameTimer();
      } else {
        headerState.seconds = 0;
        headerState.time = "00:00:00";
        clearInterval(interval);
        setHeaderState({ ...headerState });
      }
    }
  });
  let calcTime = () => {
    let h;
    headerState.seconds / 3600 > 1
      ? (h = Math.floor(headerState.seconds / 3600))
      : (h = 0);
    let m;
    headerState.seconds / 3600 > 1
      ? (m = Math.floor(headerState.seconds / 3600))
      : (m = Math.floor(headerState.seconds / 60));
    let s;
    s = headerState.seconds % 60;
    if (h < 10) {
      h = "0" + h;
    }
    if (m < 10) {
      m = "0" + m;
    }
    if (s < 10) {
      s = "0" + s;
    }
    headerState.time = h + ":" + m + ":" + s;
    props.setTime(headerState.time);
  };
  return (
    <div className="header">
      <div className="textfield">Потези: {props.moves}</div>
      <div className="textfield">{headerState.time}</div>
    </div>
  );
};

export default GameHeader;
