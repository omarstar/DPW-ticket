import React, { useEffect, useRef } from 'react';
import '../includes/header/header.css'
import '../includes/footer/footer.css'
import homeCircleImg from '../../images/home-circle.svg'
import jafzaLogoColor from '../../images/JAFZA_Logo_Color.svg'
import footerBGshape from '../../images/footer-sky-bg.svg'
import '../common.css';
import "./ticket.css"

import { useSelector, useDispatch } from 'react-redux'
import { setLoading,setTicket} from '../../reducers/index'
import { api, getSessionValue, setSessionValue, vadidateForm } from '../../utils/index';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Queue from './Queue';
import Turn from './Turn';
import Loading from '../includes/loading/loading';
import axios from 'axios';
import { getTicket } from '../../services/api';

export default function Ticket() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    let ticketLeave = useRef(3);

    let {loading, ticket} = useSelector((state) => state.app);
    console.log('ticket', ticket)
    // ticket = {currentStatus:"CALLED",position:4,id: "A0123", currentServiceName: "servccc plapla"}//test
    // dispatch(setTicket(ticket));//test

    // const visit = JSON.parse(getSessionValue('sess_visit','{}'));
    // const branch = JSON.parse(getSessionValue('br_name','{}'));
    // console.log('visit in session: ',visit,getSessionValue('sess_visit'));
    let branchId = 4;

    const callVisitCheck = async() => {
        const reqData = {
            visitid: ticket.id?? 0,
            checksum: ticket.checksum?? 0,
            branchId: 4
        }

        try {
            const visitData = await callVisitCheck(reqData);//real api
            console.log('reqData', reqData)
            if (visitData.status === 200) {
                dispatch(setTicket(visitData.data))
                dispatch(setLoading(false));
            }

        } catch (error) {
            if(ticketLeave.current <= 0){
                sessionStorage.clear();
                return navigate("/DPW/thankyou")
            }
            ticketLeave.current -= 1;
        }
    }

    useEffect(() => {
        dispatch(setLoading(true));

        
        callVisitCheck();

        dispatch(setLoading(false));

        const ticketStatusInterval = setInterval(()=>{
            callVisitCheck();
        },6000);
        return () => {
            clearInterval(ticketStatusInterval);
        }

    },[]);

    return (
        <div class="d-flex flex-column justify-content-center align-items-center bg-white">
            <div class="header-section">
                <img  srcset={jafzaLogoColor} class="header-img-bg" alt="jafza logo" />
            </div>
            <div id="page" className="page-layout d-flex flex-column justify-content-start align-items-center">
                <div class="title-box d-flex flex-column justify-content-center align-items-center">
                    
                    {
                    loading ?
                        <Loading hSpacer='h-50' />
                    :
                    (ticket && ticket.currentStatus==="IN_QUEUE" )? (
                        <Queue ticket={ticket} branch={branchId} />
                    )
                    :(ticket && ticket.currentStatus==="CALLED" ) ?
                        <Turn ticket={ticket} branch={branchId}/>
                    :
                    <div>Nothing to show</div>
                }
                </div>
            </div>
            <div class="footer-section">
                <img id="footer-img-bg"  src={footerBGshape} class="footer-img-icon" alt="background shape" />
            </div>
        </div>
    )
}