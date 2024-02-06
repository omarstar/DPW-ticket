import React from 'react';
// import Line from '../includes/line/line';
import Line2 from '../includes/line/line2';
import { useNavigate } from 'react-router-dom';
// import { setModal } from '../../reducers';


export default function Queue({ticket,branch}) {

    const {position, ticketId, currentServiceName} = ticket;
    const navigate = useNavigate();


    return (
        <>
        <div class="title-black">Your position in line</div>
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
