import React, { useState } from 'react'
import { Camera, CameraResultType } from '@capacitor/camera';


import Point from './point'; // dest will contain multiple dots.
import data from './data';


const Dest: React.FC<any> = (props) => {
    let points = data[props.index].points;
    const [dots, setDots] = useState(points)
    const setCompleted = (index: number) => { // cant test it right now, should work
        let newArr = [... dots]
        newArr[index].color = "green"
        setDots(newArr)
    }    


    return (
        <div className="dest">
            {
                dots.map((dot) => {
                    return <Point key={dot.location.lat} complete={setCompleted} center={dot.location} color={dot.color} radius={dot.radius} caption={dot.caption}/>
                })
            }
        </div>
    )
}


export default Dest;