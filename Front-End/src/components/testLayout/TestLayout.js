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

export default function TestLayout(params) {

    const navigate = useNavigate();
    
    let {loading, ticket} = useSelector((state) => state.app);
    console.log('ticket', ticket)
    ticket = {currentStatus:"CALLED",position:4,id: "A0123", currentServiceName: "servccc plapla"}//test

    return (
        <div class="d-flex flex-column justify-content-center align-items-center bg-white">
            <div class="header-section">
                <img  srcset={jafzaLogoColor} class="header-img-bg" alt="jafza logo" />
            </div>
            <div id="page" className="page-layout d-flex flex-column justify-content-start align-items-center">
                <div class="title-box d-flex flex-column justify-content-center align-items-center">
                    <Queue ticket={ticket} branch='4' />
                </div>
            </div>
            <div class="footer-section">
                <img id="footer-img-bg"  src={footerBGshape} class="footer-img-icon" alt="background shape" />
            </div>
        </div>
    )

};


