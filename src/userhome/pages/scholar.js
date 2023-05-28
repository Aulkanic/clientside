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
//upload file in react axios?
const Scholar = () => {

const navigate = useNavigate()
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
const applicantNum = 1;

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
const handleSubmit = (event) => {
  event.preventDefault();
    setLoading(true)
  fileValues.forEach((file, index) => {
    const applicantNum = 1;
    const docu = docs[index];
    const formData = new FormData();
    formData.append(`file`, file);
    formData.append(`Reqname`, docu.requirementName);
    formData.append(`applicantNum`, applicantNum);
    UploadingDocs.UPLOAD_DOCS(formData).then(res => {
      const updatedDisabledInputs = [...disabledInputs];
      updatedDisabledInputs[index] = true;
      setDisabledInputs(updatedDisabledInputs);
      setSubmittedDocs1(res.data.DocumentSubmitted);
      setFileValues([]);
      setImages([]);   
      setLoading(false);
    })
  });
};
const DeleteReq = async (reqName,event) =>{
  const applicantNum = 1;
  const requirement_Name = reqName;
  console.log(applicantNum,requirement_Name)
  setLoading1(true)
  DeleteSub.DELETE_SUB({applicantNum,requirement_Name})
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
  const applicantNum = 1;
  const requirement_Name = reqName;
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
      const response = await Promise.all([
        ListofReq.FETCH_REQUIREMENTS(),
        ListofSub.FETCH_SUB(applicantNum)
      ]);
      setDocs(response[0].data.Requirements);
      setSubmittedDocs1(response[1].data.Document);
      
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
            {(index + 1) % 3 === 0 && <br />}
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
      return (
          <>
          <div className='reqlistcontainer' key={index}>
          <div className="requirelist">
            <div className="requireprev">   
            {images[index] ? (<img src={images[index]} alt='No Image'/>) :(<img src={Noimageprev} alt='No Image'/>)}
            </div>
            <div className='userlistreq'>
          <label htmlFor="">{docu.requirementName}</label>
          {!isDisabled && !hassubmit ? (<input 
          type="file" 
          name={`${docu.requirementName}`} 
          disabled={isDisabled} 
          onChange={(event) => handleFileChange(index, event)} />)
          :(<p>Already Submitted</p>)}   
          </div>
          </div>
          {(index + 1) % 4 === 0 && <br />}
          </div>
          </>
          )
 

    });
return(
  <>
    <Homepage/>
    {!loadingPage && <div className="userscho">
      <div className='schousercont'>
    <div className='reqheadtitle'>
    <h1>Requirements</h1>
    </div>
    {!loading && <div className="userequirements">
       {requirements}
    </div>}{loading && 
    <div className="userequirements">
      <div className="looping">
      <LoopingRhombusesSpinner/>
        </div></div>
    }
    <div className='btnschoupreq'>
    <button onClick={handleSubmit}>Submit</button>
    </div>

    </div>
    <div className="userdocusub">
      <div className="userschocont">
      <div>
        <h1>Documents Submitted</h1>
      </div>
      {!loading1 ? (<div className='usersbumtdoc'>
      {submitted1.length > 0 ? (ViewsubDocs()) : 
      (<div className="docusibmitted">
        <div className='Nodocupost'> 
        <p>No Document Submitted</p>
        </div>
        </div>)}
      </div>) : (<div className="usersbumtdoc">
      <div className="looping">
      <LoopingRhombusesSpinner/>
        </div></div>)}
    </div>
    </div>
    </div>}{loadingPage && <LoopingRhombusesSpinner/>}

  </>
)
}
export default Scholar