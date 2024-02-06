import { useNavigate } from "react-router-dom";
import headerLogoWhite from '../../images/JAFZA_Logo_White.svg'
import footerBGshape from '../../images/footer-sky-bg.svg'
import '../../styles/getStarted.css'
import { useDispatch, useSelector } from "react-redux";
import { selectLanguage, toggleCurrentLang } from "../../reducers";
import { useState } from "react";

const Welcome = () => {

    const buttonstartText = "Get started"
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentLanguage = useSelector(selectLanguage);
    console.log('currentLanguage', currentLanguage)
    
    

    const [lang, setLang] = useState(currentLanguage)
    
    let buttonLangText = lang === 'ar' ? 'عربي' : "English"
    // let buttonLangText = lang === 'ar' ? 'عربي' : "English"

    const toggleLang = () => {
        dispatch(toggleCurrentLang());
        setLang(currentLanguage);
    };
    
    const navToOptions = () => {
        console.log('clicked');
        navigate('dpw/options')
    }
    

    return ( 
        <div class="start-cover-bg d-flex flex-column justify-content-center align-items-center bg-white">
        
        <section class="header-section">
        <button id="btn-lang-box" onClick={toggleLang} class="button-lang"><span id="btn-lang-content" >{buttonLangText}</span></button>
        <img  src={headerLogoWhite} class="header-img-bg" alt="header logo" />
        </section>
        
        <button id="btn-getstarted" onClick={navToOptions} class="button-getstarted">
            {buttonstartText}
        </button>
    
        <section class="footer-section">
        <img id="footer-img-bg"  src={footerBGshape} class="footer-img-icon" alt="footer sky shape" />
        </section>
  </div>
     );
}
 
export default Welcome;