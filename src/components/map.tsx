import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import  L from 'leaflet'
import data from './data';



//components
import Location from './location';
import Dest from './destination';
import Navigation from './navigation';
import SimplePopover from './info'

import Male from '../images/male.webp'
import Female from '../images/female.webp'

const Map: React.FC<any> = (props) => {
  
  const [position, setPosition] = useState({lat: 41.9981, lng: 21.4254})
  const [currentPointIndex, setCurrentPointIndex] = useState(0) //increment when pass a point
  const [camera, setCamera] = useState(false)
  const [notified, setNotified] = useState(false)

    const MapChild = () => {
        const map = useMap()
        map.flyTo(position)
        console.log("FLYING")
        return null
    }

    
    const calculateDistance = (lat1:number,lat2:number,long1:number,long2:number) => {
        let p = 0.017453292519943295;    // Math.PI / 180
        let c = Math.cos;
        let a = 0.5 - c((lat1-lat2) * p) / 2 + c(lat2 * p) *c((lat1) * p) * (1 - c(((long1- long2) * p))) / 2;
        let dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
        return dis;
    }

    const completePoint = () => {
        console.log(`Point ${currentPointIndex + 1} completed`)
        setCurrentPointIndex(currentPointIndex + 1)
        props.setPointIndex(currentPointIndex)
        data[props.index].points[currentPointIndex].color="green"
    }

    const greenIcon = L.icon({
        iconUrl: (props.gender==="male") ? Male : Female,
        iconSize:     [75, 75], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
    });
    useEffect(() => { //caled when watchLocation returns new value, or it changes location
        let pointLocation = data[props.index].points[currentPointIndex].location;
        let distance = calculateDistance(pointLocation.lat, position.lat, pointLocation.lng, position.lng)
        console.log("DISTANCE:", distance)
        if(distance < 0.15) { //the user is within 150 meters of the CURRENT point, enable camera    
            setCamera(true)
            if(!notified) {
                setNotified(true)
                //push notification here

            }
        } else {
            setCamera(false)
            setNotified(false)
        }
    }, [position])


    return (
        <div className="App">
            <MapContainer
            center={position} 
            zoom={13} 
            scrollWheelZoom={true} 
            style={{ height: '100vh', width: '99vw'}}
            >
            <MapChild />
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={greenIcon}>
                <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>       
            <Dest position={position} index={props.index}/>     
            </MapContainer>
            <Location setPosition={setPosition} />
            <Navigation camera={camera} completePoint={completePoint}/>
            <SimplePopover index={props.index} currentPointIndex={currentPointIndex}/>
        </div>
    );
}

export default Map;
