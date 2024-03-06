import React, { useEffect, useState } from 'react'
import '../css/navbar.css'
import {Link} from 'react-router-dom'
import { useContext } from "react";
import { color } from "../../App";
import Avatar from '@mui/material/Avatar';
import marilao from '../../userhome/assets/marilao.jpg'
import Bmcc from '../../userhome/assets/logo.jpg'
import MYDO from '../Assets/mydo.png'
import LoopingRhombusesSpinner from '../../userhome/loadingDesign/loading';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import moment from 'moment';
import MenuIcon from '@mui/icons-material/Menu';
import { MdOutlineClear } from "react-icons/md";
import clsx from 'clsx';
import { fetchImageFromProxy } from '../../helper/fetchImage';
import { Image } from 'antd';

function Navbar() {
  const { colorlist,logolist } = useContext(color);
  const [open,setOpen] = useState(false)
  const [bmccLogo, setBmccLogo] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(moment().format('MMMM Do YYYY, h:mm:ss a'));
  useEffect(() => {
    // Fetch BMCC logo using fetchImageFromProxy function
    fetchImageFromProxy(logolist[0].logo)
      .then((response) => {
        // Set the BMCC logo in state
        setBmccLogo(response);
      })
      .catch((error) => {
        console.error('Error fetching BMCC logo:', error);
      });
  }, [logolist]);
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
    <div className='flex flex-col bg-white'>
        <div className='flex justify-between items-center h-18 py-2 px-2' style={{backgroundColor:colorlist[0].bgColor}}>
        <div className='flex text-white'>
          {currentDateTime}
        </div>
        <div className='flex gap-2 hidden md:flex'>
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
        <div className='flex justify-between h-20'>
            <div className='flex flex-1 gap-2'>
              <div className="w-16 md:w-24 h-16 md:h-24 relative border-2 md:border-4 rounded-full ml-2 mt-2 md:mt-4 z-50" 
              style={{borderColor:colorlist[0].bgColor}}>
              <img
              className='w-full bg-white h-full object-cover rounded-full absolute'
              alt="BMCC"
              src={MYDO}
              />
              </div>
              <div className='p-2'>
                  <h1 className='text-md md:text-2xl font-bold' style={{color:colorlist[0].bgColor}}>
                    Pondo para sa Iskolar ng Bayan<br/> ng Marilao
                  </h1>
              </div>
            </div>
            <div className='hidden md:flex flex-1 justify-end items-center pr-2 gap-2'>
                <div>
                      <Avatar
                        alt="Remy Sharp"
                        src={Bmcc}
                        sx={{ width: 56, height: 56 }}
                      />
                </div>
                <div>
                      <Avatar
                        alt="Remy Sharp"
                        src={marilao}
                        sx={{ width: 56, height: 56 }}
                      />
                </div>
                <div>
                      <Avatar
                        alt="Remy Sharp"
                        src={logolist[1].logo}
                        sx={{ width: 56, height: 56 }}
                      />
                </div>
            </div>
        </div>
        <div className='flex h-14 items-center' style={{backgroundColor: colorlist[0].bgColor}}>
            <div className='block md:hidden text-white pl-4 text-2xl'>
            <MenuIcon onClick={() => setOpen(!open)}/>
            </div>
            <ul className='hidden md:flex list-none w-full justify-between px-4 ml-32'>
              <a href='#home' style={{color:'white',fontWeight:1000,textDecoration:'none'}}> HOME </a>
              <a href='#about' style={{color:'white',fontWeight:1000,textDecoration:'none'}}> ABOUT </a>
              <a href='#contact' style={{color:'white',fontWeight:1000,textDecoration:'none'}}> CONTACT </a>
              <a href='#Scholarshipprogram' style={{color:'white',fontWeight:1000,textDecoration:'none'}}> SCHOLARSHIP </a>
              <a href='#Faqs' style={{color:'white',fontWeight:1000,textDecoration:'none'}}> FAQS </a>
              <Link to='/login' style={{color:'white',fontWeight:1000,textDecoration:'none'}}> SIGN-IN </Link>
            </ul>
        </div>
        <div className={clsx('transition-all duration-500 ease-in fixed flex flex-col h-[400px] z-40 bg-gray-600 w-full', open ? 'top-0' : 'top-[-400px]')}>
          <div className='relative w-full h-16 flex justify-end bg-registration-image backdrop-saturate-50 bg-white/30'>
            <div className='w-full z-0 absolute top-0 h-16 backdrop-blur-sm bg-white/30'>
            </div>
          </div>
          <div className='py-2 px-8'>
            <ul className='flex flex-col gap-8'>
              <li><a href='#home' style={{color:'white',fontWeight:1000,textDecoration:'none'}}> HOME </a></li>
              <li><a href='#about' style={{color:'white',fontWeight:1000,textDecoration:'none'}}> ABOUT </a></li>
              <li><a href='#contact' style={{color:'white',fontWeight:1000,textDecoration:'none'}}> CONTACT </a></li>
              <li className='bg-gray-600 hover:bg-gray-400 w-full'><a href='#Scholarshipprogram' style={{color:'white',fontWeight:1000,textDecoration:'none'}}> SCHOLARSHIP </a></li>
              <li className='bg-gray-600 hover:bg-gray-400 w-full'><a href='#Faqs' style={{color:'white',fontWeight:1000,textDecoration:'none'}}> FAQS </a></li>
              <li className='bg-gray-600 hover:bg-gray-400 w-full'><Link to='/login' style={{color:'white',fontWeight:1000,textDecoration:'none'}}> SIGN-IN </Link></li>
            </ul>
          </div>
          <div className='p-2 absolute top-0'>
              <h1 className='text-md md:text-2xl z-50 font-bold'>
                Pondo para sa Iskolar ng Bayan<br/> ng Marilao
              </h1>
          </div>
          <div className='absolute right-20 top-4 z-50 text-3xl'>
            <MdOutlineClear onClick={() => setOpen(!open)} className='text-white z-50'/>
          </div>
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