import React from 'react'
import Avatar from '@mui/material/Avatar';
import BMCC from '../../userhome/assets/logo.jpg'
import marilao from '../../userhome/assets/marilao.jpg'
import mayor from '../../userhome/assets/hl.png'
import HeadBmcc from '../../userhome/assets/headerBmcc.png'
import {Link} from 'react-router-dom'
import '../css/header.css'
function header() {
    return (
        <>
<div className='lHeader'>
     <div className='lheadbmcc'>
        <div className="lheadlogo">
            <img src={BMCC} alt="" />
        </div>
        <div className='bmccslog'>
            <h1>Pondo para sa Iskolar ng Bayan</h1>
            <h2>"Batang Marilenyo Protektado."</h2>
        </div>
     </div>
</div>
</>
      )
}

export default header