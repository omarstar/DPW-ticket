import React from 'react'
import Footer from '../../includes/footer/Footer'
import Text from '../../Text'
import jafzaLogoColor from '../../../images/JAFZA_Logo_Color.svg'
import { useSelector } from 'react-redux';
import { getSelectedAppointment } from '../../../reducers/appointments';
import { current } from '@reduxjs/toolkit';


export default function VirtualSummary(params) {
    
    const selectedApp = useSelector(getSelectedAppointment)?? {};
    console.log('selectedApp', selectedApp);

    var appointmentEarlyTime = 15 //min
    var appointmentLateTime = 30 //min

    function handleProceedJoinMeetingApp () {
        console.log('clicked join meeting')
    }

    function checkAppointmentStatus(appointmentDateTime) {
        var currentDate = new Date().setHours(0, 0, 0, 0); 

        var appointmentDate = new Date(appointmentDateTime);
        appointmentDate.setHours(0, 0, 0, 0); 

        if (appointmentDate.getTime() > currentDate) {
            return "futureDay";
        } else if (appointmentDate.getTime() < currentDate) {
            return "previousDay";
        } else {
            return "Today";
        }
    }

    function checkAppointmentTime(appointmentTime, currentDate) {
        
        const appointmentDate = new Date(appointmentTime);

        const currentTime = currentDate;

        const timeDiff = (appointmentDate - currentTime) / (1000 * 60);

        if (timeDiff >= appointmentEarlyTime) {
            return "Early";
        } else if (timeDiff <= -appointmentLateTime) {
            return "Late";
        } else {
            return true;
        }
    }

    const currentDate = new Date();
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const appDate = new Date(selectedApp.start).toLocaleString(undefined, options);
    const onAppTime = checkAppointmentTime(selectedApp.start)

    const returnMeetingStatus = () => {
        return checkAppointmentStatus(selectedApp.start,currentDate) == "futureDay" ? (
            <div className='virtualnote-text'><Text ff="ff-medium" name="meetingOtherDay"/></div>
        ) : checkAppointmentStatus(selectedApp.start,currentDate) == "previousDay" ? (
            <div className='virtualnote-text'><Text ff="ff-medium" name="meetingLate"/></div>
        ) : onAppTime == "Early" ? (
            <div className='virtualnote-text'><Text ff="ff-medium" name="meetingEarly"/></div>
        ) : onAppTime == "Late"? (
            <div className='virtualnote-text'><Text ff="ff-medium" name="meetingLate"/></div>
        ) : (
            <button id="btn-otp-submit" onClick={handleProceedJoinMeetingApp} className="space-proceed-appsummary"><Text name="joinMeeting" /></button>
        )
    }

    return(
        <div className="d-flex flex-column justify-content-center align-items-center bg-white">
            <div className="header-section">
                <img  src={jafzaLogoColor} className="header-img-bg" alt="jafza logo" />
            </div>
            <div id="page" className="page-layout d-flex flex-column justify-content-start align-items-center">
                <div className="title-box d-flex flex-column justify-content-center align-items-center">
                    <div className="title-black ff-bold"><Text name="titleVirtualSummary" /></div>
                    <div className="appsummary-box col-12 text-center d-flex flex-column align-items-center">
                        <div className="row summary-container">
                            <div className="labels">
                            <div className="column">
                                <div className="label-box">
                                    <div className="label-name "><Text name="txtName" /></div>
                                    <div className="label-dots">:</div>
                                    <div id="name-val" className="label-value">{selectedApp.customers[0]?.firstName + " " + selectedApp.customers[0]?.lastName}</div>
                                {/* <div id="name-val" className="label-value">John Doe</div> */}
                                </div>
                                <div className="label-box">
                                <div className="label-name"><Text name="txtMobile" /></div>
                                <div className="label-dots">:</div>
                                <div id="mobile-val" class="label-value">{selectedApp.customers[0]?.phone ?? 'N/A'}</div>
                                {/* <div id="mobile-val" className="label-value">+971 55 123 1234</div> */}
                                </div>
                                <div className="label-box">
                                <div className="label-name"><Text name="txtEmail" /></div>
                                <div className="label-dots">:</div>
                                <div id="email-val" className="label-value">{selectedApp.customers[0]?.email ?? 'N/A'}</div>
                                {/* <div id="email-val" className="label-value">John.doe@office365.com</div> */}
                                </div>
                                <div className="label-box">
                                <div className="label-name"><Text name="txtCompany" /></div>
                                <div className="label-dots">:</div>
                                <div id="company-val" className="label-value">{selectedApp.customers[0]?.company ?? 'N/A'}</div>
                                {/* <div id="company-val" className="label-value">XYZ Middle East Fze</div> */}
                                </div>
                                <div className="label-box">
                                <div className="label-name"><Text name="txtBranch" /></div>
                                <div className="label-dots">:</div>
                                <div id="service-branch-val" className="label-value">{selectedApp.branch['name']}</div>
                                {/* <div id="service-branch-val" className="label-value">Admin services</div> */}
                                </div>
                                <div className="label-box">
                                <div className="label-name"><Text name="txtService" /></div>
                                <div className="label-dots">:</div>
                                <div id="service-service-val" className="label-value">{selectedApp.services[0]?.name ?? 'N/A'}</div>
                                {/* <div id="service-service-val" className="label-value">Admin services - employee affairs</div> */}
                                </div>
                                <div className="label-box">
                                <div className="label-name"><Text name="txtAppDatetime" /></div>
                                <div className="label-dots">:</div>
                                <div id="selectedApp-datetime-val" className="label-value">{appDate}</div>
                                {/* <div id="appointment-datetime-val" className="label-value">16/1/2024, 12:30 PM</div> */}
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    {/* will have conditions to show button or alert */}
                    {
                        returnMeetingStatus()
                    }
                </div>
            </div>
            < Footer />
        </div>
    )
};
