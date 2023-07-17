import React, { useEffect, useState } from 'react'
import '../css/navbar.css'
import {Link} from 'react-router-dom'
import { useContext } from "react";
import { color } from "../../App";
import BMCC from '../../userhome/assets/logo.jpg'
import Avatar from '@mui/material/Avatar';
import marilao from '../../userhome/assets/marilao.jpg'
import mayor from '../../userhome/assets/hl.png'
import LoopingRhombusesSpinner from '../../userhome/loadingDesign/loading';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import moment from 'moment';

function Navbar() {
  const { colorlist,logolist } = useContext(color);
  const [currentDateTime, setCurrentDateTime] = useState(moment().format('MMMM Do YYYY, h:mm:ss a'));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
    {colorlist && logolist ? (<div className='headnavfont' style={{display:'flex',flexDirection:'column'}}>
      <div style={{width:'100%',height:'40px',backgroundColor:colorlist.bgColor,display:'flex',justifyContent:'space-between'}}>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',color:'white',marginLeft:'20px'}}>
          {currentDateTime}
        </div>
        <div style={{display:'flex',justifyContent:'space-between',width:'100px',alignItems:'center',marginRight:'20px',color:'white'}}>
          <FacebookIcon/>
          <YouTubeIcon/>
          <MailOutlineIcon/>
        </div>
      </div>
        <div className='lheadbmcc' style={{display:'flex',justifyContent:'space-between'}}>
          <div style={{width:'50%',display:'flex'}}>
            <div className="lheadlogo" style={{margin:'2px'}}>
            <Avatar
            className='bmccava'
            alt="BMCC"
            src={logolist[0].logo}
            sx={{ width: 86, height: 86 }}
                />
            </div>
            <div className='bmccslog'>
                <h1 style={{color:colorlist.bgColor,margin:'10px'}}>Pondo para sa Iskolar ng Bayan<br/> ng Marilao</h1>
            </div>
            </div>
          
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
                    src={logolist[1].logo}
                    sx={{ width: 56, height: 56 }}
                  />
            </div>
            </div>
        </div>
        <div style={{width:'100%',height:'55px',backgroundColor: colorlist.bgColor,fontFamily:'"Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                  display:'flex',justifyContent:'space-around',justifyContent:'center',alignItems:'center'}}>
            <ul style={{display:'flex',listStyleType:'none',justifyContent:'space-around',alignItems:'center',width:'100%',margin:0}}>
                <li><Link style={{color:'white',fontWeight:1000,textDecoration:'none'}} to='/'> HOME </Link></li>
                <li><Link style={{color:'white',fontWeight:1000,textDecoration:'none'}} to='/About'> ABOUT </Link></li>
                <li><Link style={{color:'white',fontWeight:1000,textDecoration:'none'}} to='/Contact'> CONTACT </Link></li>
                <li><Link style={{color:'white',fontWeight:1000,textDecoration:'none'}} to='/Scholarship'> SCHOLARSHIP </Link></li>
                <li><Link style={{color:'white',fontWeight:1000,textDecoration:'none'}} to='/FAQs'> FAQs </Link></li>
                <li><Link style={{color:'white',fontWeight:1000,textDecoration:'none'}} to='/login'> SIGN-IN </Link></li>
            </ul>

        </div>

    </div>) :(
      <>
      <div style={{width:'100vw',height:'100vh'}}>
        <LoopingRhombusesSpinner/>
      </div>
    </>
    )}
    </>
  )
}

export default Navbar