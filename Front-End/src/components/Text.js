import React from 'react'
import { useSelector } from 'react-redux'
import { getLocalTranslate } from '../utils/language';

export default function Text({name, realign = false, ff = "ff-bold"}) {
    let {CurrentLang} = useSelector((state) => state.app);
    const reorderStyle = realign ? (CurrentLang === 'ar' ?"reorder-text mx-2" : 'mx-2') : '';
    const ffArStyle = (CurrentLang === 'ar' ? 'footer-ff-ar' : ff)
    // 'ff-bold ' + 
    return (
        <div className={reorderStyle+' '+ffArStyle} dangerouslySetInnerHTML={{ __html: getLocalTranslate(name,CurrentLang)}} />
    )
}
