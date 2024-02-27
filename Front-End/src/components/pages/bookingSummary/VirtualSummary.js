import React from 'react'
import Footer from '../../includes/footer/Footer'
import Text from '../../Text'
import jafzaLogoColor from '../../../images/JAFZA_Logo_Color.svg'


export default function VirtualSummary(params) {
    
    function handleProceedJoinMeetingApp () {
        console.log('clicked join meeting')
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
                                    {/* <div id="name-val" className="label-value">{selectedApp.customers[0]?.firstName + " " + selectedApp.customers[0]?.lastName}</div> */}
                                <div id="name-val" className="label-value">John Doe</div>
                                </div>
                                <div className="label-box">
                                <div className="label-name"><Text name="txtMobile" /></div>
                                <div className="label-dots">:</div>
                                {/* <div id="mobile-val" className="label-value">{selectedApp.customers[0]?.properties?.phoneNumber ?? 'N/A'}</div> */}
                                <div id="mobile-val" className="label-value">+971 55 123 1234</div>
                                </div>
                                <div className="label-box">
                                <div className="label-name"><Text name="txtEmail" /></div>
                                <div className="label-dots">:</div>
                                {/* <div id="email-val" className="label-value">{selectedApp.customers[0]?.properties?.email ?? 'N/A'}</div> */}
                                <div id="email-val" className="label-value">John.doe@office365.com</div>
                                </div>
                                <div className="label-box">
                                <div className="label-name"><Text name="txtCompany" /></div>
                                <div className="label-dots">:</div>
                                {/* <div id="company-val" className="label-value">{selectedApp.customers[0]?.properties?.company ?? 'N/A'}</div> */}
                                <div id="company-val" className="label-value">XYZ Middle East Fze</div>
                                </div>
                                <div className="label-box">
                                <div className="label-name"><Text name="txtBranch" /></div>
                                <div className="label-dots">:</div>
                                {/* <div id="service-branch-val" className="label-value">{selectedApp.branch['name']}</div> */}
                                <div id="service-branch-val" className="label-value">Admin services</div>
                                </div>
                                <div className="label-box">
                                <div className="label-name"><Text name="txtService" /></div>
                                <div className="label-dots">:</div>
                                {/* <div id="service-service-val" className="label-value">{selectedApp.services[0]?.name ?? 'N/A'}</div> */}
                                <div id="service-service-val" className="label-value">Admin services - employee affairs</div>
                                </div>
                                <div className="label-box">
                                <div className="label-name"><Text name="txtAppDatetime" /></div>
                                <div className="label-dots">:</div>
                                {/* <div id="selectedApp-datetime-val" className="label-value">{new Date(selectedApp.startTime).toLocaleString()}</div> */}
                                <div id="appointment-datetime-val" className="label-value">16/1/2024, 12:30 PM</div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    {/* will have conditions to show button or alert */}
                    <button id="btn-otp-submit" onClick={handleProceedJoinMeetingApp} className="space-proceed-appsummary"><Text name="joinMeeting" /></button>
                </div>
            </div>
            < Footer />
        </div>
    )
};
