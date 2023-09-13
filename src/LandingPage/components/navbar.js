import React, { useEffect, useState } from 'react'
import '../css/navbar.css'
import {Link} from 'react-router-dom'
import { useContext } from "react";
import { color } from "../../App";
import Avatar from '@mui/material/Avatar';
import marilao from '../../userhome/assets/marilao.jpg'
import LoopingRhombusesSpinner from '../../userhome/loadingDesign/loading';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import moment from 'moment';
import MenuIcon from '@mui/icons-material/Menu';

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
    {colorlist && logolist ? (
    <div className='headnavfont' style={{display:'flex',flexDirection:'column'}}>
        <div className='timelink' style={{width:'100%',height:'40px',backgroundColor:colorlist[0].bgColor,display:'flex',justifyContent:'space-between'}}>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',color:'white',marginLeft:'20px'}}>
          {currentDateTime}
        </div>
        <div style={{display:'flex',justifyContent:'space-between',width:'100px',alignItems:'center',marginRight:'20px',color:'white'}}>
        <a href={colorlist[0].fblink} target="_blank" rel="noopener noreferrer">
           <FacebookIcon sx={{color:'blue'}} />
        </a>
        <a href={colorlist[0].ytlink} target="_blank" rel="noopener noreferrer">
          <YouTubeIcon sx={{color:'red'}}/>
        </a>
        <a href={`mailto:${colorlist[0].email}`}>
          <MailOutlineIcon sx={{color:'red'}}/>
        </a>
        </div>
        </div>
        <div className='lheadbmcc'>
          <div className='leftlogo' style={{display:'flex'}}>
            <div className="lheadlogo">
            <img
            className='bmccava'
            alt="BMCC"
            src={logolist[0].logo}
                />
            </div>
            <div className='bmccslog'>
                <h1 style={{color:colorlist[0].bgColor,margin:'10px',marginLeft:'0px'}}>Pondo para sa Iskolar ng Bayan<br/> ng Marilao</h1>
            </div>
            </div>
          
            <div className='rightlogo'>
            <div style={{margin:'2px'}}>
                      <Avatar
                        alt="Remy Sharp"
                        src="https://drive.google.com/uc?id=1HsYAs1azfEEjkJDjPKQaWjhorcW1W0T6"
                        sx={{ width: 56, height: 56 }}
                      />
                </div>
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
        <div className='navstabs' style={{backgroundColor: colorlist[0].bgColor}}>
            <div className='menu'>
            <MenuIcon />
            </div>
            <ul style={{listStyleType:'none',justifyContent:'space-around',alignItems:'center',width:'100%',margin:0,marginLeft:'25px'}}>
        <a href='#home' style={{color:'white',fontWeight:1000,textDecoration:'none'}}> HOME </a>
        <a href='#about' style={{color:'white',fontWeight:1000,textDecoration:'none'}}> ABOUT </a>
        <a href='#contact' style={{color:'white',fontWeight:1000,textDecoration:'none'}}> CONTACT </a>
        <a href='#Scholarshipprogram' style={{color:'white',fontWeight:1000,textDecoration:'none'}}> SCHOLARSHIP </a>
        <a href='#Faqs' style={{color:'white',fontWeight:1000,textDecoration:'none'}}> FAQS </a>
        <Link to='/login' style={{color:'white',fontWeight:1000,textDecoration:'none'}}> SIGN-IN </Link>

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