import React from 'react'
import '../../includes/header/header.css'
import '../../includes/footer/footer.css'
import homeCircleImg from '../../../images/home-circle.svg'
import jafzaLogoColor from '../../../images/JAFZA_Logo_Color.svg'
import footerBGshape from '../../../images/footer-sky-bg.svg'
import "./appointment.css"
import '../../common.css';

import { useDispatch, useSelector } from 'react-redux'
import { isShowModal, setModal } from '../../../reducers'
import { useNavigate } from 'react-router'
import ModalExit from '../../includes/modal/ModalExit'
import { calculateRemainingTime, checkArrivalTime, formatDate } from '../../../utils'

export default function AppointmentList(params) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const doShowModal = useSelector(isShowModal);
    const {appointments} = useSelector((state) => state.appointments);
    console.log('appointments',appointments);
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
    const handleClickApp = (app,status) => {
        console.log(app,status);
    }
    
    return (
        <>
        <div class="d-flex flex-column justify-content-center align-items-center bg-white">
            <div class="header-section">
                <img id="header-home-btn" onClick={showModel} src={homeCircleImg} alt="home circle img" class="header-homecircle-img" />
                <img  srcset={jafzaLogoColor} class="header-img-bg" alt="jafza logo" />
            </div>
            <div id="page" className="page-layout d-flex justify-content-center">
                
                <div class="title-box d-flex flex-column justify-content-center align-items-center">
                    <div class="title-applist mx=4">please select your confirmed face-to-face appointment to check-in.</div>
                    <span className='mini-gray-apptext'>You can check-in from 20 minutes before the time of the appointment</span>
                    <div className='result-title'>showing results for jafza lob 14</div>
                    <div className="ticket-applist-box col-12 text-center">
                        {
                            appointments  ? appointments.map(appointment =>  (
        
                                <button onClick={()=> handleClickApp(appointment,checkArrivalTime(appointment.startTime))}>
                                Jafza lob 14 {formatDate(appointment.startTime)} {calculateRemainingTime(appointment.startTime)} <br/>
                                { appointment.services.map(service =>  (
        
                                        <div>
                                        {service.name}
                                        </div>
                                    ))
                                }
                                </button>
                            ))
                            : 
                            <></>
                        }
                        
                    </div>
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
        </>
    )
};
