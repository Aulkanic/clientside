import React, { useEffect, useState } from 'react'
import './../css/mainpage.css'
import './../css/Navbar.css'
import {Link, useNavigate} from 'react-router-dom'
import { FetchingProfileUser, Logoutuser,FetchNotif,ReadNotifi,FetchingBmccSchoinfo, ListofReq, ListofSub } from '../../Api/request'
import Avatar from '@mui/material/Avatar';
import { useContext } from "react";
import { color } from "../../App";
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../../Redux/loginSlice';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import emptyNotif from '../assets/emptynot.png'
import MYDO from '../assets/mydo.png';
import { MdOutlineClear } from 'react-icons/md';

const style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius:'5px'
};

const Navbar = () => {
    const dispatch = useDispatch();
    const { userdetails } = useSelector((state) => state.login);
    const { colorlist} = useContext(color);
    const navigate = useNavigate()
    const applicantNum = userdetails.applicantNum;
    const [picture, setProfile] = React.useState([]);
    const [scholar,setScholar] = useState([])
    const [notification, setNotification] = React.useState([]);
    const [state, setState] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [notifInf,setNotifDet] = useState([]);
    const [notSub,setNotSub] = useState(0);
    const [active,setActive] = useState(0)
    const handleClose = () => setOpen(false);

    const toggleDrawer = ( open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState(true);
    };

    useEffect(() => {
      async function fetchData() {
        try {
          const profileUserResponse = await FetchingProfileUser.FETCH_PROFILEUSER(applicantNum);
          setProfile(profileUserResponse.data.Profile);
    
          if (profileUserResponse.data.Profile[0].status === 'Approved') {
            const scholarInfoResponse = await FetchingBmccSchoinfo.FETCH_SCHOLARSINFO(applicantNum);
            setScholar(scholarInfoResponse.data.ScholarInf.results2[0]);
          }
    
          const notifResponse = await FetchNotif.FETCH_NOTIF(applicantNum);
          setNotification(notifResponse.data.reverse());
          const response = await Promise.all([
            ListofReq.FETCH_REQUIREMENTS(),
            ListofSub.FETCH_SUB(applicantNum),
          ]);
          const schoCat = profileUserResponse.data.Profile[0].ScholarshipApplied
          const Batch = profileUserResponse.data.Profile[0].batch
          const listSub = response[1].data.Document
          const RequireDocs = response[0].data.Requirements.results1?.filter(docs => docs.schoName === schoCat && docs.batch === Batch && docs.docsfor === 'Application')
          const Subnot = RequireDocs.length - listSub.length;
          setNotSub(Subnot)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    
      fetchData(); // Fetch data initially
    
      const intervalId = setInterval(fetchData, 5000);
      return () => {
        clearInterval(intervalId);
      };
    }, []);
    
    function formatTimeDifference(date) {
      const timeZone = "Asia/Manila";
      const now = new Date().toLocaleString("en-US", { timeZone });
      const timestamp = new Date(date);
      const nowTimestamp = new Date(now).getTime();
      const timestampTimestamp = new Date(timestamp).getTime();
    
      const diffInSeconds = Math.floor((nowTimestamp - timestampTimestamp) / 1000);
    
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
        const rawDate = data.date.replace("at", ""); 
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
            <div style={{display:'flex',position:'relative'}}>
            <p className={data.remarks === 'unread' ? 'unreadnotif' : 'none'}>{formatTimeDifference(formattedDate)}</p>
            {data.remarks === 'unread' && (<div className='rightnotif'>
                        <div className='circle'></div>
              </div>)}
            </div>

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
                        <strong>Application Status:</strong><small><span className='stat'> {data.remarks}</span></small>
                        </>
                        )
                           : (
                        <>
                        <strong>Scholar Number:</strong><small> {scholar.scholarCode}</small><br />
                        <strong>Scholarship Status:</strong><small><span className='stat'> 
                        {scholar.remarks}</span></small>
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
        dispatch(setUserDetails([]))
    }
  return (
    <>
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
            <button onClick={handleClose} style={{position:'absolute',right:7,top:5,backgroundColor:'red',border:'none',padding:'3px 10px 5px 10px',borderRadius:'5px',color:'white'}}>
              <MdOutlineClear/>
            </button>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {notifInf.title}.
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {notifInf.content}<br/>{notifInf.title === 'Renewal Application' ? (
              <>
              <Link to='/renewal'>Go now</Link>
              </>
            ) : notifInf.link === '' ? null : (<Link to={`/${notifInf.link}`}> Go now.</Link>)}
            </Typography>

          </Box>
        </Fade>
             </Modal>
          <div className='scho-info' style={{backgroundColor:colorlist[0].bgColor}}>
          {profile}
          </div>
          <div className='navbarh'>
                  <div className='navsec' style={{backgroundColor:colorlist[0].bgColor1,margin:'0px',padding:'0px 10px 0px 10px'}}>
                      <ul>
                          <Link  to='/home'  style={{color:'black',textDecoration:'none',fontWeight:'700'}}>
                            HOME
                          </Link>
                          <Link to='/account' style={{color:'black',textDecoration:'none',fontWeight:'700'}}>ACCOUNTS</Link>
                          <Link to='/scholar' style={{color:'black',textDecoration:'none',fontWeight:'700'}}>
                          <div className="dropdown">
                          <Badge 
                            anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }} 
                          sx={{
                            paddingRight:'10px',
                            position:'absolute',
                            right:'-15px',
                            top:'10px'
                          }}                         
                          badgeContent={notSub} color='primary' showZero>
                            </Badge>
                          <Link to='/scholar' className='droptbn' style={{color:'black',textDecoration:'none',fontWeight:'700'}}>SCHOLAR</Link>
                          <div className="dropdown-content" style={{color:'black',textDecoration:'none',fontWeight:'700',backgroundColor:colorlist[0].bgColor1}}>
                          <Link to='/scholar' className='link' style={{color:'black',textDecoration:'none',fontWeight:'700'}}>Document</Link>
                          <Link to='/scholar/info' className='link' style={{color:'black',textDecoration:'none',fontWeight:'700'}}>Appointment</Link>
                          </div>
                          </div>
                          </Link>
                          <Link to='/news' style={{color:'black',textDecoration:'none',fontWeight:'700'}}>NEWS</Link>
                          <Link to='/announcement' style={{color:'black',textDecoration:'none',fontWeight:'700'}}>ANNOUNCEMENT</Link>
                          <Link to='/trivia' style={{color:'black',textDecoration:'none',fontWeight:'700'}}>TRIVIA</Link>
                          <Link to='/' onClick={signout} style={{color:'black',textDecoration:'none',fontWeight:'700'}}>LOGOUT</Link>
                      </ul>
                  </div>
          </div>
    </>
  )
}

export default Navbar