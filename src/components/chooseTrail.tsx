import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button';
import { Geolocation } from '@capacitor/geolocation';



import data from './data';


const Trail: React.FC<any> = (props) => {
    return (
        <div onClick={() => {
            props.setTrail(props.item.name)
            props.setSelected(props.item)
            }} className="trail-select">
            <h1>{props.item.name}</h1>
        </div>
    )
}

const ChooseTrails: React.FC<any> = (props) => {

    const [selected, setSelected] = useState(data[0])
    const [position, setPosition] = useState({})
    const [distance, setDistance] = useState(0)

    const calculateDistance = (lat1:number,lat2:number,long1:number,long2:number) => {
        let p = 0.017453292519943295;    // Math.PI / 180
        let c = Math.cos;
        let a = 0.5 - c((lat1-lat2) * p) / 2 + c(lat2 * p) *c((lat1) * p) * (1 - c(((long1- long2) * p))) / 2;
        let dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
        return dis;
    }

    const printCurrentPosition = async () => {
        const coordinates = await Geolocation.getCurrentPosition();
        setPosition({lat: coordinates.coords.latitude, lng: coordinates.coords.longitude})
        let distance = calculateDistance(selected.points[0].location.lat, coordinates.coords.latitude, selected.points[0].location.lng, coordinates.coords.longitude)
        setDistance(distance)
    }; 

    useEffect(() => { //every time another trail is selected
        console.log(selected)
        printCurrentPosition()
        props.setMapIndex(data.indexOf(selected))
    }, [selected])
    // let cities = data.map((item) => item["city"])

    return (
        <div className="trails">
            <h1>Избери патека.</h1>
            <div className="select-trail">
                {
                    data.map((item) => {
                        return <Trail key={item.name} item={item} setTrail={props.setTrail} setSelected={setSelected}/>
                    })
                }
            </div>
            <div className="trail-details">
                <p>Оддалечени сте околу:{Math.round(distance)} км од почетната точка на стазата.</p>
                {selected.difficulty !== undefined ? <p>Тежина: {selected.difficulty}</p> : undefined }
                <Button variant="contained" color="primary" onClick={() => props.openMap(true)}> OPEN MAP </Button>
            </div>
        </div>
    )
}


export default ChooseTrails;