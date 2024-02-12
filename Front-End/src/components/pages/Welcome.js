import { useNavigate, useParams } from "react-router-dom";
import headerLogoWhite from '../../images/JAFZA_Logo_White.svg'
import footerBGshape from '../../images/footer-sky-bg.svg'
import '../../styles/getStarted.css'
import { useDispatch, useSelector } from "react-redux";
import { selectLanguage, setBranchPrefix, toggleCurrentLang } from "../../reducers";
import { useEffect, useState } from "react";

const Welcome = () => {
    var {branch} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    dispatch(setBranchPrefix(branch??'LOB14'));
    const buttonstartText = "Get started"
    
    const currentLanguage = useSelector(selectLanguage);
    console.log('currentLanguage', currentLanguage)
    const [lang, setLang] = useState(currentLanguage)

    useEffect(() => {
        setLang(currentLanguage);
      }, [currentLanguage]);
    
    let buttonLangText = lang === 'en' ? 'عربي' : "English"
    // let buttonLangText = lang === 'ar' ? 'Ar' : "En"

    const toggleLang = () => {
        dispatch(toggleCurrentLang());
    };
    
    const navToOptions = () => {
        console.log('clicked');
        navigate('/dpw/options')
    }
    
    const moreBold = lang === 'en' ? 'more-bold' : '';

    return ( 
        <div className="start-cover-bg d-flex flex-column justify-content-center align-items-center bg-white">
        
        <section className="header-section">
        <button id="btn-lang-box" onClick={toggleLang} className={"button-lang ff-semibold " + moreBold}><span id="btn-lang-content" >{buttonLangText}</span></button>
        <img  src={headerLogoWhite} className="header-img-bg" alt="header logo" />
        </section>
        
        <button id="btn-getstarted" onClick={navToOptions} className="button-getstarted ff-bold">
            {buttonstartText}
        </button>
    
        <section className="footer-section">
        <img id="footer-img-bg"  src={footerBGshape} className="footer-img-icon" alt="footer sky shape" />
        </section>
  </div>
     );
}
 
export default Welcome;