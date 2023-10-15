import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { multiStepContext } from './StepContext';
import Button from '@mui/material/Button';
import swal from 'sweetalert';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import '../css/persona.css'
import '../css/buttonStyle.css'
import { Rulelist,FetchingFamily,CheckFamily } from '../../Api/request';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Switch from '@mui/material/Switch';
import { useTranslation } from 'react-i18next';
import { Backdrop, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 50,
  color: '#fff',
}));

function Persona() {
  const { t } = useTranslation();
    const { setStep, userData, setUserData} = useContext(multiStepContext);
    const [errors, setErrors] = useState({}); 
    const [showBackdrop, setShowBackdrop] = useState(false);
    const [famlist, setFamlist] = useState([]);
    const [rule,setRule] = useState([]);
    const [siblings, setSiblings] = useState([])
    const [onlyChild, setOnlyChild] = useState(false);
    const [noFather, setNoFather] = useState(false);
    const [value, setValue] = useState('Other');
    const [isGuardiancheck,setisGuardiancheck] = useState(false)
    const [isFather,setisFather] = useState(false)
 
    const handleChangeRadio = (event) => {
      setValue(event.target.value);
      const isGuardian = event.target.value;
      if(isGuardian === 'Father'){
        userData.guardianName = userData.fatherName;
        userData.guardianlName = userData.fatherlName;
        userData.relationship = 'FATHER'
        setisGuardiancheck(true);
      }
      if(isGuardian === 'Mother'){
        userData.guardianName = userData.motherName;
        userData.guardianlName= userData.motherlName ;
        userData.relationship = 'MOTHER';
        setisGuardiancheck(true)
      }
      if(isGuardian === 'Other'){
        userData.guardianName = '';
        userData.guardianlName= '' ;
        userData.relationship ='';
        setisGuardiancheck(false)
      }
    };

    const handleInputChange = (index, field, value) => {
      const updatedSiblings = [...siblings];
      updatedSiblings[index][field] = value;
      setSiblings(updatedSiblings);
    };
    const handleAddFields = () =>{
      setSiblings([...siblings, { firstName: '', lastName: '' }]);
    }

    const handleRemoveFields = (index) =>{
      const values = [...siblings]
      values.splice(index, 1);
      setSiblings(values)
    }
    const handleOnlyChild = () =>{
      if(!onlyChild){
        setOnlyChild(true);
        setSiblings([])
      }else{
        setOnlyChild(false)
      }
    }
    const handleNoFather = () =>{
      if(!noFather){
        setNoFather(true);
        userData.fatherName = 'NONE';
        userData.fatherlName = 'NONE';
        userData.fatherEduc = 'NONE'
        userData.fatherOccu = 'NONE'
        setisFather(true);
      }else{
        setNoFather(false)
        userData.fatherName = '';
        userData.fatherlName = '';
        userData.fatherEduc = ''
        userData.fatherOccu = ''
        setisFather(false);
      }
    }

    useEffect(() =>{
          async function Fetch(){
            const rul = await Rulelist.FETCH_RULE()
            const famdata = await FetchingFamily.FETCH_FAM();
            const datafam = famdata.data.Familylist;
            const famrecord = datafam?.filter(data => 
              data.motherName !== 'None' &&
              data.fatherName !== 'None' 
              )
            setFamlist(famrecord)
            setRule(rul.data.result[0])
          }
          Fetch()
    },[])

   async function Check(){
      const errors = {};
      if (!userData.motherName || userData.motherName === '') {
        errors.motherName = "This Field is required";
      } 
      else if (userData.motherName.length === 1) {
        errors.motherName = "Input must not contain a single letter.";
      }
      else if (userData.motherName.length > 50) {
        errors.motherName = "Input should contain less than 50 characters.";
      }
      else if (/[0-9]/.test(userData.motherName)) {
        errors.motherName = "Input must not contain numeric value.";
      }
      else if (/[!@#$%^&*/_(),.?":{}|<>]/.test(userData.motherName)) {
        errors.motherName = "Special characters are not allowed.";
      }
       else if (!/^[A-Z][A-Za-z,\s]*$/.test(userData.motherName)) {
        errors.motherName = "First Letter must be Capital";
      }
      if (!userData.motherlName || userData.motherlName === '') {
        errors.motherlName = "This Field is required";
      } 
      else if (userData.motherlName.length === 1) {
        errors.motherlName = "Input must not contain a single letter.";
      }
      else if (userData.motherlName.length > 50) {
        errors.motherlName = "Input should contain less than 50 characters.";
      }
      else if (/[0-9]/.test(userData.motherlName)) {
        errors.motherlName = "Input must not contain numeric value.";
      }
      else if (/[!@#$%^&*/_(),?":{}|<>]/.test(userData.motherlName)) {
        errors.motherlName = "Special characters are not allowed.";
      }
       else if (userData.motherlName.charAt(0) !== userData.motherlName.charAt(0).toUpperCase()) {
        errors.motherlName = "First Letter must be Capital";
      }
      if (!userData.motherOccu || userData.motherOccu === '') {
        errors.motherOccu = "This Field is required";
      } else if (userData.motherOccu.length === 1) {
        errors.motherOccu = "Input must not contain a single letter.";
      } else if (userData.motherOccu.length > 50) {
        errors.motherOccu = "Input should contain less than 50 characters.";
      } else if (/[0-9]/.test(userData.motherOccu)) {
        errors.motherOccu = "Input must not contain numeric value";
      } else if (/[!@#$%^&*/_(),.?":{}|<>]/.test(userData.motherOccu)) {
        errors.motherOccu = "Special characters are not allowed.";
      } else if (!/^[A-Z][A-Za-z,\s]*$/.test(userData.motherOccu)) {
        errors.motherOccu = "First Letter must be Capital";
      }
      if (!userData.motherEduc || userData.motherEduc === '') {
        errors.motherEduc = "This Field is required";
      } else if (userData.motherEduc.length === 1) {
        errors.motherEduc = "Input must not contain a single letter.";
      } else if (/[0-9]/.test(userData.motherEduc)) {
        errors.motherEduc = "Input must not contain numeric value";
      } else if (/[!@#$%^&*/_(),.?":{}|<>]/.test(userData.motherEduc)) {
        errors.motherEduc = "Special characters are not allowed.";
      } else if (!/^[A-Z][A-Za-z,\s]*$/.test(userData.motherEduc)) {
        errors.motherEduc = "First Letter must be Capital";
      }
      if (!userData.fatherName || userData.fatherName === '') {
        errors.fatherName = "This Field is required";
      } 
      else if (userData.fatherName.length === 1) {
        errors.fatherName = "Input must not contain a single letter.";
      }
      else if (userData.fatherName.length > 50) {
        errors.fatherName = "Input should contain less than 50 characters.";
      } 
      else if (/[0-9]/.test(userData.fatherName)) {
        errors.fatherName = "Input must not contain numeric value.";
      }
      else if (/[!@#$%^&*/_(),.?":{}|<>]/.test(userData.fatherName)) {
        errors.fatherName = "Special characters are not allowed.";
      }
       else if (!/^[A-Z][A-Za-z,\s]*$/.test(userData.fatherName)) {
        errors.fatherName = "First Letter must be Capital";
      }

      if (!userData.fatherlName || userData.fatherlName === '') {
        errors.fatherlName = "This Field is required";
      } 
      else if (userData.fatherlName.length === 1) {
        errors.fatherlName = "Input must not contain a single letter.";
      }
      else if (userData.fatherlName.length > 50) {
        errors.fatherlName = "Input should contain less than 50 characters.";
      } 
      else if (/[0-9]/.test(userData.fatherlName)) {
        errors.fatherlName = "Input must not contain numeric value.";
      }
      else if (/[!@#$%^&*/_(),?":{}|<>]/.test(userData.fatherlName)) {
        errors.fatherlName = "Special characters are not allowed.";
      }
       else if (userData.fatherlName.charAt(0) !== userData.fatherlName.charAt(0).toUpperCase()) {
        errors.fatherlName = "First Letter must be Capital";
      }


      if (!userData.fatherOccu || userData.fatherOccu === '') {
        errors.fatherOccu = "This Field is required";
      } else if (userData.fatherOccu.length === 1) {
        errors.fatherOccu = "Input must not contain a single letter.";
      } else if (userData.fatherOccu.length > 50) {
        errors.fatherOccu = "Input should contain less than 50 characters.";
      }  else if (/[0-9]/.test(userData.fatherOccu)) {
        errors.fatherOccu = "Input must not contain numeric value";
      } else if (/[!@#$%^&*/_(),.?":{}|<>]/.test(userData.fatherOccu)) {
        errors.fatherOccu = "Special characters are not allowed.";
      } else if (!/^[A-Z][A-Za-z,\s]*$/.test(userData.fatherOccu)) {
        errors.fatherOccu = "First Letter must be Capital";
      }
      if (!userData.fatherEduc || userData.fatherEduc === '') {
        errors.fatherEduc = "This Field is required";
      } else if (userData.fatherEduc.length === 1) {
        errors.fatherEduc = "Input must not contain a single letter.";
      } else if (/[0-9]/.test(userData.fatherEduc)) {
        errors.fatherEduc = "Input must not contain numeric value";
      } else if (/[!@#$%^&*/_(),.?":{}|<>]/.test(userData.fatherEduc)) {
        errors.fatherEduc = "Special characters are not allowed.";
      } else if (!/^[A-Z][A-Za-z,\s]*$/.test(userData.fatherEduc)) {
        errors.fatherEduc = "First Letter must be Capital";
      }
      if (userData.guardianAddress === '') {
        errors.guardianAddress = "This Field is required";
      } 
      if (!userData.guardianName || userData.guardianName === '') {
        errors.guardianName = "This Field is required";
      } 
      else if (userData.guardianName.length === 1) {
        errors.guardianName = "Input must not contain a single letter.";
      }
      else if (/[0-9]/.test(userData.guardianName)) {
        errors.guardianName = "Input must not contain numeric value.";
      }
      else if (/[!@#$%^&*/_()?":{}|<>]/.test(userData.guardianName)) {
        errors.guardianName = "Special characters are not allowed.";
      }
       else if (!/^[A-Z][A-Za-z,\s]*$/.test(userData.guardianName)) {
        errors.guardianName = "First Letter must be Capital";
      }
      if (!userData.guardianlName || userData.guardianlName === '') {
        errors.guardianlName = "This Field is required";
      } 
      else if (userData.guardianlName.length === 1) {
        errors.guardianlName = "Input must not contain a single letter.";
      }
      else if (/[0-9]/.test(userData.guardianlName)) {
        errors.guardianlName = "Input must not contain numeric value.";
      }
      else if (/[!@#$%^&*/_()?":{}|<>]/.test(userData.guardianlName)) {
        errors.guardianlName = "Special characters are not allowed.";
      }
       else if (!/^[A-Z][A-Za-z,\s]*$/.test(userData.guardianlName)) {
        errors.guardianlName = "First Letter must be Capital";
      }
      if (!userData.relationship || userData.relationship === '') {
        errors.relationship = "This Field is required";
      } 
      else if (userData.relationship.length === 1) {
        errors.relationship = "Input must not contain a single letter.";
      }
      else if (/[0-9]/.test(userData.relationship)) {
        errors.relationship = "Input must not contain numeric value.";
      }
      else if (/[!@#$%^&*/_(),.?":{}|<>]/.test(userData.relationship)) {
        errors.relationship = "Special characters are not allowed.";
      }
       else if (!/^[A-Z][A-Za-z,\s]*$/.test(userData.relationship)) {
        errors.relationship = "First Letter must be Capital";
      }
      if (!userData.guardianContact || userData.guardianContact === '') {
        errors.guardianContact = "Phone Number is required";
      } else if (!/^09\d{9}$/.test(userData.guardianContact)) {
        errors.guardianContact = "Invalid phone number.";
      }
      if (!userData.guardianAddress || userData.guardianAddress === '') {
        errors.guardianAddress = "This field is required";
      }

      if(!onlyChild){
        const hasEmptyFields = siblings.some(
          (sibling) =>
            sibling.firstName.trim() === '' ||
            sibling.lastName.trim() === ''
        );
        if(siblings.length === 0){
          errors.sibling = `Atleast Add siblings details if not only child`
        }else if(hasEmptyFields){
          errors.sibling = `Please fill out all sibling information fields.`
        }
      }


        if (Object.keys(errors).length > 0) {
          setErrors(errors);
   
          return;
        }
        setUserData((prevUserData) => ({
          ...prevUserData,
          siblings: siblings, 
        }));
        const userName = `${userData.firstName} ${userData.lastName}`
        const groupedNames = {
          motherName: `${userData.motherName} ${userData.motherlName}`,
          fatherName: `${userData.fatherName} ${userData.fatherlName}`,
          siblingNames: siblings.length > 0 ? [...siblings.map(sibling => `${sibling.firstName} ${sibling.lastName}`), userName].sort() : [],

        };
        
        const formData = new FormData();
        formData.append('familyNames', JSON.stringify(groupedNames));
        setShowBackdrop(true)
        await CheckFamily.CHECK_FAM(formData)
        .then((res) =>{
        
          if(res.data.results.length === rule.famNum){
            setShowBackdrop(false)
            swal({
              title: "Warning",
              text: 'One Family Per head',
              icon: "warning",
              button: "OK",
            });
            setErrors('')
            setStep(2)
            return
          }else{
            setErrors('')
            setUserData((prevData) => ({ ...prevData, familyCode: res.data.familyCode, }));
            setShowBackdrop(false)
            setStep(3)
          }
        })

    };

    useEffect(() => {
      const errors = {};
    
      const fieldsToCheck = [
        'fatherName',
        'fatherlName',
        'fatherOccu',
        'motherName',
        'motherlName',
        'motherOccu',
        'guardianName',
        'guardianlName',
        'guardianAddress',
      ];
    
      fieldsToCheck.forEach((field) => {
        const fieldValue = userData[field];
        if (fieldValue && fieldValue.trim() !== '' && /[a-z]/.test(fieldValue)) {
          errors[field] = 'Use uppercase format only.';
        } else {
          delete errors[field];
        }
      });
      const siblingErrors = [];

      siblings.forEach((sibling, index) => {
        const siblingFirstName = sibling.firstName;
        const siblingLastName = sibling.lastName;
        if (siblingFirstName && siblingFirstName.trim() !== '' && !/^[A-Z]+$/.test(siblingFirstName)) {
          siblingErrors.push(`Sibling ${index + 1} - First Name should be in uppercase.`);
        }
        if (siblingLastName && siblingLastName.trim() !== '' && !/^[A-Z]+$/.test(siblingLastName)) {
          siblingErrors.push(`Sibling ${index + 1} - Last Name should be in uppercase.`);
        }
      });
      
      if (siblingErrors.length > 0) {
        errors.siblingErrors = 'Please Capitalize all letters for all your Siblings information.'; 
      } else {
        delete errors.siblingErrors;
      }
      setErrors(errors);
    }, [userData,siblings]);

    useEffect(() =>{
      if(value === 'Father'){
        userData.guardianName = userData.fatherName;
        userData.guardianlName = userData.fatherlName;
        userData.relationship = 'FATHER'
        setisGuardiancheck(true);
      }
      if(value === 'Mother'){
        userData.guardianName = userData.motherName;
        userData.guardianlName= userData.motherlName ;
        userData.relationship = 'MOTHER';
        setisGuardiancheck(true)
      }
      if(value === 'Other'){
        userData.guardianName = '';
        userData.guardianlName= '' ;
        userData.relationship ='';
        setisGuardiancheck(false)
      }
    },[value])

   const siblingfrm = siblings.map((sibling, index) => (
    <div className='siblinginf' key={index}>
     
      <div>
      <Form.Group as={Col}>
      <Form.Label style={{margin:'0px'}} className='frmlabel'>Sibling {index + 1}</Form.Label><br/>
      <Form.Label style={{fontSize:'15px',margin:'0px'}} className='frmlabel'>{t("First Name")}</Form.Label>
        <Form.Control
          type="text"
          value={sibling.firstName}
          placeholder="Enter sibling's first name"
          onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}
        />
      </Form.Group>
      </div>
      <div>
      <Form.Group as={Col}>
      <Form.Label style={{margin:'0px'}} className='frmlabel'></Form.Label><br/>
      <Form.Label style={{fontSize:'15px',margin:'0px'}} className='frmlabel'>{t("Last Name")}</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter sibling's last name"
          value={sibling.lastName}
          onChange={(e) => handleInputChange(index, 'lastName', e.target.value)}
        />

      </Form.Group>
      </div>
      
      <Button
        className='myButton2'
        variant='secondary'
        onClick={() => handleRemoveFields(index)}
        sx={{margin:'30px 10px -1px 10px'}}
      >
        <DeleteIcon sx={{color:'white'}}/>
      </Button>
    </div>
     ))

    return (
    <>   
      <StyledBackdrop open={showBackdrop}>
        <CircularProgress color="inherit" />
      </StyledBackdrop>
    <div className='Persona'>
        <div className="personad"> 
           
           <div className='form'>

            <div className='parentcontainer'>
              <div className='parenteach'> 
                <div>
                <Form.Group as={Col}>
                <Form.Label className='frmlabel'>Father's first name</Form.Label>
                  <Form.Control
                  placeholder="Your answer"
                  type="text" 
                  disabled={isFather}
                  value={userData['fatherName']} 
                  onChange={(e) =>setUserData({...userData,"fatherName" : e.target.value})} 
                  />
                   {errors.fatherName && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.fatherName}</p>}
                </Form.Group>
                </div>          
                <div>
                <Form.Group as={Col}>
                <Form.Label className='frmlabel'>Father's last name</Form.Label>
                  <Form.Control
                  placeholder="Your answer"
                  type="text" 
                  disabled={isFather}
                  value={userData['fatherlName']} 
                  onChange={(e) =>setUserData({...userData,"fatherlName" : e.target.value})} 
                  />
                  {errors.fatherlName && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.fatherlName}</p>}
                </Form.Group>
                </div>
                <div>
                <Form.Group as={Col}>
                <Form.Label className='frmlabel'>Highest Educational Attaintment</Form.Label>
                  <Form.Select
                  type="text" 
                  disabled={isFather}
                  value={userData['fatherEduc']} 
                  onChange={(e) =>setUserData({...userData,"fatherEduc" : e.target.value})} 
                  >
                {noFather && <option value={userData['fatherEduc']}>{userData['fatherEduc']}</option>}
                <option value={''}>Please select</option>
                <option value="NO GRADE COMPLETED">NO GRADE COMPLETED</option>
                <option value="ELEMENTARY UNDERGRADUATE">ELEMENTARY UNDERGRADUATE</option>
                <option value="ELEMENTARY GRADUATE">ELEMENTARY GRADUATE</option>
                <option value="HIGH SCHOOL UNDERGRADUATE">HIGH SCHOOL UNDERGRADUATE</option>
                <option value="HIGH SCHOOL GRADUATE">HIGH SCHOOL GRADUATE</option>
                <option value="POST SECONDARY UNDERGRADUATE">POST SECONDARY UNDERGRADUATE</option>
                <option value="POST SECONDARY GRADUATE">POST SECONDARY GRADUATE</option>
                <option value="COLLEGE UNDERGRADUATE">COLLEGE UNDERGRADUATE</option>
                <option value="COLLEGE GRADUATE">COLLEGE GRADUATE</option>
                <option value="POST BACCALAUREATE">POST BACCALAUREATE</option>
                  </Form.Select>
                  {errors.fatherEduc && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.fatherEduc}</p>}
                </Form.Group>
                </div>
                <div>
                <Form.Group as={Col}>
                <Form.Label className='frmlabel'>Father's Occupation</Form.Label>
                  <Form.Control
                  type="text" 
                  disabled={isFather}
                  placeholder="Your answer"
                  value={userData['fatherOccu']} 
                  onChange={(e) =>setUserData({...userData,"fatherOccu" : e.target.value})} 
                  />
                  {errors.fatherOccu && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.fatherOccu}</p>}
                </Form.Group>
                </div>
                <FormControlLabel sx={{whiteSpace:'nowrap',marginLeft:'15px'}} control={<Switch checked={noFather} onChange={handleNoFather} />} label="No father" />
              </div>
              <div className='parenteach'>
                  <div>
                  <Form.Group as={Col}>
                  <Form.Label className='frmlabel'>Mother's first name</Form.Label>
                  <Form.Control
                  type="text" 
                  placeholder="Your answer"
                  value={userData['motherName']} 
                  onChange={(e) =>setUserData({...userData,"motherName" : e.target.value})} 
                  />
                  {errors.motherName && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.motherName}</p>}
                </Form.Group>
                  </div>
                  <div>
                  <Form.Group as={Col}>
                  <Form.Label className='frmlabel'>Mother's last Name</Form.Label>
                    <Form.Control
                    type="text" 
                    placeholder="Your answer"
                    value={userData['motherlName']} 
                    onChange={(e) =>setUserData({...userData,"motherlName" : e.target.value})} 
                    />
                    {errors.motherlName && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.motherlName}</p>}
                  </Form.Group>
                  </div>
                  <div>
                  <Form.Group as={Col}>
                  <Form.Label className='frmlabel'>Highest Educational Attaintment</Form.Label>
                    <Form.Select
                    type="text" 
                    value={userData['motherEduc']} 
                    onChange={(e) =>setUserData({...userData,"motherEduc" : e.target.value})} 
                    >
                  <option value={''}>Please select</option>
                  <option value="NO GRADE COMPLETED">NO GRADE COMPLETED</option>
                  <option value="ELEMENTARY UNDERGRADUATE">ELEMENTARY UNDERGRADUATE</option>
                  <option value="ELEMENTARY GRADUATE">ELEMENTARY GRADUATE</option>
                  <option value="HIGH SCHOOL UNDERGRADUATE">HIGH SCHOOL UNDERGRADUATE</option>
                  <option value="HIGH SCHOOL GRADUATE">HIGH SCHOOL GRADUATE</option>
                  <option value="POST SECONDARY UNDERGRADUATE">POST SECONDARY UNDERGRADUATE</option>
                  <option value="POST SECONDARY GRADUATE">POST SECONDARY GRADUATE</option>
                  <option value="COLLEGE UNDERGRADUATE">COLLEGE UNDERGRADUATE</option>
                  <option value="COLLEGE GRADUATE">COLLEGE GRADUATE</option>
                  <option value="POST BACCALAUREATE">POST BACCALAUREATE</option>
                    </Form.Select>
                    {errors.motherEduc && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.motherEduc}</p>}
                  </Form.Group>
                  </div>
                  <div>
                  <Form.Group as={Col}>
                  <Form.Label className='frmlabel'>Mother's Occupation</Form.Label>
                    <Form.Control
                    type="text" 
                    placeholder="Your answer"
                    value={userData['motherOccu']} 
                    onChange={(e) =>setUserData({...userData,"motherOccu" : e.target.value})} 
                    />
                    {errors.motherOccu && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.motherOccu}</p>}
                  </Form.Group>
                  </div>
              </div>
            </div>
            <div className='parentcontainer1'>
              <div className='parenteach2'>
                <h3>Guardian's Information</h3>
              </div>
              
            <div className='parenteach1'>
                    <div>
                      <h3 style={{fontSize:'18px',fontWeight:'bold',color:'rgb(11, 73, 128)',marginLeft:'5px'}}>Guardian</h3>
                      <Form.Group as={Col}>
                            <RadioGroup
                              row
                              aria-labelledby="demo-radio-buttons-group-label"
                              name="radio-buttons-group"
                              value={value}
                              onChange={handleChangeRadio}
                            >
                              <FormControlLabel value="Mother" control={<Radio />} label="Mother" />
                              <FormControlLabel disabled={isFather} value="Father" control={<Radio />} label="Father" />
                              <FormControlLabel value="Other" control={<Radio />} label="Other" />
                            </RadioGroup>
                      </Form.Group>
                    </div>
                    <div style={{marginRight:'5px',color:'rgb(11, 73, 128)'}}>
                      <Form.Group as={Col}>
                      <Form.Label className='frmlabel'>Guardian's first name</Form.Label>
                            <Form.Control
                            type="text" 
                            placeholder="Your answer"
                            disabled={isGuardiancheck}
                            value={userData['guardianName']} 
                            onChange={(e) =>setUserData({...userData,"guardianName" : e.target.value})} 
                            />
                            {errors.guardianName && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.guardianName}</p>}
                      </Form.Group>
                    </div>
                    <div>
                      <Form.Group as={Col}>
                      <Form.Label className='frmlabel'>Guardian's last name</Form.Label>
                                <Form.Control
                                type="text" 
                                disabled={isGuardiancheck}
                                placeholder="Your answer"
                                value={userData['guardianlName']} 
                                onChange={(e) =>setUserData({...userData,"guardianlName" : e.target.value})} 
                                />
                                {errors.guardianlName && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.guardianlName}</p>}
                      </Form.Group>
                    </div>
            </div>
            <div className='parenteach1'>
                {!isGuardiancheck && <div>
                <Form.Group as={Col}>
                <Form.Label className='frmlabel'>Relationship to guardian</Form.Label>
                        <Form.Select
                        type="text" 
                        disabled={isGuardiancheck}
                        value={userData['relationship']} 
                        onChange={(e) =>setUserData({...userData,"relationship" : e.target.value})} 
                        >
                  {isGuardiancheck && <option value={userData['relationship']}>{userData['relationship']}</option>}
                  <option value={''}>Please select</option>
                  <option value={'LEGAL GUARDIAN'}>LEGAL GUARDIAN</option>
                  <option value={'STEPMOTHER'}>STEPMOTHER</option>
                  <option value={'STEPFATHER'}>STEPFATHER</option>
                  <option value={'FOSTER PARENT'}>FOSTER PARENT</option>
                  <option value={'GRANDPARENT'}>GRANDPARENT</option>
                  <option value={'AUNT OR UNCLE'}>AUNT OR UNCLE</option>
                  <option value={'OTHER RELATIVE'}>OTHER RELATIVE</option>
                  <option value={'CUSTODIAN'}>CUSTODIAN</option>
                  <option value={'NANNY OR CARETAKER'}>NANNY OR CARETAKER</option>
                  <option value={'LEGAL GUARDIAN APPOINTED BY WILL'}>LEGAL GUARDIAN APPOINTED BY WILL</option>
                  <option value={'GUARDIAN AD LITEM'}>GUARDIAN AD LITEM</option>
                  <option value={'FAMILY FRIEND'}>FAMILY FRIEND</option>
                        </Form.Select>
                        {errors.relationship && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.relationship}</p>}
                </Form.Group>
                </div>}
                <div style={{margin:'0px 10px 0px 10px'}}>
                <Form.Group as={Col}>
                <Form.Label className='frmlabel'>Guardian's Contact No.</Form.Label>
                        <Form.Control
                        type="text" 
                        placeholder="09xxxxxxxxx"
                        value={userData['guardianContact']} 
                        onChange={(e) =>setUserData({...userData,"guardianContact" : e.target.value})} 
                        />
                        {errors.guardianContact && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.guardianContact}</p>}
                </Form.Group>
                </div>
                <div>
                <Form.Group as={Col}>
                <Form.Label className='frmlabel'>Guardian's Address</Form.Label>
                        <Form.Control
                        type="text" 
                        placeholder="House No., Street, Barangay, Municipality"
                        value={userData['guardianAddress']} 
                        onChange={(e) =>setUserData({...userData,"guardianAddress" : e.target.value})} 
                        />
                        {errors.guardianAddress && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.guardianAddress}</p>}
                </Form.Group>
                </div>


            </div>
            </div>

            <div className='siblingcontainer'>
              <div style={{display:"flex",justifyContent:'space-between',alignItems:'center'}}>
              <h3>List of Siblings </h3>
              
              <FormControlLabel sx={{whiteSpace:'nowrap'}} control={<Switch checked={onlyChild} onChange={handleOnlyChild} />} label="I am only child" />
              </div>
              {errors.sibling && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.sibling}</p>}
              {errors.siblingErrors && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.siblingErrors}</p>}
              {siblingfrm}
              <div className='addbtnsib'>
              <Button
                className='myButton1'
                variant='primary'
                onClick={handleAddFields}
                disabled={onlyChild}
                sx={{color:'white',textTransform:'none',fontWeight:'bold'}}
              >
                <AddIcon sx={{color:'white'}}/>Add more siblings
              </Button>
              </div>
            </div>
            <div className='btnfrmn'>
            <Button className='myButton' variant="contained" onClick={() => setStep(1)}>Previous</Button>
            <Button className='myButton1' variant="contained" onClick={Check}>Next</Button>
            </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Persona