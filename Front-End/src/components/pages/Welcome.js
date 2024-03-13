import { useNavigate, useParams } from "react-router-dom";
import headerLogoWhite from '../../images/JAFZA_Logo_White.svg'
// import footerBGshape from '../../images/footer-sky-bg.svg'
import '../../styles/getStarted.css'
import { useDispatch, useSelector } from "react-redux";
import { resetState, selectLanguage, setBranchPrefix, setLoading, toggleCurrentLang } from "../../reducers";
import { useEffect, useState } from "react";
import Text from "../Text";
import $ from 'jquery'
import Footer from "../includes/footer/Footer";
import { getLocalTranslate } from "../../utils/language";
import { clearPersistedState } from "../../store";

const Welcome = () => {
    var {branch} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentLanguage = useSelector(selectLanguage);
    var {branchPrefix} = useSelector((state) => state.app)

    console.log('****branch at welcome', branch)
    console.log('branchPrefix init', branchPrefix)
    // console.log('branchesList.includes(branchPrefix)', branchesList.includes(branchPrefix))
    useEffect(() => {
        dispatch(resetState());
        localStorage.clear();
    },[])
    
    if(branch){
        branch = branch.toUpperCase();
        console.log('****branch to save', branch)
        dispatch(setBranchPrefix(branch));
    }else if(branchPrefix){
        console.log('branchPrefix saved already ', branchPrefix)
    }else{
        console.log('default prefix LOB14')
        dispatch(setBranchPrefix('LOB14'));
    }
    // if(branch && branchesList.some(branchDefined=> branchDefined == branch.toLowerCase())){
    //     console.log('branchesList.includes(branch)')
    //     dispatch(setBranchPrefix(branch));
    // }else if(branchPrefix && branchesList.some(branchDefined=> branchDefined == branchPrefix.toLowerCase()) ){
    //     console.log('branchesList.includes(branchPrefix)')
    //     dispatch(branchPrefix);
    // }else{
    //     console.log('default prefix LOB14')
    //     dispatch(setBranchPrefix('LOB14'));
    // }


    dispatch(setLoading(false));
    console.log('currentLanguage', currentLanguage)
    const [lang, setLang] = useState(currentLanguage)

    useEffect(() => {
        setLang(currentLanguage);
      }, [currentLanguage]);
    
    let buttonLangText = lang === 'en' ? 'عربي' : "English"
    // let buttonLangText = lang === 'en' ? 'ع' : "EN"

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
        <div class="welcome-body d-flex flex-column justify-content-center align-items-center w-100">
            <h1 id="welcomeNote"><Text name={branchPrefix=='LOB14'?"WelcomeLOB14":"WelcomeLOB15"} /></h1>
            <button id="btn-getstarted" onClick={navToOptions} className="button-getstarted ff-bold">
                <Text name="getStarted" />
            </button>
        </div>
    
        < Footer />
  </div>
     );
}
 
export default Welcome;