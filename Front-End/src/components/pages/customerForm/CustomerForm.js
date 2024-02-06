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
import { isShowModal, setModal } from '../../../reducers'
import ModalExit from '../../includes/modal/ModalExit'

export default function CustomerForm(params) {
    const navigate = useNavigate();

    const navToOtpPage = () => {
        navigate('/DPW/otp')
    }

    const handleNewCustomerSubmit = () => {
        navToOtpPage();
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
                            <div id="alert-fname" class="alert-small-text"></div>
                            </div>
                            <div class="input-block">
                            <input id="input-lastname" type="text" name="last time" class="input-box input-fullwidth" placeholder="LAST NAME" />
                            <div id="alert-lname" class="alert-small-text"></div>
                            </div>
                            <div class="input-block">
                                <PhoneNumberInput dynamicClass={{parent: 'input-customer-block d-flex justify-content-center', child:'input-box input-phone-width required'}} />
                            {/* <input id="input-walknew-mobilenumber" type="tel"  class="input-box input-fullwidth required" name="mobile" pattern="[0-9]*" placeholder="" onClick="this.select();" required /> */}
                            <div id="alert-mobile" class="alert-small-text"></div>
                            </div>
                            <div class="input-block">
                            <input id="input-email" type="email" name="email" class="input-box input-fullwidth" placeholder="E-MAIL" required style={{textTransform: 'inherit'}} />
                            <div id="alert-email" class="alert-small-text"></div>
                            </div>
                            <div class="input-block">
                            <input id="input-companyName2" type="text" name="company" class="input-box input-fullwidth" placeholder="COMPANY NAME" />
                            <div id="alert-company2" class="alert-small-text"></div>
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
            {/* <div id="transparentmodal-exithome" class="transparent-bg flex-column w-100">
                <div class="modal-box d-flex flex-column justify-content-center align-items-center px-4 pt-2">
                    <div class="title-modal-white space-modal-title">Are you sure you want to cancel and start the process over again?</div>
                </div>
                <div class="modal-btns-box d-flex flex-column justify-content-around">
                    <button id="btn-yes-modal" class="button-wide button-outline-clr space-btnmodal-yes bortder-0">Yes</button>
                    <button id="btn-no-modal" class="button-wide button-outline-clr  space-btnmodal-no border-0">No</button>
                </div>
            </div> */}
        </div>
        

        
        
            // <div className='customer-form-container'>
            /* <div className="existingcustomer-box">
            <div className="title-black title-form">EXISTING CUSTOMER</div>
                <form>
                <div className="input-block">
                    <input id="input-companyName1" type="text" className="input-box input-fullwidth" placeholder="COMPANY NAME" />
                </div>
                </form>
            <div id="alert-norecords" className="alert-norecords-text m-anr">NO RECORDS FOUND</div>
            </div>
            <button id="" className="button-default space-btn-form-search">search &amp; continue</button>

            <div className="separate-line"></div>

            <div className="newcustomer-box">
                <div className="title-form">NEW CUSTOMER</div>
                <form id="form-newcustomer">
                    <div className="input-block2">
                    <div className="d-flex justify-content-between">
                        <div className="d-flex flex-column justify-content-center align-items-start">
                        <input id="input-firstname" type="text" name="first name" className="input-box input-halfwidth" placeholder="FIRST NAME" />
                        <div id="alert-fname" className="alert-small-text"></div>
                        </div>
                        <div className="d-flex flex-column justify-content-center align-items-start">
                        <input id="input-lastname" type="text" name="last time" className="input-box input-halfwidth" placeholder="LAST NAME" />
                        <div id="alert-lname" className="alert-small-text"></div>
                        </div>
                    </div>
                    </div>
                    <div className="input-block">
                    {/* <input id="input-mobileNumber" type="number" name="mobile" pattern="[0-9]*" className="input-box input-fullwidth" placeholder="MOBILE NUMBER" required /> */
                        /* <PhoneNumberInput />
                        <div id="alert-mobile" className="alert-small-text">INCORRECT MOBILE NUMBER</div>
                    </div>
                    <div className="input-block">
                    <input id="input-email" type="email" name="email" className="input-box input-fullwidth" placeholder="E-MAIL" required/>
                    <div id="alert-email" className="alert-small-text">INCORRECT EMAIL FORMAT</div>
                    </div>
                    <div className="input-block">
                    <input id="input-companyName2" type="text" name="company" className="input-box input-fullwidth" placeholder="COMPANY NAME" />
                    <div id="alert-company2" className="alert-small-text"></div>
                    </div>
                </form>
                <div id="alert-registration" className="alert-validation-text">all fields are required</div>
            </div>
            <button id="new_customer_proceed" onClick={navToOtpPage} className="button-default space-btn-form-proceed">PROCEED</button> */

        // </div>
    )
};
