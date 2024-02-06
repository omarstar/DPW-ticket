import React from 'react'
import { useMatch } from 'react-router-dom'
import "./footer.css"

export default function Footer(params) {
    const isHomeChild = useMatch('/')
    console.log('isHomeChild', isHomeChild)

    return (
        <div className="footer-blue-section">
            <div className="footer-container">
                <svg width="334" height="88" viewBox="0 0 334 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.05176e-05 0L183.375 23.5071L334 44.4929L323.097 88H0L3.05176e-05 0Z" fill="#005EB8"/>
                </svg>
                {/* { !isHomeChild && (
                    <img id="header-home-btn" classNameName="footer-img-icon" src={footerHomeIcon} alt="footer bg image"/>
                )} */}
            </div>
        </div>
    )
};
