import React from 'react'
import LoaderSVG from '../images/loader.svg'
export default function Loader() {
    return (
        <div className='loader-container'>
            <img src={LoaderSVG} alt='Loading...'/>
        </div>
    )
}
