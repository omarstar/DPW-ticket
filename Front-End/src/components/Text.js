import React from 'react'
import { useSelector } from 'react-redux'
import { getLocalTranslate } from '../utils/language';

export default function Text({name}) {
    console.log(name);
    let {CurrentLang} = useSelector((state) => state.app);
    
    return (
        <div>{getLocalTranslate(name,CurrentLang)}</div>
    )
}
