import React from 'react'
import { Camera, CameraResultType } from '@capacitor/camera';

const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  });
}


const CameraApi: React.FC<any> = () => {
    return (
        <div></div>
    )
}


export default CameraApi;