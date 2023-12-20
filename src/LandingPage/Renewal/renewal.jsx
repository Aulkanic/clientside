import React from 'react'
import { FetchingBmccSchocODE,ListofReq,FetchRenewal,FillRenewal,FillRenewal1 } from '../../Api/request'
import './renewal.css'
import { useState } from 'react'
import { useEffect } from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import swal from 'sweetalert';
import { Button } from '@mui/material'
import { Backdrop, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import TextInput from '../../Components/InputField/text';
import TeleInput from '../../Components/InputField/telephone'
import SelectInput from '../../Components/InputField/select'
import CustomButton from '../../Components/Button/button'
import { barangayList,yearList,elementaryList,juniorhighList,collegeList,seniorhighList } from '../../Pages/Public/ApplicationForm/listOptions'
import { useDispatch, useSelector } from 'react-redux';

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 50,
    color: '#fff',
  }));
  const messageStyle = {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f2f2f2',
    border: '1px solid #ddd',
    borderRadius: '5px',
    maxWidth: '400px',
    margin: '0 auto',
  };

  const headingStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const paragraphStyle = {
    fontSize: '16px',
    marginBottom: '10px',
  };

const Renewal = () => {
    const user = useSelector((state) => state.login);
    const [schoinf,setSchoinf] = useState([]);
    const [renewal,setRenewal] = useState([]);
    const [reqlist,setReqlist] = useState([]);
    const [showBackdrop, setShowBackdrop] = useState(false);
    const [file,setFile] = useState([]);
    const [loading,setLoading] = useState(false)
    const [updated,setUpdated] = useState({
      phoneNum: '',
      baranggay:'',
      school:'',
      yearLevel:'',
      gradeLevel:'',
      guardian:''
    })
    const [disablebtn1,setDisablebtn1] = useState(true);
    const [errors,setErrors] = useState({});
    const scholarCode = user.info.scholarCode;

      useEffect(() => {
          async function fetchData() {
            try {

              const re = await FetchRenewal.FETCH_RENEW();
              const re1 = await FetchingBmccSchocODE.FETCH_SCHOLARSCODE(scholarCode)
             
                setSchoinf(re1.data.inf)
                const Batch = re1.data.inf[0].Batch;
                const Scholartype = re1.data.inf[0].scholarshipApplied;
                const req = await ListofReq.FETCH_REQUIREMENTS();
                const renewalList = req.data.Requirements.results?.filter((data) => 
                data.docsfor === 'Renewal' &&
                data.batch === Batch &&
                data.schoName === Scholartype
                )
                setReqlist(renewalList)
              if(re.data.success !== 0){
                setRenewal(re.data.list[0]);
              }
         
            } catch (error) {
              console.error('Error fetching renewal data:', error);
              // Handle the error, e.g., show an error message
            } 
          }
          fetchData();
      }, []);
      const getOptionsBasedOnYearLevel = (data) => {
        const year = updated.yearLevel || data.yearLevel.toUpperCase();
        switch (year) {
          case 'ELEMENTARY':
            return elementaryList;
          case 'COLLEGE':
            return collegeList;
          case 'JUNIOR HIGHSCHOOL':
            return juniorhighList;
          case 'SENIOR HIGHSCHOOL':
            return seniorhighList;
          default:
            return [];
        }
      };
      const handleFileChange = (index,data, event) => {
        const files = [...file];
        const req = event.target.files[0]
        files[index] = {file:req,reqName:data.requirementName};
    
        setFile(files);
        
      };
      const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const errors = {};
            if(updated.phoneNum){
              if (!/^9\d{9}$/.test(updated.phoneNum)) {
                errors.contactNum = "Invalid phone number.";
              }
            }

            if (!errors || Object.keys(errors).length > 0) {
              setErrors(errors);
              return;
            }
            if (!file || reqlist.length !== file.length) {
              swal({
                text: 'Please upload all Pictures.',
                timer: 2000,
                buttons: false,
                icon: "error",
              });
              return false;
            }
            console.log(errors)
            const hasEmptyOrUndefined = file.some((list) => {
           
              return !list.file || !list.reqName || !list;
            });
            
            if (hasEmptyOrUndefined) {
              swal({
                text: 'Please provide both a file and a request name for each entry.',
                timer: 2000,
                buttons: false,
                icon: "error",
              });
              return;
            }
            const isValid = file.every((list) => {
             
              if(!list){
                swal({
                  text: 'Please upload all Pictures.',
                  timer: 2000,
                  buttons: false,
                  icon: "error",
                });
                return false;
              }
              if (list.file instanceof File) {
                const allowedExtensions = ['jpg', 'jpeg', 'png'];
                const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes
                const fileExtension = list.file.name.split('.').pop().toLowerCase();
                
                if (!allowedExtensions.includes(fileExtension)) {
                  swal({
                    text: 'Please upload a PNG or JPG image for all Pictures.',
                    timer: 2000,
                    buttons: false,
                    icon: "error",
                  });
                  return false;
                }
            
                if (list.file.size > maxFileSize) {
                  swal({
                    text: 'Please make sure all files are less than 5MB in size.',
                    timer: 2000,
                    buttons: false,
                    icon: "error",
                  });
                  return false;
                }
            
                return true;
              }
              return true;
            });
            if(!isValid){
              return
            }
            console.log('running')
            const user = schoinf[0];
            const date = new Date();
            const formData = new FormData();
    
            formData.append('name', user.Name);
            formData.append('scholarCode', user.scholarCode);
            formData.append('schoApplied', user.scholarshipApplied);
            formData.append('applicantNum', user.applicantNum);
            formData.append('yearLevel', updated.yearLevel || user.yearLevel);
            formData.append('baranggay', updated.baranggay || user.Baranggay);
            formData.append('batch', user.Batch);
            formData.append('email', user.email);
            formData.append('phoneNum', updated.phoneNum || user.phoneNum);
            formData.append('remarks', user.remarks);
            formData.append('gradeLevel', updated.gradeLevel || user.gradeLevel);
            formData.append('school', updated.school || user.school);
            formData.append('guardian', updated.guardian || user.guardian);
            formData.append('deadline', renewal.deadline);
            formData.append('updated', date);
            formData.append('year', renewal.year);
            formData.append('tableName', renewal.reqtable);
            formData.append('renewTitle', renewal.renewTitle);
    
            setLoading(true);
    
            const res = await FillRenewal.SET_RENEW(formData);
    
            if (res.data.success === 0) {
                setLoading(false);
                swal(res.data.message);
                return;
            } else {
            
                try {
                    let counter = 0;
              
                    for (let index = 0; index < file.length; index++) {
                        const filereq = file[index].file;
                        const det = file[index].reqName;
                        if (!file) {
                            continue;
                        }
                        const formData = createFormData(filereq, det);
    
                        try {
                             await uploadDocument(formData)
                             .then((res)=>{
                              counter += 1;
                              if(counter === file.length){
                                setFile([])
                                setDisablebtn1(true)
                                setLoading(false)
                                swal({
                                  text: 'Successfully Submitted',
                                  timer: 2000,
                                  buttons: false,
                                  icon: "success",
                                });
                                return
                              }

                             })
                           
                        } catch (error) {
                            handleFailedUpload(index, error);
                        }
                    }
                } catch (error) {
                    console.log('An error occurred during file submission:', error);
                }
            }
        } catch (error) {
            console.error('An unexpected error occurred:', error);
        }
      };
      const createFormData = (filereq,det) => {
        const applicantNum = schoinf[0].scholarCode;
        const formData = new FormData();
        formData.append('picture', filereq);
        formData.append('reqName', det);
        formData.append('scholarCode', applicantNum);
        formData.append('Name', schoinf[0].Name);
        formData.append('tableName', renewal.reqtable);
        return formData;
      };     
      const uploadDocument = async (formData) => {
        try {
          const res = await FillRenewal1.SET_RENEW1(formData);
          return res.data;
        } catch (error) {
          throw error;
        }
      };
      const handleFailedUpload = (index, error) => {
        setLoading(false)
        console.error(`File upload failed for index ${index}:`, error);
        // You can implement appropriate error handling here
      };
      const isRenewalForm = () =>{
        let details;
        if(renewal){
            const Deadline = new Date(renewal?.deadline);
            const today = new Date()
            if(Deadline < today){
                details = 1
            }else{
                details =2 
            }
        }else{
            details= 0
        }
        return details
      };
      const handleOptionChange = (data) => {
        const { name, value } = data;    
        setUpdated({ [name]: value });
      }
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        const caps = value.toUpperCase()
        setUpdated({ [name]: value });
      };
      const isOpen = isRenewalForm();
  return (
    <>
    <StyledBackdrop open={showBackdrop}>
    <CircularProgress color="inherit" />
    </StyledBackdrop>
    {isOpen === 2 && (<div className='w-full'>
        <div className='w-full h-full bg-white p-10'>
            <h1 className='font-bold text-3xl'>Scholarship Renewal Form</h1>
            <div className="w-full flex flex-wrap flex-col md:flex-row gap-2">
                {schoinf?.map((data,index) =>{
                    return (
                        <>
                        <div key={index} className='flex-1 pt-2 md:pt-0'>
                          <h1 className='mb-4 text-lg md:text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-2xl dark:text-white'>Details</h1>
                        <TextInput
                            label={"Name"}
                            required={false}
                            type={'text'}
                            name='Name'
                            value={data.Name}
                            readonly={true}
                          />
                          <TextInput
                            label={"Gender"}
                            required={false}
                            type={'text'}
                            name='Gender'
                            value={data.gender}
                            readonly={true}
                          />
                          <TextInput
                            label={"Scholarship Applied"}
                            required={false}
                            type={'text'}
                            name='scholarshipApplied'
                            value={data.scholarshipApplied}
                            readonly={true}
                          />
                          <TextInput
                            label={"Batch"}
                            required={false}
                            type={'text'}
                            name='Batch'
                            value={data.Batch}
                            readonly={true}
                          />
                          <TextInput
                            label={"Email"}
                            required={false}
                            type={'text'}
                            name='Email'
                            value={data.email}
                            readonly={true}
                          />
                          <TeleInput
                              label={'Phone Number'}
                              type={'text'}
                              required={true}
                              name='phoneNum'
                              onChange={handleInputChange}
                              error={errors.contactNum}
                              placeholder={data.phoneNum}
                              value={updated.phoneNum}
                              readonly={false}
                          />
                          <SelectInput
                            label={"Barangay"}
                            required={true}
                            value={updated.baranggay || data.Baranggay.toUpperCase()}
                            onChange={handleOptionChange}
                            options={barangayList}
                          />
                          <TextInput
                            label={"Current School"}
                            required={false}
                            type={'text'}
                            name='school'
                            value={updated.school}
                            placeholder={data.school} 
                            onChange={handleInputChange}
                            readonly={false}
                          />
                          <SelectInput
                            label={"Year Level"}
                            required={true}
                            value={updated.yearLevel || data.yearLevel.toUpperCase()}
                            onChange={handleOptionChange}
                            options={yearList}
                          />
                          <SelectInput
                            label={"Grade/Year"}
                            required={true}
                            value={updated.gradeLevel || data.gradeLevel.toUpperCase()}
                            onChange={handleOptionChange}
                            options={getOptionsBasedOnYearLevel(data)}
                          />
                          <TextInput
                            label={"Guardian"}
                            required={false}
                            type={'text'}
                            name='guardian'
                            value={updated.guardian}
                            placeholder={data.guardian} 
                            onChange={handleInputChange}
                            readonly={false}
                          />
                        </div>
                        <div className='flex-1'>
                        <h1 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-2xl dark:text-white'>List of Requirements</h1>
                            {reqlist?.map((data,index) =>{
                                return(
                                  <div key={index}>                             
                                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">{data.requirementName}</label>
                                  <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                  id="file_input" accept=".jpg, .jpeg, .png" type="file" onChange={(event) => handleFileChange(index,data, event)} />
                                  </div>
                                )
                            })}
                        </div>
                        </>
                    )
                })}
            </div>
            {schoinf.length > 0 && <div style={{margin:'15px'}}>
            <CustomButton
            label={'Submit Renewal'}
            color={'blue'} 
            loading={loading}
            onClick={handleSubmit}
            /> 
            </div>}
        </div>
    </div>)}
    {isOpen === 1 && (<>
        <div style={messageStyle} className="renewal-ended-message">
      <h2 style={headingStyle}>Renewal Period Has Ended</h2>
      <p style={paragraphStyle}>The renewal period for this scholarship has ended.</p>
      <p style={paragraphStyle}>If you have any questions or need further assistance, please contact our support team.</p>
    </div>
    </>)}
    {isOpen === 0 && (<>
        <div style={messageStyle} className="no-renewal-message">
      <h2 style={headingStyle}>No Renewal For Now</h2>
      <p style={paragraphStyle}>There is currently no active renewal period for this scholarship.</p>
      <p style={paragraphStyle}>Please check back later for updates or contact our support team if you have any questions.</p>
    </div>
    </>)}
    </>
  )
}

export default Renewal