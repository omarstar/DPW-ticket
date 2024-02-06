import React from 'react'
import '../includes/header/header.css'
import '../includes/footer/footer.css'
import homeCircleImg from '../../images/home-circle.svg'
import jafzaLogoColor from '../../images/JAFZA_Logo_Color.svg'
import footerBGshape from '../../images/footer-sky-bg.svg'
import '../common.css';
import '../../styles/options.css'
import Loading from '../includes/loading/loading'
import Queue from '../pages/Queue'
import Turn from '../pages/Turn'
import { useSelector } from 'react-redux'
import Line2 from '../includes/line/line2'
import { useNavigate } from 'react-router'
import '../../styles/appointmentitem.css'

export default function TestLayout(params) {

    const navigate = useNavigate();
    
    let {loading, ticket} = useSelector((state) => state.app);
    console.log('ticket', ticket)
    ticket = {currentStatus:"CALLED",position:4,id: "A0123", currentServiceName: "servccc plapla"}//test

    return (
        <div className="d-flex flex-column justify-content-center align-items-center bg-white">
            <div className="header-section">
                <img  srcset={jafzaLogoColor} className="header-img-bg" alt="jafza logo" />
            </div>
            <div id="page" className="page-layout d-flex flex-column justify-content-start align-items-center">
                <div className="title-box d-flex flex-column justify-content-center align-items-center">
                    <div className="title-applist mx=4">please select your confirmed face-to-face appointment to check-in.</div>
                    <span className='mini-gray-apptext'>You can check-in from 20 minutes before the time of the appointment</span>
                    <div className='result-title'>showing results for jafza lob 14</div>
                    <div className="ticket-applist-box col-12 text-center">
                    <div id="app-item-1" class="row applist-item">
                        <div class="applist-item-inner">
                            <div class="column-1 d-flex flex-column">
                            <div class="clm-box">
                                <div id="app-branchname" class="applist-branchname">jafza lob 14</div>
                                <div id="app-servicename" class="applist-servicename">admin services - employee affairs</div>
                            </div>
                            </div>
                            <div class="column-2 d-flex flex-column">
                            <div class="clm-box">
                                <div id="app-date" class="applist-date">Thu, 16 Jan 2024</div>
                                <div id="app-time" class="applist-time">08:20 AM</div>
                            </div>
                            </div>
                            <div class="column-3 d-flex flex-column">
                            <div class="clm-box">
                                <div id="app-elapsed" class="applist-elapsetime">(1 hr : 24 min)</div>
                                <div id="app-status" class="applist-status">open</div>
                            </div>
                            </div>
                        </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="footer-section">
                <img id="footer-img-bg"  src={footerBGshape} className="footer-img-icon" alt="background shape" />
            </div>
        </div>
    )

};


