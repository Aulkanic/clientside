import React from 'react'
import '../css/navbar.css'
import {Link} from 'react-router-dom'

function navbar() {
  return (
    <>
    <div className='lnav'>
        <ul>
            <li><Link className='lulli' to='/'> HOME </Link></li>
            <li><Link className='lulli' to='/About'> ABOUT </Link></li>
            <li><Link className='lulli' to='/Contact'> CONTACT </Link></li>
            <li><Link className='lulli' to='/Scholarship'> SCHOLARSHIP </Link></li>
            <li><Link className='lulli' to='/FAQs'> FAQs </Link></li>
            <li><Link className='lulli' to='/login'> SIGN-IN </Link></li>
        </ul>
    </div>
    </>
  )
}

export default navbar