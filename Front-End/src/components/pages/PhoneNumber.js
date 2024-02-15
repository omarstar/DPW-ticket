import React, { useEffect, useState } from 'react';

import '../includes/header/header.css'
import '../includes/footer/footer.css'
import homeCircleImg from '../../images/home-circle.svg'
import jafzaLogoColor from '../../images/JAFZA_Logo_Color.svg'
import footerBGshape from '../../images/footer-sky-bg.svg'
import '../common.css';
import '../../styles/mobile.css'

import { useSelector, useDispatch } from 'react-redux'
import { getPhonenumber, isShowModal, setLoading, setModal, setPhonenumber } from '../../reducers';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import PhoneNumberInput from '../includes/phoneInput/PhoneNumberInput';
import ModalExit from '../includes/modal/ModalExit';
import { createCustomer, getAppointments, sendOTP } from '../../services/api';
import { setAppointments } from '../../reducers/appointments';
import Text from '../Text';
import Loading from '../includes/loading/loading';

export default function PhoneNumber() {
    
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    // const [errorMessage, setErrorMessage] = useState(false);

    // const {phoneNumber} = useSelector((state) => state.app);
    const {flow , branchPrefix , loading} = useSelector((state) => state.app);
    console.log('branchPrefix in app phone', branchPrefix)
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(setPhonenumber(''))
    
    }, [])
    

    let mobileNumber = useSelector(getPhonenumber);
    console.log('init mobileNumber', mobileNumber)
  
     // validate
    //  const [errorMessage, setErrorMessage] = useState('');

     const handleValidationResult = (isValid, message) => {
         if (!isValid) {
            if(message === 'This field is required'){
                setShowAlert(<Text name="alertEmptyField" />)
                // setShowAlert(message)
            }
            else{
                //flow? Wrong mobile number if app
                setShowAlert(flow === "app" ? <Text name="alertNoAppWrongMobile" /> : <Text name="alertWrongMobile" />)
            }
         } else {
        //  setErrorMessage('');
         setShowAlert(false);
         }
     };

     const handleMobileSubmit = async () => {
        
        console.log('validating sending otp phone nb',mobileNumber);
        //not empty and it is valid
        if(mobileNumber !== '' && !showAlert){
            dispatch(setLoading(true));
            try {
                if(flow === "app"){
                    const Appointments = await getAppointments(mobileNumber)?? [];
                    console.log('Appointments',Appointments);
                    if(Appointments.length > 0){
                        dispatch(setAppointments(Appointments));
                        
                        await sendOTP(mobileNumber);
                        dispatch(setLoading(false));

                        return navigate('/DPW/otp');
                    }else{
                        dispatch(setLoading(false));

                        return setShowAlert(<Text name="alertNoAppWrongMobile" />);
                    }
                }else{  
                    let customer = {
                        firstName : $('#input-walkin-name').val(),
                        phoneNum : mobileNumber,
                        email : $('#input-walkin-email').val(),
        
                    };
                    await createCustomer(customer);
                    await sendOTP(mobileNumber);
                    dispatch(setLoading(false));
                    return navigate('/DPW/otp');
                }
            } catch (error) {
                return setShowAlert(<Text name="alertNetwork" />);
            }
        }else{
            // setShowAlert('This field is required')
        }
  
    }

    // modal
    const doShowModal = useSelector(isShowModal);

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


    return (
        


            <div className="d-flex flex-column justify-content-center align-items-center bg-white">
                
                
                <div className="header-section">
                    <img id="header-home-btn" onClick={showModel}  src={homeCircleImg} alt="home circle img" className="header-homecircle-img" />
                    <img  src={jafzaLogoColor} className="header-img-bg" alt="jafza logo" />
                </div>
                <div id="page" className="page-layout d-flex justify-content-start align-items-center">
                    <div className="title-box d-flex flex-column justify-content-center align-items-center">
                        <div className="title-black ff-bold"><Text name="titleEnterMobile" /></div>
                        <div className="input-appmobile-block">
                            <PhoneNumberInput onValidationResult={handleValidationResult}  />
                        </div>
                        
                       
                        <div id="alert-wrongmobile" className="alert-text ff-bold mobile-app-alert">{showAlert}</div>
                        <div className='d-flex flex-column justify-content-end align-items-center btn-appmobile-box'><button id="btn-mobile-submit" onClick={handleMobileSubmit} className="button-wide button-fill-clr space-mobile-submit"><Text name="btnContinue" /></button></div>
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





            /*<div id="phoneNumberpage" className='py-3'>
             <div className="w-100 myrounded-top-only bg-light position-relative text-start h-70">
            <div className="px-4 pt-4 w-100 h-100" data-scrollbar="true">
                <form id="login" className="d-flex flex-column justify-content-around">
                	<p id="message" className='text-red'></p>
                    <div className="alert alert-error text-red"></div>
                    <div className="mb-4">
                        <PhoneNumberInput />
                    </div>
                    <div>
                        <ul>
                            <li>You will receive an SMS with your ticket number.</li>
                        </ul>
                    </div>
                    <div className="mb-4 text-center submit-phone-btn">
                        <button type="button" onClick={createTicket} className="btn shadow m-auto branch-btn w-100 mt-4 btnshadow">
                            <span className="col-12">Send Information</span></button>
                    </div>
                    
                </form>
            </div>
        </div> 
        </div> */
    )
}