import React from "react";

import imgLogo from "../images/new.jpg";
import logo from '../assets/images/VeloLogo.png'


import memory1 from '../assets/images/memory1.jpg'
import memory2 from '../assets/images/memory2.jpg'
import memory3 from '../assets/images/memory3.jpg'
import memory4 from '../assets/images/memory4.jpg'
import memory5 from '../assets/images/memory5.jpg'
import memory6 from '../assets/images/memory6.jpg'
import memory7 from '../assets/images/memory7.jpg'
import memory8 from '../assets/images/memory8.jpg'
import memory9 from '../assets/images/memory9.jpg'
import memory10 from '../assets/images/memory10.jpg'
import memory11 from '../assets/images/memory11.jpg'
import memory12 from '../assets/images/memory12.jpg'
import memory13 from '../assets/images/memory13.jpg'
import memory14 from '../assets/images/memory14.jpg'

const images : any = {
  "memory1": memory1,
  "memory2": memory2,
  "memory3": memory3,
  "memory4": memory4,
  "memory5": memory5,
  "memory6": memory6,
  "memory7": memory7,
  "memory8": memory8,
  "memory9": memory9,
  "memory10": memory10,
  "memory11": memory11,
  "memory12": memory12,
  "memory13": memory13,
  "memory14": memory14,
}

const Card = (props: any) => { // myst be type any because of index can be other than string
  // @ts-ignore
  let img = require(`../../public/images/${props.card.image}.jpg`);

  const onclick = () => {
    if (props.status === 0) {
      props.onCardClick(props.card.id);
    }
  };

  let index = props.card.image 

  const renderDiv = () => {   
    return (
      <div className="flip-card-inner">
        <div className="flip-card-front">
        <img className="logo-card" alt="logo" src={logo} />
          
        </div>
        <div className="flip-card-back">
          <img alt="card" src={images[index]} />
        </div>
      </div>
    );
  };

  const classN = () => {
    var a = "flip-card card ";
    var b = " change"; 
    return  a + props.mode + b + props.status;
  };

  return (
    <div className={classN()} onClick={onclick}>
      {renderDiv()}
    </div>
  );
};

export default Card;
