import React, {useEffect, useState} from 'react'
import './scholar.css'
import DeleteBtn from '../Button/deletebutton'
import Button from '@mui/material/Button';
import Homepage from '../components/Homepage'
import Axios from 'axios'
import { UploadingDocs, ListofReq, ListofSub, EditSub, DeleteSub,FetchingApplicantsInfo } from '../../Api/request';
import swal from 'sweetalert';
import LoopingRhombusesSpinner from '../loadingDesign/loading'
import { useNavigate } from 'react-router-dom'
import Noimageprev from '../../userhome/assets/documenticon.png'
import DefAvatar from '../../userhome/assets/defavatar.png'
import { motion } from "framer-motion";
import { Box, Modal} from "@mui/material";
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import LoadingButton from '@mui/lab/LoadingButton';
import MuiAlert from '@mui/material/Alert';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import '../Button/buttonstyle.css'
import { styled } from '@mui/material/styles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const StyledTab = styled(Tab)(({ theme }) => ({
  fontWeight: 'bold',
  '&.Mui-selected': {
    color: 'white',
    backgroundColor:'black'
  },
}));

const StyledTabList = styled(TabList)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,

}));

const Scholar = () => {

const navigate = useNavigate();
const [docs, setDocs] = useState([]);
const [submitted, setSubmittedDocs] = useState([]);
const [submitted1, setSubmittedDocs1] = useState([]);
const [fileValues, setFileValues] = useState([]);
const [fileValues1, setFileValues1] = useState([]);
const [fileNames, setFileNames] = useState([]);
const [loading, setLoading] = useState(false);
const [loading1, setLoading1] = useState(false);
const [loadingPage, setLoadingPage] = useState(false);
const [images, setImages] = useState([]);
const [images1, setImages1] = useState([]);
const [disabledInputs, setDisabledInputs] = useState([]);
const [userFiles, setUserFiles] = useState([]);
const detail = JSON.parse(localStorage.getItem('User'))
const applicantNum = detail.applicantNum;
const [userInfo,setUserInfo] = useState([]);
const [errors,setErrors] = useState([]);
const [value, setValue] = React.useState('1');

const handleChange = (event, newValue) => {
  setValue(newValue);
};


const handleFileChange = (index, event) => {
  const files = [...fileValues];
  files[index] = event.target.files[0];
  setFileValues(files);
  const previmg = files.map((img) =>
  img instanceof File ? URL.createObjectURL(img) : img)
  setImages(previmg);
  const updatedFileNames = [...fileValues];
  if (files[index]) {
    updatedFileNames[index] = files[index].name;
  } else {
    updatedFileNames[index] = 'none';
  }
  setFileNames(updatedFileNames);
};
const handleFileChange1 = (index, event) => {
  const files1 = [...fileValues1];
  files1[index] = event.target.files[0];
  setFileValues1(files1);
  const previmg1 = files1.map((img) =>
  img instanceof File ? URL.createObjectURL(img) : img)
  setImages1(previmg1);
  const updatedFileNames = [...fileValues1];
  if (files1[index]) {
    updatedFileNames[index] = files1[index].name;
  } else {
    updatedFileNames[index] = 'none';
  }
  setFileNames(updatedFileNames);
};
const handleSubmit = async (event) => {
  event.preventDefault();
  setLoading(true);
  if(userInfo.status === 'For Evaluation'){
    swal({
      text: 'You cannot submit your Documents until you have been evaluated by a BMCC.',
      timer: 2000,
      buttons: false,
      icon: "error",
    })
    setLoading(false);
    return
  }
  try {
    for (let index = 0; index < fileValues.length; index++) {
      const file = fileValues[index];
      const docu = docs[index];
      const Name = docu.requirementName;
      const docsFor = docu.docsfor
      // Skip iteration if file is undefined
      if (!file) {
        continue;
      }
      if (!file.type.startsWith('image/') || (file.type !== 'image/png' && file.type !== 'image/jpeg')) {
        // Display an error message or handle the validation error accordingly
        errors.push({ Name, message: 'Only PNG and JPG image files are allowed.' });
        continue;
      }

      const fileSizeInBytes = file.size;
      const maxSizeInBytes = 5 * 1024 * 1024; // 5MB in bytes
      
      if (fileSizeInBytes > maxSizeInBytes) {
        // Display an error message or handle the validation error accordingly
        errors.push({ Name, message: 'File size exceeds the limit of 5MB.' });
        continue;
      }
      
      const detail = JSON.parse(localStorage.getItem('User'));
      const applicantNum = detail.applicantNum;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('Reqname', docu.requirementName);
      formData.append('applicantNum', applicantNum);
      formData.append('docsFor', docsFor);

      const res = await UploadingDocs.UPLOAD_DOCS(formData);
      const updatedDisabledInputs = [...disabledInputs];
      updatedDisabledInputs[index] = true;
      setDisabledInputs(updatedDisabledInputs);
      setSubmittedDocs1(res.data.DocumentSubmitted);
    }
    setFileValues([]);
    setImages([]);
  } catch (error) {
    console.log('An error occurred during file submission:', error);
  }

  setLoading(false);
  if (errors.length > 0) {
    const errorMessages = errors.map((err) => `${err.Name}: ${err.message}`);
    swal(errorMessages.join("\n"));
  }
  setErrors([])
  

};
const DeleteReq = async (reqName,event) =>{
  const detail = JSON.parse(localStorage.getItem('User'));
  const id = detail.applicantNum;
  const requirement_Name = reqName;
  const formData = new FormData();
  formData.append('id', id);
  formData.append('requirement_Name', requirement_Name);
  setLoading1(true)
  DeleteSub.DELETE_SUB(formData)
  .then(res => {
    console.log(res)
    setLoading1(false)
    setSubmittedDocs1(res.data.result);
    const schoCat = userInfo.SchoIarshipApplied
    const Batch = userInfo.Batch
    const RequireDocs = res.data.documentlist.results1?.filter(docs => docs.schoName === schoCat && docs.batch === Batch)
    setDocs(RequireDocs);
  }
   )
  .catch(err => console.log(err));
}
const EditReq = async (data,index) =>{
  const applicantNum = data.applicantId;
  const requirement_Name = data.requirement_Name;
  const formData = new FormData();
    formData.append(`file`, userFiles[index] || data.File);
    formData.append(`Reqname`, requirement_Name);
    formData.append(`applicantNum`, applicantNum);
  setLoading1(true)
  EditSub.EDIT_SUB(formData)
  .then(res => {
    setSubmittedDocs1(res.data.result);
    setUserFiles([]); 
    setLoading1(false)
  }
   )
  .catch(err => console.log(err));
}
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoadingPage(true)
      const response = await Promise.all([
        ListofReq.FETCH_REQUIREMENTS(),
        ListofSub.FETCH_SUB(applicantNum),
        FetchingApplicantsInfo.FETCH_INFO(applicantNum)
      ]);
      const schoCat = response[2].data.results[0].SchoIarshipApplied
      const Batch = response[2].data.results[0].Batch
      const RequireDocs = response[0].data.Requirements.results1?.filter(docs => docs.schoName === schoCat && docs.batch === Batch)
      setDocs(RequireDocs);
      setUserInfo(response[2].data.results[0])
      setSubmittedDocs1(response[1].data.Document);
      setLoadingPage(false)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);
 function ViewsubDocs(){
      if(submitted.length > submitted.length){
       
        const documentsubmitted = submitted?.map((req, index) => {

          return (
            <>
            {req.File !== 'None' && <div key={index}>
              <div className="grid_container">

            <div className="docusibmitted">
              <div className="docusubprev">   
              {req.File ? (<img src={req.File} alt="" />) : (<img src={Noimageprev} alt="" />)}
              </div>
              <div className='userdocsubstat'>
            <p>{req.requirement_Name}</p>
            <p>{req.Status}</p>
            <p>{req.Comments}</p>
            <div>
            <input
          key={index}
          type="file"
          value={req[index]}
          onChange={e => {
            // Update the corresponding file in the state
            const updatedFiles = [...userFiles];
            updatedFiles[index] = e.target.files[0];
            setUserFiles(updatedFiles);
          }}
        />
        <button className='myButton1' onClick={() =>EditReq(req.requirement_Name,index)}>Save Changes</button>
        <button className='myButton2' onClick={() =>DeleteReq(req.requirement_Name)}>Delete</button>
              
            </div>
            </div>
            </div>

            {(index + 1) % 3 === 0 && <br />}
            </div>
            </div>}
            </>
          );
        });    
        return documentsubmitted  
      }else{
        const documentsubmitted1 = submitted1?.map((req, index) => {
          console.log(req)
          return (
            <>
            {req.File !== 'None' && <div key={index}>
              <div className="grid_container">
            <Box>
            <Card elevation={5} sx={{height:'100%'}}>
            <div className="docusibmitted">
              <div className="docusubprev">   
              {req.File ? (<img src={req.File} alt="" />) : (<img src={Noimageprev} alt="" />)}
              </div>
              <div className='userdocsubstat'>
            <p style={{fontSize:'18px',fontWeight:'700'}}>{req.requirement_Name}</p>
            <p>{req.Status}</p>
            <p>{req.Comments}</p>
            <div className='inputsub'>
            <input
                key={index}
                type="file"
                value={req[index]}
                onChange={e => {
                  const updatedFiles = [...userFiles];
                  updatedFiles[index] = e.target.files[0];
                  setUserFiles(updatedFiles);
                }}
            />
            <div>
              <button style={{marginRight:'10px'}} className='myButton1' onClick={() =>EditReq(req,index)}>Save Changes</button>
              <button className='myButton2' onClick={() =>DeleteReq(req.requirement_Name)}>Delete</button>
            </div>
            </div>
            </div>
            </div>
            </Card>
            </Box>

            </div>
            </div>}
            </>
          );
        });  
        return documentsubmitted1   
      }   
    }
