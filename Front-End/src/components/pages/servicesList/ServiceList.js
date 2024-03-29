import React, { useEffect, useState } from 'react'

import '../../includes/header/header.css'
import '../../includes/footer/footer.css'
import homeCircleImg from '../../../images/home-circle.svg'
import backCircleImg from '../../../images/backarrow.svg'
import jafzaLogoColor from '../../../images/JAFZA_Logo_Color.svg'
// import footerBGshape from '../../../images/footer-sky-bg.svg'
import srvcInfoIcon from "../../../images/icon-service-info.svg"
import '../../common.css';
import "./servicesList.css"

import axios from "axios"
import { getPhonenumber, isShowModal, setBranchid, setLoading, setModal, setTicket } from '../../../reducers';
import { useDispatch, useSelector } from 'react-redux';
import ModalExit from '../../includes/modal/ModalExit'
import ModalInfo from '../../includes/modal/ModalInfo'
import { useNavigate } from 'react-router-dom'
import Loading from '../../includes/loading/loading'
import Text from '../../Text'
import Footer from '../../includes/footer/Footer'

export default function ServiceList(params) {

    const [showModalInfo, setShowModalInfo] = useState(false);
    const [showOnlineModalInfo, setShowOnlineModalInfo] = useState(false);
    const [descText, setDescText] = useState("")
    let mobileNumber = useSelector(getPhonenumber);

    let {loading, category, branchPrefix, email, customer, ticket,CurrentLang} = useSelector((state) => state.app);

    let modalOnlineInfoData = {
        titleText: <Text name="titleServiceModal" />,
        descText: descText?? <Text name="noteNoServiceInfo" />,
        buttonOptions: [{
            text: <Text name="btnBookOnline" />,
            buttonAction: () => {
                setShowOnlineModalInfo(false);
                const externalLink = "https://epgqsys-1.norwayeast.cloudapp.azure.com:3050/"
                window.open(externalLink, '_blank');
            }
        },{
            text: <Text name="btnClose" />,
            buttonAction: () => {
                setShowOnlineModalInfo(false);
            }
        }]
    }
    let modalInfoData = {
        titleText: <Text name="titleServiceModal" />,
        descText: descText?? <Text name="noteNoServiceInfo" />,
        buttonOptions: [{
            text: <Text name="btnClose" />,
            buttonAction: () => {
                // dispatch(setModal(false))
                setShowModalInfo(false);
            }
        }]
    }

    const showInfoModal = () => {
        setShowModalInfo(true);
    }

    //modal exit
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const doShowModal = useSelector(isShowModal);

    const modalExitData = {
        titleText: <Text name="titleExitModal" />,
        buttonOptions: [{
            text: <Text name="btnYes" />,
            buttonAction: () => {
                dispatch(setModal(false))
                navigate("/")
            }
        },
        {
            text: <Text name="btnNo" />,
            buttonAction: () => {
                dispatch(setModal(false))
            }
        }]
    }
    
    const showModel = () => {
        dispatch(setModal(true))
    }

    // service list

    let [serviceList , setServiceList] = useState()

    useEffect( () => {
        
        dispatch(setLoading(true));

        if(ticket){
            dispatch(setLoading(false));
            navigate('/DPW/ticket')
        }

        async function  getServiceList() {
            let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: process.env.REACT_APP_API_URL + '/rest/mobile/services',
            };
           let serviceListResponse = await axios.request(config);
           console.log('serviceListResponse', serviceListResponse)
           serviceListResponse = serviceListResponse.data;
           var ids = category.services;
           console.log('category',category);
           serviceListResponse = serviceListResponse.filter(srv => {
            if(ids.find(id=>id==srv.id)){
                return srv;
            }
            });
            serviceListResponse = serviceListResponse.map(s=>{
                if(!s.internalName.toLowerCase().includes('follow-up')){
                    s.internalName = s.internalName.split('-')[1]??s.internalName;
                }
                return s;
            });
            serviceListResponse = serviceListResponse.sort((a, b) => a.internalName.localeCompare(b.internalName))
            console.log('serviceListResponse>> ', serviceListResponse)
            setServiceList(serviceListResponse)
        }

        function testLocal() {
            dispatch(setLoading(true));
            setServiceList([{id: 40, internalName: "srvnm1", internalDescription: "pla pla 1"},{id: 42, internalName: "srvnm1", internalDescription: "pla pla 2"}]);
            setTimeout(() => {
                dispatch(setLoading(false));//test
            }, 3000);
        }

        // testLocal();//test only
        if(branchPrefix){
            getServiceList().then(res=>{
                dispatch(setLoading(false));
            }).catch(err=>{
                dispatch(setLoading(false));
            });
        }else{
            dispatch(setLoading(false));
            return navigate('/');
        }

        

    },[])

    // function infoButtonClicked(e) {
    //     for (let i = 0; i < serviceList.length; i++) {
    //         const service = serviceList[i];
    //         if(e.target.id.split("-")[1] === service.id){
    //             console.log('into info service',[e.target.id.split("-")[1], ])
    //             setShowModalInfo(true);
    //             document.getElementById("transparentmodal-serviceinfo").style.display = "flex"
    //             document.getElementById("modal-info").innerText = service.internalDescription
    //             break
    //         }
    //     }
    // }
    function infoButtonClicked(srvid) {
        const service = serviceList.find(srv => srv.id === srvid)
        console.log('service', service);
        setDescText(service.internalDescription)
        setShowModalInfo(true);
    }


    async function  handleServiceSubmit(srvid) {
        //
        try {
            
            const service = serviceList.find(srv => srv.id === srvid);
            console.log('service', service);
            console.log('branchPrefix', branchPrefix);
            if(service){
                if([77,78,79,80,69,70].find(id => id === service.id)){
                    setDescText(<Text name="textBookOnlineDesc" />)
                    return setShowOnlineModalInfo(true);
                }else if(branchPrefix === 'LOB14'){
                    if([72,73,74,75,76].find(id => id === service.id )){
                        setDescText(<Text name="titleServiceJafza15" />)
                        return setShowModalInfo(true);
                    }else{
                        if(!ticket){
                            await createTicket(srvid)
                        }
                        else{
                            navigate('/DPW/ticket')
                        }
                    }
                }else if(branchPrefix === 'LOB15'){
                    if([72,73,74,75,76].find(id => id === service.id )){
                        if(!ticket){
                            await createTicket(srvid)
                        }
                        else{
                            navigate('/DPW/ticket')
                        }
                    }else{
                        setDescText(<Text name="titleServiceJafza14" />)
                        return setShowModalInfo(true);
                    }
                }else{
                    console.log('check branchPrefix')
                }
            }

        } catch (error) {
            console.error(error)
            // navigate("/")
        }
    }

    async function createTicket(id) {
        console.log("customer saved?",customer);
        try {
            let createTicketBody = {}
            if(customer !== ''){
                createTicketBody = {
                    services : [id],
                    parameters : {
                        custom3 : JSON.stringify({
                            firstName : customer?.firstName,
                            lastName : customer?.lastName,
                            phoneNum : customer.properties?.phoneNumber??"",
                            email : customer.properties?.email??"",
                            company : customer.properties?.company??"",
                        }),
                        phoneNumber: mobileNumber,
                        email : email
                    },
                    customers : [customer.id]
                }

            }else{
                createTicketBody = {
                    services : [id],
                    parameters : {
                        phoneNumber: mobileNumber,
                        email : email
                    },
                }
            }

            console.log('createTicketBody', createTicketBody)

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url:  process.env.REACT_APP_API_URL + '/rest/mobile/visit/create',
                data : createTicketBody
                };
               let visit =  await axios.request(config)
               console.log('visit.data', visit.data)
                dispatch(setTicket(JSON.stringify(visit.data)))
                dispatch(setBranchid());
                // setTimeout(() => {
                //     dispatch(setLoading(true))
                // }, 3000);
                // dispatch(setLoading(false))
                navigate('/DPW/ticket')
               return ;

        } catch (error) {
            console.log('error in eticket create', error);
            throw error;
        }
    }

   
    const HandleBack = () => {
        if(branchPrefix && branchPrefix === "LOB15"){
            return navigate('/DPW/cust-status');
        }
        navigate("/DPW/category");
    }

    return (
        <>

            <div className="d-flex flex-column justify-content-center align-items-center bg-white">
                <div className="header-section">
                    <img id="header-home-btn" onClick={showModel}  src={homeCircleImg} alt="home circle img" className="header-homecircle-img" />
                    {/* <img id="header-home-btn" onClick={showModel}  src={homeCircleImg} alt="home circle img" className="header-homecirclebk-img" /> */}
                    <img id="btn-back-btn" src={backCircleImg} onClick={HandleBack} alt="back circle img" className="header-backcircle-img" />
                    <img  srcset={jafzaLogoColor} className="header-img-bg" alt="jafza logo" />
                </div>
                <div id="page" className="page-layout d-flex">
                    
                    <div className="title-box d-flex flex-column justify-content-center align-items-center">
                        <div className="title-black ff-bold"><Text name="titleSelectService" /></div>
                            <div id="walkin-services-list" className="services-list-box d-flex flex-column align-items-center justify-content-start">
                            {
                            loading ? (
                                <Loading hSpacer="h-25" />
                            ) : (
                            
                            serviceList ? serviceList.map(srv =>  (
        
                                <div className="button-service-item d-flex justify-content-between align-items-center">
                                    <div onClick={()=>handleServiceSubmit(srv.id)} id={srv.id} className="service-btn-box"><button id={srv.id} className="button-wide button-fill-clr btn-service">{CurrentLang=="en"?srv.internalName:srv.externalName}</button></div>
                                    <img id={`img-` + srv.id} onClick={()=>infoButtonClicked(srv.id)} className="service-info-icon" src={srvcInfoIcon} alt="info service" />
                                </div>
                                    ) )   : console.log("error ===>")
                            )}
                        </div>
                    </div>
                    {/* <div className='btn-black-box'>
                        <button id="btn-otp-submit" onClick={HandleBack} className="button-wide button-outline-clr space-btn-back"><Text name="btnBack" />
                            <img id="btn-back-btn" src={backCircleImg} alt="back circle img" className="btn-backcircle-img" />
                        </button>
                    </div> */}
                </div>

                < Footer />
                {
                    doShowModal && (
                        <ModalExit data={modalExitData} />
                    )
                }
                {
                    showModalInfo && (
                        <ModalInfo data={modalInfoData} />
                    )
                }
                {
                    showOnlineModalInfo && (
                        <ModalInfo data={modalOnlineInfoData} />
                    )
                }
                
            </div>
        
        </>
    )
};
