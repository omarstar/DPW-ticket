import React from 'react';
import { useEffect } from 'react';
import Text from '../Text';


export default function Turn({ticket}) {
console.log('ticket info: ', ticket)
    // const turnText = "It's your turn!";
    // const messageText = "Please proceed to counter "//you will be served by

    const {ticketId, currentServiceName, servicePointName} = ticket;

    useEffect(() => {
        const audio = new Audio('../../../ding.mp3');

        audio.play().catch((error) => {
            console.error('Autoplay was prevented:', error);
        });;

        audio.onended = () => {
            audio.remove();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
        <div className="title-black ff-bold mtop-25"><Text name="titleTurn" /></div>
        <div className='text-center row w-100 justify-content-center no-scroll'>
            <div className="m-0 alignment txt_color" >
            <div className="myrounded text-center col-12">
				<span className='mini-gray-text'><Text name="noteProceedto" realign/> {servicePointName}</span>
            </div>
            </div>
            <div className='ticket-turn-box col-12 text-center'>
                <h1 id="ticketNumber" className="ticket-text">{ticketId}</h1>
                <h1 id="serviceName" className="ticket-service">{currentServiceName}</h1>
            </div>
        </div>
        </>

// return (
//     <>
//     <div className="title-black">Your position in line</div>
//     <div className='ticket-wrapper text-center'>
//         <div className="m-0 alignment txt_color" >

//             <div className="myrounded text-center col-12">
                
//                 <Line2 activeNum={position} onClickFuntion={()=>{navigate('')}} />
//             </div>
//         </div>
//         <div className='ticket-details-box col-12 text-center'>
//             <h1 id="ticketNumber" className="ticket-text">{ticketId}</h1>
//             <h1 id="serviceName" className="ticket-service">{currentServiceName}</h1>
//         </div>
//     </div>
//     </>
// )
        // <div className='h-70'>
        //     <div className='col-12 text-center mb-4'>
        //         {/* <h2> {turnText}</h2> */}
        //     </div>
        //     <div className='box d-flex flex-column justify-center'>
        //         <div className='ticket-details-box col-12 text-center'>
        //             <h2 className='col-12 my-4'> {turnText}</h2>
        //             <div className="col-12">
        //                 {/* <h1 id="serviceNumber" className="text-white ff-familylight">{ticket.currentServiceName}</h1> */}
        //                 <h2 className='fs-sm'>{messageText}</h2>
        //                 <h1 id="serviceNumber" className="text-white ff-familylight">{ticket.servicePointName}</h1>
        //             </div>
        //             <h1 id="ticketNumber" className=" ticket-number">{ticket.ticketId}</h1>
        //         </div>
        //     </div>

        // </div>
    )
}