const requirements = docs?.map((docu, index) => {
      const isDisabled = disabledInputs[index] || false;
      const valueToCheck = docu.requirementName;
      const hassubmit = submitted1.some((item) => item.requirement_Name === valueToCheck);
      const deadline = new Date(docu.deadline);
      const currentDate = new Date(); 
      const error = errors[index];
      const isPastDue = currentDate > deadline && !hassubmit;
    
      return (
        <React.Fragment key={index}>
          <Box>
            <Card elevated={15}>
              <div className='reqlistcontainer'>
                <div className="requirelist">
                  <div className="requireprev">
                    {images[index] ? (<img src={images[index]} alt='No Image' />) : (<img src={Noimageprev} alt='No Image' />)}
                  </div>
                  <div className='userlistreq'>
                    <label htmlFor="">{docu.requirementName}</label>
                    <span>Deadline: {docu.deadline}</span>
                    <span>For: {docu.docsfor}</span>
                    {isPastDue ? (
                      <p style={{margin:0}}>Past due: Document submission is no longer possible.</p>
                    ) : (
                      !isDisabled && !hassubmit ? (
                        <input
                          type="file"
                          name={`${docu.requirementName}`}
                          disabled={isDisabled}
                          onChange={(event) => handleFileChange(index, event)}
                        />
                      ) : (
                        <p style={{margin:0}}>Already Submitted</p>
                      )
                    )}
                  </div>
                </div>
                {(index + 1) % 4 === 0 && <br />}
              </div>
            </Card>
          </Box>
        </React.Fragment>
      );
    });
