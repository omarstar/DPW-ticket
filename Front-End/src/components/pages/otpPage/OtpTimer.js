import { useEffect, useState } from "react";
// import { getSessionValue } from "../../utils/helpers";

const OtpTimer = ({noOtpText, onSendOtpAgain}) => {

  const {noOtp = '', clickHere = ''} = noOtpText;
  // const otpStartTime = parseInt(getSessionValue('otpTime'), 10) || 0;
  // const currentTime = new Date().getTime();
  // let elapsedTime = (currentTime - otpStartTime) / 1000;
  
  // if(elapsedTime >= 120 || elapsedTime <= 0) elapsedTime = 120;//?

  // const [remainingTime, setRemainingTime] = useState(120 - elapsedTime);

    
  // const lang = getSessionValue('lang','ar');
  // const classFontFamily = ((lang === 'en') ? "av-ltpro-medium" : "av-ar-heavy");

  // const handleOnClickAgain = () => {
  //   onSendOtpAgain();
  //   //it should be when response is returned, but in catch error (no network) should not reset
  //   setRemainingTime(120);
  // }


  // useEffect(() => {
  //     const timer = setInterval(() => {
  //         setRemainingTime(prevTime => {
  //           if (prevTime > 0) {
  //             return prevTime - 1;
  //           }
  //           clearInterval(timer);
  //           return 0;
  //         });
  //       }, 1000);
  
  //   return () => {
  //     clearInterval(timer);
  //   }
  // }, []);

  // const formatTime = seconds => {

  //     const minutes = Math.floor(seconds / 60);
  //     const secondsLeft = seconds % 60;
  //     console.log(secondsLeft);
  //     return `${minutes}:${secondsLeft < 10 ? '0' : ''}${Math.floor(secondsLeft)}`;
  //   };

    
  return ( 
      <div className="no-otp-text d-flex fs-sm">
        {/* <div className={"clickable d-flex " + classFontFamily}  style={{ order: lang === 'en' ? 0 : 1 }}> */}
        <div className={"clickable d-flex "} >
          
          {/* { remainingTime<=0 ? 
              <div> 
                <p className="me-2">{noOtp}</p> 
                <span className="more-click-here" onClick={handleOnClickAgain} >{clickHere}</span>
              </div>
            :
            <p className="timeClr">{formatTime(remainingTime)}</p>
          } */}
          <div> 
            <p className="me-2">{noOtp}</p> 
            <span className="more-click-here">{clickHere}</span>
          </div>
          {/* <p>{clickHere}</p> */}
        </div>
      </div>
    );
}
 
export default OtpTimer;
