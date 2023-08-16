import React, { useEffect, useState } from 'react'
import './../css/mainpage.css'
import './../css/Navbar.css'
import {Link} from 'react-router-dom'
import { FetchingProfileUser, Logoutuser,Colorlist } from '../../Api/request'
import Avatar from '@mui/material/Avatar';
import { useContext } from "react";
import { color } from "../../App";
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { setLoggedIn,setUserDetails } from '../../Redux/loginSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const { userdetails,LoggedIn } = useSelector((state) => state.login);
    const { colorlist} = useContext(color);
    const data = userdetails.applicantNum;
    const [picture, setProfile] = React.useState([]);
    const [loading,Setloading] = useState(false);
    useEffect(() => {
      Setloading(true)
      FetchingProfileUser.FETCH_PROFILEUSER(data).then((response) => {
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
      await Logoutuser.USER_LOGOUT(formData)
      dispatch(setLoggedIn(false));
      dispatch(setUserDetails([]))
  }
  return (
    <React.Fragment>
    <div className='scho-info' style={{backgroundColor:colorlist[0].bgColor,border:'2px solid black'}}>
    {profile}
    </div>
    <div className='navbarh'>
            <div className='navsec' style={{backgroundColor:colorlist[0].bgColor1,margin:'0px'}}>
                <ul>
                    <Link to='/home' className='link' style={{color:colorlist[0].bgColor,textDecoration:'none'}}>HOME</Link>
                    <Link to='/account' className='link' style={{color:colorlist[0].bgColor,textDecoration:'none'}}>ACCOUNTS</Link>
                    <Link to='/scholar' className='link' style={{color:colorlist[0].bgColor,textDecoration:'none'}}>
                    <div className="dropdown">
                    <Link to='/scholar' className='droptbn' style={{color: colorlist[0].bgColor, textDecoration: 'none'}}>SCHOLAR</Link>
                    <div className="dropdown-content" style={{backgroundColor:colorlist[0].bgColor1}}>
                     <Link to='/scholar' className='link' style={{color:colorlist[0].bgColor,textDecoration:'none'}}>Document</Link>
                     <Link to='/scholar/info' className='link' style={{color:colorlist[0].bgColor,textDecoration:'none'}}>Appointment</Link>
                    </div>
                    </div>
                      </Link>
                     <Link to='/news' style={{color:colorlist[0].bgColor,textDecoration:'none'}}>NEWS</Link>
                     <Link to='/announcement' style={{color:colorlist[0].bgColor,textDecoration:'none'}}>ANNOUNCEMENT</Link>
                     <Link to='/trivia' style={{color:colorlist[0].bgColor,textDecoration:'none'}}>TRIVIA</Link>
                     <Link to='/' onClick={signout} style={{color:colorlist[0].bgColor,textDecoration:'none'}}>LOGOUT</Link>
                </ul>
            </div>
    </div>


    </React.Fragment>
  )
}

export default Navbar