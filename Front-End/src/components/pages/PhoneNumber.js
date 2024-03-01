import React, { useEffect, useRef, useState } from 'react';

import '../includes/header/header.css'
import '../includes/footer/footer.css'
import homeCircleImg from '../../images/home-circle.svg'
import backCircleImg from '../../images/backarrow.svg'
import jafzaLogoColor from '../../images/JAFZA_Logo_Color.svg'
import footerBGshape from '../../images/footer-sky-bg.svg'
import '../common.css';
import '../../styles/mobile.css'

import { useSelector, useDispatch } from 'react-redux'
import { getPhonenumber, isShowModal, setEmail, setLoading, setModal, setPhonenumber } from '../../reducers';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import PhoneNumberInput from '../includes/phoneInput/PhoneNumberInput';
import ModalExit from '../includes/modal/ModalExit';
import { createCustomer, getAppointments, sendOTP } from '../../services/api';
import { setAppointments } from '../../reducers/appointments';
import Text from '../Text';
import Loading from '../includes/loading/loading';
import Footer from '../includes/footer/Footer';

export default function PhoneNumber() {
    
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    // const [errorMessage, setErrorMessage] = useState(false);

    // const {phoneNumber} = useSelector((state) => state.app);
    const {flow , branchPrefix , loading} = useSelector((state) => state.app);
    console.log('branchPrefix in app phone', branchPrefix)
    console.log('flow in app phone', flow)
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(setPhonenumber(''))
    
    }, [])
    

    let mobileNumber = useSelector(getPhonenumber);
    console.log('init mobileNumber', mobileNumber)

    const phoneInputRef = useRef();
  
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
        const isMobileEmpty = phoneInputRef.current.isInputEmpty();
        console.log('isMobileEmpty', isMobileEmpty)
        
        const isMobileValid = phoneInputRef.current.isValidNumber();
        console.log('isMobileValid', isMobileValid)

        
        // if(mobileNumber !== '' && !showAlert){
        if(isMobileEmpty)
            setShowAlert(<Text name="alertEmptyField" />)
        else if(!isMobileValid)
            setShowAlert(<Text name="alertNoAppWrongMobile" />)
        if(!isMobileEmpty && isMobileValid){
            dispatch(setLoading(true));
            try {

                if(flow === "app"){
                    const Appointments = await getAppointments(mobileNumber)?? [];
                    console.log('Appointments',Appointments);
                    if(Appointments.length > 0){
                        dispatch(setAppointments(Appointments));
                        var getCustomerEmail='';
                        const Appointment = Appointments[0];
                        if(Appointment){
                            if(Appointment.customers[0]){
                                const customer = Appointment.customers[0]??[];
                                console.log('customer', customer)
                                getCustomerEmail = customer.properties?.email??""
                            }
                        }
                        dispatch(setEmail(getCustomerEmail));
                        console.log('in app phonetoOtp ', [mobileNumber, getCustomerEmail])
                        const sendOTPRes =  await sendOTP(mobileNumber,getCustomerEmail);
                        dispatch(setLoading(false));
                        if(sendOTPRes.message=="accepted"){
                            return navigate('/DPW/otp');
                        }else{
                            return setShowAlert(<Text name="alertNoAppWrongMobile" />);
                        }

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
                    console.log('customer', customer);//test
                    await createCustomer(customer);
                    await sendOTP(mobileNumber, customer.email);
                    dispatch(setLoading(false));
                    return navigate('/DPW/otp');
                }
            } catch (error) {
                dispatch(setLoading(false));
                return setShowAlert(<Text name="alertNetwork" />);
            }
        }else{
            // setShowAlert('This field is required')
        }
  
    }

    const handleKeyDown = (event) => {
        if(event.key === 'Enter'){
            handleMobileSubmit();
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

const HandleBack = () => {
    navigate("/DPW/options");
}


    return (
        


            <div className="d-flex flex-column justify-content-center align-items-center bg-white">
                
                
                <div className="header-section">
                    <img id="header-home-btn" onClick={showModel}  src={homeCircleImg} alt="home circle img" className="header-homecircle-img" />
                    {/* <img id="header-home-btn" onClick={showModel}  src={homeCircleImg} alt="home circle img" className="header-homecirclebk-img" /> */}
                    <img id="btn-back-btn" src={backCircleImg} onClick={HandleBack} alt="back circle img" className="header-backcircle-img" />

                    <img  src={jafzaLogoColor} className="header-img-bg" alt="jafza logo" />
                </div>
                <div id="page" className="page-layout d-flex justify-content-start align-items-center">
                    <div className="title-box d-flex flex-column justify-content-center align-items-center">
                        <div className="title-black ff-bold"><Text name="titleEnterMobile" /></div>
                        <div className="input-appmobile-block">
                            <PhoneNumberInput ref={phoneInputRef} onValidationResult={handleValidationResult}  />
                        </div>
                        {/* onKeyDown={handleKeyDown} */}
                        
                       
                        <div id="alert-wrongmobile" className="alert-text ff-bold mobile-app-alert">{showAlert}</div>
                        {loading ? (<Loading hSpacer="h-17" />) : (
                            <div className='d-flex flex-column justify-content-end align-items-center btn-appmobile-box'><button id="btn-mobile-submit" onClick={handleMobileSubmit} className="button-wide button-fill-clr space-mobile-submit"><Text name="btnContinue" /></button></div>
                        )}
                    </div>
                </div>
                < Footer />
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