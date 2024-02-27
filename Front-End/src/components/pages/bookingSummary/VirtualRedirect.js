import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getOneAppointment } from '../../../services/api';
import { setSelectedAppointment } from '../../../reducers/appointments';
export default function VirtualRedirect(params) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const appId = queryParams.get('appId');

    const callGetApp = async() => {

        
        console.log('appId',appId);

        try {
            const checkinApp = await getOneAppointment(appId);
            dispatch(setSelectedAppointment(checkinApp));

            // check if physical or virtual
            // navigate('/DPW/virtual-app')
            navigate('/DPW/summary')
            

        } catch (error) {
            navigate('/')
        }
    }

    useEffect(() => {
        
        callGetApp();

    },[]);
};
