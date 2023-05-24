import React from 'react'
import Lheader from '../components/header'
import { Link } from 'react-router-dom'
import '../css/newexpage.css'
function newexspage() {
  return (
    <>
    <Lheader/>
    <div className='newexpage'>
      <h1>CONTINUE AS .... </h1>
        <div className='lexpage'>
           <Link className='gotolog' to='/login'>EXISTING SCHOLAR</Link> 
        </div>
        <div className='lnewpage'>
           <Link className='gotoreg' to='/register'>NEW APPLICANTS</Link>
        </div>
    </div>
    </>
  )
}

export default newexspage