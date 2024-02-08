import React, { useEffect, useRef, useState } from 'react';
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
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import Queue from './Queue';
import Turn from './Turn';
import Loading from '../includes/loading/loading';
import { getTicket } from '../../services/api';
// import axios from 'axios';
// import { getTicket } from '../../services/api';

export default function TicketRedirect() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const callVisitCheck = () => {

        const reqData = {
            id: queryParams.get('visitId'),
            checksum: queryParams.get('checksum'),
            branchId: queryParams.get('branchId')
        }
        console.log('reqData',reqData);
        try {
            dispatch(setTicket(JSON.stringify(reqData)));
            navigate('/DPW/ticket')

        } catch (error) {
            navigate('/')
        }
    }

    useEffect(() => {
        
        callVisitCheck();

    },[]);

  

}