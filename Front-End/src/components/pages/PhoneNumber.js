import React, { useEffect, useState } from 'react';

import '../includes/header/header.css'
import '../includes/footer/footer.css'
import homeCircleImg from '../../images/home-circle.svg'
import jafzaLogoColor from '../../images/JAFZA_Logo_Color.svg'
import footerBGshape from '../../images/footer-sky-bg.svg'
import '../common.css';
import '../../styles/mobile.css'

import { useSelector, useDispatch } from 'react-redux'
import { isShowModal, setBranchid, setLoading, setModal, setTicket } from '../../reducers';
import { api, getSessionValue, setSessionValue, vadidateForm } from '../../utils/index';
import { useNavigate, useParams } from 'react-router-dom';
import $ from 'jquery';
import PhoneNumberInput from '../includes/phoneInput/PhoneNumberInput';
import ModalExit from '../includes/modal/ModalExit';
import { getAppointments, sendOTP } from '../../services/api';
import { setAppointments } from '../../reducers/appointments';

export default function PhoneNumber() {
    
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    // const {phoneNumber} = useSelector((state) => state.app);
    const {flow} = useSelector((state) => state.app);

    const dispatch = useDispatch();

    
  
     // validate
    //  const [errorMessage, setErrorMessage] = useState('');

     const handleValidationResult = (isValid, message) => {
         if (!isValid) {
            // setErrorMessage(message);
            if(message === 'This field is required'){
                setShowAlert(message)
            }
            else{
                //flow? Wrong mobile number if app
                setShowAlert(flow === "app" ? "Wrong mobile number or no appointment found" : "Wrong mobile number")
            }
         } else {
        //  setErrorMessage('');
         setShowAlert(false);
         }
     };

     const handleMobileSubmit = async () => {
        console.log('validating mobile, do we show alert?',showAlert);
        
        let phoneValue = $('#phonenumber').val();
        console.log('validating sending otp phone nb',phoneValue);
        //not empty and it is valid
        if(phoneValue !== '' && !showAlert){

            try {
                if(flow === "app"){
                    const Appointments = await getAppointments(phoneValue)?? [];
                    console.log('Appointments',Appointments);
                    if(Appointments.length > 0){
                        dispatch(setAppointments(Appointments));
                        
                        sendOTP(phoneValue);
                        return navigate('/DPW/otp');
                    }else{
                        return setShowAlert('Wrong mobile number or no appointment found');
                    }
                }else{  
                    sendOTP(phoneValue);
                    return navigate('/DPW/otp');
                }
            } catch (error) {
                return setShowAlert('network temporarily unavailable');
            }
        }else{
            // setShowAlert('This field is required')
        }
  
    }

    // modal
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


    // const handlePhoneNumber = () =>{
    //     if($('#phoneNumber').val()){
    //         setSessionValue("phoneNumber",$('#phoneNumber').val())
    //         //create ticket
    //         // navigate(`/ticket`);
    //     }else{
    //         $('#phone-num-error').show();
    //     }
    // }

    // const createTicket = async () =>{
    //     console.log('create clicked!')
    //     dispatch(setLoading(true));
    //     const selectedBranch = JSON.parse(getSessionValue('br_name'),'{}');
    //     const selectedService = getSessionValue('serviceId');
    //     console.log('ticketData',[selectedService,selectedBranch]);
    //     // navigate('/ticket');//test
    //     if(selectedService && selectedBranch){
    //         try {
    //             let data = JSON.stringify({
    //                 "parameters": {
    //                 "notificationType": "none",
    //                 "print": "0",
    //                 "phoneNumber": getSessionValue('phoneNumber'),
    //                 "custom1": '',
    //                 }
    //             });
                
    //             let config = {
    //                 method: 'POST',
    //                 headers: { 
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body : data
    //             };
    //             const _url = api('create/ticket/')
    //             const _urlTicket = _url + `?serviceId=${selectedService}&brancheId=${selectedBranch.id}`
    //             const response = await fetch(_urlTicket, config);
                
                
    //             const result = await response.json();
    //             console.log('created ticket data ',result);
    //             setSessionValue('sess_visit',JSON.stringify(result));
    //             navigate('/ticket');
    //         } catch (error) {
    //             navigate('/');
    //         }
            
    //     }else{
    //         navigate('/');
    //     }
        
    // }

    return (
        



            <div className="d-flex flex-column justify-content-center align-items-center bg-white">
                <div className="header-section">
                    <img id="header-home-btn" onClick={showModel}  src={homeCircleImg} alt="home circle img" className="header-homecircle-img" />
                    <img  src={jafzaLogoColor} className="header-img-bg" alt="jafza logo" />
                </div>
                <div id="page" className="page-layout d-flex justify-content-start align-items-center">
                    <div className="title-box d-flex flex-column justify-content-center align-items-center">
                        <div className="title-black ff-bold">Please enter your mobile number</div>
                        <div className="input-mobile-block">
                            <PhoneNumberInput onValidationResult={handleValidationResult}  />
                        </div>
                    
                        <div id="alert-wrongmobile" className="alert-text ff-bold mobile-alert">{showAlert}</div>
                        <div className='d-flex flex-column justify-content-end align-items-center h-15'><button id="btn-mobile-submit" onClick={handleMobileSubmit} className="button-wide button-fill-clr space-mobile-submit">Continue</button></div>
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