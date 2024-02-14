import React from 'react';
import Line2 from '../includes/line/line2';
import { useNavigate } from 'react-router-dom';
import Text from '../Text';


export default function Queue({ticket,branch}) {

    const {position, ticketId, currentServiceName} = ticket;
    const navigate = useNavigate();


    return (
        <>
        <div className="title-black ff-bold"><Text name="titlePosition" /></div>
        <div className='ticket-wrapper text-center'>
            <div className="m-0 alignment txt_color" >

				<div className="myrounded text-center col-12">
					
                    <Line2 activeNum={position} onClickFuntion={()=>{navigate('')}} />
                </div>
            </div>
            <div className='ticket-details-box col-12 text-center'>
                <h1 id="ticketNumber" className="ticket-text">{ticketId}</h1>
                <h1 id="serviceName" className="ticket-service">{currentServiceName}</h1>
            </div>
        </div>
        </>
    )
}
