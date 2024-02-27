import { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getOneAppointment } from '../../../services/api';
import { setSelectedAppointment } from '../../../reducers/appointments';

export default function VirtualRedirect() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    // /DPW/appointmendid?appid=
    const queryParams = new URLSearchParams(location.search);
    const appId = queryParams.get('appid');
    
    console.log('appId',appId);
    const callGetApp = async() => {
       
        try {
            const checkinApp = await getOneAppointment(appId);
            console.log('checkinApp saved', checkinApp)
            dispatch(setSelectedAppointment(checkinApp));

            // check if physical or virtual
            // navigate('/DPW/virtual-app')
            navigate('/DPW/summary')
            

        } catch (error) {
            // navigate('/')
        }
    }

    useEffect(() => {        
        callGetApp();
    },[]);
};
