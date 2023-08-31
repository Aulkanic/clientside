import React, { useEffect, useState } from 'react'
import './../css/mainpage.css'
import './../css/Navbar.css'
import {Link} from 'react-router-dom'
import { FetchingProfileUser, Logoutuser,FetchNotif,ReadNotifi,FetchingBmccSchoinfo } from '../../Api/request'
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
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import emptyNotif from '../assets/emptynot.png'
import MYDO from '../assets/mydo.png'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius:'10px'
};

const Navbar = () => {
    const dispatch = useDispatch();
    const { userdetails,LoggedIn } = useSelector((state) => state.login);
    const { colorlist} = useContext(color);
    const applicantNum = userdetails.applicantNum;
    const [picture, setProfile] = React.useState([]);
    const [scholar,setScholar] = useState([])
    const [notification, setNotification] = React.useState([]);
    const [loading,Setloading] = useState(false);
    const [state, setState] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [notifInf,setNotifDet] = useState([]);
    const handleClose = () => setOpen(false);

    const toggleDrawer = ( open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState(true);
    };

    useEffect(() => {
      Setloading(true)
      FetchingProfileUser.FETCH_PROFILEUSER(applicantNum).then((response) => {
        setProfile(response.data.Profile);
        if(response.data.Profile[0].status === 'Approved'){
          FetchingBmccSchoinfo.FETCH_SCHOLARSINFO(applicantNum)
          .then((res) =>{
            setScholar(res.data.ScholarInf.results2[0])
          })
        }

      });
      FetchNotif.FETCH_NOTIF(applicantNum).then((response) => {
        const rev = response.data
        setNotification(rev.reverse());
      });
      Setloading(false)
    },[]);
    function formatTimeDifference(date) {
      const timestamp = new Date(date)
      const now = new Date();
      const diffInSeconds = Math.floor((now - timestamp) / 1000);
    
      if (diffInSeconds < 10) {
        return "just now";
      } else if (diffInSeconds < 60) {
        return `${diffInSeconds} seconds ago`;
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
      } else {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} ${days === 1 ? 'day' : 'days'} ago`;
      }
    }

const SetReadNotif = async(val) =>{
  setOpen(true)
  setNotifDet(val)
  const formData = new FormData();
  formData.append('notifId',val.id)
  formData.append('applicantNum',applicantNum)
 await ReadNotifi.READ_NOTIFICATION(formData)
 .then((response)=>{
  const rev = response.data
  setNotification(rev.reverse());
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
        const rawDate = data.date.replace("at", ""); // Remove "at" from the date string
        const formattedDate = new Date(rawDate);        
        let content;
        if(data.content.length <= 30){
          content = <p className='truncated-text'>{data.content}</p>
        }else{
          const truncated = data.content.substring(0, 30) + '...';
          content = <p className='truncated-text'>{truncated}</p>
        }
        return (
          <div key={index} onClick={() => SetReadNotif(data)} className='notifcontainer'>
            <img src={MYDO} alt="" />
            <div style={{display:'flex',flexDirection:'column'}}>
            <p style={{
              fontWeight:'700',
              margin:'0'
            }}>{data.title}</p>
            {content}
            {formatTimeDifference(formattedDate)}
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
                        {data.status !== "Approved" ? (
                        <>
                        <strong>Application Number:</strong><small> {data.applicantCode}</small><br />
                        <strong>Application Status:</strong><small><span className='stat'> {data.status}</span></small>
                        </>
                        )
                           : (
                        <>
                        <strong>Scholar Number:</strong><small> {scholar.scholarCode}</small><br />
                        <strong>Scholarship Status:</strong><small><span className='stat'> {scholar.remarks}</span></small>
                        </>)
                           }
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
              <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {notifInf.title}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {notifInf.content}
            </Typography>
          </Box>
        </Fade>
      </Modal>
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