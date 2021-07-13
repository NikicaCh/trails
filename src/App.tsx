import React, { useState } from 'react';
import { useEffect } from 'react';
import history from 'history'

import TemporaryDrawer from '../src/components/leftNav'
import MoreVertIcon from '@material-ui/icons/MoreVert';


import Home from './components/home'
import TrailsApp from './components/trailsApp';
import Game from './components/Game'




const App: React.FC<any> = () => {

  const [state, setState] = useState({
    chooseGame: false,
    game: "trails"
  })
  const [openDraw, setOpenDraw] = useState(false)


  const handleHistory = () => {
    window.history.pushState(state, "history", "")
  }

  useEffect(() => {
    handleHistory()
  },[state])


  return (
    <div className="App">
      <div className="dots">
        <MoreVertIcon onClick={() => setOpenDraw(!openDraw)}/>
      </div>
      <TemporaryDrawer open={openDraw} setOpen={setOpenDraw}/>
      {
        state.chooseGame && state.game === "trails"
        ? <TrailsApp />
        : undefined
      }
      {
        state.chooseGame && state.game === "memory"
        ? <Game />
        : undefined
      }


      {
        !state.chooseGame
        ? <Home setState={setState}/>
        : undefined
      }
      

    </div>
  );
}

export default App;
