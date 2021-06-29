import React, { useEffect, useState } from "react";
import { Geolocation } from '@capacitor/geolocation';


const Location: React.FC<any> = (props) => {


    const printCurrentPosition = async () => {
        const coordinates = await Geolocation.getCurrentPosition({timeout: 10000});
        props.setPosition({lat: coordinates.coords.latitude, lng: coordinates.coords.longitude})
    }; 

    const watchLocation = async () => {
        const current = await Geolocation.watchPosition({enableHighAccuracy: false}, (position) => {
            if(position) {
                console.log(position)
                props.setPosition({lat: position.coords.latitude, lng: position.coords.longitude})
            }
        })
    }

    useEffect(() => {
        printCurrentPosition()

        let id = watchLocation()
        return function cleanup() {
            // Geolocation.clearWatch({id: })
        }
    }, [])
    return (
        <div></div>
    )
}


export default Location;