import React from 'react'
import '../includes/header/header.css'
import '../includes/footer/footer.css'
import homeCircleImg from '../../images/home-circle.svg'
import jafzaLogoColor from '../../images/JAFZA_Logo_Color.svg'
import footerBGshape from '../../images/footer-sky-bg.svg'
import '../common.css';
import '../../styles/options.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { isShowModal, setModal } from '../../reducers'
import ModalExit from '../includes/modal/ModalExit'

export default function OptionsPage(params) {

    const navigate = useNavigate();

    

    console.log('options page')

    const goToWalkinCustomer = () => {
        navigate('/DPW/customer')
    }
    const goToAppointmentMobile = () => {
        navigate('/DPW/mobile')
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
        <>
        <div class="d-flex flex-column justify-content-center align-items-center bg-white">
            <div class="header-section">
                <img id="header-home-btn" onClick={showModel}  src={homeCircleImg} alt="home circle img" class="header-homecircle-img" />
                <img  srcset={jafzaLogoColor} class="header-img-bg" alt="jafza logo" />
            </div>
            <div id="page" className="page-layout d-flex justify-content-center">
                <div class="title-center-box d-flex flex-column justify-content-center align-items-center">
                    <div class="title-black">Please select an option</div>
                    <button id="btn-appointment-flow" onClick={goToAppointmentMobile} class="button-wide button-fill-clr space-btn1">Check-in appointment</button>
                    <button id="btn-walkin-flow" onClick={goToWalkinCustomer} class="button-wide button-fill-clr space-btn2">Walk-in</button>
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
        </>
    )
};
