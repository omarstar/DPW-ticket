import React, { useEffect, useState } from 'react'

import '../../includes/header/header.css'
import '../../includes/footer/footer.css'
import homeCircleImg from '../../../images/home-circle.svg'
import jafzaLogoColor from '../../../images/JAFZA_Logo_Color.svg'
import footerBGshape from '../../../images/footer-sky-bg.svg'
import '../../common.css';
import "./servicesList.css"
import catImg from '../../../images/service-svgrepo-white-com.svg'

import { isShowModal, setCategory, setLoading, setModal } from '../../../reducers';
import { useDispatch, useSelector } from 'react-redux';
import ModalExit from '../../includes/modal/ModalExit'
import { useNavigate } from 'react-router-dom'
import Loading from '../../includes/loading/loading'
import { golobalVariables } from '../../../services/api'
import { categoryListObject } from '../../../utils/constants'

export default function CategoryList(params) {
    // category list
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let {loading} = useSelector((state) => state.app);
    const doShowModal = useSelector(isShowModal);

    const modalExitData = {
        titleText: "Are you sure you want to cancel and start the process over again?",
        buttonOptions: [{
            text: "Yes",
            buttonAction: () => {
                dispatch(setModal(false))
                navigate("/")
            }
        },
        {
            text: "No",
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
                <div id="page" className="page-layout d-flex justify-content-center">
                    
                    <div className="title-box d-flex flex-column justify-content-center align-items-center">
                        <div className="title-black">Please select a category</div>
                            <div id="walkin-services-list" className="services-list-box row mx-0">
                            {
                            loading ? (
                                <Loading hSpacer="h-25" />
                            ) : (
                           
                            categoryList && categoryList.map((cat, index) =>  (
        
                                <div key={index} id="cat-img-btn" className="button-category-item col-5">
                                    <div onClick={()=>handlecategorySubmit(cat)} className="category-btn-box">
                                        <button className="button-wide button-fill-clr cat-img-box">
                                            <img clasName="img-fluid img-rat m-auto" src={catImg} alt="" />
                                        </button>
                                            <h6 className="mt-2 cat-text">{cat.name}</h6>
                                    </div>
                                </div>
                                ) )
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
                <div className="footer-section">
                    <img id="footer-img-bg"  src={footerBGshape} className="footer-img-icon" alt="background shape" />
                </div>
                {
                    doShowModal && (
                        <ModalExit data={modalExitData} />
                    )
                }
                
            </div>
        
        </>
    )
};
