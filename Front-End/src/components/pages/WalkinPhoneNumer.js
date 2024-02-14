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
import { validateEmail, validateEmptyField, validateInput } from '../../utils/index';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import PhoneNumberInput from '../includes/phoneInput/PhoneNumberInput';
import ModalExit from '../includes/modal/ModalExit';
import { createCustomer, getAppointments, sendOTP } from '../../services/api';
import { setAppointments } from '../../reducers/appointments';
import Text from '../Text';

export default function WalkinPhoneNumber() {
    
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    let {CurrentLang} = useSelector((state) => state.app);

    // const {phoneNumber} = useSelector((state) => state.app);
    const {flow , branchPrefix} = useSelector((state) => state.app);

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(setPhonenumber(''))
    
    }, [])
    

    let mobileNumber = useSelector(getPhonenumber);
    console.log('init mobileNumber', mobileNumber)
  
     // validate
    //  const [errorMessage, setErrorMessage] = useState('');

     const handleValidationResult = (isValid, message) => {
        console.log('handle mobile valid?', isValid)
         if (!isValid) {
            if(message === 'This field is required'){
                setErrorMessage(<Text name="alertEmptyField" />)
            }
            else{
                setErrorMessage(<Text name="alertWrongMobile" />)
            }
         } else {
         setErrorMessage(message);
        //  setErrorMessage('');
         setShowAlert(false);
         }
     };
    
     $("#input-walkin-name").on("blur", function() {
        validateInput($(this), $("#alert-walkin-name"), validateEmptyField, CurrentLang);
    });
     $("#input-walkin-email").on("blur", function() {
        validateInput($(this), $("#alert-walkin-email"), validateEmail, CurrentLang);
    });

    function allFieldsValidated() {
        const valN = validateInput($("#input-walkin-name"), $("#alert-walkin-name"), validateEmptyField, CurrentLang);
        const valE = validateInput($("#input-walkin-email"), $("#alert-walkin-email"), validateEmptyField, CurrentLang);
        const valEi = validateInput($("#input-walkin-email"), $("#alert-walkin-email"), validateEmail, CurrentLang);
       
        var isValidMobile =  errorMessage === 'valid' ? true : false;

        if(!valN || !valE || !isValidMobile || !valEi){
            return false
        }
        return true;
    }

     const handleMobileSubmit = async () => {
        
        console.log('validating sending otp phone nb',mobileNumber);
        //not empty and it is valid
        if(allFieldsValidated()){
            dispatch(setLoading(true));
            try {
                if(flow === "app"){
                    const Appointments = await getAppointments(mobileNumber)?? [];
                    console.log('Appointments',Appointments);
                    if(Appointments.length > 0){
                        dispatch(setAppointments(Appointments));
                        
                        await sendOTP(mobileNumber);
                        return navigate('/DPW/otp');
                    }else{
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
        }
        // if(mobileNumber !== '' && !showAlert){
        //     setShowAlert('')
            
        // }else{
        //     // setShowAlert('These fields are required')
        // }
  
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
                        <div className="input-mobile-block">
                            <PhoneNumberInput onValidationResult={handleValidationResult}  />
                            <div id="alert-walkin-mobile" className="alert-small-text">{errorMessage === 'valid' ? '' : errorMessage}</div>
                        </div>
                        <div id='lob14walkinFields' className='h-15'>
                            <div className="input-block">
                                <input id="input-walkin-name" type="text" name="name" className="input-box tt-cap input-fullwidth" placeholder="FULLNAME" />
                                <div id="alert-walkin-name" className="alert-small-text"></div>
                            </div>
                            <div className="input-block">
                            <input id="input-walkin-email" type="email" name="email" className="input-box input-fullwidth" placeholder="E-MAIL" required/>
                            <div id="alert-walkin-email" className="alert-small-text"></div>
                            </div>
                        </div>
                        <div id="alert-wrongmobile" className="alert-text ff-bold mobile-alert">{showAlert}</div>
                        <div className='d-flex flex-column justify-content-end align-items-center h-12'><button id="btn-mobile-submit" onClick={handleMobileSubmit} className="button-wide button-fill-clr space-mobile-submit"><Text name="btnContinue" /></button></div>
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

    )
}