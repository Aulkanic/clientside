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
const [fileValues, setFileValues] = useState([]);
const [fileNames, setFileNames] = useState([]);
const [loading, setLoading] = useState(false);
const [loadingPage, setLoadingPage] = useState(false);
const [images, setImages] = useState([]);
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
      console.log(res)
      setLoading(false)
    })
  });
};
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await Promise.all([
        Axios.get(`http://localhost:3006/api/v1/documents/Requirements`),
        Axios.get(`http://localhost:3006/api/v1/requirements/${applicantNum}`)
      ]);
      setDocs(response[0].data.Requirements);
      setSubmittedDocs(response[1].data.Document);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);

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
        </div>
        </div>
        {(index + 1) % 2 === 0 && <br />}
        </div>
        </div>}
        </>
      );
    });
    const requirements = docs?.map((docu, index) => {
      const checkdocs =  submitted[index];
      console.log(docu,checkdocs)
      if(checkdocs){
        
      return (
        <>
        {<div key={index}>
        <div className="grid_container">
        <div className="requirelist">
          <div className="requireprev">   
          {<img src={images[index]} />}
          </div>
          <div className='userlistreq'>
        <label htmlFor="">{docu.requirementName}</label>
        {!checkdocs ? (<input 
        type="file" 
        name={`${docu.requirementName}`}  
        onChange={(event) => handleFileChange(index, event)} />) 
          : (<p>Already Submitted</p>)}
        </div>
        </div>
        {(index + 1) % 2 === 0 && <br />}
        </div>
        </div>}
        </>
      );
        }
      else if(!checkdocs){
        return (
          <>
          {<div key={index}>
          <div className="grid_container">
          <div className="requirelist">
            <div className="requireprev">   
            {<img src={images[index]} />}
            </div>
            <div className='userlistreq'>
          <label htmlFor="">{docu.requirementName}</label>
          <input 
          type="file" 
          name={`${docu.requirementName}`}  
          onChange={(event) => handleFileChange(index, event)} />
          </div>
          </div>
          {(index + 1) % 2 === 0 && <br />}
          </div>
          </div>}
          </>
        );
      }
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
      {documentsubmitted}
      </div>) : (<p>No document submitted</p>)}
    </div>
    </div>
    </div>}{loadingPage && <LoopingRhombusesSpinner/>}

  </>
)
}
export default Scholar