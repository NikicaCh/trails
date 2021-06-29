import React from 'react'
import {Circle, Popup} from 'react-leaflet'


const Point: React.FC<any> = (props) => {
    return (
        <div>
            <Circle
                center={props.center}
                pathOptions={{color: props.color, fillColor: 'blue' }}
                radius={props.radius}>
                <Popup>
                    {props.caption}
                </Popup>
                </Circle>
        </div>
        
    )
}


export default Point;