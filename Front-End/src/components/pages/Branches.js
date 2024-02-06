import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setLoading,setBranches,setSplash} from '../../reducers/index'
import { api, clearAllSession, setSessionValue, vadidateForm } from '../../utils/index';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../includes/loading/loading';

export default function Branches() {
    clearAllSession();
    let {branches,loading,splash} = useSelector((state) => state.index);
    // branches = [{id:12,name:"ADNOC an",addressLine1: "add1 llklkl asda lk", addressLine1: "add4"},{id:15,name:"Bankaal wwo",addressLine1: "add2 oaskod aso ", addressLine1: "add8"},{id:7,name:"Bankaal wwo",addressLine1: "add2 oaskod aso ", addressLine1: "add8"},{id:2,name:"Bankaal wwo",addressLine1: "add2 oaskod aso ", addressLine1: "add8"},{id:2,name:"Bankaal wwo",addressLine1: "add2 oaskod aso ", addressLine1: "add8"},{id:2,name:"Bankaal wwo",addressLine1: "add2 oaskod aso ", addressLine1: "add8"},{id:2,name:"Bankaal wwo",addressLine1: "add2 oaskod aso ", addressLine1: "add8"},{id:2,name:"Bankaal wwo",addressLine1: "add2 oaskod aso ", addressLine1: "add8"},{id:2,name:"Bankaal wwo",addressLine1: "add2 oaskod aso ", addressLine1: "add8"}]

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const getbranches = async () => {
            console.log('...getting branches in useeffect')
            try {
                const url = api("branches/");
                const response = await fetch(url);
                const dataJson = await response.json();
                if (response.status === 200) {
                    dispatch(setBranches(dataJson))
                    dispatch(setLoading(false));
                }
            } catch (error) {
                console.error(error);
                dispatch(setBranches({}))
                dispatch(setLoading(false));
                
            }
            
        };

        
        getbranches();
    },[]);

    const getbranches = async () => {
        console.log('...getting branches')
        try {
            const url = api("branches/");
            const response = await fetch(url);
            const dataJson = await response.json();
            console.log('dataJson', dataJson)
            if (response.status === 200) {
                dispatch(setBranches(dataJson))
                dispatch(setLoading(false));
            }
        } catch (error) {
            console.error(error);
                dispatch(setBranches({}))
                dispatch(setLoading(false));
            
        }
        
        /* test */
        // setTimeout(() => {
            
        //     dispatch(setLoading(false));
        // }, 3000);

    };

    const getStarted = () => {
        dispatch(setSplash(false));
        getbranches();
    }
    

    const hanldeSelectBranch = (branch) =>{
        console.log('branch',branch);
        setSessionValue('br_name',JSON.stringify(branch));
        navigate(`/services/${branch.id}`);
    }
    return (
        <>
        {
            splash ?
                <div className='row w-100 justify-content-center py-3 welcome-wrapper'>
                    <div className='col-10 welcome-text'>
                        {/* <h2>Welcome to <strong>Maersk</strong></h2> */}
                        {/* <br/> */}
                        {/* <h3>Integrated logistics company and global leader in container shipping.</h3> */}
                    </div>
                    <div className="w-100 mb-3 pb-2 p-4 welcome-buttom-box">
                        <div className="d-grid gap-2 justify-center">
                            <button onClick={getStarted} className="btn branch-btn w-80">GET STARTED</button>
                        </div>
                    </div>
                </div>
                :

            <div className='row w-100 justify-content-center pb-3'>
                <div className='col-10 text-center branch-title mb-2'>
                    <h5>Please select a branch.</h5>
                </div>
                <div className='box'>  
                    {
                        loading ?
                            // <span>Loading</span> 
                            <Loading hSpacer='h-25' />
                        :
                        (branches && branches.length) ? branches.map((e, index) => (
                            <button className='btn mt-4 branch-btn w-100' type='button' key={`branch${e.id}`} onClick={() => hanldeSelectBranch(e)} > 
                                <span>{e.name}</span> <br/>
                                <p>{e.addressLine1} {e.addressLine4}</p>
                            </button>
                        ))
                        :
                        <span>No Branches</span>
                    }
                </div>
            </div>
        }
        </>
    )
}