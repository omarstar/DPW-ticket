import React from 'react'
import './customerForm.css'
import '../../includes/header/header.css'
import '../../includes/footer/footer.css'
import homeCircleImg from '../../../images/home-circle.svg'
import jafzaLogoColor from '../../../images/JAFZA_Logo_Color.svg'
import footerBGshape from '../../../images/footer-sky-bg.svg'
import '../../common.css';
import PhoneNumberInput from '../../includes/phoneInput/PhoneNumberInput'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getPhonenumber, isShowModal, setModal, setPhonenumber } from '../../../reducers'
import ModalExit from '../../includes/modal/ModalExit'
import $ from 'jquery';
import { createCustomer } from '../../../utils/api'
export default function CustomerForm(params) {
    const navigate = useNavigate();

    const navToOtpPage = () => {
        navigate('/DPW/otp')
    }

    const handleNewCustomerSubmit = () => {
        //get the mobile number, remove +971 add 0
        //call sendOtp
        if(validateInputFields()){
            let customer = {
                firstName : $('#input-firstname').val(),
                lastName : $('#input-lastname').val(),
                phoneNum : $('#input-walknew-mobilenumber').val(),
                email : $('#input-email').val(),
                company : $('#input-companyName2').val()

            };
            createCustomer(customer).then(a=>{
                console.log('createCustomer',a);
                navToOtpPage();
            })
        }
    }
   

    const handleExistingCusomterSearch =() => {
        console.log('searching...')
    }

    const dispatch = useDispatch();

    const doShowModal = useSelector(isShowModal);

    const modalExitData = {
        titleText: "Are you sure you want to cancel and start the process over again?",
        buttonOptions: [{
            text: "Yes",
            buttonAction: () => {
                // setShowModal(false)
                dispatch(setModal(false))
                navigate("/")
            }
        },
        {
            text: "No",
            buttonAction: () => {
                // setShowModal(false)
                dispatch(setModal(false))
            }
        }]
    }
    
    const showModel = () => {
        // setShowModal(true)
        dispatch(setModal(true))
    }

    const validateInput = (input, errorElement, validationFunction) => {
		// input.attr("name") 
        console.log('validationFunction',validationFunction);
		var value = input.val();
		var isValid = validationFunction(value);

		if (!isValid) {
			if(value === "")
			errorElement.text("This field is required");
			else {
				errorElement.text("Invalid format");
			}	
			errorElement.css('visibility', 'visible');
			return false;
		} else {
			errorElement.text("");
			errorElement.css('visibility', 'hidden');
			return true;
		}
	}

    const validateEmptyField = (inputValue) => {
		return inputValue !== "";
	}

    const validateMobileInput = (input, errorElement) => {
		// input.attr("name") 
		var value = input.getNumber()
		// var isValid = validationFunction(value);

		if(input.isValidNumber()) {
			errorElement.css('visibility', 'hidden');
			return true;
		}else{
			if(value === ""){
				errorElement.text("This field is required");
			}else{
				errorElement.text("Invalid format");
			}
			errorElement.css('visibility', 'visible');
			return false;
		}
	}

    const validateEmail = (email) => {
		var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}
    const validateInputFields = () =>{

		var valFn = validateInput($('#input-firstname'), $("#alert-firstname"), validateEmptyField);
		var valLn = validateInput($('#input-lastname'), $("#alert-lastname"), validateEmptyField);
		// var valM = validateInput($("#input-mobileNumber"), $("#alert-mobile"), validateEmptyField);
		// var valM = validateMobileInput(phoneInput,$("#alert-mobile"));
		var valM = true;
		var valE = validateInput($('#input-email'), $("#alert-email"), validateEmptyField);
		var valC = validateInput($('#input-companyName2'), $("#alert-companyName2"), validateEmptyField);

		var isValidMobile = true;
		// var isValidMobile = validateMobileInput(phoneInput,$("#alert-mobile"));
		var isValidEmail = validateInput($("#input-email"), $("#alert-email"), validateEmail);
		
		if(!valFn || !valLn || !valM || !valE || !valC || !isValidMobile || !isValidEmail){
			return false
		}

	
		return true;
	}
    $("#input-email").on("blur", function() {
        validateInput($(this), $("#alert-email"), validateEmail);
    });
    $("#input-walknew-mobilenumber").on("blur", function() {
        // validateInput($(this), $("#alert-mobile"), validateMobileNumber);
        // validateMobileInput(phoneInput,$("#alert-mobile"));
    });
    $("#input-firstname").on("blur", function() {
        validateInput($(this), $("#alert-firstname"), validateEmptyField);
    });
    $("#input-lastname").on("blur", function() {
        validateInput($(this), $("#alert-lastname"), validateEmptyField);
    });
    $("#input-companyName2").on("blur", function() {
        validateInput($(this), $("#alert-companyName2"), validateEmptyField);
    });
    return (
        <div class="d-flex flex-column justify-content-center align-items-center bg-white">
            
            <div class="header-section">
                <img id="header-home-btn" onClick={showModel}  src={homeCircleImg} alt="home circle img" class="header-homecircle-img" />
                <img  srcset={jafzaLogoColor} class="header-img-bg" alt="jafza logo" />
            </div>
            <div class="page-layout">
                <div id="customerpage" className="page-start-layout">
                    <div class="existingcustomer-box">
                        <div class="title-form">EXISTING CUSTOMER</div>
                        <form>
                            <div class="input-block">
                                <input id="input-srNumber" type="text" class="input-box input-fullwidth" placeholder="SR #" />
                            </div>
                            <div class="input-block">
                                <input id="input-companyName1" type="text" class="input-box input-fullwidth" placeholder="COMPANY NAME" />
                            </div>
                        </form>
                        <div id="alert-norecords" class="alert-norecords-text">No records found</div>
                    </div>
                    <button id="" onClick={handleExistingCusomterSearch} class="button-wide button-fill-clr space-btn-form-search">Search &amp; Continue</button>
                    <div class="separate-line"></div>
                    <div class="newcustomer-box">
                    <div class="title-form">NEW CUSTOMER</div>
                        <form id="form-newcustomer">
                            <div class="input-block">
                            <input id="input-firstname" type="text" name="first name" class="input-box input-fullwidth" placeholder="FIRST NAME" />
                            <div id="alert-firstname" class="alert-small-text"></div>
                            </div>
                            <div class="input-block">
                            <input id="input-lastname" type="text" name="last time" class="input-box input-fullwidth" placeholder="LAST NAME" />
                            <div id="alert-lastname" class="alert-small-text"></div>
                            </div>
                            <div class="input-block">
                            {/* onChangeHandler={(nb)=>{dispatch(setPhonenumber)}} */}
                                <PhoneNumberInput />
                            {/* <input id="input-walknew-mobilenumber" type="tel"  class="input-box input-fullwidth required" name="mobile" pattern="[0-9]*" placeholder="" onClick="this.select();" required /> */}
                            <div id="alert-mobile" class="alert-small-text"></div>
                            </div>
                            <div class="input-block">
                            <input id="input-email" type="email" name="email" class="input-box input-fullwidth" placeholder="E-MAIL" required style={{textTransform: 'inherit'}} />
                            <div id="alert-email" class="alert-small-text"></div>
                            </div>
                            <div class="input-block">
                            <input id="input-companyName2" type="text" name="company" class="input-box input-fullwidth" placeholder="COMPANY NAME" />
                            <div id="alert-companyName2" class="alert-small-text"></div>
                            </div>
                        </form>
                        {/* <div id="alert-registration" class="alert-validation-text">all fields are required</div> */}
                    </div>
                    <button id="new_customer_proceed" onClick={handleNewCustomerSubmit} class="button-wide button-fill-clr space-btn-form-proceed">Proceed</button>
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
        

        
        
    )
};
