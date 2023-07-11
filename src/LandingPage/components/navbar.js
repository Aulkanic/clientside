import React, { useEffect, useState } from 'react'
import '../css/navbar.css'
import {Link} from 'react-router-dom'
import { Colorlist } from '../../Api/request'
import BMCC from '../../userhome/assets/logo.jpg'
import Avatar from '@mui/material/Avatar';
import marilao from '../../userhome/assets/marilao.jpg'
import mayor from '../../userhome/assets/hl.png'
<div style={{margin:'2px'}}>
<Avatar
alt="Remy Sharp"
src={marilao}
sx={{ width: 56, height: 56 }}
/>
</div>

function Navbar() {
  const [colorlist,setColorlist] = useState([])

  useEffect(() =>{
    async function Fetch(){
      const res = await Colorlist.FETCH_COLOR()
      setColorlist(res.data.result[0])
    }
    Fetch()
  })
  return (
    <>
    <div style={{display:'flex'}}>
        <div className='lheadbmcc' style={{backgroundColor:colorlist.bgColor}}>
            <div className="lheadlogo" style={{margin:'2px'}}>
            <Avatar
        alt="Remy Sharp"
        src={BMCC}
        sx={{ width: 56, height: 56 }}
            />
            </div>
            <div className='bmccslog'>
                <h1 style={{color:colorlist.bgColor1,margin:'10px'}}>Pondo para sa Iskolar ng Bayan</h1>
            </div>
        </div>
        <div style={{margin:'0px',width:'100%',height:'65px',backgroundColor: colorlist.bgColor1,fontFamily:'"Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                  display:'flex',justifyContent:'space-around'}}>
            <ul style={{display:'flex',listStyleType:'none',justifyContent:'space-around',alignItems:'center',width:'60%'}}>
                <li><Link style={{color:colorlist.bgColor,fontWeight:1000,textDecoration:'none'}} to='/'> HOME </Link></li>
                <li><Link style={{color:colorlist.bgColor,fontWeight:1000,textDecoration:'none'}} to='/About'> ABOUT </Link></li>
                <li><Link style={{color:colorlist.bgColor,fontWeight:1000,textDecoration:'none'}} to='/Contact'> CONTACT </Link></li>
                <li><Link style={{color:colorlist.bgColor,fontWeight:1000,textDecoration:'none'}} to='/Scholarship'> SCHOLARSHIP </Link></li>
                <li><Link style={{color:colorlist.bgColor,fontWeight:1000,textDecoration:'none'}} to='/FAQs'> FAQs </Link></li>
                <li><Link style={{color:colorlist.bgColor,fontWeight:1000,textDecoration:'none'}} to='/login'> SIGN-IN </Link></li>
            </ul>
            <div style={{display:'flex'}}>
            <div style={{margin:'2px'}}>
                  <Avatar
                    alt="Remy Sharp"
                    src={marilao}
                    sx={{ width: 56, height: 56 }}
                  />
            </div>
            <div style={{margin:'2px'}}>
                  <Avatar
                    alt="Remy Sharp"
                    src={mayor}
                    sx={{ width: 56, height: 56 }}
                  />
            </div>
            </div>
        </div>

    </div>
    </>
  )
}

export default Navbar