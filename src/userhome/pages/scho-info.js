import React, { useEffect, useState } from 'react'
import './scho-info.css'
import  Homepage from '../components/Homepage'
import { Cango, FetchingApplicantsInfo, FetchingUserappoint,UserCango } from '../../Api/request'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import { Tabs, Tab, Box, Modal, Card } from "@mui/material"; 
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useSelector } from 'react-redux'
import swal from 'sweetalert'
import '../Button/buttonstyle.css'


const Schoinfo = () => {
      const { userdetails } = useSelector((state) => state.login);
      const [PA, setPA] = useState([]);
      const applicantNum = userdetails.applicantNum;
      const currentDate = new Date();
      const [open, setOpen] = React.useState(false);
      const [appointuser,setAppointment] = useState([]);
      const [notgo,setNotgo] = useState([]);
      const [reason,setReason] = useState('')
      const handleClickOpen = (data) => {
        setOpen(true);
        setNotgo(data)
      };
    
      const handleClose = () => {
        setOpen(false);
      };

  useEffect(() => {
  async function Fetch(){
    const res = await FetchingApplicantsInfo.FETCH_INFO(applicantNum)
    const response = await FetchingUserappoint.FETCH_USERAPPOINTMENT(applicantNum)
    setPA(res.data.results);
    setAppointment(response.data.results)
  }
  Fetch()
  }, []);
    const willgo = async(data,canGo) =>{
      const excuse = 'None'
      const formData = new FormData()
      formData.append('schedDate',data.schedDate)
      formData.append('applicantNum',data.applicantNum)
      formData.append('canGo',canGo)
      formData.append('excuse',excuse)
      await UserCango.Cango(formData)
      .then((res) =>{
        setAppointment(res.data.result)
        swal('Submitted Successfully')
      })
      .catch(err => console.log(err));
    }
    const Cannotgo = async() =>{
      const canGo = 'No'
      const formData = new FormData()
      formData.append('schedDate',notgo.schedDate)
      formData.append('applicantNum',notgo.applicantNum)
      formData.append('canGo',canGo)
      formData.append('excuse',reason)
      await UserCango.Cango(formData)
      .then((res) =>{
        setAppointment(res.data.result)
        setOpen(false)
        swal('Submitted Successfully')

      })
      .catch(err => console.log(err));
    }

    const applicantdetails = appointuser?.map((data) =>{
      const formatDate = () => {
        const specificDate = new Date(data.schedDate);
        return specificDate.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        });
      };
      const appointDays = formatDate()
      const isEnded = new Date(data.schedDate) < currentDate;
      const isCancel = data.statusApp === 'Cancel'
        return (
            <>
           <Box sx={{ flexGrow: 1, display:'flex',justifyContent:'center',alignItems:'center'}}>
          <div className='appointlistcon'>
              <Card sx={{padding:'5px'}}>
                <div className='appointscon'>
                <div className="calendar">
                <div className="text">
                  <span>{appointDays}</span>
                </div>
                </div>
                <div className='appointdetails'>
                  <p>Status: {isEnded ? "Ended" : isCancel ? 'Cancelled' : 'Ongoing'}</p>
                  <p>Agenda: {data.Reason}</p>
                  <p>Location: {data.Location}</p>
                  <p>Time: {data.timeStart} - {data.timeEnd}</p>
                  {data.statusApp === 'Ongoing' && data.isInterview === 'No' ? 
                  (<div>
                  <button style={{marginRight:'10px'}} className='myButton1' onClick={() =>willgo(data,'Yes')}>
                    Will Go
                  </button>
                  <button className='myButton2' onClick={() =>handleClickOpen(data)}>
                    Cannot Go
                  </button>
                  </div>) : data.isInterview === 'Reappoint' ? (<>
                  <p>You've been Re-Appointed</p>
                  </>) : data.isPassed !== 'Pending' ? (<p>
                    <p>{data.isPassed}</p>
                  </p>) : null}
                </div>
                </div>
              </Card>
          </div>
    </Box>           
            </>
        )
    })

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            Please tell us the reason on not going to your Appointment Schedule so that we will Re-appoint your schedule as soon as possible
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            value={reason}
            onChange={(e) =>setReason(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button className='myButton' sx={{color:'white'}} onClick={handleClose}>CANCEL</Button>
          <Button className='myButton1' sx={{color:'white'}} onClick={Cannotgo}>SUBMIT</Button>
        </DialogActions>
      </Dialog>
        <Homepage/>
        <h1 className='appointheader'>Appointment Schedule</h1>
        <div className="contappoint">
        {appointuser.length > 0 ? (<div className='sicard'>
        {applicantdetails}
          </div>) : (
            <div className='sicard'>
                <div style={{textAlign:'center',width:'100%',height:'100%'}}>
                <p style={{fontSize:'30px',fontStyle:'italic'}}>No Appointment Scheduled for now</p>
                </div>
              </div>
          )}
        </div>
    </>
  )
}

export default Schoinfo