import React from 'react'
import '../css/navbar.css'
import {Link} from 'react-router-dom'
function navbar() {
  return (
    <>
    <div className='lnav'>
        <ul>
            <li><Link className='lulli' to='/'>Home</Link></li>
            <li><Link className='lulli' to='/About'>About</Link></li>
            <li><Link className='lulli' to='/Contact'>Contact</Link></li>
            <li><Link className='lulli' to='/Scholarship'>ScholarShip</Link></li>
            <li><Link className='lulli' to='/FAQs'>FAQs</Link></li>
            <li><Link className='lulli' to='/login'>Signin</Link></li>
        </ul>
    </div>

    </>
  )
}

export default navbar