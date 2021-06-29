import React, { useState } from 'react';
import TrailsApp from './components/trailsApp';



const App: React.FC<any> = () => {
 
  const [selectedTrail, setSelectedTrail] = useState(1)
  const [openMap, setOpenMap] = useState(false)
  const [gender, setGender] = useState(null)
  const [mapIndex, setMapIndex] = useState(0)
  const [pointIndex, setPointIndex] = useState(0)

  return (
    <div className="App">
      <TrailsApp />
      
    </div>
  );
}

export default App;
