import "./otp.css"
// import Header from "../components/header/header";
// import Title from "../components/title/title";
// import Home from "../components/home/home";
// import Submit from "../components/submit/submit";
import { useLocation, useNavigate } from "react-router-dom";
import InputOtp from "../components/input/InputOtp";
// import ErrorText from "../components/failed/ErrorText";
import { useEffect, useState } from "react";
// import { clearASession, clearMostSessions, getSessionValue, setSessionValue, updateMainSession, vop } from "../../utils/helpers";
import OtpTimer from "./OtpTimer";
import { callSendOtp, callValidateOtp } from "../../services/api";
// import Loading from "../components/loading/loading";

const Otp = () => {

    let route = '';
    let nextPageData = {};

    /** translation */
    const titleTextEn = {
        registeredMobile: "Please enter the OTP sent to your mobile number.",
        // walkIn: "Please enter the OTP sent to your mobile number.",
        updateProfile: "Please enter the OTP sent to your new mobile number.",
        buttonText: "Submit"
    }
    const titleTextAr = {
        registeredMobile: "الرجاء إدخال رمز المرور المرسل إلى رقم هاتفك المتحرك المسجل لدينا"+":",
        // walkIn: ".الرجاء إدخال رمز المرور المرسل إلى رقم الهاتف المتحرك",
        updateProfile: "الرجاء إدخال رمز المرور المرسل إلى رقم هاتفك المتحرك الجديد"+":",
        buttonText: "تحقق وأرسل"
    }

    // const lang = getSessionValue('lang','ar');
    const lang = 'en';
    // const flow = getSessionValue('flow','walkIn');
    const flow = 'walkIn'

    let titleText;
    let noOtpText = {
        noOtp: (lang === 'en') ? "Didn't receive OTP? " : "لم تستلم رمز المرور لمرة واحدة؟ ",
        clickHere: (lang === 'en') ? "Click here" :"أنقر هنا"
    }
    let buttonText = (lang === 'en') ? titleTextEn['buttonText'] : titleTextAr['buttonText'];

    if(flow === 'walkIn'){
        titleText = (lang === 'en') ? titleTextEn['walkIn'] : titleTextAr['walkIn'];
    } else if(flow === 'appointmentIn' || flow === 'cancelAppointment') {
        titleText = (lang === 'en') ? titleTextEn['registeredMobile'] : titleTextAr['registeredMobile'];
    } else if(flow === 'updateProfile') {
        titleText = (lang === 'en') ? titleTextEn['updateProfile'] : titleTextAr['updateProfile'];
    }

    const navigate = useNavigate();

    switch (flow) {
        case 'walkIn':
            route = '/ticket'
            break;
        case 'appointmentIn':
            route = '/authenticate'
            break;
        case 'updateProfile':
            route = '/validate/updateprofile'
            break;
        case 'cancelAppointment':
            route = '/validate/cancelappointment';
            break;

        default:
            break;
    }

    const location  = useLocation();
    const reqBody = location.state;
    const phoneNumberOtp = reqBody.phoneNumber;

    /** error validation */
    const [otp, setOtp] = useState('');
    let [errorFlag, setErrorFlag] = useState('');

    const handleOtpChange = (updatedOtp) => {
        setErrorFlag('');
        setOtp(updatedOtp);
      };

      const validateOtp = (input) => {
        if(otp.length === 0)
            return "emptyField"
        else if(otp.length < 4)
            return "wrongFormat"
        else
            return "valid"
      }

    // const handleSendOtpAgain = () => {
    //     setOtp('');

    //     const reqDataOtp = {
    //         phoneNumber: phoneNumberOtp,
    //         otpCode: '',
    //         lang: lang
    //     }
    //     console.log('reqDataOtp: ', reqDataOtp)
    //     // i may need to update the phone number
    //     try {
    //         //call real api
    //         callSendOtp(reqDataOtp)
    //         .then((response)=>{
    //             console.log('otp again response', response)
    //             const otpStartTime = new Date().getTime();
    //             localStorage.setItem('otpTime', otpStartTime.toString());
    //         })
    //         .catch(error=>{
    //             console.error('error', error)
    //             setErrorFlag('networkIssues')
    //         })
    //     } catch (error) {
    //         setErrorFlag('networkIssues')
    //     }

    // }


    // const handleSubmitOtp = () => {
    //     setErrorFlag('');

    //     try {
    //         // const stateData = JSON.parse(getSessionValue('mainData'));
    //         const validateResult = validateOtp(otp);
    //         if(validateResult === 'valid'){
    //             if(otp.length === 4){
    //                 let publicOtp = otp.join('');
    //                 // stateData.phoneNumber = phoneNumberOtp;
    //                 // setSessionValue('mainData',JSON.stringify(stateData))
    //                 // updateMainSession({phoneNumber: phoneNumberOtp.substring(2)})


    //                 // // //for demo
    //                 // setTimeout(() => {
    //                 //     clearASession('otpTime');
    //                 // //    navigateData(route, {phoneNumber: phoneNumberOtp})
    //                 // navigate(route)
    //                 // }, 500);
    //                 // // //end demo

    //                 //for calling api
    //                 const apiValidateData = {
    //                     phoneNumber: phoneNumberOtp,
    //                     otpCode: publicOtp,
    //                     lang: lang
    //                 }

    //                 callValidateOtp(apiValidateData)
    //                 .then(response => {

    //                     console.log('validate otp res ', response)
    //                     if(vop(response)){
    //                         setTimeout(() => {
    //                             // navigateData(route, {phoneNumber: phoneNumberOtp})
    //                             navigate(route)
    //                         }, 500);

    //                     }else{
    //                         setErrorFlag('inCorrectOtp')
    //                     }
    //                 })
    //                 .catch(error => {
    //                     console.log('error', error)
    //                 })
    //                 //end of real api

    //             }

    //         }else {
    //             setErrorFlag(validateResult)
    //         }
    //     } catch (error) {
    //         console.log('error in parsing data', error)
    //         setTimeout(() => {
    //             clearMostSessions();
    //             navigate('/home')
    //         }, 4000);
    //     }

    // }

    const navigateData = (route, data) => {
        navigate(route, {state: data})
      }

    useEffect(()=>{
    },[errorFlag])

    return(
        <>
            {/* <Header/> */}
                <div className="h-60 d-flex-col">
                    {/* <Title text={titleText} hSpacer={"h-10"}/> */}
                    <div className="title-form">{titleText}</div>
                    {errorFlag ? (
                        <>
                        <div className="h-2"></div>
                        {/* <ErrorText messageKey={errorFlag} /> */}
                        </>
                    ) : (
                        !errorFlag && <div className="h-10"></div>
                    )}
                    <InputOtp otpValue={otp} />
                    <OtpTimer noOtpText={noOtpText} />
                    {/* <InputOtp otpValue={otp} onOtpChange={handleOtpChange} onKeyClick={handleSubmitOtp}/>
                    <OtpTimer noOtpText={noOtpText} onSendOtpAgain={handleSendOtpAgain}/> */}





                <div className="h-5"></div>
                <button id="" className="button-default space-btn-form-search">{buttonText}</button>
                {/* <Submit btnText={buttonText} onButtonClick={handleSubmitOtp} /> */}
                </div>
            {/* <Home/> */}
        </>
    )
}

export default Otp