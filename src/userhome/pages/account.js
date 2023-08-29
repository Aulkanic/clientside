import React from 'react'
import './account.css'
import Homepage from '../components/Homepage'
import { FetchingProfileUser,ChangingProfile, Change_Password,FetchingApplicantsInfo,EditUserinfo } from '../../Api/request'
import {useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box,Card, Typography } from "@mui/material"; 
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton';
import MuiAlert from '@mui/material/Alert';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import '../Button/buttonstyle.css'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import PasswordRoundedIcon from '@mui/icons-material/PasswordRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import ListRoundedIcon from '@mui/icons-material/ListRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import swal from 'sweetalert'
import { useSelector } from 'react-redux'

const CssTextField = styled(TextField)({
  backgroundColor: 'white',
  width: '400px',
  '& label.Mui-focused': {
    color: 'black',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0E3E7',
    },
    '&:hover fieldset': {
      borderColor: '#B2BAC2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6F7E8C',
    },
  },
});

const Account = () => {
  const { userdetails } = useSelector((state) => state.login);
  const [post, setPost] = useState([]);
  const [userpicture, setProfileuser] = React.useState([]);
  const applicantNum = userdetails.applicantNum
  const [value, setValue] = useState(0);
  const [userprofile, setProfilepic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState();
  const [currentpassword, setCurrent] = useState('');
  const [newpassword, setNew] = useState('');
  const [repass, setRepass] = useState('');
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [age,setAge] = useState('');
  const [contactNum,setContactNum] = useState('');
  const [caddress, setCaddress] = useState('');
  const [currentSchool,setCschool] = useState('');
  const [gwa,setGwa] = useState('');
  const [typeSchool,setTypeschool] = useState('');
  const [currentYear,setCurrentYear] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);


useEffect(() => {
if (!userprofile) {
    setPreview(undefined)
    return
}

const objectUrl = URL.createObjectURL(userprofile)
setPreview(objectUrl)

return () => URL.revokeObjectURL(objectUrl)
}, [userprofile])

const handleFileInputChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }
};

useEffect(() => {
  const fetchData = async () => {
    try {
      const personalResponse = await FetchingApplicantsInfo.FETCH_INFO(applicantNum);
      setPost(personalResponse.data.results[0]);

      const profileUserResponse = await FetchingProfileUser.FETCH_PROFILEUSER(applicantNum);
      setProfileuser(profileUserResponse.data.Profile[0]);
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
      console.log(res)
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
  async function Editinfo(event){
    event.preventDefault()
      let errors = {};
      const upage = age || post[0].age;
      if(/[a-zA-Z]/.test(upage)){
        errors.age = "Input must not contain letter value";
      }else if(upage < post[0].age){
        errors.age = 'Age must be greater than your previous age if you want to update'
      }
      const contact = contactNum || post[0].contactNum
      if(!/^09\d{9}$/.test(contact)){
        errors.contactNum = "Invalid phone number.";
      }
    const addressc = caddress || post[0].caddress
    const school = currentSchool || post[0].currentSchool
    const schoyear = currentYear || post[0].currentYear;
    const schotype = typeSchool || post[0].typeSchool;
    const schogwa = gwa || post[0].gwa
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      console.log(errors)
      return;
    }
    setLoading(true)
    const formData = new FormData();
    formData.append('age',upage)
    formData.append('contactNum',contact)
    formData.append('caddress',addressc)
    formData.append('currentSchool',school)
    formData.append('currentYear',schoyear)
    formData.append('typeSchool',schotype)
    formData.append('gwa',schogwa)
    formData.append('applicantNum',applicantNum)
   const response = await EditUserinfo.EDIT_USERINFO(formData);
   if(response.data.success === 1){
    setPost(response.data.result)
    setLoading(false)
    setErrors('')
    swal({
      text: 'Updated Successfully',
      timer: 2000,
      buttons: false,
      icon: "success",
    })
   }
   else{
    setLoading(false)
   }

  }
  const stylediv = {
    width: '100%',
    fontSize:'20px',
    textAlign:'center'
  };

const userinfor = Array.isArray(post)
  ? post.map((data,index) => {
      return (
          <Card key={index} elevation={0} sx={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'top'}}>
            <div className="aligninfo">
              <h1 style={{color:'#666'}}>Personal Information</h1>
            <Typography>
              Name: {data?.Name}
            </Typography>
            <Typography>
            Age: {data.age}
            </Typography>
            <Typography>
            Contact Number: {data.contactNum}
            </Typography>
            <Typography>
            Current Address: {data.address}
            </Typography>
            <Typography>
            School Attended this Year: {data.school}
            </Typography>

            </div>
          </Card>
      );
    })
  : null;

  const handlerCPasswordInput = (e) => setCurrent(e.target.value)
  const handlerNPasswordInput = (e) => setNew(e.target.value)
  const handlerRPasswordInput = (e) => setRepass(e.target.value)
console.log(userprofile)
  return (
    <>
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
              border:"2px solid black",
              borderRadius:'50%'}}
            />Account Details</li>
            <li onClick={() => setValue(1)}><CameraAltRoundedIcon 
             sx={{
              fontSize:'30px',
              marginRight:'10px',
              border:"2px solid black",
              borderRadius:'50%'}}           
            />Change Profile</li>
            <li onClick={() => setValue(2)}><PasswordRoundedIcon 
            sx={{
              fontSize:'30px',
              marginRight:'10px',
              border:"2px solid black",
              borderRadius:'50%'}}            
            />Change Password</li>
            <li onClick={() => setValue(3)}><NotificationsRoundedIcon 
             sx={{
              fontSize:'30px',
              marginRight:'10px',
              border:"2px solid black",
              borderRadius:'50%'}}             
            />Notifications</li>
            <li onClick={() => setValue(4)}><ListRoundedIcon 
             sx={{
              fontSize:'30px',
              marginRight:'10px',
              border:"2px solid black",
              borderRadius:'50%'}}            
            />Activity Log</li>
            <li><LogoutRoundedIcon 
             sx={{
              fontSize:'30px',
              marginRight:'10px',
              border:"2px solid black",
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
       </div>
      </div>

    </>
  )
}

export default Account