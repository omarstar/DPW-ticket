import React, { useEffect, useState } from 'react';

import '../includes/header/header.css'
import '../includes/footer/footer.css'
import homeCircleImg from '../../images/home-circle.svg'
import jafzaLogoColor from '../../images/JAFZA_Logo_Color.svg'
import footerBGshape from '../../images/footer-sky-bg.svg'
import '../common.css';
import '../../styles/options.css'

import { useSelector, useDispatch } from 'react-redux'
import { isShowModal, setBranchid, setLoading, setModal, setTicket } from '../../reducers';
import { api, getSessionValue, setSessionValue, vadidateForm } from '../../utils/index';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import $ from 'jquery';
import PhoneNumberInput from '../includes/phoneInput/PhoneNumberInput';
import ModalExit from '../includes/modal/ModalExit';
import { getAppointments, sendOTP } from '../../services/api';
import { setAppointments } from '../../reducers/appointments';

export default function PhoneNumber() {
    
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const {loading,phoneNumber} = useSelector((state) => state.app);
    const dispatch = useDispatch();

    const handleMobileSubmit = async () => {
        setShowAlert(false);
        //validate
        //get appointments if exist eslse alert
        //send otp
        console.log('validating mobile,sending otp');
        // return getAppointments(phoneNumber);
        const Appointments = await getAppointments(phoneNumber);
        console.log('Appointments',Appointments);
        if(Appointments.length>0){
            dispatch(setAppointments(Appointments));
            sendOTP(phoneNumber);
            return navigate('/DPW/otp');
        }else{
            return setShowAlert('Wrong mobile number or no appointment found');
        }
        
        
        
    }
    //modal exit
  

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
    const handlePhoneNumber = () =>{
        if($('#phoneNumber').val()){
            setSessionValue("phoneNumber",$('#phoneNumber').val())
            //create ticket
            // navigate(`/ticket`);
        }else{
            $('#phone-num-error').show();
        }
    }

    const createTicket = async () =>{
        console.log('create clicked!')
        dispatch(setLoading(true));
        const selectedBranch = JSON.parse(getSessionValue('br_name'),'{}');
        const selectedService = getSessionValue('serviceId');
        console.log('ticketData',[selectedService,selectedBranch]);
        // navigate('/ticket');//test
        if(selectedService && selectedBranch){
            try {
                let data = JSON.stringify({
                    "parameters": {
                    "notificationType": "none",
                    "print": "0",
                    "phoneNumber": getSessionValue('phoneNumber'),
                    "custom1": '',
                    }
                });
                
                let config = {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    body : data
                };
                const _url = api('create/ticket/')
                const _urlTicket = _url + `?serviceId=${selectedService}&brancheId=${selectedBranch.id}`
                const response = await fetch(_urlTicket, config);
                
                
                const result = await response.json();
                console.log('created ticket data ',result);
                setSessionValue('sess_visit',JSON.stringify(result));
                navigate('/ticket');
            } catch (error) {
                navigate('/');
            }
            
        }else{
            navigate('/');
        }
        
    }

    return (
        



            <div className="d-flex flex-column justify-content-center align-items-center bg-white">
            <div className="header-section">
                <img id="header-home-btn" onClick={showModel}  src={homeCircleImg} alt="home circle img" className="header-homecircle-img" />
                <img  srcset={jafzaLogoColor} className="header-img-bg" alt="jafza logo" />
            </div>
            <div id="page" className="page-layout d-flex justify-content-center">
                <div className="title-box d-flex flex-column justify-content-center align-items-center">
                <div className="title-black">Please enter your mobile number</div>
                <div>
                    <PhoneNumberInput dynamicClass={{parent: 'input-mobile-block d-flex justify-content-center',child:'input-box input-fullwidth required'}} />
                </div>
                
                {
                    showAlert && <div id="alert-wrongmobile" className="alert-text m-2"> {showAlert}</div>
                }
                
                <button id="btn-mobile-submit" onClick={handleMobileSubmit} className="button-wide button-fill-clr space-mobile-submit">Continue</button>
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