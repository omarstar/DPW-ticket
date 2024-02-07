import '../../../styles/appointmentitem.css'
import React from 'react'
import { calculateRemainingTime, checkArrivalTime, formatDate } from '../../../utils';
const AppItem = ({appointment, handleOnClick}) => {
    // const {startTime, status, services, branchId} = appointment;
    return ( 
        // <div id="app-item-1" class="row applist-item" onClick={()=>{handleOnClick(appointment, checkArrivalTime(startTime))}}>
        <div id="app-item-1" class="row applist-item">
            <div class="applist-item-inner">
                <div class="column-1 d-flex flex-column">
                    <div class="clm-box">
                        <div id="app-branchname" class="applist-branchname">jafza lob 14</div>
                        
                            
                                <div id="app-servicename" class="applist-servicename">
                                admin services - employee affairs
                                </div>

                            {/* {services.map(service =>  (
                            
                                <div id="app-servicename" class="applist-servicename">
                                    {service.name}
                                </div>
                            ))} */}
                    </div>
                </div>
                <div class="column-2 d-flex flex-column">
                    <div class="clm-box">
                        <div id="app-date" class="applist-date">Thu, 16 Jan 2024</div>
                        {/* <div id="app-date" class="applist-date">{formatDate(appointment.startTime)}</div> */}
                        <div id="app-time" class="applist-time">08:20 AM</div>
                    </div>
                </div>
                <div class="column-3 d-flex flex-column">
                    <div class="clm-box">
                        <div id="app-elapsed" class="applist-elapsetime">(1 hr : 24 min)</div>
                        {/* <div id="app-elapsed" class="applist-elapsetime">{calculateRemainingTime(appointment.startTime)}</div> */}
                        <div id="app-status" class="applist-status">open</div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default AppItem;