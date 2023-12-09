import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { multiStepContext } from './StepContext';
import { useDispatch } from 'react-redux';
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
import swal from 'sweetalert';
import '../css/economic.css'
import '../css/buttonStyle.css'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Backdrop, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { setForm,resetForm } from '../../Redux/formSlice.js';
import SelectInput from '../../Components/InputField/select.jsx';
import CustomButton from '../../Components/Button/button.jsx';

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 50,
  color: '#fff',
}));

function Economic() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const form = useSelector((state) => state.form)
    const [showBackdrop, setShowBackdrop] = useState(false);
    const { setStep} = useContext(multiStepContext);
    const [errors, setErrors] = useState({}); 
    const navigate = useNavigate();
    const schoid = localStorage.getItem('schoId');
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
    useEffect(() => {
      async function fetchData() {
        const scholist = await ScholarCategory.ScholarshipProgram();
        const schodata = scholist.data.SchoCat.filter(data => data.status === 'Open');
        const list = schodata.map((data =>{
          return({
            label: data.name,
            value: data.name,
            name:'schoId'
          })
        }))
        setScholarProg(list);
        const frm = await ApplicationForm.FETCH_FORM();
        setFormq(frm.data.Questions);
        setFormc(frm.data.Answers);
      }
  
      fetchData();
    }, []);

    useEffect(() => {
      
      setSelectedValues([]);
    }, [form.schoID]);

    const handleOptionChange = (data) => {
      const { name, value } = data;    
      dispatch(setForm({ [name]: value }));
    }
  async function Check(){
      const errors = {};
      if(form.schoId === ''){
        errors.schoId = 'Please select Scholarship Program'
      }
      setErrors('')
      const isComplete = selectedValues.some((item) => typeof item === 'undefined')
      const isLength = selectedValues.length !== Questionlist.length
      if(isComplete || isLength){
        errors.frm = 'Incomplete'
      }
      if (Object.keys(errors).length > 0) {
        setErrors(errors);

        return;
      }
      setErrors('')
      setLoading(true)
      let formattedBirthday = '';      
      const birthdayDate = new Date(form.birthday);

      if (birthdayDate instanceof Date) {
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
       formattedBirthday = birthdayDate.toLocaleDateString('en-US', options);
      } else {
        console.error("Invalid date format");
      }
      function toTitleCase(str) {
        return str?.replace(/\w\S*/g, function(txt){
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      }
      const fname = toTitleCase(form.firstName);
      const lname = toTitleCase(form.lastName);
      const mname = toTitleCase(form.middleName);
      const fullName = `${fname} ${mname} ${lname}`
      let birthdayValue = formattedBirthday;

      const formData = new FormData();
      formData.append('applicantNum', form.applicantNum);
      formData.append('firstName', form.firstName);
      formData.append('lastName', form.lastName);
      formData.append('middleName', form.middleName);
      formData.append('address', form.address);
      formData.append('age', form.age);
      formData.append('baranggay', form.baranggay);
      formData.append('birthday', birthdayValue);
      formData.append('birthPlace', form.birthPlace);
      formData.append('schoolAddress', form.SchoolAddress);
      formData.append('citizenship', form.citizenship);
      formData.append('contactNum', form.contactNum);
      formData.append('course', form.course);
      formData.append('school', form.School);
      formData.append('yearLevel', form.yearLevel);
      formData.append('email', form.email);
      formData.append('fatherEduc', form.fatherEduc);
      formData.append('fatherName', form.fatherName);
      formData.append('fatherlName', form.fatherlName);
      formData.append('fathermName', form.fathermName);
      formData.append('fatherOccu', form.fatherOccu);
      formData.append('fullName', fullName);
      formData.append('gender', form.gender);
      formData.append('guardianContact', form.guardianContact);
      formData.append('guardianAddress', form.guardianAddress);
      formData.append('guardianName', form.guardianName);
      formData.append('guardianlName', form.guardianlName);
      formData.append('guardianmName', form.guardianmName);
      formData.append('motherEduc', form.motherEduc);
      formData.append('motherName', form.motherName);
      formData.append('motherlName', form.motherlName);
      formData.append('mothermName', form.mothermName);
      formData.append('motherOccu', form.motherOccu);
      formData.append('relationship', form.relationship);
      formData.append('gradeLevel', form.gradeLevel);
      formData.append('userType', form.userType);
      formData.append('scholarId', form.schoId);
      formData.append('familyCode', form.familyCode);
      for (let i = 0; i < selectedValues.length; i++) {
        formData.append(`userfrm[${i}]`, JSON.stringify(selectedValues[i]));
      }
      for (let i = 0; i < form.siblings.length; i++) {
        formData.append(`siblings[${i}]`, JSON.stringify(form.siblings[i]));
      }
     
      await ApplyForm.CREATE_APPINFO(formData)
      .then(res => {
          if(res.data.success === 1){
            dispatch(resetForm());
            localStorage.removeItem('nofather');
            localStorage.removeItem('sameaddress');
            localStorage.removeItem('onlychild');
            setLoading(false)
            setStep(4)
            swal({
              title: "Success",
              text: "Successfully Submitted!",
              icon: "success",
              button: "OK",
            });
          
          }
          else{
            setLoading(false)
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

  };

    const Questionlist = formq?.filter(data => data.scholarshipProg === form.schoId)
    const FormTemplate = Questionlist?.map((data,index) =>{
    const choices = formc?.filter(question => question.questionsid === data.id)

        return(
          <div key={index} style={{padding:'10px 50px 10px 50px'}}>
            <FormControl sx={{width:'100%'}}>
              <FormLabel sx={{fontWeight:'700',color:'black',backgroundColor:'#ced4da',padding:'15px',borderRadius:'5px'}} id="demo-row-radio-buttons-group-label">
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
                  marginLeft:'30px'
                 
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
    <div className='w-full bg-white pt-4'>
        <div className="w-full">
            <div className="w-full ">
              <div className='w-full'>
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
            
            {!schoid ? (<>
            <div className='px-4'>
             <SelectInput
                label={t("Scholarship Program")}
                required={true}
                value={form.schoId}
                onChange={handleOptionChange}
                options={scholarprog}
                error={errors.schoId}
              />
            </div>

            </>) : (
            <div>
            <h1 className='bg-[#043F97] w-full text-white pl-4 py-4 mb-4 text-lg font-bold'>
              {schoid}
            </h1>
            </div>)}
            </Form.Group>
          </Row>
                {FormTemplate}
              </div>
              <div className='flex justify-end items-end gap-2 pr-4 pb-4'>
              <CustomButton
                label={'Previous'}
                color={'blue'}
                loading={false}
                onClick={() => setStep(2)}
              />
              <CustomButton
                label={'Submit form'}
                color={'green'}
                loading={loading}
                disabled={loading}
                onClick={Check}
              />
              </div>
            </div>
        </div>
    </div>
    <ScrollToTopButton/>
      </>
  )
}

export default Economic