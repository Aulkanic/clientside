import React from 'react';
import './account.css';
import { FetchingProfileUser,ChangingProfile, Change_Password,FetchingApplicantsInfo, ScanningQr } from '../../Api/request'
import {useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import '../Button/buttonstyle.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { FaCamera } from "react-icons/fa";
import swal from 'sweetalert';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { Backdrop, CircularProgress } from '@mui/material';
import DefaultImg from '../assets/defaultimg.png'
import PasswordInput from '../../Components/InputField/password';
import CustomButton from '../../Components/Button/button';
import { updateInfo } from '../../Redux/loginSlice';
import {QRCodeSVG} from 'qrcode.react';
import { Html5QrcodeScanner} from 'html5-qrcode';

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 50,
  color: '#fff',
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius:'10px'
};

const Account = () => {
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const user = useSelector((state) => state.login);
  const [scannedResult, setScannedResult] = useState(null);
  const [post, setPost] = useState([])
  const [userpicture, setProfileuser] = React.useState([]);
  const applicantNum = user.info.applicantNum;
  const [userprofile, setProfilepic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [currentpassword, setCurrent] = useState('');
  const [newpassword, setNew] = useState('');
  const [repass, setRepass] = useState('');
  const [errors, setErrors] = useState({});
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [showPassword,setShowPassword] = useState(false)
  const [showPassword1,setShowPassword1] = useState(false)
  const [showPassword2,setShowPassword2] = useState(false)
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
      const userData = new FormData();
      userData.append('applicantNum',applicantNum)
    } catch (error) {
      console.log(error);
    }
  };

  fetchData();
}, [applicantNum]);

 async function ChangeProf(event){
    event.preventDefault();
    if(userprofile === null){
      swal("Error","Image Required",'warning')
      return
    }
    const fileExtension = userprofile?.name.split('.').pop().toLowerCase();
    if (fileExtension !== 'png' && fileExtension !== 'jpg' && fileExtension !== 'jpeg')  {
      swal({
        text: 'Please upload a PNG or JPG image only.',
        timer: 2000,
        buttons: false,
        icon: "error",
      });
    
      return false;
    }
    setShowBackdrop(true)
    const userprof = userprofile;
    const details = {userprof,applicantNum};
   await ChangingProfile.CHANGE_PROFILE(details)
    .then(res => {
      setProfileuser(res.data.Result[0])
      setShowBackdrop(false)
      dispatch(updateInfo({ key: 'profile', value: res.data.Result[0].profile }));
      setProfilepic(null)
      swal({
        text: 'Profile has been Changed',
        timer: 2000,
        buttons: false,
        icon: "success",
      })
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
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    
      return;
    }
    const email = userpicture.email
    const formData = new FormData();
    formData.append('newpassword',newpassword);
    formData.append('Currentpassword',currentpassword);
    formData.append('email',email)
    setShowBackdrop(true)
  await Change_Password.CHANGE_PASSWORD(formData)
    .then(res => {
        if(res.data.success === 0){
          setShowBackdrop(false)
          setErrors('')
          swal({
            text: res.data.message,
            timer: 2000,
            buttons: false,
            icon: "error",
          })
        }
        else{
          setShowBackdrop(false)
          setErrors('')
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
  const handleScan = async(data) => {
    console.log(data)
    if (data) {
      const formData= new FormData();
      formData.append('Qrcode',data)
      const res = await ScanningQr.QR_CODE(formData)
      setScannedResult(res.data);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };
  const handlerCPasswordInput = (e) => setCurrent(e.target.value)
  const handlerNPasswordInput = (e) => setNew(e.target.value)
  const handlerRPasswordInput = (e) => setRepass(e.target.value)

  const startScanner = async () => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    let isScanning = true;

    scanner.render(success, error);

    async function success(result) {
      if (isScanning) {
        scanner.clear();
        setScannedResult(result);
        isScanning = false;

        // Perform API call with the scanned QR code data
        try {
          const formData = new FormData();
          formData.append('Qrcode', result);

          // Assuming ScanningQr.QR_CODE is a function that performs the API call
          const res = await ScanningQr.QR_CODE(formData);

          // Handle the API response as needed
          console.log('API Response:', res.data);
        } catch (apiError) {
          console.error('Error performing API call:', apiError);
        }
      }
    }

    function error(err) {
      console.warn(err);
    }

    return () => {
      // Cleanup and stop the scanner when the component unmounts
      if (scanner) {
        scanner.stop().then((ignore) => {
          // Scanner stopped successfully
        }).catch((error) => {
          console.error('Error stopping QR code scanner:', error);
        });
      }
    };
  };

  const handleScanButtonClick = () => {
    startScanner();
  };


  return (
    <>
      <StyledBackdrop open={showBackdrop}>
        <CircularProgress color="inherit" />
      </StyledBackdrop>
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
          <QRCodeSVG delay={300} onError={handleError} height={400} style={{width:'100%'}}  value={user.info.qrCode}  onResult={handleScan}  />
          </Box>
        </Fade>
      </Modal>
       <div className="w-full flex flex-col">
          <div className="w-full bg-white flex justify-between py-8 md:px-2 mb-4">
            <div className='flex'>
              <div className='relative h-40 w-max'>
                <p className='absolute -top-6 left-4 text-md font-bold'>Profile</p>
              <img className='w-40 rounded-full'
              src={preview || post.profile || DefaultImg} 
              alt="" />
              <label className='absolute right-2 bottom-8 cursor-pointer' htmlFor="fileImg">
              <FaCamera  className=' text-3xl'/>
              <input id='fileImg' onChange={(e) => setProfilepic(e.target.files[0])} type="file" className='hidden' />
              </label>
              {userprofile && 
              <div className='absolute -bottom-6 left-1'>
              <CustomButton
                label={'Change Profile'}
                color={'blue'}
                disabled={showBackdrop}
                onClick={ChangeProf}
              />
              </div>
                }
              </div>
              <div className='pl-4'>
              <p className='truncate'><strong>Name:</strong>{user.info.Name}</p>
              <p className='truncate'><strong>{user.info.status !== "Approved" ? "Applicant Code" : "Scholar Code"}:</strong>
              {user.info.status !== "Approved" ? user.info.applicantCode : user.info.scholarCode}</p>
              <p className='truncate'><strong>Age:</strong>{user.info.age}</p>
              <p className='truncate'><strong>Gender:</strong>{user.info.gender}</p>
              <p className='truncate'><strong>Status:</strong>{user.info.status}</p>
              <p className='truncate'><strong>Batch:</strong>{user.info.batch}</p>
              </div>
            </div>
            <div className=''>
              <button className='border-2 border-sky-500 text-sky-500 font-bold rounded-md px-4 py-2'
              onClick={() => {setOpen(!open)}}
              >View QR Code</button>
            </div>
          </div>
          <div className='w-full flex-col md:flex-row flex'>
            <div className='bg-white p-4'>
            <h1 className='text-2xl font-bold'>Change Password</h1>
              <form action="">
                <PasswordInput
                  label={'Current Password'}
                  name={'current_password'}
                  onChange={handlerCPasswordInput}
                  onClick={() => setShowPassword(!showPassword)}
                  show={showPassword}
                  error={errors.currentpassword}
                />
                <PasswordInput
                  label={'New Password'}
                  name={'New Password'}
                  onChange={handlerNPasswordInput}
                  onClick={() => setShowPassword1(!showPassword1)}
                  show={showPassword1}
                  error={errors.newpassword}
                />
                <PasswordInput
                  label={'Confirm new Password'}
                  name={'Confirm new Password'}
                  onChange={handlerRPasswordInput}
                  onClick={() => setShowPassword2(!showPassword2)}
                  show={showPassword2}
                  error={errors.repass}
                />
                <p>Make sure it's at least 15 characters OR at least 8 characters including a number and a lowercase letter.</p>
                <button  onClick={ChangePassword} className='myButton'>Update password</button>
              </form>
            </div>


          </div>
          <div>
          <h2>QR Code Scanner</h2>
          <div id="reader" ref={videoRef}></div>

          <div>
            <button className='border-2 border-sky-500 text-sky-500 font-bold rounded-md px-4 py-2' onClick={handleScanButtonClick}>Start Scan</button>
          </div>
        </div>
       </div>
    </>
  )
}

export default Account