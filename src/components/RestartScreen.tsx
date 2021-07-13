import bike1 from '../assets/images/bike1.png'
import bike2 from '../assets/images/bike2.png'
import bike3 from '../assets/images/bike3.png'

const RestartScreen = (props: any) => {

  let onClick1 = () => {
    props.restart(1);
  };
  let onClick2 = () => {
    props.restart(2);
  };
  let onClick3 = () => {
    props.restart(3);
  };

  return (
    <div className="restartScreenBg">
      {!props.first && <div className="bg"></div>}
      
      {props.first && (
          <div className="mainHeader">Вело Меморија</div>
        )}
      <div className="restartScreen">

        <div className="button-holder">
          {!props.first && (
            <div className="results">
              <span></span>
            </div>
          )}
          {!props.first && (
            <div className="results">
              <span></span>
            </div>
          )}
          {!props.first && (
            <div className="headerStart">
              <span>Одбери ниво</span>
            </div>
          )}
          {props.first && (
            <div className="headerStart">
              <span>Почни  нова  игра</span>
            </div>
          )}
        </div>
        <div className="levels">
          <div className="level">
            <img src={bike1} />
            <button onClick={onClick1}>Лесно</button>
          </div>
          <div className="level">
            <img src={bike2} />
            <button onClick={onClick2}>Средно</button>  
          </div>
          <div className="level">
            <img src={bike3} />
            <button onClick={onClick3}>Тешко</button>
          </div>
        </div>
        
      </div>
    </div >
  );
};

export default RestartScreen;
