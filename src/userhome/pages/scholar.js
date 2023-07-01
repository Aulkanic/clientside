import React, {useEffect, useState} from 'react'
import './scholar.css'
import DeleteBtn from '../Button/deletebutton'
import Button from '@mui/material/Button';
import Homepage from '../components/Homepage'
import Axios from 'axios'
import { UploadingDocs, ListofReq, ListofSub, EditSub, DeleteSub } from '../../Api/request';
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
const applicantNum = localStorage.getItem('ApplicantNum');
const [errors,setErrors] = useState([]);


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
  
  try {
    for (let index = 0; index < fileValues.length; index++) {
      const file = fileValues[index];
      const docu = docs[index];
      const Name = docu.requirementName
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
      
      const applicantNum = localStorage.getItem('ApplicantNum');
      const formData = new FormData();
      formData.append('file', file);
      formData.append('Reqname', docu.requirementName);
      formData.append('applicantNum', applicantNum);

      const res = await UploadingDocs.UPLOAD_DOCS(formData);
      const updatedDisabledInputs = [...disabledInputs];
      updatedDisabledInputs[index] = true;
      setDisabledInputs(updatedDisabledInputs);
      setSubmittedDocs1(res.data.DocumentSubmitted);
    }
    
    setFileValues([]);
    setImages([]);
  } catch (error) {
    // Handle the error
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
  const id = localStorage.getItem('ApplicantNum');
  const requirement_Name = reqName;
  const formData = new FormData();
  formData.append('id', id);
  formData.append('requirement_Name', requirement_Name);
  setLoading1(true)
  DeleteSub.DELETE_SUB(formData)
  .then(res => {
    console.log(res)
    setLoading1(false)
    setSubmittedDocs1(res.data.Document);
  }
   )
  .catch(err => console.log(err));
}
const EditReq = async (reqName,index,event) =>{
  console.log(userFiles)
  const applicantNum = localStorage.getItem('ApplicantNum');
  const requirement_Name = reqName;
  console.log(userFiles[index],requirement_Name,applicantNum)
  const formData = new FormData();
    formData.append(`file`, userFiles[index]);
    formData.append(`Reqname`, requirement_Name);
    formData.append(`applicantNum`, applicantNum);
  setLoading1(true)
  EditSub.EDIT_SUB(formData)
  .then(res => {
    setSubmittedDocs1(res.data.Document);
    setUserFiles([]);
    window.location.reload();   
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
        ListofSub.FETCH_SUB(applicantNum)
      ]);
      setDocs(response[0].data.Requirements.results1);
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
        <button onClick={() =>EditReq(req.requirement_Name,index)}>Save Changes</button>
        <button onClick={() =>DeleteReq(req.requirement_Name)}>Delete</button>
              
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
          return (
            <>
            {req.File !== 'None' && <div key={index}>
              <div className="grid_container">
            <Box>
            <Card elevation={5}>
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
        <button onClick={() =>EditReq(req.requirement_Name,index)}>Save Changes</button>
            <button onClick={() =>DeleteReq(req.requirement_Name)}>Delete</button><br />
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
      console.log(submitted1)
      const hassubmit = submitted1.some((item) => item.requirement_Name === valueToCheck);
      const deadline = new Date(docu.deadline); // Convert the deadline string to a Date object
      const currentDate = new Date(); // Get the current date
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
                    {isPastDue ? (
                      <p>Past due: Document submission is no longer possible.</p>
                    ) : (
                      !isDisabled && !hassubmit ? (
                        <input
                          type="file"
                          name={`${docu.requirementName}`}
                          disabled={isDisabled}
                          onChange={(event) => handleFileChange(index, event)}
                        />
                      ) : (
                        <p>Already Submitted</p>
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
  {loadingPage ? (<Skeleton animation="wave" variant="circular" width={'90%'} height={'100%'} />) : (<div className="userscho">
      <div className='schousercont'>
    <div className='reqheadtitle'>
    <h1>Requirements</h1>
    </div>
    <div className="userequirements">
       {requirements}
    </div>
    <div className='btnschoupreq'>
    <LoadingButton
  loading={loading}
  loadingPosition="end"
  variant="elevated"
  fullWidth
  sx={{
    margin: '10px',
    cursor: 'pointer',
    fontWeight: '700',
    backgroundColor: 'rgba(43, 194, 106, 0.73)',
    color: 'white',
    fontSize: '15px',
    letterSpacing: '2px',
    transition: 'background 0.3s ease-in-out, clip-path 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: 'radial-gradient(100% 100% at 100% 0%, #fdff89 0%, rgb(28, 147, 77) 100%)',
    },
    fontFamily:
      'Source Sans Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    width: '200px', // Add desired width
  }}
  onClick={handleSubmit}
>
  Submit
</LoadingButton>
    </div>

    </div>
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
    </div>)}

  </>
)
}
export default Scholar