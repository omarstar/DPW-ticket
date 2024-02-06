import React, { useState } from 'react'

import '../../includes/header/header.css'
import '../../includes/footer/footer.css'
import homeCircleImg from '../../../images/home-circle.svg'
import jafzaLogoColor from '../../../images/JAFZA_Logo_Color.svg'
import footerBGshape from '../../../images/footer-sky-bg.svg'
import '../../common.css';
import './walkOtp.css'

import { useNavigate } from 'react-router-dom'
import ModalExit from '../../includes/modal/ModalExit'
import { isShowModal, setModal, setPhonenumber } from '../../../reducers'
import { useDispatch, useSelector } from 'react-redux'
import InputOtp from '../otpPage/InputOtp'
export default function WalkOtp(params) {

    const navigate = useNavigate();
    const navToServices = () => {
        navigate('/DPW/services')
    }

    // exit modal
    const dispatch = useDispatch();

    const doShowModal = useSelector(isShowModal);

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

    const handleOtpChange = (updatedOtp) => {
        setErrorFlag('');
        setOtp(updatedOtp);
      };

    const validateOtp = (input) => {
    if(otp.length === 0)
        return "emptyField"
    else if(otp.length < 4)
        return "wrongFormat"
    else 
        return "valid"
    }

    const handleSubmitOtp = () => {
        setErrorFlag('');
        console.log('will handle validate OTP')
        try {
            const validateResult = validateOtp(otp);
            console.log('validateResult', validateResult)
            if(validateResult === 'valid'){
                if(otp.length === 4){
                    let publicOtp = otp.join('');
                    console.log('publicOtp', publicOtp)
                    //navigate //test
                    // updateMainSession({phoneNumber: phoneNumberOtp.substring(2)})
                    dispatch(setPhonenumber())
                    

                    // const apiValidateData = {
                    //     phoneNumber: phoneNumberOtp, 
                    //     otpCode: publicOtp,
                    //     lang: lang
                    // }

                    // callValidateOtp(apiValidateData)
                    // .then(response => {

                    //     console.log('validate otp res ', response)
                    //     if(vop(response)){
                    //         setTimeout(() => {
                    //             navigate(route)
                    //         }, 500);

                    //     }else{
                    //         setErrorFlag('inCorrectOtp')
                    //     }
                    // })
                    // .catch(error => {
                    //     console.log('error', error)
                    // })
                    
                }    

            }else {
                setErrorFlag(validateResult)
            }
        } catch (error) {
            console.log('error in parsing data', error)
            // setTimeout(() => {
            //     clearMostSessions();
            //     navigate('/home')
            // }, 4000);
        }
        
    }

    return (
        <>
        <div class="d-flex flex-column justify-content-center align-items-center bg-white">
            <div class="header-section">
                <img id="header-home-btn" onClick={showModel} src={homeCircleImg} alt="home circle img" class="header-homecircle-img" />
                <img  srcset={jafzaLogoColor} class="header-img-bg" alt="jafza logo" />
            </div>
            <div id="page" className="page-layout d-flex justify-content-center">
                
                <div class="title-box d-flex flex-column justify-content-center align-items-center">
                    <div class="title-black">Please enter the otp sent to your mobile number</div>
                    {/* <div class="otp-set-box">
                        <input id="otp-input-1" class="otp-num-input" type="number" maxlength="1"/>
                        <input id="otp-input-2" class="otp-num-input" type="number" maxlength="1"/>
                        <input id="otp-input-3" class="otp-num-input" type="number" maxlength="1"/>
                        <input id="otp-input-4" class="otp-num-input" type="number" maxlength="1"/>
                    </div> */}
                    <InputOtp otpValue={otp} onOtpChange={handleOtpChange} onKeyClick={handleSubmitOtp} />
                    <div class="resend-otp-box">
                        <div id="resend-message" class="resend-otp-text">Didn&apos;t receive OTP?</div>
                        <div id="timer" class="otp-time-text">01:59</div>
                    </div>
                    <button id="btn-otp-submit" onClick={handleSubmitOtp} class="button-wide button-fill-clr space-submit-otp">Submit</button>
                </div>
            </div>
            <div class="footer-section">
                <img id="footer-img-bg"  src={footerBGshape} class="footer-img-icon" alt="background shape" />
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
