import React from 'react'
import { useSelector } from 'react-redux'
import { getLocalTranslate } from '../utils/language';

export default function Text({name, realign = false}) {
    let {CurrentLang} = useSelector((state) => state.app);
    const reorderStyle = realign ? (CurrentLang === 'ar' ?"reorder-text mx-2" : 'mx-2') : '';
    
    return (
        <div className={reorderStyle} dangerouslySetInnerHTML={{ __html: getLocalTranslate(name,CurrentLang)}} />
    )
}
