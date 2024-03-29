import React, { useRef, useState } from 'react'
import './customerForm.css'
import '../../includes/header/header.css'
import '../../includes/footer/footer.css'
import homeCircleImg from '../../../images/home-circle.svg'
import backCircleImg from '../../../images/backarrow.svg'
import jafzaLogoColor from '../../../images/JAFZA_Logo_Color.svg'
import footerBGshape from '../../../images/footer-sky-bg.svg'
import '../../common.css';

import PhoneNumberInput from '../../includes/phoneInput/PhoneNumberInput'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { isShowModal, setCustomer, setEmail, setLoading, setModal } from '../../../reducers'
import ModalExit from '../../includes/modal/ModalExit'
import $ from 'jquery';
import { createCustomer, sendOTP } from '../../../services/api'
import { validateInput } from '../../../utils'
import Text from '../../Text'
import Footer from '../../includes/footer/Footer'
import { getLocalTranslate } from '../../../utils/language'

export default function CustomerForm(params) {
    const navigate = useNavigate();
    const Appstate = useSelector((state)=>state.app);
    const {CurrentLang,email} = Appstate;

    const navToOtpPage = () => {
        navigate('/DPW/otp')
    }

    const phoneInputRef = useRef();

    const handleNewCustomerSubmit =  () => {
        if(validateInputFields()){
            let customer = {
                firstName : $('#input-firstname').val(),
                // lastName : $('#input-lastname').val(),
                phoneNum : Appstate.phoneNumber,
                email : $('#input-email').val(),
                company : $('#input-companyName2').val()

            };

            console.log('creating customer in customerForm', customer)
            dispatch(setLoading(true))
            dispatch(setEmail(customer.email))
            createCustomer(customer).then(a=>{
                console.log('getCustomer',a);
                dispatch(setCustomer(a));
                console.log('sending otp from cusotmer form: ', [customer.phoneNum,customer.email])
                sendOTP(customer.phoneNum,customer.email).then(res=>{
                    dispatch(setLoading(false));
                    if(res.message==="accepted"){
                        return navToOtpPage();
                    }else{
                        dispatch(setLoading(false));
                        return setErrorMessage(<Text name="alertWrongMobile" />)
                    }
                    
                }).catch(err=>{
                    console.error(err);
                    dispatch(setLoading(false));
                    return setErrorMessage(<Text name="alertWrongMobile" />)
                });
            }).catch(err=>{
                console.error(err);
                dispatch(setLoading(false));
                return setErrorMessage(<Text name="alertNetwork" />);
            });
        }
    }
   
    const handleExistingCusomterSearch =() => {
        //validation
        //search call
        //navigate to display
        console.log('searching...')
        $('alert-norecords').text(<Text name="alertNoRecords" />)
    }

    const dispatch = useDispatch();

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
    
    // validation 
    const [errorMessage, setErrorMessage] = useState(false);

    const handleValidationResult = (isValid, message) => {
        if (!isValid) {
            if(message === 'This field is required'){
                setErrorMessage(<Text name="alertEmptyField" />)
            }
            else{
                setErrorMessage(<Text name="alertWrongMobile" />)
            }
        //   setErrorMessage(message);
        } else {
          setErrorMessage(message);
        }
      };
    
    // const validateInput = (input, errorElement, validationFunction) => {
	// 	// input.attr("name") 
    //     console.log('validationFunction',validationFunction);
	// 	var value = input.val();
	// 	var isValid = validationFunction(value);

	// 	if (!isValid) {
	// 		if(value === "")
	// 		errorElement.text("This field is required");
	// 		else {
	// 			errorElement.text("Invalid format");
	// 		}	
	// 		errorElement.css('visibility', 'visible');
	// 		return false;
	// 	} else {
	// 		errorElement.text("");
	// 		errorElement.css('visibility', 'hidden');
	// 		return true;
	// 	}
	// }

    const validateEmptyField = (inputValue) => {
		return inputValue !== "";
	}

    const validateMobileInput = (input, errorElement) => {
		var value = input.getNumber()

		if(input.isValidNumber()) {
			errorElement.css('visibility', 'hidden');
			return true;
		}else{
			if(value === ""){
				errorElement.text(<Text name="alertEmptyField" />);
				// errorElement.text("This field is required");
			}else{
				errorElement.text(<Text name="alertInvalidFormat" />);
			}
			errorElement.css('visibility', 'visible');
			return false;
		}
	}


    const validateEmail = (email) => {
		// var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		// var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;
        // var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+(?!\.))*\.[a-zA-Z]{2,4}$/ ;

		return emailRegex.test(email);
	}
    const validateInputFields = () =>{

		var valFn = validateInput($('#input-firstname'), $("#alert-firstname"), validateEmptyField, CurrentLang);
		// var valLn = validateInput($('#input-lastname'), $("#alert-lastname"), validateEmptyField, CurrentLang);

        var valE = validateInput($('#input-email'), $("#alert-email"), validateEmptyField, CurrentLang);
		// var valC = validateInput($('#input-companyName2'), $("#alert-companyName2"), validateEmptyField, CurrentLang);
		
        const isMobileEmpty = phoneInputRef.current.isInputEmpty();
        console.log('isMobileEmpty', isMobileEmpty)
        
        const isMobileValid = phoneInputRef.current.isValidNumber();
        console.log('isMobileValid', isMobileValid)

        if(isMobileEmpty)
            setErrorMessage(<Text name="alertEmptyField" />)
        else if(!isMobileValid)
            setErrorMessage(<Text name="alertInvalidFormat" />)
        
		// var isValidMobile =  errorMessage === 'valid' ? true : false;
        var isValidMobile = !isMobileEmpty && isMobileValid
        var isValidEmail = validateInput($("#input-email"), $("#alert-email"), validateEmail, CurrentLang);
		
		if(!valFn || !valE || !isValidMobile || !isValidEmail){
			return false
		}

		return true;
	}
    $("#input-email").on("blur", function() {
        validateInput($(this), $("#alert-email"), validateEmail, CurrentLang);
    });

    $("#input-firstname").on("blur", function() {
        validateInput($(this), $("#alert-firstname"), validateEmptyField, CurrentLang);
    });
    
    // $("#input-lastname").on("blur", function() {
    //     validateInput($(this), $("#alert-lastname"), validateEmptyField, CurrentLang);
    // });
    
    // $("#input-companyName2").on("blur", function() {
    //     validateInput($(this), $("#alert-companyName2"), validateEmptyField, CurrentLang);
    // });

    const HandleBack = () => {
        navigate("/DPW/options");
    }

    
    const handleKeyDown = (event) => {
        if(event.key === 'Enter'){
            handleNewCustomerSubmit();
        }
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center bg-white">
            
            <div className="header-section">
                <img id="header-home-btn" onClick={showModel}  src={homeCircleImg} alt="home circle img" className="header-homecircle-img" />
                {/* <img id="header-home-btn" onClick={showModel}  src={homeCircleImg} alt="home circle img" className="header-homecirclebk-img" /> */}
                    <img id="btn-back-btn" src={backCircleImg} onClick={HandleBack} alt="back circle img" className="header-backcircle-img" />
                <img  srcset={jafzaLogoColor} className="header-img-bg" alt="jafza logo" />
            </div>
            <div className="page-layout">
                <div id="customerpage" className="page-start-layout title-box d-flex flex-column justify-content-center align-items-center">
                    {/* <div className="existingcustomer-box">
                        <form className='d-flex flex-column align-items-start'>
                            <div className={"title-form " + (CurrentLang === 'en' ? 'justify-content-start' : 'justify-content-end') }><Text name="txtCustomerExist" /></div>
                            <div className="input-block">
                                <input id="input-srNumber" type="text" className="input-box tt-cap input-fullwidth" placeholder="SR #" />
                            </div>
                            <div className="input-block">
                                <input id="input-companyName1" type="text" className="input-box tt-cap input-fullwidth" placeholder="COMPANY NAME" />
                            </div>
                        </form>
                        <div id="alert-norecords" className="alert-norecords-text"></div>
                    </div>
                    <button id="" onClick={handleExistingCusomterSearch} className="button-wide button-fill-clr space-btn-form-search"><Text name="btnSearchContinue" /></button>
                    <div className="separate-line"></div> */}
                    <div className="newcustomer-box">
                        <form id="form-newcustomer" className='d-flex flex-column align-items-center'>
                            <div className='title-black justify-content-center mb-4'><Text name="txtEnterDetails" /></div>
                            {/* <div className={(CurrentLang === 'en' ? 'title-black justify-content-start mb-4' : 'title-form justify-content-end mb-4') }><Text name="txtEnterDetails" /></div> */}
                            
                            <div className="input-block">
                            <input id="input-firstname" type="text" name="first name" className="input-box tt-cap input-fullwidth language-input" data-lang="name" placeholder={getLocalTranslate('name',CurrentLang)} />
                            <div id="alert-firstname" className="alert-small-text"></div>
                            </div>
                            {/* <div className="input-block">
                            <input id="input-lastname" type="text" name="last time" className="input-box tt-cap input-fullwidth" placeholder="Last Name" />
                            <div id="alert-lastname" className="alert-small-text"></div>
                            </div> */}
                            <div className="">
                                <PhoneNumberInput ref={phoneInputRef} onValidationResult={handleValidationResult}  />
                            {/* <input id="input-walknew-mobilenumber" type="tel"  className="input-box input-fullwidth required" name="mobile" pattern="[0-9]*" placeholder="" onClick="this.select();" required /> */}
                                <div id="alert-mobile" className="alert-small-text">{errorMessage === 'valid' ? '' : errorMessage}</div>
                            </div>
                            <div className="input-block">
                            <input id="input-email" type="email" name="email" className="input-box input-fullwidth" placeholder={getLocalTranslate('txtEmail',CurrentLang)} required style={{textTransform: 'inherit'}} />
                            <div id="alert-email" className="alert-small-text"></div>
                            </div>
                            <div className="input-block">
                            <input id="input-companyName2" type="text" name="company" className="input-box tt-cap input-fullwidth" placeholder={getLocalTranslate('txtCompany',CurrentLang)}  onKeyDown={(e)=>handleKeyDown(e)} />
                            <div id="alert-companyName2" className="alert-small-text"></div>
                            </div>
                            
                        </form>
                        {/* <div id="alert-registration" className="alert-validation-text">all fields are required</div> */}
                    </div>
                    <div className='btn-form-proceed d-flex flex-column justify-content-end align-items-center h-10'>
                        <button id="new_customer_proceed" onClick={handleNewCustomerSubmit} className="button-wide button-fill-clr space-btn-form-proceed"><Text name="btnContinue" /></button>
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
        

        
        
    )
};
