import React, { useEffect, useState } from 'react'

import '../../includes/header/header.css'
import '../../includes/footer/footer.css'
import homeCircleImg from '../../../images/home-circle.svg'
import jafzaLogoColor from '../../../images/JAFZA_Logo_Color.svg'
import footerBGshape from '../../../images/footer-sky-bg.svg'
import '../../common.css';
import './walkOtp.css'

import { useNavigate } from 'react-router-dom'
import ModalExit from '../../includes/modal/ModalExit'
import { getCurrentLang, getPhonenumber, isShowModal, setModal } from '../../../reducers'
import { useDispatch, useSelector } from 'react-redux'
import InputOtp from '../otpPage/InputOtp'
import { ValidateOtp, callValidateOtp, sendOTP } from '../../../services/api'
import { vop } from '../../../utils'
export default function WalkOtp(params) {

    const navigate = useNavigate();
    // const navToServices = () => {
    //     navigate('/DPW/services')
    // }

    let mobileNumber = useSelector(getPhonenumber);
    
    console.log('mobileNumber', mobileNumber)


    const currentLang = useSelector(getCurrentLang);
    console.log('currentLang', currentLang)

    // exit modal
    const dispatch = useDispatch();

    const doShowModal = useSelector(isShowModal);
    const {flow} = useSelector((state) => state.app);

    const modalExitData = {
        titleText: "Are you sure you want to cancel and start the process over again?",
        buttonOptions: [{
            text: "Yes",
            buttonAction: () => {
                dispatch(setModal(false))
                navigate("/")
            }
        },
        {
            text: "No",
            buttonAction: () => {
                dispatch(setModal(false))
            }
        }]
    }
    
    const showModel = () => {
        dispatch(setModal(true))
    }

    // OTP
    const [otp, setOtp] = useState('');
    let [errorFlag, setErrorFlag] = useState('');
    const [minutes, setMinutes] = useState(1)
    const [seconds, setSeconds] = useState(0)
    const [showResendButton, setShowResendButton] = useState(false);

    useEffect(() => {

        const updateTimer = () => {
            if (minutes === 0 && seconds === 0) {
              clearInterval(timerInterval);
              setShowResendButton(true);
              return;
            }
        
            if (seconds === 0) {
              setMinutes((prevMinutes) => prevMinutes - 1);
              setSeconds(59);
            } else {
              setSeconds((prevSeconds) => prevSeconds - 1);
            }
    
          };
      
     const timerInterval = setInterval(() => {
            updateTimer();
          }, 1000);

          return () => {
            clearInterval(timerInterval);
          };
    }, [minutes, seconds, showResendButton])
    


    

       const resendOtpAndRestartTimer = async () => {
        try {
            await sendOTP(mobileNumber);
        
            // Restart the countdown timer
            setMinutes(1);
            setSeconds(0);
  
            setErrorFlag('');
            setOtp('')
        
            // Hide the resend button
            setShowResendButton(false);
            
        } catch (error) {
            setErrorFlag("Network temporarily unavailable")
        }
      };


    const handleOtpChange = (updatedOtp) => {
        setErrorFlag('');
        //need to hide the inputs
        setOtp(updatedOtp);
      };

    // const handleInputFocus = (index) => {
    // // Clear the OTP value for the focused input
    // setOtp((prevOtpValue) => {
    //     const newOtpValue = [...prevOtpValue];
    //     newOtpValue[index] = '';
    //     return newOtpValue;
    // });
    // };

    const validateOtp = (input) => {
    if(input.length === 0)
        return "emptyField"
    else if(input.length < 4)
        return "wrongFormat"
    else if (input.length > 0 && input[input.length -1] === ''){
        input.pop();
        return "wrongFormat"
    }else 
        return "valid"
    }

    const handleSubmitOtp = async () => {
        setErrorFlag('');
        console.log('will handle validate OTP')
        try {
            const validateResult = validateOtp(otp);
            console.log('validateResult', validateResult)
            if(validateResult === 'valid'){
                if(otp.length === 4){
                    let publicOtp = otp.join('');
                    console.log('publicOtp', publicOtp)
                    var ResultValidateOtp = ValidateOtp({
                        phoneNumber:mobileNumber,
                        otp:publicOtp,
                    }).then(res=>{
                        if(flow === 'walkin'){
                            return navigate('/DPW/category');//test
                        }else{
                            return navigate('/DPW/appointment');//test
                        }
                    }).catch(err=>{
                        // console.log('asdasdsa',err);
                        setErrorFlag("Wrong OTP number")

                    })
                    console.log('ResultValidateOtp', ResultValidateOtp);

                }    

            }else {
                setErrorFlag("Wrong OTP number")
            }
        } catch (error) {
            console.log('error in parsing data', error)
            setErrorFlag("Network temporarily unavailable")
            // setTimeout(() => {
            //     clearMostSessions();
            //     navigate('/home')
            // }, 4000);
        }
        
    }


    const [showAlertElement, setShowAlertElement] = useState(false)
    const [showResendElement, setShowResendElement] = useState(false)

    console.log('the otp value', otp)
    return (
        <>
        <div className="d-flex flex-column justify-content-center align-items-center bg-white">
            <div className="header-section">
                <img id="header-home-btn" onClick={showModel} src={homeCircleImg} alt="home circle img" className="header-homecircle-img" />
                <img  srcset={jafzaLogoColor} className="header-img-bg" alt="jafza logo" />
            </div>
            <div id="page" className="page-layout d-flex justify-content-center">
                
                <div className="title-box d-flex flex-column justify-content-center align-items-center">
                    <div className="title-black ff-bold">Please enter the OTP sent to your mobile number</div>
                    {/* <div className="otp-set-box">
                        <input id="otp-input-1" className="otp-num-input" type="number" maxlength="1"/>
                        <input id="otp-input-2" className="otp-num-input" type="number" maxlength="1"/>
                        <input id="otp-input-3" className="otp-num-input" type="number" maxlength="1"/>
                        <input id="otp-input-4" className="otp-num-input" type="number" maxlength="1"/>
                    </div> */}
                    <InputOtp otpValue={otp} onOtpChange={handleOtpChange} onKeyClick={handleSubmitOtp} />
                    
                    {/* {
                        errorFlag && <div className="alert-text otp-error">{errorFlag} <br/> </div>
                    } */}
                    <div className="resend-otp-box" style={{opacity: showResendButton ? '0' : '1'}}>
                        <div id="resend-message" className="resend-otp-text">Didn&apos;t receive OTP?</div>
                        <div id="timer" className="otp-time-text">{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</div>
                    </div>
                    <div id="alert-noappotp" style={{opacity: errorFlag ? '1' : '0'}} class="alert-noappotp-text">Wrong OTP number</div>
                    <div class="otp-actions-box">
                        <button id="btn-resendotp-submit" style={{display: showResendButton ? 'flex' : 'none'}}   onClick={resendOtpAndRestartTimer} class="button-wide button-fill-clr space-submit-resendotp">
                            <span>Resend OTP</span>
                        </button>
                        <button id="btn-otp-submit" onClick={handleSubmitOtp} className="button-wide button-fill-clr space-submit-otp">Submit</button>
                    </div>
                </div>
            </div>
            <div className="footer-section">
                <img id="footer-img-bg"  src={footerBGshape} className="footer-img-icon" alt="background shape" />
            </div>

           {
                doShowModal && (
                    <ModalExit data={modalExitData} />
                )
            } 
        </div>
        {/* <div className="title-box d-flex flex-column justify-content-center align-items-center">
            <div className="title-black title-otp-text">please enter the otp sent to your mobile number</div>
            <div className="otp-set-box">
                <div id="otp-input-1" className="otp-num-input" type="number" maxlength="1" autofocus="autofocus">4</div>
                <div id="otp-input-2" className="otp-num-input" type="number" maxlength="1"></div>
                <div id="otp-input-3" className="otp-num-input" type="number" maxlength="1"></div>
                <div id="otp-input-4" className="otp-num-input" type="number" maxlength="1"></div>
            </div>
            <div className="resend-otp-box">
                <div id="resend-message" className="resend-otp-text">didn&apos;t recieve otp?</div>
                <div id="timer" className="otp-time-text">01:59</div>
            </div>
            <button id="btn-otp-submit" onClick={navToServices} className="button-default space-submit-otp">SUBMIT</button>
        </div> */}
        </>
    )
};
