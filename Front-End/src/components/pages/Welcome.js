import { useNavigate, useParams } from "react-router-dom";
import headerLogoWhite from '../../images/JAFZA_Logo_White.svg'
import footerBGshape from '../../images/footer-sky-bg.svg'
import '../../styles/getStarted.css'
import { useDispatch, useSelector } from "react-redux";
import { selectLanguage, setBranchPrefix, setLoading, toggleCurrentLang } from "../../reducers";
import { useEffect, useState } from "react";
import Text from "../Text";
import $ from 'jquery'
const Welcome = () => {
    var {branch} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentLanguage = useSelector(selectLanguage);
    var {branchPrefix} = useSelector((state) => state.app)
    console.log('branch at welcome', branch)
    if(branch){
        dispatch(setBranchPrefix(branch));
    }else{
        if(!branchPrefix){
            dispatch(setBranchPrefix('LOB14'));
        }
    }
    dispatch(setLoading(false));
    console.log('currentLanguage', currentLanguage)
    const [lang, setLang] = useState(currentLanguage)

    useEffect(() => {
        setLang(currentLanguage);
      }, [currentLanguage]);
    
    let buttonLangText = lang === 'en' ? 'عربي' : "English"
    // let buttonLangText = lang === 'ar' ? 'Ar' : "En"

    const toggleLang = () => {
        dispatch(toggleCurrentLang());
        $('.language').each(function(){
            if(currentLanguage=="en"){
                $(this).parent().removeClass('directionRtL')
            }else{
                $(this).parent().addClass('directionRtL')
            }
        })
        
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
            <Text name="getStarted" />
        </button>
    
        <section className="footer-section">
        <img id="footer-img-bg"  src={footerBGshape} className="footer-img-icon" alt="footer sky shape" />
        </section>
  </div>
     );
}
 
export default Welcome;