import React from 'react'
import homeCircleImg from '../../images/home-circle.svg'
import jafzaLogoColor from '../../images/JAFZA_Logo_Color.svg'
import ModalExit from '../includes/modal/ModalExit'
import Footer from '../includes/footer/Footer'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isShowModal, setCategory, setModal } from '../../reducers';
import Text from '../Text'

export default function CustOptions() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const doShowModal = useSelector(isShowModal);

    const gotoFilteredServices = () =>{
        // dispatch(setCategory("Business Setup"));
        dispatch(setCategory({id:'0'}));
        navigate("/DPW/services");
    }
    
    const gotoCategoryPage = () =>{
        navigate('/DPW/category');
    }

    const modalExitData = {
        titleText: <Text name="titleExitModal" />,
        buttonOptions: [{
            text: <Text name="btnYes" />,
            buttonAction: () => {
                dispatch(setModal(false))
                navigate("/")
            }
        },
        {
            text: <Text name="btnNo" />,
            buttonAction: () => {
                dispatch(setModal(false))
            }
        }]
    }

    const showModel = () => {
        dispatch(setModal(true))
    }

    return(
        <div className="d-flex flex-column justify-content-center align-items-center bg-white">
            <div className="header-section">
                <img id="header-home-btn" onClick={showModel}  src={homeCircleImg} alt="home circle img" className="header-homecircle-img" />
                <img  srcset={jafzaLogoColor} className="header-img-bg" alt="jafza logo" />
            </div>
            <div id="page" className="page-layout d-flex justify-content-center align-items-center">
                <div className="title-center-box d-flex flex-column justify-content-center align-items-center h-40">
                    {/* <div className="title-black ff-bold"><Text name="titleSelectOptions" /></div> */}
                    <button id="btn-filteredservice" onClick={gotoFilteredServices} className="button-wide button-fill-clr space-btn2"><Text name="txtCustomerNew" /></button>
                    <button id="btn-gotocategory" onClick={gotoCategoryPage} className="button-wide button-fill-clr space-btn1"><Text name="txtCustomerExist" /></button>
                </div>
            </div>
            < Footer />
            {
                doShowModal && (
                    <ModalExit data={modalExitData} />
                )
            }
        </div>
    )
};
