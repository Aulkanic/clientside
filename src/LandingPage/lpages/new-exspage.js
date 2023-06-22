import React from 'react'
import Lheader from '../components/header'
import { Link } from 'react-router-dom'
import '../css/newexpage.css'
function newexspage() {
  return (
    <>
    <Lheader/>
    <div className='newexpage'>
      <h1>Login your Account in .... </h1>
        <div className='lexpage'>
           <Link className='gotolog' to='/login'>WEBSITE APPLICATION</Link> 
        </div>
        <div className='lnewpage'>
           <Link className='gotoreg' to='/register'>MOBILE APPLICATION</Link>
        </div>
    </div>
    </>
  )
}

export default newexspage