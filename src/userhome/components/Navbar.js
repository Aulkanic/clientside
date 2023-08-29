import React, { useEffect, useState } from 'react'
import './../css/mainpage.css'
import './../css/Navbar.css'
import {Link} from 'react-router-dom'
import { FetchingProfileUser, Logoutuser,FetchNotif,ReadNotifi } from '../../Api/request'
import Avatar from '@mui/material/Avatar';
import { useContext } from "react";
import { color } from "../../App";
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { setLoggedIn,setUserDetails } from '../../Redux/loginSlice';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import emptyNotif from '../assets/emptynot.png'
import MYDO from '../assets/mydo.png'

const Navbar = () => {
    const dispatch = useDispatch();
    const { userdetails,LoggedIn } = useSelector((state) => state.login);
    const { colorlist} = useContext(color);
    const data = userdetails.applicantNum;
    const [picture, setProfile] = React.useState([]);
    const [notification, setNotification] = React.useState([]);
    const [loading,Setloading] = useState(false);
    const [state, setState] = React.useState(false);
    const toggleDrawer = ( open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState(true);
    };

    useEffect(() => {
      Setloading(true)
      FetchingProfileUser.FETCH_PROFILEUSER(data).then((response) => {
        setProfile(response.data.Profile);

      });
      const formData = new FormData();
      formData.append('applicantNum',data)
      FetchNotif.FETCH_NOTIF(formData).then((response) => {
        const rev = response.data
        setNotification(rev.reverse());
      });
      Setloading(false)
    },[]);

    const SetReadNotif = async(val) =>{
      const formData = new FormData();
      formData.append('notifId',val)
      formData.append('applicantNum',data)
     await ReadNotifi.READ_NOTIFICATION(formData)
     .then((response)=>{
        setNotification(response.data)
      })
    }

    const list = () => (
      <Box
      sx={{width:'400px',backgroundColor:'white'}}
        role="presentation"
        onClick={toggleDrawer('right', false)}
        onKeyDown={toggleDrawer('right', false)}
      >
      {notification.length > 0 ? (<div>
      {notification?.map((data,index) =>{
        let content;
        if(data.content.length <= 30){
          content = <p className='truncated-text'>{data.content}</p>
        }else{
          const truncated = data.content.substring(0, 30) + '...';
          content = <p className='truncated-text'>{truncated}</p>
        }
        return (
          <div key={index} onClick={() => SetReadNotif(data.id)} className='notifcontainer'>
            <img src={MYDO} alt="" />
            <div style={{display:'flex',flexDirection:'column'}}>
            <p style={{
              fontWeight:'700',
              margin:'0'
            }}>{data.title}</p><span>{data.date}</span>
            {content}
            </div>
          </div>
        )
      })}
      </div>) : (<div className='nonotif'>
      <img src={emptyNotif} alt="" />
      <p>Empty Notification</p>

      </div>)}
      </Box>
    );

    const profile = picture?.map((data,index) =>{
        const notifCount = notification?.filter(data => data.remarks === 'unread').length
      return (
        <>
          <div key={index} className='nameprof'>
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
          </div>
          <div className='notif'>
                <Badge badgeContent={notifCount} color="error"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    width: '35px',
                    height: '30px',
                    cursor:'pointer'
                  }}
                  >
                <NotificationsRoundedIcon 
                sx={{color:'white',fontSize:'55px'}}
                onClick={toggleDrawer(true)}               
                />
                </Badge>
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
              <Drawer
                anchor={'right'}
                open={state}
                onClose={() => setState(false)}
              >
                <h1 style={{color:'#1c1e21',padding:'10px',fontSize:'25px'}}>Notifications</h1>
                {list(state)}
              </Drawer>
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