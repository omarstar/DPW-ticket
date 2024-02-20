import React, { useEffect, useState } from 'react'

import '../../includes/header/header.css'
import '../../includes/footer/footer.css'
import homeCircleImg from '../../../images/home-circle.svg'
import backCircleImg from '../../../images/backarrow.svg'
import jafzaLogoColor from '../../../images/JAFZA_Logo_Color.svg'
import footerBGshape from '../../../images/footer-sky-bg.svg'
import '../../common.css';
import './walkOtp.css'

import { useNavigate } from 'react-router-dom'
import ModalExit from '../../includes/modal/ModalExit'
import { getCurrentLang, getPhonenumber, isShowModal, setLoading, setModal } from '../../../reducers'
import { useDispatch, useSelector } from 'react-redux'
import InputOtp from '../otpPage/InputOtp'
import { ValidateOtp, callValidateOtp, sendOTP } from '../../../services/api'
import Text from '../../Text'
import Footer from '../../includes/footer/Footer'
// import Loading from '../../includes/loading/loading'
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
    const {flow, branchPrefix,email} = useSelector((state) => state.app);

    const modalExitData = {
        titleText: <Text name="titleExitModal" />,
        buttonOptions: [{
            text: <Text name="btnYes" />,
            buttonAction: () => {
                dispatch(setModal(false))
                navigate("/")
            }
        },
        {
            text: <Text name="btnNo" />,
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
            dispatch(setLoading(true));
            await sendOTP(mobileNumber,email);
            dispatch(setLoading(false));
            // Restart the countdown timer
            setMinutes(1);
            setSeconds(0);
  
            setErrorFlag('');
            setOtp('')
        
            // Hide the resend button
            setShowResendButton(false);
            
        } catch (error) {
            dispatch(setLoading(false));
            setErrorFlag(<Text name="alertNetwork" />)
            // setErrorFlag("Network temporarily unavailable")
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
        console.log('will handle validate OTP');
        dispatch(setLoading(true));

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
                        dispatch(setLoading(false));
                        if(flow === 'walkin'){
                            return navigate('/DPW/category');//test
                        }else{
                            return navigate('/DPW/appointment');//test
                        }
                    }).catch(err=>{
                        dispatch(setLoading(false));
                        setErrorFlag(<Text name="alertWrongOtp" />)
                        // setErrorFlag("Wrong OTP number")

                    })
                    console.log('ResultValidateOtp', ResultValidateOtp);

                }    

            }else {
                dispatch(setLoading(false));
                setErrorFlag(<Text name="alertWrongOtp" />)
            }
        } catch (error) {
            console.log('error in parsing data', error)
            dispatch(setLoading(false));
            setErrorFlag(<Text name="alertNetwork" />)
            // setErrorFlag("Network temporarily unavailable")
        }
        
    }

    const HandleBack = () => {
        if(flow === "app"){
            navigate('/DPW/mobile')
        }else if(flow === "walkin"){
            if(branchPrefix === "LOB14"){
                navigate('/DPW/walkin-mobile')
            }else{
                navigate('/DPW/customer')
            }
        }
    }

    // const [showAlertElement, setShowAlertElement] = useState(false)
    // const [showResendElement, setShowResendElement] = useState(false)

    console.log('the otp value', otp)
    return (
        <>
        <div className="d-flex flex-column justify-content-center align-items-center bg-white">
           
            <div className="header-section">
                {/* <img id="header-home-btn" onClick={showModel} src={homeCircleImg} alt="home circle img" className="header-homecircle-img" /> */}
                <img id="header-home-btn" onClick={showModel}  src={homeCircleImg} alt="home circle img" className="header-homecirclebk-img" />
                <img id="btn-back-btn" onClick={HandleBack} src={backCircleImg} alt="back circle img" className="header-backcircle-img" />
                <img  srcset={jafzaLogoColor} className="header-img-bg" alt="jafza logo" />
            </div>
            <div id="page" className="page-layout d-flex justify-content-center">
                
                <div className="title-box d-flex flex-column justify-content-center align-items-center">
                    <div className="title-black ff-bold"><Text name="titleEnterOtp" /></div>
                    {/* <div className="title-black ff-bold">Please enter the OTP sent to your mobile number</div> */}
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
                    <div className={`resend-otp-box ${currentLang=='en'?'':'directionRtL'}`} style={{opacity: showResendButton ? '0' : '1'}}>
                        <div id="resend-message" className="resend-otp-text"><Text name="noteReceiveOtp" /></div>
                        {/* <div id="resend-message" className="resend-otp-text">Didn&apos;t receive OTP?</div> */}
                        <div id="timer" className="otp-time-text">{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</div>
                    </div>
                    <div id="alert-noappotp" style={{opacity: errorFlag ? '1' : '0'}} class="alert-noappotp-text"><Text name="alertWrongOtp" /></div>
                    <div class="otp-actions-box">
                        <button id="btn-resendotp-submit" style={{display: showResendButton ? 'flex' : 'none'}}   onClick={resendOtpAndRestartTimer} class="button-wide button-fill-clr space-submit-resendotp">
                            <span><Text name="btnResendOtp" /></span>
                        </button>
                        {/* <div className='d-flex justify-content-center align-items-center gap-3'>
                            <button id="btn-otp-submit" onClick={HandleBack} className="button-wide half-width button-outline-clr space-btn-back"><Text name="btnBack" /></button>
                            <button id="btn-otp-submit" onClick={handleSubmitOtp} className="button-wide half-width button-fill-clr space-submit-otp"><Text name="btnSubmit" /></button>
                        </div> */}
                        <button id="btn-otp-submit" onClick={handleSubmitOtp} className="button-wide button-fill-clr space-submit-otp"><Text name="btnSubmit" /></button>
                    </div>
                </div>
            </div>
            < Footer />

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
