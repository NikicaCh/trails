import React, { useState } from 'react';
import Map from './map';
import ChooseTrails from './chooseTrail';
import Gender from './gender';


const TrailsApp: React.FC<any> = () => {
 
  const [selectedTrail, setSelectedTrail] = useState(1)
  const [openMap, setOpenMap] = useState(false)
  const [gender, setGender] = useState(null)
  const [mapIndex, setMapIndex] = useState(0)
  const [pointIndex, setPointIndex] = useState(0)

  return (
    <div className="App">
      {
        selectedTrail !== null && openMap
        ? <Map index={mapIndex} gender={gender} setPointIndex={setPointIndex}/>
        : undefined
      }
      {
        gender !== null && !openMap
        ? <ChooseTrails gender={gender} setTrail={setSelectedTrail} openMap={setOpenMap} setMapIndex={setMapIndex} pointIndex={pointIndex}/>
        : undefined
      }
      { gender === null
        ? <Gender setGender={setGender}/>
        : undefined
      }
    </div>
  );
}

export default TrailsApp;
