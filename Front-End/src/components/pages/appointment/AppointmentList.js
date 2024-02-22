import React, { useState } from 'react'
import '../../includes/header/header.css'
import '../../includes/footer/footer.css'
import homeCircleImg from '../../../images/home-circle.svg'
import jafzaLogoColor from '../../../images/JAFZA_Logo_Color.svg'
import footerBGshape from '../../../images/footer-sky-bg.svg'
import "./appointment.css"
import '../../common.css';

import { useDispatch, useSelector } from 'react-redux'
import { isShowModal, setCustomer, setEmail, setLoading, setModal, setPhonenumber, setTicket } from '../../../reducers'
import { useNavigate } from 'react-router'
import ModalExit from '../../includes/modal/ModalExit'
import { calculateRemainingTime, checkArrivalTime, formatDate } from '../../../utils'
import axios from 'axios'
import { setSelectedAppointment } from '../../../reducers/appointments'
// import { appiontmentsList } from '../../../utils/constants'
import Text from '../../Text'
import Loading from '../../includes/loading/loading'
import Footer from '../../includes/footer/Footer'

export default function AppointmentList(params) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showAppStatusModal, setShowAppStatusModal] = useState(false);

    const doShowModal = useSelector(isShowModal);
    let {appointments} = useSelector((state) => state.appointments);
    const {customer,email,phoneNumber} = useSelector((state) => state.app);

    // appointments = appiontmentsList;//test only
    console.log('appointments',appointments);
    
    const modalAppProceedData = {
        titleText: showAppStatusModal.title,
        buttonOptions: [{
            text: <Text name="btnProceedWalkin" />,
            buttonAction: () => {
                setShowAppStatusModal(false)
                handleClickApp(showAppStatusModal.app, 'walkin')
            }
        },
        {
            text: <Text name="btnClose" />,
            buttonAction: () => {
                setShowAppStatusModal(false)
            }
        }]
    }
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
    async function handleClickApp(app,status) {

        try {
            const Selectedcustomer = app.customers[0]??[];
            dispatch(setEmail(Selectedcustomer.properties?.email??""));
            dispatch(setPhonenumber(Selectedcustomer.properties?.phoneNumber??""));
            dispatch(setCustomer(Selectedcustomer));
            
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
                    setShowAppStatusModal({title: <Text name="modalAppEarly" /> ,app})
                    // setShowAppStatusModal({title:'It is not time to check-in to your appointment yet',app})
                }else if(status === 'overdue'){
                    setShowAppStatusModal({title: <Text name="modalAppLate" />,app})
                    // setShowAppStatusModal({title:'You have missed your appointment',app})
                }
            }
        } catch (error) {
            console.log('error in finding service', error)
            navigate("/")
        }
    }
    async function createTicket(app) {
        try {
            dispatch(setLoading(true));

            var servicesIds = [];
            app.services.forEach(sr => {
                servicesIds.push(sr.id);
            });
            let custom3 = {
                firstName : customer.firstName??"",
                lastName : customer.lastName??"",
                phoneNum : customer.properties?.phoneNumber??"",
                email : customer.properties?.email??"",
                company : customer.properties?.company??""
            }
            console.log(custom3);
            let createTicketBody = {
                    appointmentId : app.id,
                    parameters : {
                        custom3 : JSON.stringify(custom3),
                        phoneNumber: custom3.phoneNum,
                        email : email,
                        level : "VIP LEVEL 0",
                    },
                    customers: [customer.id]
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
                dispatch(setLoading(false));
                
                return navigate('/DPW/ticket');

        } catch (error) {
            console.log('error in eticket create', error);
            throw error;
        }
    }

    var {branchPrefix} = useSelector((state) => state.app)
    // const branchName = "JAFZA LOB 14"
    
    return (
        <>
       
        <div className="d-flex flex-column justify-content-center align-items-center bg-white">
            <div className="header-section">
                <img id="header-home-btn" onClick={showModel} src={homeCircleImg} alt="home circle img" className="header-homecircle-img" />
                <img  srcset={jafzaLogoColor} className="header-img-bg" alt="jafza logo" />
            </div>
            <div id="page" className="page-layout d-flex justify-content-center">
                
                <div className="title-box d-flex flex-column justify-content-center align-items-center">
                    <div className="title-applist mx=4"><Text name="titleSelectApp" /></div>
                    <span className='mini-gray-apptext'><Text name="noteAppCheckin" /></span>
                    {/* <div className='result-title'><Text name="noteShowResults" realign />{branchName}</div> */}
                    <div className='result-title'><Text name={branchPrefix!='LOB14' ? "noteShowResultsSales" : "noteShowResultsServices"} realign /></div>
                    <div className="ticket-applist-box col-12 text-center d-flex flex-column align-items-center">
                        {
                            appointments  ? appointments.map(appointment =>  (
                                <div id="app-item-1" class={"row applist-item "+checkArrivalTime(appointment.startTime)} onClick={()=>handleClickApp(appointment,checkArrivalTime(appointment.startTime))}>
                                    <div class="applist-item-inner flex-column">
                                        
                                        <div class="row text-white">
                                            <div class="column-r1c1 d-flex flex-column">
                                                    <div id="app-branchname" class="applist-branchname">{appointment.branch?.name??""}</div>
                                            </div>
                                            <div class="column-r1c2 d-flex flex-column">
                                                    <div id="app-date" class="applist-date">{formatDate(appointment.startTime)}</div>
                                            </div>
                                            <div class="column-3 d-flex flex-column">
                                                    <div id="app-elapsed" class="applist-elapsetime">{calculateRemainingTime(appointment.startTime)}</div>
                                            </div>
                                        </div>
                                        <div class="row text-white">
                                            <div class="column-x2 d-flex">
                                                <div id="app-servicename" class="applist-servicename">
                                                    { appointment.services.map(service =>  (
                                                            <div>
                                                            {service.name}
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            <div class="column-3 d-flex flex-column">
                                                <div class="clm-box">
                                                    <div id="app-status" class="applist-status">{checkArrivalTime(appointment.startTime)}</div>
                                                </div>
                                            </div>
                                        </div>
                                        
{/* end */}
                                    </div>
                                </div>
        
                            ))
                            : 
                            <></>
                        }
                        
                    </div>
                </div>
            </div>
            < Footer />

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
// 
{/* <div class="column-1 d-flex flex-column">
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
        </div>
    </div>
    <div class="column-3 d-flex flex-column">
        <div class="clm-box">
            <div id="app-elapsed" class="applist-elapsetime">{calculateRemainingTime(appointment.startTime)}</div>
            <div id="app-status" class="applist-status">{checkArrivalTime(appointment.startTime)}</div>
        </div>
    </div> */}