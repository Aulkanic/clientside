import React, { useEffect, useState } from 'react'
import './../css/mainpage.css'
import './../css/Navbar.css'
import Logo from './../assets/scholar.png'
import {Link} from 'react-router-dom'
import { FetchingProfileUser, Logoutuser,Colorlist } from '../../Api/request'
import LoopingRhombusesSpinner from '../loadingDesign/loading'
import Avatar from '@mui/material/Avatar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useContext } from "react";
import { color } from "../../App";

const Navbar = () => {
    const { colorlist,imgList,logolist } = useContext(color);
    const detail = JSON.parse(localStorage.getItem('User'));
    const data = detail.applicantNum;
    const [picture, setProfile] = React.useState([]);
    const [loading,Setloading] = useState(false);
    useEffect(() => {
      Setloading(true)
      FetchingProfileUser.FETCH_PROFILEUSER(data).then((response) => {
        console.log(response)
        setProfile(response.data.Profile);
        Setloading(false)       
      });
    },[]);
    const profile = picture?.map((data) =>{
  
      return (
        <>
                <div className='profile'>
                <Avatar
                  alt="No Image"
                  src={data.profile}
                  sx={{ width: '80px', height: '80px' }}
                />
                </div>
                <div className='info'>
                    <div className='details' style={{color:'white'}}>
                        <strong>Name:</strong><small>{data.Name}</small><br />
                        <strong>Application Number:</strong><small>{data.applicantCode}</small><br />
                        <strong>STATUS:</strong><small><span className='stat'>{data.status}</span></small>
                    </div>
                </div>

        </>
      );
    });
 async function signout() {
    const applicantNum = data;
    const formData = new FormData();
    formData.append('applicantNum',applicantNum)
     const response = await Logoutuser.USER_LOGOUT(formData)
     console.log(response)
      localStorage.setItem('ApplicantNum', '');
      localStorage.setItem('LoggedIn', 'false');
  }
  return (
    <React.Fragment>
    <div className='scho-info' style={{backgroundColor:colorlist.bgColor,border:'2px solid black'}}>
    {profile}
    </div>
    <div className='navbarh'>
            <div className='navsec' style={{backgroundColor:colorlist.bgColor1,margin:'0px'}}>
                <ul>
                    <Link to='/home' className='link' style={{color:colorlist.bgColor,textDecoration:'none'}}>HOME</Link>
                    <Link to='/account' className='link' style={{color:colorlist.bgColor,textDecoration:'none'}}>ACCOUNTS</Link>
                    <Link to='/scholar' className='link' style={{color:colorlist.bgColor,textDecoration:'none'}}>
                    <div className="dropdown">
                    <Link to='/scholar' className='droptbn' style={{color: colorlist.bgColor, textDecoration: 'none'}}>SCHOLAR</Link>
                    <div className="dropdown-content" style={{backgroundColor:colorlist.bgColor1}}>
                     <Link to='/scholar' className='link' style={{color:colorlist.bgColor,textDecoration:'none'}}>Document</Link>
                     <Link to='/scholar/info' className='link' style={{color:colorlist.bgColor,textDecoration:'none'}}>Appointment</Link>
                    </div>
                    </div>
                      </Link>
                     <Link to='/news' style={{color:colorlist.bgColor,textDecoration:'none'}}>NEWS</Link>
                     <Link to='/announcement' style={{color:colorlist.bgColor,textDecoration:'none'}}>ANNOUNCEMENT</Link>
                     <Link to='/trivia' style={{color:colorlist.bgColor,textDecoration:'none'}}>TRIVIA</Link>
                     <Link to='/' onClick={signout} style={{color:colorlist.bgColor,textDecoration:'none'}}>LOGOUT</Link>
                </ul>
            </div>
    </div>


    </React.Fragment>
  )
}

export default Navbar