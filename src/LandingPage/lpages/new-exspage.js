import React from 'react'
import Lheader from '../components/navbar'
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
import { useState } from 'react';
function Newexspage() {
  const [open, setOpen] = React.useState(false);
  const [email,setEmail] = useState('')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const sendEmail = (event) =>{
    event.preventDefault();
    if(!email){
      alert('Please enter email address')
      return
    }
      var data = new FormData();
      data.append("email",email);
      APK.APK(data)
      .then(res => {
        console.log(res)
        swal(res.data.Message)
        handleClose()
      }
       )
      .catch(err => console.log(err));
  }
  return (
    <>
    <Lheader/>
    <div className='newexpage'>
      <h1>Login your Account in .... </h1>
        <div className='lexpage'>
           <Link className='gotolog' to='/login'>REDIRECT TO LOGIN PAGE</Link> 
        </div>
        <div className='lnewpage'>
        <Button variant="none" onClick={handleClickOpen}><Link className='gotoreg'>MOBILE APPLICATION</Link></Button>
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={sendEmail}>SEND</Button>
        </DialogActions>
      </Dialog>
    </div>
    </>
  )
}

export default Newexspage