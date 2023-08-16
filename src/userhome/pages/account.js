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
  const [userprofile, setProfilepic] = useState('');
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
  const [currentYear,setCurrentYear] = useState('')


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
      console.log(personalResponse)
      setPost(personalResponse.data.results);

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
  ? post.map((data) => {
      return (
        <>
          <Card elevation={0} sx={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'top'}}>
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
            Current Address: {data.caddress}
            </Typography>
            <Typography>
            School Attended this Year: {data.currentSchool}
            </Typography>
            <Typography>
            GWA last School Year Attended: {data.gwa}
            </Typography>
            </div>
          </Card>
        </>
      );
    })
  : null;

  const handleTabClick = (newValue) => {
    setValue(newValue);
  };
  const handlerCPasswordInput = (e) => setCurrent(e.target.value)
  const handlerNPasswordInput = (e) => setNew(e.target.value)
  const handlerRPasswordInput = (e) => setRepass(e.target.value)

  return (
    <>
      <Homepage/>
      <div className='acard'>
            <Card sx={{width:'70%'}}>
            <div className='profile-card'>
                <div className="prof-pic">
                  <div className='prof-img'>
                    <div>
                    <Avatar sx={{ width: '80%', height: '80%', borderRadius: '50%',border:'2px solid black' }}
                  alt={''} src={userpicture.profile} />
                    </div>
                  <div>
                  <p style={{margin:'0px'}}>{userpicture.Name}</p>
                  </div>
                  </div>
                  <div className='prof-det'>
                  <List sx={stylediv} component="nav" aria-label="mailbox folders">
                <ListItem button onClick={() => handleTabClick(0)}>
                  <ListItemText primary="Change Profile" />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => handleTabClick(1)}>
                  <ListItemText primary="Edit Information" />
                </ListItem>
                <Divider light />
                <ListItem button onClick={() => handleTabClick(2)}>
                  <ListItemText primary="Change Password" />
                </ListItem>
              </List>
                  </div>
                </div>
                <div className="prof-accs">
                {value === 0 && <div>
                  <Box sx={{width:'100%'}}>
                  <div className="Changeprofile">
                  <Card sx={{padding:'10px'}}>
                    <div className="chProf">
                      <div><h1 style={{color:'#666'}}>Change your Profile</h1></div>
                      <div className="prevprof">
                        <p>Preview</p>
                        {userprofile && 
                                          <Avatar sx={{ width: '150px', height: '150px', borderRadius: '50%',border:'2px solid black', margin:'10px' }}
                                          alt={''} src={preview} />}
                      </div>
                      <div className="frmprof">
                          <input type="file" onChange={e=> setProfilepic(e.target.files[0])} /><br></br>
                          <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                          <LoadingButton
                              loading={loading}
                              loadingPosition="end"
                              variant="elevated"
                              className='myButton1'
                              sx={{color:'white'}}
                              onClick={ChangeProf}
                            >
                              Submit
                            </LoadingButton>
                          </div>
                      </div>
                  </div>
                  </Card>
                  </div>
                  </Box>
                  </div>}
                {value === 1 && <div className='editinfocon'>
                  <div className='fabiconedit'>
                      <Fab sx={{width:'30px', height:'30px',backgroundColor:'green'}}  onClick={() => setOpen(!open)} color="secondary" aria-label="edit">
                        <EditIcon/>
                      </Fab>
                  </div>
                  {open ? (
                    <>
              <Card elevation={0} sx={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
              <div className="chngaligninfo">
                <h1 style={{color:'#666'}}>Personal Information</h1>
                <CssTextField      
                  id="input-with-icon-textfield"
                  label="Age"
                  size="small"
                  placeholder={post[0].age}
                  value={age}
                  type='number'
                  onChange={(e) => setAge(e.target.value)}
                  variant="outlined"
                  style={{ 
                    margin:'10px',
                    cursor: 'pointer', 
                  }}
                />
                {errors.age && <MuiAlert variant='outlined' 
                    style={{ 
                      width: '87%', 
                      margin: '10px', 
                      color:'red', 
                      fontSize:'10px',
                      height:'30px',
                      background:'white' }} elevation={0} severity="error">
                          {errors.age}
                </MuiAlert>}            
                <CssTextField      
                  id="input-with-icon-textfield"
                  label="Contact Number"
                  size="small"
                  value={contactNum}
                  type='number'
                  onChange={(e) => setContactNum(e.target.value)}
                  variant="outlined"
                  style={{ 
                    margin:'10px',
                    cursor: 'pointer', 
                  }}
                />
                {errors.contactNum && <MuiAlert variant='outlined' 
                style={{ 
                  width: '87%', 
                  margin: '10px', 
                  color:'red', 
                  fontSize:'10px',
                  height:'30px',
                  background:'white' }} elevation={0} severity="error">
                      {errors.contactNum}
                    </MuiAlert>}            
                <CssTextField      
                  id="input-with-icon-textfield"
                  label="Current Address"
                  size="small"
                  value={caddress}
                  type='text'
                  onChange={(e) => setCaddress(e.target.value)}
                  variant="outlined"
                  style={{ 
                    margin:'10px',
                    cursor: 'pointer', 
                  }}
                />
                <CssTextField      
                  id="input-with-icon-textfield"
                  label="School Attended this Year"
                  size="small"
                  value={currentSchool}
                  type='text'
                  onChange={(e) => setCaddress(e.target.value)}
                  variant="outlined"
                  style={{ 
                    margin:'10px',
                    cursor: 'pointer', 
                  }}
                />
                <div className='editinfconedc'>
                <div>
                <FormControl sx={{ minWidth: 150 }} size="small">
              <InputLabel id="demo-simple-select-required-label">Year Level</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={currentYear}
                  label="Year Level"
                  error={!!errors.currentYear}
                  helperText={errors.currentYear}
                  onChange={(e) =>setCurrentYear(e.target.value)}
                >
                  <MenuItem value={'Elementary'}>Elementary</MenuItem>
                  <MenuItem value={'Highschool'}>Highschool</MenuItem>
                  <MenuItem value={'College'}>College</MenuItem>
                </Select>
                {errors.currentpassword && <MuiAlert variant='outlined' 
                style={{ 
                  width: '87%', 
                  margin: '10px', 
                  color:'red', 
                  fontSize:'10px',
                  height:'30px',
                  background:'white' }} elevation={0} severity="error">
                      {errors.currentpassword}
                </MuiAlert>}
              </FormControl>
                </div>
                <div><FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-simple-select-required-label">Type of School</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={typeSchool}
                  label="Type of School"
                  onChange={(e) =>setTypeschool(e.target.value)}
                >
                  <MenuItem value={'Public'}>Public</MenuItem>
                  <MenuItem value={'Private'}>Private</MenuItem>
                  <MenuItem value={'ALS'}>ALS</MenuItem>
                  <MenuItem value={'Private(Scholarship,Voucher,Sponsored)'}>Private(Scholarship,Voucher,Sponsored)</MenuItem>
                  <MenuItem value={'Public(Scholarship,Voucher,Sponsored)'}>Public(Scholarship,Voucher,Sponsored)</MenuItem>
                  <MenuItem value={'Out of School Children'}>Out of School Children</MenuItem>
                </Select>
                {errors.currentpassword && <MuiAlert variant='outlined' 
                  style={{ 
                    width: '87%', 
                    margin: '10px', 
                    color:'red', 
                    fontSize:'10px',
                    height:'30px',
                    background:'white' }} elevation={0} severity="error">
                        {errors.currentpassword}
                </MuiAlert>} 
              </FormControl></div>
              </div>
              <div><FormControl sx={{margin:'5px', minWidth: 120,width:'90%' }} size="small">
                <InputLabel id="demo-simple-select-required-label">General Weighted Average</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={gwa}
                  fullWidth
                  label="General Weighted Average"
                  onChange={(e) =>setGwa(e.target.value)}
                >
                  <MenuItem value={'90-100 or 1.00'}>90-100 or 1.00</MenuItem>
                  <MenuItem value={'91-95 or 1.25'}>91-95 or 1.25</MenuItem>
                  <MenuItem value={'86-90 or 2.00'}>86-90 or 2.00</MenuItem>
                  <MenuItem value={'81-85 or 2.25'}>81-85 or 2.25</MenuItem>
                  <MenuItem value={'80-82 or 2.50'}>80-82 or 2.50</MenuItem>
                </Select>
                {errors.currentpassword && <MuiAlert variant='outlined' 
                style={{ 
                  width: '87%', 
                  margin: '10px', 
                  color:'red', 
                  fontSize:'10px',
                  height:'30px',
                  background:'white' }} elevation={0} severity="error">
                      {errors.currentpassword}
                </MuiAlert>} 
              </FormControl></div>
                <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                  <LoadingButton
                  loading={loading}
                  variant="elevated"
                  className='myButton1'
                  sx={{color:'white'}}
                  onClick={Editinfo}
                >
                  Submit
                </LoadingButton>
              </div>
                    </div>
                </Card>
                    </>
                  ) : (<div className='infouserchng'>
                    {userinfor}
                  </div>)}
                  </div>}
                {value === 2 && <div>
                  <div className="ChangePassword">
          <div className="chPass">
              <div className="hpass"><h1 style={{color:'#666',marginLeft:'10px'}}>Change your Password</h1></div>
              <div className="frmpass">
                  <CssTextField      
                      id="input-with-icon-textfield"
                      label="Current Password"
                      size="small"
                      value={currentpassword}
                      type='password'
                      onChange={handlerCPasswordInput}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockRoundedIcon />
                          </InputAdornment>
                        )
                      }}
                      variant="outlined"
                      style={{ 
                        margin:'10px',
                        cursor: 'pointer', 
                      }}
                    />
                      {errors.currentpassword && <MuiAlert variant='outlined' 
                  style={{ 
                    width: '87%', 
                    margin: '10px', 
                    color:'red', 
                    fontSize:'10px',
                    height:'30px',
                    background:'white' }} elevation={0} severity="error">
                        {errors.currentpassword}
                      </MuiAlert>} 
                  <CssTextField      
                      id="input-with-icon-textfield"
                      label="New Password"
                      size="small"
                      value={newpassword}
                      type='password'
                      onChange={handlerNPasswordInput}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockRoundedIcon />
                          </InputAdornment>
                        )
                      }}
                      variant="outlined"
                      style={{ 
                        margin:'10px',
                        cursor: 'pointer', 
                      }}
                    />
                      {errors.newpassword && <MuiAlert variant='outlined' 
                      style={{ 
                        width: '87%', 
                        margin: '10px', 
                        color:'red', 
                        fontSize:'10px',
                        height:'30px',
                        background:'white' }} elevation={0} severity="error">
                            {errors.newpassword}
                      </MuiAlert>} 
                  <CssTextField      
                      id="input-with-icon-textfield"
                        label="Re-type New Password"
                        size="small"
                        value={repass}
                        type='password'
                        onChange={handlerRPasswordInput}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockRoundedIcon />
                            </InputAdornment>
                          )
                        }}
                        variant="outlined"
                        style={{ 
                          margin:'10px',
                          cursor: 'pointer', 
                      }}
                    />
                      {errors.repass && <MuiAlert variant='outlined' 
                style={{ 
                  width: '87%', 
                  margin: '10px', 
                  color:'red', 
                  fontSize:'10px',
                  height:'30px',
                  background:'white' }} elevation={0} severity="error">
                      {errors.repass}
                      </MuiAlert>} 
                  <div style={{display:'flex',justifyContent:'center'}}>
                  <LoadingButton
                  fullWidth
                  loading={loading}
                  loadingPosition="end"
                  endIcon={loading ? (null) : (<SendIcon />)}
                  variant="elevated"
                  className='myButton1'
                  sx={{color:'white'}}
                  onClick={ChangePassword}
                >
                  Submit
                  </LoadingButton>
                  </div>
              </div> 
          </div>
      </div>
                  </div>}
                </div>
            </div>
            </Card>
      </div>
    </>
  )
}

export default Account