import React from 'react';
import { getSessionValue} from '../../utils/index';
import { Link} from 'react-router-dom';

export default function Thankyou() {

    const branch = JSON.parse(getSessionValue('br_name','{}'));

    return (
        <div className='row w-100 justify-content-center py-3'>

            <div className='box thankyou-box d-flex'>
                <div className='col-12 text-center'>
                    <h5> Thank you for visiting us! </h5>
                    <p>{branch?.name??""}</p>
                    {/* <div className='my-5'>Thank you for visiting us!</div> */}
                </div>
            </div>
            
            <div className='getLineButton'>
                <div className='col-12 mt-3'>
                    <Link className='btn btn-dark btn-block col-12' to={'/'}> <h4> Get new ticket </h4> </Link>

                </div>
            </div>
        </div>
    )
}