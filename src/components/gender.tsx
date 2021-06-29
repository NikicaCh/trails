import React from 'react'

import Male from '../images/male.webp'
import Female from '../images/female.webp'


const Gender: React.FC<any> = (props) => {
    return (
        <div>
            <h1>Избери пол:</h1>
            <div className="select-player">
                <img onClick={() => props.setGender("male")} className="gender-icon" src={Male} title="МАШКО" alt="машко"></img>
                <img onClick={() => props.setGender("female")} className="gender-icon" src={Female} title="ЖЕНСКО" alt="женско"></img>
            </div>
        </div>
    )
}


export default Gender;