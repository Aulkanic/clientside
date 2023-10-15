import React, { useEffect, useMemo, useState } from 'react'
import { useContext } from 'react';
import { multiStepContext } from './StepContext';
import Button from '@mui/material/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ScrollToTopButton from '../../userhome/components/scrollButton.jsx'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { ApplicationForm,ScholarCategory,ApplyForm } from '../../Api/request';
import LoadingButton from '@mui/lab/LoadingButton';
import swal from 'sweetalert';
import '../css/economic.css'
import '../css/buttonStyle.css'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Backdrop, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 50,
  color: '#fff',
}));

function Economic() {
    const { t } = useTranslation();
    const [showBackdrop, setShowBackdrop] = useState(false);
    const { setStep, userData, setUserData} = useContext(multiStepContext);
    const [errors, setErrors] = useState({}); 
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false)
    const [scholarprog, setScholarProg] = useState([]);
    const [formq,setFormq] = useState([]);
    const [formc,setFormc] = useState([]);
    const [selectedValues, setSelectedValues] = useState([]);

    // Handler to update selected value for a specific question
    const handleRadioChange = (questionIndex,qscore,questions,value,cscore) => {
      setSelectedValues((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[questionIndex] = {  question: qscore,questions, value,cscore };
        return updatedValues;
      });
    };
  
    console.log(userData)

    useEffect(() => {
      async function fetchData() {
        const scholist = await ScholarCategory.ScholarshipProgram();
        const schodata = scholist.data.SchoCat;
        setScholarProg(schodata);
  
        const frm = await ApplicationForm.FETCH_FORM();
        setFormq(frm.data.Questions);
        setFormc(frm.data.Answers);
      }
  
      fetchData();
    }, []);

    useEffect(() => {
      setSelectedValues([]);
    }, [userData.schoID]);

   
    function Check(){
      const errors = {};
      if(userData.schoID === ''){
        errors.scho = 'Please select Scholarship Program'
      }
      setErrors('')
      const isComplete = selectedValues.some((item) => typeof item === 'undefined')
      const isLength = selectedValues.length !== Questionlist.length
      if(isComplete || isLength){
        errors.frm = 'Incomplete'
      }
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        console.log(errors)
        return;
      }
      setErrors('')
      let formattedBirthday = '';      
      const birthdayDate = new Date(userData.birthday);

      if (birthdayDate instanceof Date) {
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
       formattedBirthday = birthdayDate.toLocaleDateString('en-US', options);
      } else {
        console.error("Invalid date format");
      }
      const fullName = `${userData.firstName} ${userData.lastName}`
      let birthdayValue = formattedBirthday;

      const formData = new FormData();
      formData.append('applicantNum', userData.applicantNum);
      formData.append('address', userData.address);
      formData.append('age', userData.age);
      formData.append('baranggay', userData.baranggay);
      formData.append('birthday', birthdayValue);
      formData.append('birthPlace', userData.birthPlace);
      formData.append('schoolAddress', userData.SchoolAddress);
      formData.append('citizenship', userData.citizenship);
      formData.append('contactNum', userData.contactNum);
      formData.append('course', userData.course);
      formData.append('school', userData.School);
      formData.append('yearLevel', userData.yearLevel);
      formData.append('email', userData.email);
      formData.append('fatherEduc', userData.fatherEduc);
      formData.append('fatherName', userData.fatherName);
      formData.append('fatherlName', userData.fatherlName);
      formData.append('fatherOccu', userData.fatherOccu);
      formData.append('fullName', fullName);
      formData.append('gender', userData.gender);
      formData.append('guardianContact', userData.guardianContact);
      formData.append('guardianAddress', userData.guardianAddress);
      formData.append('guardianName', userData.guardianName);
      formData.append('guardianlName', userData.guardianlName);
      formData.append('motherEduc', userData.motherEduc);
      formData.append('motherName', userData.motherName);
      formData.append('motherlName', userData.motherlName);
      formData.append('motherOccu', userData.motherOccu);
      formData.append('relationship', userData.relationship);
      formData.append('gradeLevel', userData.gradeLevel);
      formData.append('scholarID', userData.schoID);
      formData.append('familyCode', userData.familyCode);
      for (let i = 0; i < selectedValues.length; i++) {
        formData.append(`userfrm[${i}]`, JSON.stringify(selectedValues[i]));
      }
      for (let i = 0; i < userData.siblings.length; i++) {
        formData.append(`siblings[${i}]`, JSON.stringify(userData.siblings[i]));
      }
      setShowBackdrop(true)
      ApplyForm.CREATE_APPINFO(formData)
      .then(res => {
          console.log(res.data)
          if(res.data.success === 1){
           
            setUserData('');
            localStorage.removeItem("userData");
            sessionStorage.removeItem('persist:root')
            setShowBackdrop(false)
            setStep(4)
            swal({
              title: "Success",
              text: "Successfully Submitted!",
              icon: "success",
              button: "OK",
            });
          
          }
          else{
            setShowBackdrop(false)
            swal({
              title: "Error",
              text: "Something Went Wrong!",
              icon: "error",
              button: "OK",
            });
      
        navigate('/ApplicationForm');
      }}
      )
     .catch(err => console.log(err));
     setLoading(false)

  };
    const schoav = scholarprog.filter(data => data.status === 'Open');
    console.log(schoav)
    const Questionlist = formq?.filter(data => data.scholarshipProg === userData.schoID)


    const FormTemplate = Questionlist?.map((data,index) =>{
      const choices = formc?.filter(question => question.questionsid === data.id)

        return(
          <div key={index} style={{padding:'10px 50px 10px 50px'}}>
            <FormControl sx={{width:'100%'}}>
              <FormLabel sx={{fontWeight:'700',color:'black'}} id="demo-row-radio-buttons-group-label">
                {index + 1}.{t(data.questions)}
                </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={(selectedValues[index] && selectedValues[index].value) || ''} // Set the selected value for this question
                onChange={(event) => handleRadioChange(index,data.scorecard,data.questions, event.target.value, parseInt(event.target.id))}
              >
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(50%, 1fr))',
                  gap: '5px', 
                 
                }}>
                {choices?.map((choice,index) =>{
                  return(
                    <FormControlLabel key={index} value={choice.value} control={<Radio  id={choice.scorecard} />} label={t(choice.value)} />
                  )
                })}
               </div>
              </RadioGroup>
            </FormControl>
          </div>
        )
       })
    return (
      <>
       <StyledBackdrop open={showBackdrop}>
        <CircularProgress color="inherit" />
      </StyledBackdrop>    
    <div className='Econ'>
        <div className="Econd">
            <div className="form">
              <div className='infocontainer'>
                {errors.frm && (
              <Alert severity="error">
                <AlertTitle sx={{fontWeight:700}}>Incomplete</AlertTitle>
                Please provide answer for all the questions below
              </Alert>
                )}
                {errors.scho && (
              <Alert severity="error">
                <AlertTitle sx={{fontWeight:700}}>Error</AlertTitle>
                {errors.scho}
              </Alert>
                )}

              <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label className='frmlabel'>Scholarship Program</Form.Label>
            <Form.Select aria-label="Default select example"
              value={userData['schoID']} 
              onChange={(e) =>setUserData({...userData,"schoID" : e.target.value})}
              style={{height:'maxContent'}}
            >
              {schoav?.map((data,index) =>{
                  console.log(data)
                  return(
                    <>
                    {index === 0 && <option key={index} value=''>Select Scholarship Program</option>}
                    {index >= 0 && <option key={data.name} value={data.name}>{data.name}</option>}
                    </>
                  )
                })}
            </Form.Select>
            </Form.Group>
          </Row>
                {FormTemplate}
              </div>
            <div className='frmbtnec'>
            <Button className='myButton' variant="contained" onClick={() => setStep(2)}>Previous</Button>
            <div>
            <LoadingButton
                loading={loading}
                sx={{color:'white',textTransform:'none'}}
                loadingPosition="end"
                className='myButton1'
                onClick={Check}
                fullWidth

              >
                Submit
              </LoadingButton>
            </div>

            </div>
            </div>
           
        </div>
    </div>
    <ScrollToTopButton/>
    </>
  )
}

export default Economic