return(
  <>
    <Homepage/>
  <div>
  <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <StyledTabList onChange={handleChange} aria-label="lab API tabs example">
            <StyledTab label="Requirements List" value="1" />
            <StyledTab label="Requirements Submitted" value="2" />
          </StyledTabList>
        </Box>
        <TransitionGroup>
        <CSSTransition key={value} classNames="fade" timeout={300}>
        <TabPanel value="1">
            <div className='schousercont'>
          <div className='reqheadtitle'>
            <h1 style={{margin:'0px'}}>Requirements</h1>
          </div>
          <div className="userequirements">
              {requirements}
          </div>
          <div>
              <LoadingButton
                loading={loading}
                loadingPosition="end"
                variant="elevated"
                fullWidth
                sx={{color:'white'}}
                className='myButton1'
                onClick={handleSubmit}
              >
                Submit
              </LoadingButton>
          </div>
            </div>
        </TabPanel>
        </CSSTransition>
      </TransitionGroup>
      <TransitionGroup>
        <CSSTransition key={value} classNames="fade" timeout={300}>
        <TabPanel value="2">
          <div className="userdocusub">
            <div className="userschocont">
            <div>
              <h1>Documents Submitted</h1>
            </div>
            <div className='usersbumtdoc'>
            {submitted1.length > 0 ? (ViewsubDocs()) : 
            (<div className="docusibmitted">
              <div className='Nodocupost'> 
              <p>No Document Submitted</p>
              </div>
              </div>)}
            </div>
          </div>
          </div>
        </TabPanel>
        </CSSTransition>
      </TransitionGroup>
      </TabContext>


    </div>

  </>
)
}
export default Scholar