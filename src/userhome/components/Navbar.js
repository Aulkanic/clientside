import React, { useEffect, useState } from 'react'
import './../css/mainpage.css'
import './../css/Navbar.css'
import Logo from './../assets/scholar.png'
import {Link} from 'react-router-dom'
import { FetchingProfileUser, Logoutuser,Colorlist } from '../../Api/request'
import LoopingRhombusesSpinner from '../loadingDesign/loading'
import Avatar from '@mui/material/Avatar';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Navbar = () => {

    const data = localStorage.getItem('ApplicantNum');
    const value = JSON.parse(data);
    const data1 = localStorage.getItem('ApplicantionNumber');
    const [picture, setProfile] = React.useState([]);
    const [loading,Setloading] = useState(false);
    const [color,setColor] = useState([])

    useEffect(() => {
      Setloading(true)
      FetchingProfileUser.FETCH_PROFILEUSER(value).then((response) => {
        setProfile(response.data.Profile);
        Setloading(false)       
      });
      Colorlist.FETCH_COLOR().then((res) =>{
          setColor(res.data.result[0])
      })
    },[]);
    const profile = picture?.map((data) =>{
  
      return (
        <>
                <div className='profile'>
                <Avatar
                  alt="No Image"
                  src={data.profile}
                  sx={{ width: '100%', height: '100%' }}
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
    const applicantNum = value;
    const formData = new FormData();
    formData.append('applicantNum',applicantNum)
     const response = await Logoutuser.USER_LOGOUT(formData)
     console.log(response)
      localStorage.setItem('ApplicantNum', '');
      localStorage.setItem('LoggedIn', 'false');
  }
  return (
    <React.Fragment>
    <div className='scho-info' style={{backgroundColor:color.bgColor,border:'2px solid black'}}>
    {profile}
    </div>
    <div className='navbar'>
            <div className='navsec' style={{backgroundColor:color.bgColor1}}>
                <ul>
                    <Link to='/home' className='link' style={{color:color.bgColor,textDecoration:'none'}}>HOME</Link>
                    <Link to='/account' className='link' style={{color:color.bgColor,textDecoration:'none'}}>ACCOUNTS</Link>
                    <Link to='/scholar' className='link' style={{color:color.bgColor,textDecoration:'none'}}>
                    <div className="dropdown">
                    <Link to='/scholar' className='droptbn' style={{color: color.bgColor, textDecoration: 'none'}}>SCHOLAR</Link>
                    <div className="dropdown-content" style={{backgroundColor:color.bgColor1}}>
                     <Link to='/scholar' className='link' style={{color:color.bgColor,textDecoration:'none'}}>Document</Link>
                     <Link to='/scholar/info' className='link' style={{color:color.bgColor,textDecoration:'none'}}>Appointment</Link>
                    </div>
                    </div>
                      </Link>
                     <Link to='/news' style={{color:color.bgColor,textDecoration:'none'}}>NEWS</Link>
                     <Link to='/announcement' style={{color:color.bgColor,textDecoration:'none'}}>ANNOUNCEMENT</Link>
                     <Link to='/trivia' style={{color:color.bgColor,textDecoration:'none'}}>TRIVIA</Link>
                     <Link to='/' onClick={signout} style={{color:color.bgColor,textDecoration:'none'}}>LOGOUT</Link>
                </ul>
            </div>
    </div>


    </React.Fragment>
  )
}

export default Navbar