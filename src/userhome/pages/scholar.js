import React, {useEffect, useState} from 'react'
import './scholar.css'
import DeleteBtn from '../Button/deletebutton'
import Button from '@mui/material/Button';
import Homepage from '../components/Homepage'
import Axios from 'axios'
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
const [loadingPage, setLoadingPage] = useState(false);
const [images, setImages] = useState([]);
const [images1, setImages1] = useState([]);
const [editbtn,setEditbtn] = useState(true)
const [disabledInputs, setDisabledInputs] = useState([]);
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
    Axios.post('http://localhost:3006/api/v1/requirements/uploadRequirement',formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(res => {
      const updatedDisabledInputs = [...disabledInputs];
      updatedDisabledInputs[index] = true;
      setDisabledInputs(updatedDisabledInputs);
      setSubmittedDocs(res.data.DocumentSubmitted);
      setLoading(false);
    })
  });
};
const DeleteReq = async (reqName,event) =>{
  const applicantNum = 1;
  const requirement_Name = reqName;
  setLoading(true)
  Axios.delete(`http://localhost:3006/api/v1/requirements/${applicantNum}/${requirement_Name}`
  )
  .then(res => {
    console.log(res)
    setLoading(false)
    setSubmittedDocs1(res.data.Document);
  }
   )
  .catch(err => console.log(err));
}
const EditReq = async (reqName,index,event) =>{
  const applicantNum = 1;
  const requirement_Name = reqName;
  setLoading(true)
  Axios.delete(`http://localhost:3006/api/v1/requirements/Edit`
  )
  .then(res => {
    console.log(res)
    setLoading(false)
    setSubmittedDocs1(res.data.Document);
  }
   )
  .catch(err => console.log(err));
}
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await Promise.all([
        Axios.get(`http://localhost:3006/api/v1/documents/Requirements`),
        Axios.get(`http://localhost:3006/api/v1/requirements/${applicantNum}`)
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
      if(submitted.length > submitted1.length){
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
              <button>Edit</button>
              <button onClick={() =>DeleteReq(req.requirement_Name)}>Delete</button>
              <input disabled={editbtn} type="file" />
              <button disabled={editbtn}>Save</button>
              
            </div>
            </div>
            </div>
            {(index + 1) % 2 === 0 && <br />}
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
            <button onClick={() =>DeleteReq(req.requirement_Name)}>Delete</button><br />
              <label htmlFor="">Edit</label>
              <input type="file"  onChange={(event) => handleFileChange1(index, event)}/>
              <button>Save</button>
              
            </div>
            </div>
            </div>
            {(index + 1) % 2 === 0 && <br />}
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
          <div key={index}>
          <div className="grid_container">
          <div className="requirelist">
            <div className="requireprev">   
            {<img src={images[index]} />}
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
          {(index + 1) % 2 === 0 && <br />}
          </div>
          </div>
          </>
          )
 

    });
return(
  <>
    <Homepage/>
    {!loadingPage && <div className="userscho">
      <div className='schousercont'>
    <div>
    <h1>Requirements</h1>
    </div>
    {!loading && <div className="userequirements">
       {requirements}
       <button onClick={handleSubmit}>Submit</button>
    </div>}{loading && <LoopingRhombusesSpinner/>}
    </div>
    <div className="userdocusub">
      <div className="userschocont">
      <div>
        <h1>Your documents</h1>
      </div>
      {submitted ? (<div className='usersbumtdoc'>
      {ViewsubDocs()}
      </div>) : (<p>No document submitted</p>)}
    </div>
    </div>
    </div>}{loadingPage && <LoopingRhombusesSpinner/>}

  </>
)
}
export default Scholar