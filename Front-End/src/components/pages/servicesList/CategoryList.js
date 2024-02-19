import React, { useEffect, useState } from 'react'

import '../../includes/header/header.css'
import '../../includes/footer/footer.css'
import homeCircleImg from '../../../images/home-circle.svg'
import jafzaLogoColor from '../../../images/JAFZA_Logo_Color.svg'
import footerBGshape from '../../../images/footer-sky-bg.svg'
import '../../common.css';
import "./servicesList.css"
import catImg from '../../../images/service-svgrepo-white-com.svg'
import catLease from '../../../images/catIcons/contract-sign-line-svgrepo-com.svg'
import catCs from '../../../images/catIcons/customer-service-woman-svgrepo-com.svg'
import catManagement from '../../../images/catIcons/customer-management-line-svgrepo-com.svg'
import catEmployee from '../../../images/catIcons/development-human-network-svgrepo-com.svg'
import catLicense from '../../../images/catIcons/license-maintenance-svgrepo-com.svg'
import catProperty from '../../../images/catIcons/property-svgrepo-com.svg'
import catRegister from '../../../images/catIcons/register-svgrepo-com.svg'
import catSales from '../../../images/catIcons/sales-amount-svgrepo-com.svg'

import { isShowModal, setCategory, setLoading, setModal } from '../../../reducers';
import { useDispatch, useSelector } from 'react-redux';
import ModalExit from '../../includes/modal/ModalExit'
import { useNavigate } from 'react-router-dom'
import Loading from '../../includes/loading/loading'
import { golobalVariables } from '../../../services/api'
import { categoryListObject } from '../../../utils/constants'
import Text from '../../Text'
import Footer from '../../includes/footer/Footer'

export default function CategoryList(params) {
    // category list
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let {loading} = useSelector((state) => state.app);
    const doShowModal = useSelector(isShowModal);

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

    let [categoryList , setcategoryList] = useState()
    // categoryList = categoryListObject;//test

    useEffect( () => {
        dispatch(setLoading(true));
       
        golobalVariables('categories').then(res=>{
            var categories = JSON.parse(res.value);
            categories = categories.sort((a, b) => a.name.localeCompare(b.name))
            console.log(categories);
            setcategoryList(categories)
        }).catch(err=>{

        })
        
        

        dispatch(setLoading(false));

    },[])

   

    async function  handlecategorySubmit(cat) {

        try {
            console.log(cat);
            dispatch(setCategory(cat));
            navigate("/DPW/services");
        } catch (error) {
            console.log('error in finding category', error);
            navigate("/")
        }
    }

    return (
        <>

            <div className="d-flex flex-column align-items-center bg-white">
                <div className="header-section">
                    <img id="header-home-btn" onClick={showModel}  src={homeCircleImg} alt="home circle img" className="header-homecircle-img" />
                    <img  srcset={jafzaLogoColor} className="header-img-bg" alt="jafza logo" />
                </div>
                <div id="page" className="page-layout d-flex">
                    
                    <div className="title-box d-flex flex-column justify-content-center align-items-center">
                        <div className="title-black ff-bold"><Text name="titleSelectCategory" /></div>
                            <div id="walkin-services-list" className="services-list-box row mx-0">
                            {
                            loading ? (
                                <Loading hSpacer="h-25" />
                            ) : (
                           
                            categoryList && categoryList.map((cat, index) =>  {

                                let imgCatRelated;

                                switch(cat.name){
                                    case 'Contracts & Leasing':
                                        imgCatRelated = catLease;
                                        break;
                                    case 'Customer Service':
                                        imgCatRelated = catCs;
                                        break;
                                    case 'Employee Affairs':
                                        imgCatRelated = catEmployee;
                                        break;
                                    case 'Asset & Property Management':
                                        imgCatRelated = catProperty;
                                        break;
                                    case 'Licensing':
                                        imgCatRelated = catLicense;
                                        break;
                                    case 'Registration & Offshore':
                                        imgCatRelated = catRegister;
                                        break;
                                    case 'Sales':
                                        imgCatRelated = catSales;
                                        break;
                                    case 'Workforce Affairs':
                                        imgCatRelated = catManagement;
                                        break;

                                    default:
                                        imgCatRelated = catImg;
                                };
                                return (
                                    <div key={index} id="cat-img-btn" className="button-category-item col-5 d-flex justify-content-center">
                                        <div onClick={()=>handlecategorySubmit(cat)} className="category-btn-box">
                                            <button className="button-wide button-fill-clr cat-img-box">
                                                <img clasName="img-fluid img-rat m-auto" src={imgCatRelated} alt="" />
                                            </button>
                                                <h6 className="mt-2 cat-text">{cat.name}</h6>
                                        </div>
                                    </div>
                                )
                            })
                            )}
                        </div>
                        {/* init design cat-list */}
                            {/* <div id="walkin-services-list" className="services-list-box d-flex flex-column align-items-center">
                            {
                            loading ? (
                                <Loading hSpacer="h-25" />
                            ) : (
                            
                            categoryList ? categoryList.map(cat =>  (
        
                                <div className="button-category-item d-flex justify-content-between align-items-center">
                                    <div onClick={()=>handlecategorySubmit(cat)} className="category-btn-box">
                                        <button className="button-wide button-fill-clr">
                                            {cat.name}
                                        </button>
                                    </div>
                                </div>
                                ) )   : console.log("error ===>")
                            )}
                        </div> */}
                        {/* 2nd cat-list design */}
                        {/* {
                            loading ? (
                                <Loading hSpacer="h-25" />
                            ) : (
                           
                            categoryList && categoryList.map((cat, index) =>  (
        
                                <div key={index} className="button-category-item d-flex justify-content-between align-items-center">
                                    <div onClick={()=>handlecategorySubmit(cat)} className="category-btn-box">
                                        <button className="button-wide button-fill-clr">
                                            <img clasName="img-fluid m-auto" src={catImg} alt="" />
                                        </button>
                                            <h6 className="mt-2">{cat.name}</h6>
                                    </div>
                                </div>
                                ) )
                            )} */}
                    </div>
                </div>
                < Footer />
                {
                    doShowModal && (
                        <ModalExit data={modalExitData} />
                    )
                }
                
            </div>
        
        </>
    )
};
