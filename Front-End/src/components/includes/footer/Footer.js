import React from 'react'
import "./footer.css"
import footerBGshape from '../../../images/footer-sky-bg.svg'
import Text from '../../Text'


export default function Footer() {    

    return (
        <div className="footer-section">
            <p className="footer-text-connectWorld"><Text name="textConnectWorldOpportunities" /></p>
            <img id="footer-img-bg"  src={footerBGshape} className="footer-img-icon" alt="background shape" />
        </div>
    )
};
