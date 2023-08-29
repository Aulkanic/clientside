import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { multiStepContext } from './StepContext';
import Button from '@mui/material/Button';
import swal from 'sweetalert';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import '../css/persona.css'
import '../css/buttonStyle.css'
import { Rulelist,FetchingFamily, } from '../../Api/request';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useTranslation } from 'react-i18next';

function Persona() {
  const { t } = useTranslation();
    const { setStep, userData, setUserData} = useContext(multiStepContext);
    const [errors, setErrors] = useState({}); 
    const [famlist, setFamlist] = useState([]);
    const [rule,setRule] = useState([]);
    const [siblings, setSiblings] = useState([])
    const [onlyChild, setOnlyChild] = useState(false);

    const handleInputChange = (index, field, value) => {
      const updatedSiblings = [...siblings];
      updatedSiblings[index][field] = value;
      setSiblings(updatedSiblings);
    };
    const handleAddFields = () =>{
      setSiblings([...siblings, { firstName: '', middleName: '', lastName: '' }]);
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

    function Check(){
      const errors = {};
      let checkfammum = 0;
      let checkfamdad = 0;
      if (userData.motherName === '') {
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
      if (userData.motherlName === '') {
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
      if (userData.mothermName === '') {
        errors.mothermName = "This Field is required";
      } 
      else if (userData.mothermName.length === 1) {
        errors.mothermName = "Input must not contain a single letter.";
      }
      else if (userData.mothermName.length > 50) {
        errors.mothermName = "Input should contain less than 50 characters.";
      }
      else if (/[0-9]/.test(userData.mothermName)) {
        errors.mothermName = "Input must not contain numeric value.";
      }
      else if (/[!@#$%^&*/_(),.?":{}|<>]/.test(userData.mothermName)) {
        errors.mothermName = "Special characters are not allowed.";
      }
       else if (!/^[A-Z][A-Za-z,\s]*$/.test(userData.mothermName)) {
        errors.mothermName = "First Letter must be Capital";
      }

      if (userData.motherOccu === '') {
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
      if (userData.motherEduc === '') {
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
      if (userData.fatherName === '') {
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

      if (userData.fatherlName === '') {
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
      if (userData.fathermName === '') {
        errors.fathermName = "This Field is required";
      } 
      else if (userData.fathermName.length === 1) {
        errors.fathermName = "Input must not contain a single letter.";
      }
      else if (userData.fathermName.length > 50) {
        errors.fathermName = "Input should contain less than 50 characters.";
      } 
      else if (/[0-9]/.test(userData.fathermName)) {
        errors.fathermName = "Input must not contain numeric value.";
      }
      else if (/[!@#$%^&*/_(),.?":{}|<>]/.test(userData.fathermName)) {
        errors.fathermName = "Special characters are not allowed.";
      }
       else if (!/^[A-Z][A-Za-z,\s]*$/.test(userData.fathermName)) {
        errors.fathermName = "First Letter must be Capital";
      }

      if (userData.fatherOccu === '') {
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
      if (userData.fatherEduc === '') {
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
      if (userData.guardianName === '') {
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
      if (userData.guardianmName === '') {
        errors.guardianmName = "This Field is required";
      } 
      else if (userData.guardianmName.length === 1) {
        errors.guardianmName = "Input must not contain a single letter.";
      }
      else if (/[0-9]/.test(userData.guardianmName)) {
        errors.guardianmName = "Input must not contain numeric value.";
      }
      else if (/[!@#$%^&*/_()?":{}|<>]/.test(userData.guardianmName)) {
        errors.guardianmName = "Special characters are not allowed.";
      }
       else if (!/^[A-Z][A-Za-z,\s]*$/.test(userData.guardianmName)) {
        errors.guardianmName = "First Letter must be Capital";
      }
      if (userData.guardianlName === '') {
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
      if (userData.relationship === '') {
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
      if (userData.guardianContact === '') {
        errors.guardianContact = "Phone Number is required";
      } else if (!/^09\d{9}$/.test(userData.guardianContact)) {
        errors.guardianContact = "Invalid phone number.";
      }
      if (userData.famNum === '') {
        errors.famNum = "This Field is required";
      }else if (/[!@#$%^&*/_(),.?":{}|<>]/.test(userData.famNum)) {
        errors.famNum = "Special characters are not allowed.";
      }
      const famrule = 3 * rule.famNum
      if(checkfammum === famrule && checkfamdad === famrule){
        errors.valid = 'Invalid'
        swal({
          title: "Warning",
          text: 'One Family Per head',
          icon: "warning",
          button: "OK",
        });
      }
      let restriction = 0;
      const checkfam = famlist?.filter((item) => item.fatherName === userData.fathermName && item.motherName === userData.motherName)
      if(checkfam.length === rule.famNum){
        restriction += 1;
      }

      if(!onlyChild){
        const hasEmptyFields = siblings.some(
          (sibling) =>
            sibling.firstName.trim() === '' ||
            sibling.middleName.trim() === '' ||
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
          console.log(errors)
          return;
        }
        setUserData((prevUserData) => ({
          ...prevUserData,
          siblings: siblings, 
        }));
        setErrors('')
        setStep(3)
    };

   const siblingfrm = siblings.map((sibling, index) => (
    <div className='siblinginf' key={index}>
      <Form.Group as={Col}>
      <Form.Label className='frmlabel'>{t("First Name")}</Form.Label>
        <Form.Control
          type="text"
          value={sibling.firstName}
          onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}
        />
      </Form.Group>
      <Form.Group as={Col} style={{margin:'0px 10px 0px 10px'}}>
      <Form.Label className='frmlabel'>{t("Middle Name")}</Form.Label>
        <Form.Control
          type="text"
          value={sibling.middleName}
          onChange={(e) => handleInputChange(index, 'middleName', e.target.value)}
        />
      </Form.Group>
      <Form.Group as={Col}>
      <Form.Label className='frmlabel'>{t("Last Name")}</Form.Label>
        <Form.Control
          type="text"
          value={sibling.lastName}
          onChange={(e) => handleInputChange(index, 'lastName', e.target.value)}
        />
      </Form.Group>
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
    <div className='Persona'>
        <div className="personad"> 
           <div className='form'>
            <div className='parentcontainer'>
              <div className='parenteach'>
                <h3>Father's Information</h3>
                <Form.Group as={Col}>
                  <Form.Label className='frmlabel'>{t("First Name")}</Form.Label>
                  <Form.Control
                  type="text" 
                  value={userData['fatherName']} 
                  onChange={(e) =>setUserData({...userData,"fatherName" : e.target.value})} 
                  />
                   {errors.fatherName && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.fatherName}</p>}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label className='frmlabel'>{t("Middle Name")}</Form.Label>
                  <Form.Control
                  type="text" 
                  value={userData['fathermName']} 
                  onChange={(e) =>setUserData({...userData,"fathermName" : e.target.value})} 
                  />
                   {errors.fathermName && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.fathermName}</p>}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label className='frmlabel'>{t("Last Name")}</Form.Label>
                  <Form.Control
                  type="text" 
                  value={userData['fatherlName']} 
                  onChange={(e) =>setUserData({...userData,"fatherlName" : e.target.value})} 
                  />
                  {errors.fatherlName && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.fatherlName}</p>}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label className='frmlabel'>{t("Highest Educational Attaintment")}</Form.Label>
                  <Form.Control
                  type="text" 
                  value={userData['fatherEduc']} 
                  onChange={(e) =>setUserData({...userData,"fatherEduc" : e.target.value})} 
                  />
                  {errors.fatherEduc && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.fatherEduc}</p>}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label className='frmlabel'>{t("Occupation")}</Form.Label>
                  <Form.Control
                  type="text" 
                  value={userData['fatherOccu']} 
                  onChange={(e) =>setUserData({...userData,"fatherOccu" : e.target.value})} 
                  />
                  {errors.fatherOccu && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.fatherOccu}</p>}
                </Form.Group>
              </div>
              <div className='parenteach'>
              <h3>Mother's Information</h3>
               <Form.Group as={Col}>
                  <Form.Label className='frmlabel'>{t("First Name")}</Form.Label>
                  <Form.Control
                  type="text" 
                  value={userData['motherName']} 
                  onChange={(e) =>setUserData({...userData,"motherName" : e.target.value})} 
                  />
                  {errors.motherName && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.motherName}</p>}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label className='frmlabel'>{t("Middle Name")}</Form.Label>
                  <Form.Control
                  type="text" 
                  value={userData['mothermName']} 
                  onChange={(e) =>setUserData({...userData,"mothermName" : e.target.value})} 
                  />
                  {errors.mothermName && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.mothermName}</p>}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label className='frmlabel'>{t("Last Name")}</Form.Label>
                  <Form.Control
                  type="text" 
                  value={userData['motherlName']} 
                  onChange={(e) =>setUserData({...userData,"motherlName" : e.target.value})} 
                  />
                  {errors.motherlName && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.motherlName}</p>}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label className='frmlabel'>{t("Highest Educational Attaintment")}</Form.Label>
                  <Form.Control
                  type="text" 
                  value={userData['motherEduc']} 
                  onChange={(e) =>setUserData({...userData,"motherEduc" : e.target.value})} 
                  />
                  {errors.motherEduc && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.motherEduc}</p>}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label className='frmlabel'>{t("Occupation")}</Form.Label>
                  <Form.Control
                  type="text" 
                  value={userData['motherOccu']} 
                  onChange={(e) =>setUserData({...userData,"motherOccu" : e.target.value})} 
                  />
                  {errors.motherOccu && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.motherOccu}</p>}
                </Form.Group>
              </div>
              <div className='parenteach'>
              <h3>Guardian's Information</h3>
               <Form.Group as={Col}>
                  <Form.Label className='frmlabel'>{t("First Name")}</Form.Label>
                  <Form.Control
                  type="text" 
                  value={userData['guardianName']} 
                  onChange={(e) =>setUserData({...userData,"guardianName" : e.target.value})} 
                  />
                  {errors.guardianName && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.guardianName}</p>}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label className='frmlabel'>{t("Middle Name")}</Form.Label>
                  <Form.Control
                  type="text" 
                  value={userData['guardianmName']} 
                  onChange={(e) =>setUserData({...userData,"guardianmName" : e.target.value})} 
                  />
                  {errors.guardianmName && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.guardianmName}</p>}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label className='frmlabel'>{t("Last Name")}</Form.Label>
                  <Form.Control
                  type="text" 
                  value={userData['guardianlName']} 
                  onChange={(e) =>setUserData({...userData,"guardianlName" : e.target.value})} 
                  />
                  {errors.guardianlName && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.guardianlName}</p>}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label className='frmlabel'>Relationship to Guardian</Form.Label>
                  <Form.Control
                  type="text" 
                  value={userData['relationship']} 
                  onChange={(e) =>setUserData({...userData,"relationship" : e.target.value})} 
                  />
                  {errors.relationship && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.relationship}</p>}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label className='frmlabel'>Guardian Contact No.</Form.Label>
                  <Form.Control
                  type="text" 
                  value={userData['guardianContact']} 
                  onChange={(e) =>setUserData({...userData,"guardianContact" : e.target.value})} 
                  />
                  {errors.guardianContact && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.guardianContact}</p>}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label className='frmlabel'>Guardian Address</Form.Label>
                  <Form.Control
                  type="text" 
                  value={userData['guardianAddress']} 
                  onChange={(e) =>setUserData({...userData,"guardianAddress" : e.target.value})} 
                  />
                  {errors.guardianAddress && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.guardianAddress}</p>}
                </Form.Group>
              </div>
            </div>
            <div className='siblingcontainer'>
              <div style={{display:"flex",justifyContent:'space-around',alignItems:'center'}}>
              
              <h3>List of Siblings </h3>
              <FormControlLabel sx={{whiteSpace:'nowrap'}} control={<Switch checked={onlyChild} onChange={handleOnlyChild} />} label="I am an only child" />
              </div>
              {errors.sibling && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.sibling}</p>}
              {siblingfrm}
              <div className='addbtnsib'>
              <Button
                className='myButton1'
                variant='primary'
                onClick={handleAddFields}
                disabled={onlyChild}
              >
                <AddIcon sx={{color:'white'}}/>
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
  )
}

export default Persona