import React from 'react';
import '../includes/header/header.css'
import '../includes/footer/footer.css'
import jafzaLogoColor from '../../images/JAFZA_Logo_Color.svg'
import footerBGshape from '../../images/footer-sky-bg.svg'
// import shakehand from '../../images/shake-hand-svgrepo-com.svg'
import '../common.css';

export default function Thankyou() {

    // const branch = JSON.parse(getSessionValue('br_name','{}'));

    return (
        <div class="d-flex flex-column justify-content-center align-items-center bg-white">
            <div class="header-section">
                <img  srcset={jafzaLogoColor} class="header-img-bg" alt="jafza logo" />
            </div>
            <div id="page" className="page-layout d-flex flex-column justify-content-start align-items-center">
                <div class="title-box d-flex flex-column justify-content-center align-items-center">
                    {/* <div className='img-shakehand-box'><img srcset={shakehand} className='img-thankyou' alt="shake hand thank you"/></div> */}
                    
                </div>
            </div>
            <div class="footer-section">
                <img id="footer-img-bg"  src={footerBGshape} class="footer-img-icon" alt="background shape" />
            </div>
        </div>
    )   
}