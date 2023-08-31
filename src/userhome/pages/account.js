import React from 'react'
import './account.css'
import Homepage from '../components/Homepage'
import { FetchingProfileUser,ChangingProfile, Change_Password,FetchingApplicantsInfo,EditUserinfo } from '../../Api/request'
import {useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import '../Button/buttonstyle.css'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import PasswordRoundedIcon from '@mui/icons-material/PasswordRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import ListRoundedIcon from '@mui/icons-material/ListRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { FetchNotif,FetchUnreadNotif,ReadNotifi,UserActivity,Logoutuser } from '../../Api/request';
import swal from 'sweetalert';
import Form from 'react-bootstrap/Form';
import MYDO from '../assets/mydo.png'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import parse from 'date-fns/parse';
import { setLoggedIn,setUserDetails } from '../../Redux/loginSlice';

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

const Account = () => {
  const dispatch = useDispatch();
  const { userdetails,LoggedIn } = useSelector((state) => state.login);
  const [post, setPost] = useState([]);
  const [userpicture, setProfileuser] = React.useState([]);
  const applicantNum = userdetails.applicantNum
  const [value, setValue] = useState(0);
  const [userprofile, setProfilepic] = useState(null);
  const [userlog,setUserlog] = useState([])
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState();
  const [currentpassword, setCurrent] = useState('');
  const [newpassword, setNew] = useState('');
  const [repass, setRepass] = useState('');
  const [errors, setErrors] = useState({});
  const [remarks, setRemarks] = useState('all');
  const [notification,setNotification] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [notifInf,setNotifDet] = useState([]);
  const handleClose = () => setOpen(false);


useEffect(() => {
if (!userprofile) {
    setPreview(undefined)
    return
}

const objectUrl = URL.createObjectURL(userprofile)
setPreview(objectUrl)

return () => URL.revokeObjectURL(objectUrl)
}, [userprofile])


useEffect(() => {
  const fetchData = async () => {
    try {
      const personalResponse = await FetchingApplicantsInfo.FETCH_INFO(applicantNum);
      setPost(personalResponse.data.results[0]);

      const profileUserResponse = await FetchingProfileUser.FETCH_PROFILEUSER(applicantNum);
      setProfileuser(profileUserResponse.data.Profile[0]);

      const Notification = await FetchNotif.FETCH_NOTIF(applicantNum)
      setNotification(Notification.data.reverse())
      const userData = new FormData();
      userData.append('applicantNum',applicantNum)
      const re = await UserActivity.USER_LOG(userData)
      const log = re.data.result
      setUserlog(log.reverse())
    } catch (error) {
      console.log(error);
    }
  };

  fetchData();
}, [applicantNum]);

 async function ChangeProf(event){
    event.preventDefault();
    setLoading(true)
    const userprof = userprofile;
    const details = {userprof,applicantNum};
   await ChangingProfile.CHANGE_PROFILE(details)
    .then(res => {
      setProfileuser(res.data.Result[0])
      setLoading(false)
    }
     )
    .catch(err => console.log(err));
  }
 async function ChangePassword(event){
    event.preventDefault();
    const errors = {};
    if (!currentpassword) {
      errors.currentpassword = "This Field is required";
    }
    if (!newpassword) {
      errors.newpassword = "This Field is required";
    } else if (newpassword.length < 8) {
      errors.newpassword = "Password must be at least 8 characters long";
    } else if (!/^[a-zA-Z0-9]*$/.test(newpassword)) {
      errors.newpassword = "Password can only contain alphanumeric characters";
    }
    if (!repass) {
      errors.repass = "This Field is required";
    } else if (repass.length < 8) {
      errors.repass = "Password must be at least 8 characters long";
    } else if (!/^[a-zA-Z0-9]*$/.test(repass)) {
      errors.repass = "Password can only contain alphanumeric characters";
    }
    if(repass !== newpassword){
      errors.newpassword = 'New Password did not Match'
    }
    console.log(Object.keys(errors).length)
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      console.log(errors)
      return;
    }
    const email = userpicture.email
    const formData = new FormData();
    formData.append('newpassword',newpassword);
    formData.append('Currentpassword',currentpassword);
    formData.append('email',email)
    setLoading(true)
  await Change_Password.CHANGE_PASSWORD(formData)
    .then(res => {
        if(res.data.success === 0){
          setLoading(false)
          swal({
            text: res.data.message,
            timer: 2000,
            buttons: false,
            icon: "error",
          })
        }
        else{
          setLoading(false)
          swal({
            text: res.data.message,
            timer: 2000,
            buttons: false,
            icon: "success",
          })
    }
    }
     )
    .catch(err => console.log(err));
  }

const allnotif = async() => {
  setRemarks('all')
  await FetchNotif.FETCH_NOTIF(applicantNum)
  .then((res) =>{
    setNotification(res.data.reverse())
  })
}
const unreadnotif = async() =>{
  setRemarks('unread')
  await FetchUnreadNotif.FETCH_UNREADNOTIF(applicantNum)
  .then((res) =>{
    setNotification(res.data.reverse())
  })
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

function formatTimeDifference(date) {
  const timestamp = new Date(date);
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

async function signout() {
  const formData = new FormData();
  formData.append('applicantNum',applicantNum)
    await Logoutuser.USER_LOGOUT(formData)
    dispatch(setLoggedIn(false));
    dispatch(setUserDetails([]))
}


  const handlerCPasswordInput = (e) => setCurrent(e.target.value)
  const handlerNPasswordInput = (e) => setNew(e.target.value)
  const handlerRPasswordInput = (e) => setRepass(e.target.value)
  return (
    <>
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
      <Homepage/>
      <div className="acccontainer">
       <div className='accleftbar'>
        <h1>Settings</h1>
        <div className='settingTabs'>
          <ul>
            <li onClick={() => setValue(0)}><PersonRoundedIcon 
            sx={{
              fontSize:'30px',
              marginRight:'10px',
              borderRadius:'50%'}}
            />Account Details</li>
            <li onClick={() => setValue(1)}><CameraAltRoundedIcon 
             sx={{
              fontSize:'30px',
              marginRight:'10px',
              borderRadius:'50%'}}           
            />Change Profile</li>
            <li onClick={() => setValue(2)}><PasswordRoundedIcon 
            sx={{
              fontSize:'30px',
              marginRight:'10px',
              borderRadius:'50%'}}            
            />Change Password</li>
            <li onClick={() => setValue(3)}><NotificationsRoundedIcon 
             sx={{
              fontSize:'30px',
              marginRight:'10px',
              borderRadius:'50%'}}             
            />Notifications</li>
            <li onClick={() => setValue(4)}><ListRoundedIcon 
             sx={{
              fontSize:'30px',
              marginRight:'10px',
              borderRadius:'50%'}}            
            />Activity Log</li>
            <li onClick={signout}><LogoutRoundedIcon 
             sx={{
              fontSize:'30px',
              marginRight:'10px',
              borderRadius:'50%'}}             
            />Logout</li>
          </ul>
        </div>
       </div>
       <div className="accrigthbar">
          {value === 0 && 
          <>
            <h1>General Information</h1>
           <div className='accAccountD'>
            <div className="headerdetails">
              <p>Name</p>
              <p>Email</p>
              <p>Contact Number</p>
              <p>Applicant Code</p>
              <p>Account Created on</p>
            </div>
            <div className="valuedetails">
              <p>{post.Name}</p>
              <p>{post.email}</p>
              <p>{post.contactNum}</p>
              <p>{post.applicantCode}</p>
              <p>{post.date}</p>              
            </div>
          </div>         
          </>
          }
          {value === 1 &&
          <>
          <h1 className='acch1'>Account Profile</h1>
          <div className='accProfile'>
          <img src={preview || post.profile} alt="" />
      <label>
        <PhotoCameraIcon
          sx={{
            fontSize: '60px',
            borderRadius: '10px',
            backgroundColor: 'white',
            cursor: 'pointer'
          }}
        />
        <input
          type="file"
          onChange={e=> setProfilepic(e.target.files[0])}
          style={{ display: 'none' }} 
        />
      </label>
          </div>
          <div style={{margin:'15px'}}>
          {preview && (<button className='myButton' onClick={ChangeProf}>Upload Image</button>)}
          </div>
         
          </>
          }
          {value === 2 &&
          <>
          <div className='accPassword'>
            <h1>Change Password</h1>
            <Form>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Old Password</Form.Label>
                <Form.Control style={{backgroundColor:'#f1f3fa'}} type="password" 
                value={currentpassword}
                onChange={handlerCPasswordInput}
                />
                {errors.currentpassword && <p variant='outlined' 
                  style={{ 
                    width: '87%', 
                    color:'red', 
                    fontSize:'10px',
                    height:'30px',
                    background:'white' }} elevation={0} severity="error">
                        {errors.currentpassword}
                </p>} 
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control style={{backgroundColor:'#f1f3fa'}} type="password"
                value={newpassword}
                onChange={handlerNPasswordInput}
                />
                      {errors.newpassword && <p variant='outlined' 
                      style={{ 
                        width: '87%',
                        color:'red', 
                        fontSize:'10px',
                        height:'30px',
                        background:'white' }} elevation={0} severity="error">
                            {errors.newpassword}
                      </p>} 
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Confirm new Password</Form.Label>
                <Form.Control style={{backgroundColor:'#f1f3fa'}} type="password" 
                value={repass}
                onChange={handlerRPasswordInput}
                />
                {errors.repass && <p variant='outlined' 
                style={{ 
                  width: '87%',
                  color:'red', 
                  fontSize:'10px',
                  height:'30px',
                  background:'white' }} elevation={0} severity="error">
                      {errors.repass}
                </p>} 
              </Form.Group>
            </Form>
            <p>Make sure it's at least 15 characters OR at least 8 characters including a number and a lowercase letter.</p>
            <button  onClick={ChangePassword} className='myButton'>Update password</button>
          </div>
          </>
          }
          {value === 3 &&
          <>
          <div className="accNotifify">
            <h2 >Notifications</h2>
            <div className='sortbtnNotify'>
              <button onClick={allnotif} className={remarks === 'all' ? 'btnnotifactive' : 'inactive'}>All</button>
              <button onClick={unreadnotif} className={remarks === 'unread' ? 'btnnotifactive' : 'inactive'}>Unread</button>
            </div>
            <div className="listofNotif">
              {notification?.map((data,index)=>{
                  const rawDate = data.date.replace("at", ""); // Remove "at" from the date string
                  const formattedDate = new Date(rawDate);
                let content;
                if(data.content.length <= 110){
                  content = <p className='truncated-text1'>{data.content}</p>
                }else{
                  const truncated = data.content.substring(0, 110) + '...';
                  content = <p className='truncated-text1'>{truncated}</p>
                }
                return (
                  <div key={index} onClick={() => SetReadNotif(data)} className='notif'>
                    <img src={MYDO} alt="" />
                    <div style={{display:'flex',flexDirection:'column'}}>
                    <p style={{
                      fontWeight:'700',
                      margin:'0'
                    }}>{data.title}</p>
                    {content}
                    <p className={data.remarks === 'unread' ? 'unreadnotif' : 'none'}>{formatTimeDifference(formattedDate)}</p>
                    </div>
                    {data.remarks === 'unread' && (<div className='rightnotif'>
                        <div className='circle'></div>
                    </div>)}
                  </div>
                )
              })
            }
            </div>
          </div>
          </>
          }
          {value === 4 &&
          <>
          <div className="userlog">
          <h1>Recent Activity</h1>
            <ul>
            {userlog?.map((data,index) =>{
              return(
                <li>
                  <p key={index}>{data.actions} on {data.date}</p><span>{formatTimeDifference(data.date)}</span>
                </li>
              )
            })}
            </ul>
          </div>
          </>
          }
       </div>
      </div>

    </>
  )
}

export default Account