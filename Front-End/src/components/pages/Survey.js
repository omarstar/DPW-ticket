import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setLoading,setPhoneNumber } from '../../reducers/index'
import { api, getSessionValue, setSessionValue, vadidateForm } from '../../utils/index';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import $ from 'jquery';
import Excellent_Survey from '../../images/Excellent_Survey.svg';
import Moderate_Survey from '../../images/Moderate_Survey.svg';
import Poor_Survey from '../../images/Poor_Survey.svg';
// import axios from 'axios';

export default function Survey() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSurvey = (survey) =>{
        createTicket(survey);
    }
    const hanldeSkipThis = () =>{
        createTicket();
    }
    const createTicket = async (survey='') =>{
        dispatch(setLoading(true));
        const selectedBranche = JSON.parse(getSessionValue('br_name'),'{}');
        const selectedService = getSessionValue('selectService');
        console.log('ticketData',[selectedService,selectedBranche]);
        if(selectedService && selectedBranche){
            try {
                let data = JSON.stringify({
                    "parameters": {
                    "notificationType": "none",
                    "print": "0",
                    "phoneNumber": getSessionValue('phoneNumber'),
                    "custom1": survey ?? '',
                    }
                });
                
                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: api(`create/ticket?serviceId=${selectedService}&brancheId=${selectedBranche.id}`),
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    data : data
                };
                const response = await axios.request(config);
                if(response.data){
                    setSessionValue('sess_visit',JSON.stringify(response.data));
                    return navigate('/ticket');
                }
                console.log(response.data);
            } catch (error) {
                return navigate('/');
            }
            
        }else{
            return navigate('/');
        }
        
    }
    return (
        <div className='row w-100 justify-content-center py-3'>
            <div className='col-10 text-center'>
                <h5> Survey</h5>
            </div>
            <div className='box'>
                <div className='row text-center my-5'>
                    <div className='col-4'> <img onClick={() => handleSurvey('Excellent')} className='w-100' src={Excellent_Survey} alt="Excellent_Survey" /> <span>Excellent</span> </div>
                    <div className='col-4'> <img onClick={() => handleSurvey('Moderate')} className='w-100' src={Moderate_Survey} alt="Moderate_Survey" /> <span>Moderate</span> </div>
                    <div className='col-4'> <img onClick={() => handleSurvey('Poor')} className='w-100' src={Poor_Survey} alt="Poor_Survey" /> <span>Poor</span> </div>
                </div>
            </div>
            <div className='getLineButton'>
                
                <div className='col-12 mt-3'>
                    <button className='btn btn-outline-primary btn-block col-12' onClick={hanldeSkipThis}> <h4> Skip This </h4> </button>
                </div>
            </div>
        </div>
    )
}