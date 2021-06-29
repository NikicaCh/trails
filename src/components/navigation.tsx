import React, { useState } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import Battery20Icon from '@material-ui/icons/Battery20'
import Battery50Icon from '@material-ui/icons/Battery50';
import Battery80Icon from '@material-ui/icons/Battery80';
import BatteryFullIcon from '@material-ui/icons/BatteryFull';
import BatteryCharging20Icon from '@material-ui/icons/BatteryCharging20';
import BatteryCharging50Icon from '@material-ui/icons/BatteryCharging50';
import BatteryCharging80Icon from '@material-ui/icons/BatteryCharging80';
import BatteryChargingFullIcon from '@material-ui/icons/BatteryChargingFull';


import { Device } from '@capacitor/device';
import { useEffect } from 'react';
import { promises } from 'fs';

import { Camera, CameraResultType } from '@capacitor/camera';


const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 100,
    allowEditing: false,
    resultType: CameraResultType.Base64,
    saveToGallery: true
  });
}



const Navigation: React.FC<any> = (props) => {
  const [value, setValue] = useState('notifications');

  const handleChange = (event:any, newValue:any) => {
    console.log(event)
    setValue(newValue);
    if(newValue === "camera") {
        takePicture()
        props.completePoint()
    }
  };
  const readBattery = async () => {
    if(Device !== undefined) {
        const object = await Device.getBatteryInfo();
        return object
    }
  }; 

  useEffect(() => {
  }, [])
  useEffect(() => {
    const timer = setInterval(() => {
        let battery = readBattery();
        Promise.resolve(battery)
        .then((data) => { //determine battery level
            console.log("BATTERY", data)
              let charging = data?.isCharging
              let level = data?.batteryLevel
              if(level !== undefined) {

                if(charging) { //if charger is plugged
                  if(level < 0.3) {

                  }
                }
              }
        })
    }, 15000);
   },[]);

  return (
    <div className="navigation">
        <BottomNavigation value={value} onChange={handleChange} >
            <BottomNavigationAction value="notifications" icon={<NotificationsIcon />} />
            <BottomNavigationAction value="camera" icon={<CameraAltIcon />} disabled={props.camera ? false : true}/>
            <BottomNavigationAction value="batery" icon={<BatteryFullIcon />} />
        </BottomNavigation>
        
    </div>
    
  );
}

export default Navigation;