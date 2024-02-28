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
    const appId1 = queryParams.get('appid');
    const callGetApp = async() => {
       
        try {
            const checkinApp = await getOneAppointment(appId1);
            console.log('checkinApp saved inVD TO BE SAVED AS APP', checkinApp)
            if(checkinApp){
                
                dispatch(setSelectedAppointment(checkinApp));
                navigate('/DPW/summary')
            }else{
                <p>the link has expired</p>
            }

            // check if physical or virtual
            // navigate('/DPW/virtual-app') //reading diff app publicid response
             //reading the list app response
            

        } catch (error) {
            // navigate('/')
        }
    }

    useEffect(() => {        
        callGetApp();
    },[]);
};
