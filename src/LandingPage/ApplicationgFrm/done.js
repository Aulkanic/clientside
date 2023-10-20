import React, { useEffect, useState } from 'react'
import '../css/done.css'
import '../css/buttonStyle.css'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { APK } from '../../Api/request';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import '../css/newexpage.css'
import swal from 'sweetalert';
import { styled } from '@mui/material';
import { Backdrop, CircularProgress } from '@mui/material';

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 50,
  color: '#fff',
}));

function Educational() {
  const [open, setOpen] = React.useState(false);
  const [email,setEmail] = useState('')
  const [loading,setLoading] = useState(false)
  const [showBackdrop, setShowBackdrop] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const sendEmail = () =>{
    if(!email){
      swal({
        text: 'Please enter email address',
        timer: 2000,
        buttons: false,
        icon: "error",
      })
      return
    }
      const formData = new FormData();
      formData.append("email",email);
      setShowBackdrop(true)
      APK.APKSEND(formData)
      .then(res => {
        setShowBackdrop(false)
        handleClose()
        swal({
          text: res.data.Message,
          timer: 2000,
          buttons: false,
          icon: "success",
        })

      }
       )
      .catch(err => console.log(err));
  }

  return (
    <>
              <StyledBackdrop open={showBackdrop}>
                <CircularProgress color="inherit" />
              </StyledBackdrop>
      <div className="donepage">
        <h2>Your Application Form is Submitted</h2><br/>
        
        <p style={{marginBottom:'20px'}}>Please Login to your account to keep updated to your Application Status</p>
        <div className='btnlogchoice'>
        <Button sx={{marginRight:'10px',textTransform:'none'}} className='myButton'>
          <Link style={{color:'white',textDecoration:'none'}} to='/login'>Redirect to Login Page in Website</Link>
        </Button>
        <Button sx={{color:'white',textTransform:'none'}} onClick={handleClickOpen} className='myButton'>Download Mobile Application and Login</Button>
        </div>

        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Download the MARISKO APP</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To login to the Mobile Application, please download the MARISKO APP and enter your email address here for us to send the link of the APK.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            value={email}
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button className='myButton' sx={{color:'white',marginRight:'10px'}} onClick={handleClose}>Cancel</Button>
          <div>
          <button
                className='myButton1'
                onClick={sendEmail}
              >
                Send
          </button>
          </div>
        </DialogActions>
      </Dialog>
      </div>
    </>
  )
}

export default Educational