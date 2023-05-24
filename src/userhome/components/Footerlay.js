import React from 'react'
import Location from './../assets/location.png'
import Contact from './../assets/contact.png'
import WWW from './../assets/www.png'
import './../css/footerlay.css'

const footer = () => {
  return (
    <div>
        <div className='footer'>
            <div className='copyr'>
                <p>Terms of Service</p>
            </div>
            <div className='location'>
                <img src={Location} alt="" /><span>Tabing Ilog Marilao, Bulacan</span>
            </div>
            <div className='contact'>
                <img src={Contact} alt="" /><span>0922343232</span>
            </div>
            <div className='url'>
                <img src={WWW} alt="" /><span>http://Marisko.com</span>
            </div>
        </div>
    </div>
  )
}

export default footer