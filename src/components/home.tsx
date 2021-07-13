import React, { useState, useEffect } from 'react'

import Logo from '../images/logo.webp'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const messages = [
    "Вљубеник си во велосипедизмот?",
    "Запознај ја својата околина.",
    "Возете велосипед секој ден."
]


const Home: React.FC<any> = (props) => {

    const [message, setMessage] = useState(messages[1])
    const [openDraw, setOpenDraw] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
          setMessage(messages[Math.floor(Math.random() * 2) + 1])
        }, 10000);
        return () => clearInterval(interval);
      }, []);

 
    return (
        <div className="home">
            <h1>ВЕЛО УЧИЛИШТА</h1>
            <img src={Logo}></img>
            <span className="message">{message}</span>
            <div className="options">
                <ExpandMoreIcon fontSize={"large"}/>
                <div className="first-button">
                    <Button onClick={() => {
                        props.setState({
                            chooseGame: true,
                            game: "memory"
                        })
                        }}
                        style={{
                            backgroundColor: "#369c36",
                            fontSize: "1.4vw",
                        }}
                        className="first-button" variant="contained" color="secondary" size="large">
                        Вело Меморија
                    </Button>
                </div>
                
                <div className="second-button">
                    <Button onClick={() => {
                        props.setState({
                            chooseGame: true,
                            game: "trails"
                        })
                        }}
                        style={{
                            backgroundColor: "#369c36",
                            fontSize: "1.4vw",
                        }}
                        variant="contained" color="secondary" size="large">
                        Мапа
                    </Button>
                </div>
                
            </div>
            
        </div>
    )
}


export default Home;