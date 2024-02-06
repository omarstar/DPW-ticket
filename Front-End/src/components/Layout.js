import React from 'react'
// import Header from './includes/header/Header';
// import Footer from './includes/footer/Footer';
import './includes/header/header.css'
import './includes/footer/footer.css'
import homeCircleImg from '../images/home-circle.svg'
import jafzaLogoColor from '../images/JAFZA_Logo_Color.svg'
import footerBGshape from '../images/footer-sky-bg.svg'
import './common.css'

export default function Layout({ children }) {
    return (
        <React.Fragment>
            {/* <div className=""> */}
                {/* <Header /> */}
                <div className="d-flex flex-column justify-content-center align-items-center bg-white">
                    <div className="header-section">
                        <img id="header-home-btn"  src={homeCircleImg} alt="" className="header-homecircle-img" />
                        <img  srcset={jafzaLogoColor} className="header-img-bg" alt="jafza logo" />
                    </div>
                    <div id="page" className="page-layout d-flex justify-content-center">
                        {children}
                    </div>
                    <div className="footer-section">
                        <img id="footer-img-bg"  src={footerBGshape} className="footer-img-icon" alt="background shape" />
                    </div>
                    <div id="transparentmodal-exithome" className="transparent-bg flex-column w-100">
                        <div className="modal-box d-flex flex-column justify-content-evenly align-items-center px-4 pt-2">
                            <div className="title-modal-white space-modal-title">Are you sure you want to cancel and start the process over again?</div>
                        </div>
                        <div className="modal-btns-box d-flex flex-column justify-content-around">
                            <button id="btn-yes-modal" className="button-wide button-outline-clr space-btnmodal-yes">Yes</button>
                            <button id="btn-no-modal" className="button-wide button-outline-clr  space-btnmodal-no">No</button>
                            <button id="btn-proceed-modal" className="button-wide button-outline-clr  space-btnmodal-proceed">Proceed on your mobile</button>
                        </div>
                    </div>
                </div>
                {/* <Footer /> */}
  
            {/* </div> */}
        </React.Fragment>
    )
}