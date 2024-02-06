import React from 'react'
import './header.css'

import jafzaLogoBlack from '../../../images/JAFZA_Logo_Color.svg'


export default function Header() {
    return (
        <header className='h-15'>
            <div className="header">
                {/* <div className="header-container">
                    <svg className="header-img-bg" width="360" height="131" viewBox="0 0 915 313" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M119.62 0H490.578H915V313L0 160.565L119.62 0Z" fill="#005EB8"/>
                    </svg>
                    <button id="btn-lang-text" className="button-lang"><span id="btn-lang-content" className='button-lang-content'>EN</span></button>
                </div> */}
                <div className="d-flex justify-content-between align-items-center">
                    <div className="homeback-icon-box">
                    <button id="btn-lang-text" className="button-lang button-fill"><span id="btn-lang-content" className='button-lang-content'>عربي</span></button>
                    </div>
                    <div className="logo-black-icon">
                    <img className="jafza-logo-small" src={jafzaLogoBlack} alt="DP WORLD JAFZA logo"/>
                    </div>
                </div>
            </div>
        </header>
    )
}