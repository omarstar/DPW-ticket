import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setLoading,setServices,selectService } from '../../reducers/index'
import { api, getSessionValue, setSessionValue } from '../../utils/index';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import $ from 'jquery';

import Loading from '../includes/loading/loading';

export default function Services() {
    const { id } = useParams();
    console.log('branch id',id);
    let {services,loading} = useSelector((state) => state.index);
    services = [{serviceId: 40, serviceName: "srvnm1"},{serviceId: 42, serviceName: "srvnm1"}]; //test

    const selectedBranche = JSON.parse(getSessionValue('br_name',"{}"));
    console.log('selectedBranche',selectedBranche);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {

        const getServices = async () => {
            try {
                dispatch(setLoading(true));
                // const url = api(`services/${id}`);
                // const response = await fetch(url);
                // const dataJson = await response.json();
                // console.log(dataJson);
                // if (response.status === 200) {
                //     dispatch(setServices(dataJson))
                //     dispatch(setLoading(false));
                // }
            } catch (error) {
                console.error(error);
                
            }
            setTimeout(() => {
                dispatch(setLoading(false));//test
            }, 3000);
        };
        getServices();
    },[]);

    const handleService = (sid) =>{
        setSessionValue('serviceId',sid);
        navigate(`/phone`);
    }
    return (
        <div className='row w-100 justify-content-center py-3'>
            <div className='col-10 text-center services-title'>
                <h5>Please select a service at
                    <br/><strong> {selectedBranche?.name??""}</strong></h5>
            </div>
            <div className='box'>  
            {
                loading ?
                    // <span>Loading</span> 
                    <Loading hSpacer='h-25' />
                :
                (services && services.length) ? services.map((e, index) => (
                    <div className='service'>
                        <button id={e.serviceId} onClick={()=>handleService(e.serviceId)} className='btn branch-btn mt-4 w-100'>{e.serviceName}</button>
                    </div>
                ))
                :
                <span>No Services</span>
            }
            </div>
            {/* <div className='getLineButton mt-2'>
                <div className='col-12'>
                    <button className='btn btn-dark btn-block col-12' onClick={handleService}> <h4> Get in line </h4> </button>
                </div>
            </div> */}
        </div>
    )
}