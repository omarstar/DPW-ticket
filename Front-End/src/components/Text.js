import React from 'react'
import { useSelector } from 'react-redux'
import { getLocalTranslate } from '../utils/language';

export default function Text({name, realign = false}) {
    console.log(name, realign);
    let {CurrentLang} = useSelector((state) => state.app);
    const reorderStyle = realign ? (CurrentLang === 'ar' ?"reorder-text ml-2" : 'mr-2') : '';
    
    return (
        <div>{getLocalTranslate(name,CurrentLang)}</div>
    )
}
