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
import { isShowModal, setFlow, setModal } from '../../reducers'
import ModalExit from '../includes/modal/ModalExit'

export default function OptionsPage(params) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const doShowModal = useSelector(isShowModal);
    const appState = useSelector((state)=>state.app);
    

    const goToWalkinCustomer = () => {
        dispatch(setFlow('walkin'));
        if(appState.branchPrefix === "LOB14"){
            navigate('/DPW/walkin-mobile')
        }else{
            navigate('/DPW/customer')
        }
    }
    const goToAppointmentMobile = () => {
        dispatch(setFlow('app'));
        navigate('/DPW/mobile')
    }

    

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
        <div className="d-flex flex-column justify-content-center align-items-center bg-white">
            <div className="header-section">
                <img id="header-home-btn" onClick={showModel}  src={homeCircleImg} alt="home circle img" className="header-homecircle-img" />
                <img  srcset={jafzaLogoColor} className="header-img-bg" alt="jafza logo" />
            </div>
            <div id="page" className="page-layout d-flex justify-content-center align-items-center">
                <div className="title-center-box d-flex flex-column justify-content-center align-items-center">
                    <div className="title-black ff-bold">Please select an option</div>
                    <button id="btn-appointment-flow" onClick={goToAppointmentMobile} className="button-wide button-fill-clr space-btn1">Check-in appointment</button>
                    <button id="btn-walkin-flow" onClick={goToWalkinCustomer} className="button-wide button-fill-clr space-btn2">Walk-in</button>
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
            {/* <div id="transparentmodal-exithome" className="transparent-bg flex-column w-100">
                <div className="modal-box d-flex flex-column justify-content-center align-items-center px-4 pt-2">
                    <div className="title-modal-white space-modal-title">Are you sure you want to cancel and start the process over again?</div>
                </div>
                <div className="modal-btns-box d-flex flex-column justify-content-around">
                    <button id="btn-yes-modal" className="button-wide button-outline-clr space-btnmodal-yes bortder-0">Yes</button>
                    <button id="btn-no-modal" className="button-wide button-outline-clr  space-btnmodal-no border-0">No</button>
                </div>
            </div> */}
        </div>
        </>
    )
};
