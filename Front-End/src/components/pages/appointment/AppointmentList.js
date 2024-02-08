import React, { useState } from 'react'
import '../../includes/header/header.css'
import '../../includes/footer/footer.css'
import homeCircleImg from '../../../images/home-circle.svg'
import jafzaLogoColor from '../../../images/JAFZA_Logo_Color.svg'
import footerBGshape from '../../../images/footer-sky-bg.svg'
import "./appointment.css"
import '../../common.css';

import { useDispatch, useSelector } from 'react-redux'
import { isShowModal, setModal, setTicket } from '../../../reducers'
import { useNavigate } from 'react-router'
import ModalExit from '../../includes/modal/ModalExit'
import { calculateRemainingTime, checkArrivalTime, formatDate } from '../../../utils'
import axios from 'axios'
import { setSelectedAppointment } from '../../../reducers/appointments'

export default function AppointmentList(params) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showAppStatusModal, setShowAppStatusModal] = useState(false);

    const doShowModal = useSelector(isShowModal);
    const {appointments} = useSelector((state) => state.appointments);
    console.log('appointments',appointments);
    
    const modalAppProceedData = {
        titleText: showAppStatusModal.title,
        buttonOptions: [{
            text: "Proceed as walk-in",
            buttonAction: () => {
                setShowAppStatusModal(false)
                handleClickApp(showAppStatusModal.app, 'walkin')
            }
        },
        {
            text: "Close",
            buttonAction: () => {
                setShowAppStatusModal(false)
            }
        }]
    }
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
    async function handleClickApp(app,status) {
        try {
            if(status==='open'){
                //navto booking summary selected app
                dispatch(setSelectedAppointment(app));
                navigate('/DPW/summary')
                // await checkInAppt(app)
            }else if(status === 'walkin'){
                await createTicket(app)
            }else{
                // await createTicket(app);
                if(status === 'remaining'){
                    setShowAppStatusModal({title:'It is not time to check-in to your appointment yet',app})
                }else if(status === 'overdue'){
                    setShowAppStatusModal({title:'You have missed your appointment.',app})
                }
            }
        } catch (error) {
            console.log('error in finding service', error)
            navigate("/")
        }
    }
    async function checkInAppt(app) {
        try {
            var servicesIds = [];
            app.services.forEach(sr => {
                servicesIds.push(sr.id);
            });
            let createTicketBody = {
                    services : servicesIds,
                    parameters : {
                        custom1 : "1"
                    }
            }
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url:  process.env.REACT_APP_API_URL + '/rest/mobile/appointment/checkin?branchId='+app.branchId+'&appointmentId='+app.id,
                data : createTicketBody
    
                };
                let visit =  await axios.request(config)
                console.log('visit.data', visit.data)
                dispatch(setTicket(JSON.stringify(visit.data)))
                
                return navigate('/DPW/ticket');

        } catch (error) {
            console.log('error in eticket create', error);
            throw error;
        }
    }
    async function createTicket(app) {
        try {
            var servicesIds = [];
            app.services.forEach(sr => {
                servicesIds.push(sr.id);
            });
            let createTicketBody = {
                    services : servicesIds,
                    parameters : {
                        custom1 : "1"
                    }
            }
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url:  process.env.REACT_APP_API_URL + '/rest/mobile/visit/create',
                data : createTicketBody
    
                };
                let visit =  await axios.request(config)
                console.log('visit.data', visit.data)
                dispatch(setTicket(JSON.stringify(visit.data)))
                
                return navigate('/DPW/ticket');

        } catch (error) {
            console.log('error in eticket create', error);
            throw error;
        }
    }
    
    return (
        <>
        <div className="d-flex flex-column justify-content-center align-items-center bg-white">
            <div className="header-section">
                <img id="header-home-btn" onClick={showModel} src={homeCircleImg} alt="home circle img" className="header-homecircle-img" />
                <img  srcset={jafzaLogoColor} className="header-img-bg" alt="jafza logo" />
            </div>
            <div id="page" className="page-layout d-flex justify-content-center">
                
                <div className="title-box d-flex flex-column justify-content-center align-items-center">
                    <div className="title-applist mx=4">please select your confirmed face-to-face appointment to check-in.</div>
                    <span className='mini-gray-apptext'>You can check-in from 20 minutes before the time of the appointment</span>
                    <div className='result-title'>showing results for jafza lob 14</div>
                    <div className="ticket-applist-box col-12 text-center d-flex flex-column align-items-center">
                        {
                            appointments  ? appointments.map(appointment =>  (
                                <div id="app-item-1" class={"row applist-item "+checkArrivalTime(appointment.startTime)} onClick={()=>handleClickApp(appointment,checkArrivalTime(appointment.startTime))}>
                                    <div class="applist-item-inner">
                                        <div class="column-1 d-flex flex-column">
                                            <div class="clm-box">
                                                <div id="app-branchname" class="applist-branchname">{appointment.branch?.name??""}</div>
                                                    <div id="app-servicename" class="applist-servicename">
                                                        { appointment.services.map(service =>  (
                                                                <div>
                                                                {service.name}
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                            </div>
                                        </div>
                                        <div class="column-2 d-flex flex-column">
                                            <div class="clm-box">
                                                <div id="app-date" class="applist-date">{formatDate(appointment.startTime)}</div>
                                                {/* <div id="app-time" class="applist-time">08:20 AM</div> */}
                                            </div>
                                        </div>
                                        <div class="column-3 d-flex flex-column">
                                            <div class="clm-box">
                                                <div id="app-elapsed" class="applist-elapsetime">{calculateRemainingTime(appointment.startTime)}</div>
                                                <div id="app-status" class="applist-status">{checkArrivalTime(appointment.startTime)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
        
                            ))
                            : 
                            <></>
                        }
                        
                    </div>
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
           {
                showAppStatusModal && (
                    <ModalExit data={modalAppProceedData} />
                )
            }
        </div>
        </>
    )
};
