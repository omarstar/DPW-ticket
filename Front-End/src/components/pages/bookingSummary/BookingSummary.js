import React from 'react'
import '../../includes/header/header.css'
import '../../includes/footer/footer.css'
import homeCircleImg from '../../../images/home-circle.svg'
import jafzaLogoColor from '../../../images/JAFZA_Logo_Color.svg'
import footerBGshape from '../../../images/footer-sky-bg.svg'
import '../../common.css';
import '../../../styles/bookingSummary.css'

import { useDispatch, useSelector } from 'react-redux'
import { isShowModal, setModal, setTicket } from '../../../reducers'
import { useNavigate } from 'react-router-dom'
import ModalExit from '../../includes/modal/ModalExit'
import axios from 'axios'
import { getSelectedAppointment } from '../../../reducers/appointments'

export default function BookingSummary(params) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    // checkin app
    const selectedApp = useSelector(getSelectedAppointment)?? {};
    console.log('selectedApp', selectedApp);
    console.log('selectedApp name', selectedApp.branch['name']);


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

    function handleProceedCheckinApp () {
        console.log('clicked app confirm')
        checkInAppt(selectedApp);
    }

    
    return(
        <div className="d-flex flex-column justify-content-center align-items-center bg-white">
            <div className="header-section">
                <img id="header-home-btn" onClick={showModel} src={homeCircleImg} alt="home circle img" className="header-homecircle-img" />
                <img  srcset={jafzaLogoColor} className="header-img-bg" alt="jafza logo" />
            </div>
            <div id="page" className="page-layout d-flex flex-column justify-content-start align-items-center">
                <div className="title-box d-flex flex-column justify-content-center align-items-center">
                    <div className="title-black ff-bold">Your appointment summary</div>
                    <div class="appsummary-box col-12 text-center d-flex flex-column align-items-center">
                        <div class="row summary-container">
                            <div class="labels">
                            <div class="column">
                                <div class="label-box">
                                <div class="label-name ">name</div>
                                <div class="label-dots">:</div>
                                <div id="name-val" class="label-value">{selectedApp.customers[0]?.firstName + " " + selectedApp.customers[0]?.lastName}</div>
                                {/* <div id="name-val" class="label-value">John Doe</div> */}
                                </div>
                                <div class="label-box">
                                <div class="label-name">Mobile</div>
                                <div class="label-dots">:</div>
                                <div id="mobile-val" class="label-value">{selectedApp.customers[0]?.properties?.phoneNumber ?? 'N/A'}</div>
                                {/* <div id="mobile-val" class="label-value">+971 55 123 1234</div> */}
                                </div>
                                <div class="label-box">
                                <div class="label-name">E-Mail</div>
                                <div class="label-dots">:</div>
                                <div id="email-val" class="label-value">{selectedApp.customers[0]?.properties?.email ?? 'N/A'}</div>
                                {/* <div id="email-val" class="label-value">John.doe@office365.com</div> */}
                                </div>
                                <div class="label-box">
                                <div class="label-name">Company</div>
                                <div class="label-dots">:</div>
                                <div id="company-val" class="label-value">{selectedApp.customers[0]?.properties?.company ?? 'N/A'}</div>
                                {/* <div id="company-val" class="label-value">XYZ Middle East Fze</div> */}
                                </div>
                                <div class="label-box">
                                <div class="label-name">Branch name</div>
                                <div class="label-dots">:</div>
                                <div id="service-branch-val" class="label-value">{selectedApp.branch['name']}</div>
                                {/* <div id="service-branch-val" class="label-value">Admin services</div> */}
                                </div>
                                <div class="label-box">
                                <div class="label-name">Service name</div>
                                <div class="label-dots">:</div>
                                <div id="service-service-val" class="label-value">{selectedApp.services[0]?.name ?? 'N/A'}</div>
                                {/* <div id="service-service-val" class="label-value">Admin services - employee affairs</div> */}
                                </div>
                                <div class="label-box">
                                <div class="label-name">Appointment date / time</div>
                                <div class="label-dots">:</div>
                                <div id="selectedApp-datetime-val" class="label-value">{new Date(selectedApp.startTime).toLocaleString()}</div>
                                {/* <div id="appointment-datetime-val" class="label-value">16/1/2024, 12:30 PM</div> */}
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <button id="btn-otp-submit" onClick={handleProceedCheckinApp} className="space-proceed-appsummary">Confirm &amp; Proceed</button>
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
};
