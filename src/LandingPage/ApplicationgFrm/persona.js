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
import { TextField, styled} from '@mui/material';

function Persona() {
    const { setStep, userData, setUserData} = useContext(multiStepContext);
    const [errors, setErrors] = useState({}); 
    const [famlist, setFamlist] = useState([]);
    const [rule,setRule] = useState([]);
    const [siblings, setSiblings] = useState([])
    const [onlyChild, setOnlyChild] = useState(false);

    const handleInputChange = (index, event) =>{
      const values = [...siblings];
      values[index] = event.target.value;
      setSiblings(values)
    }
    const handleAddFields = () =>{
      setSiblings([...siblings, '']);
    }

    const handleRemoveFields = (index) =>{
      const values = [...siblings]
      values.splice(index, 1);
      setSiblings(values)
    }

    useEffect(() =>{
          async function Fetch(){
            const rul = await Rulelist.FETCH_RULE()
            const famdata = await FetchingFamily.FETCH_FAM();
            const datafam = famdata.data.Familylist;
            const famrecord = datafam?.filter(data => 
              data.motherName !== 'None' &&
              data.motherlName !== 'None' &&
              data.mothermName !== 'None' &&
              data.fatherName !== 'None' &&
              data.fatherlName !== 'None' &&
              data.fathermName !== 'None'     
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
      else if(famlist?.some((item) => item.motherName === userData.motherName)){
        checkfammum += 1;
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
      else if(famlist?.some((item) => item.motherlName === userData.motherlName)){
        checkfammum += 1;
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
      else if(famlist?.some((item) => item.mothermName === userData.mothermName)){
        checkfammum += 1;
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
      else if(famlist?.some((item) => item.fatherName === userData.fatherName)){
        checkfamdad += 1;
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
      else if(famlist?.some((item) => item.fatherlName === userData.fatherlName)){
        checkfamdad += 1;
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
      else if(famlist?.some((item) => item.fathermname === userData.fathermName)){
        checkfamdad += 1;
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

        if (Object.keys(errors).length > 0) {
          setErrors(errors);
          console.log(errors)
          return;
        }
        setErrors('')
        setStep(3)
    };


    return (
    <div className='Persona'>
        <div className="personad"> 
           <div className='form'>
            <div className='parentcontainer'>
              <div className='parenteach'>
                <h3>Father's Information</h3>
                <Form.Group as={Col}>
                  <Form.Label className='frmlabel'>First Name</Form.Label>
                  <Form.Control
                  type="text" 
                  value={userData['fatherName']} 
                  onChange={(e) =>setUserData({...userData,"fatherName" : e.target.value})} 
                  />
                   {errors.fatherName && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.fatherName}</p>}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label className='frmlabel'>Middle Name</Form.Label>
                  <Form.Control
                  type="text" 
                  value={userData['fathermName']} 
                  onChange={(e) =>setUserData({...userData,"fathermName" : e.target.value})} 
                  />
                   {errors.fathermName && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.fathermName}</p>}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label className='frmlabel'>Last Name</Form.Label>
                  <Form.Control
                  type="text" 
                  value={userData['fatherlName']} 
                  onChange={(e) =>setUserData({...userData,"fatherlName" : e.target.value})} 
                  />
                  {errors.fatherlName && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.fatherlName}</p>}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label className='frmlabel'>Highest Educational Attaintment</Form.Label>
                  <Form.Control
                  type="text" 
                  value={userData['fatherEduc']} 
                  onChange={(e) =>setUserData({...userData,"fatherEduc" : e.target.value})} 
                  />
                  {errors.fatherEduc && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.fatherEduc}</p>}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label className='frmlabel'>Father Occupation</Form.Label>
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
                  <Form.Label className='frmlabel'>First Name</Form.Label>
                  <Form.Control
                  type="text" 
                  value={userData['motherName']} 
                  onChange={(e) =>setUserData({...userData,"motherName" : e.target.value})} 
                  />
                  {errors.motherName && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.motherName}</p>}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label className='frmlabel'>Middle Name</Form.Label>
                  <Form.Control
                  type="text" 
                  value={userData['mothermName']} 
                  onChange={(e) =>setUserData({...userData,"mothermName" : e.target.value})} 
                  />
                  {errors.mothermName && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.mothermName}</p>}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label className='frmlabel'>Last Name</Form.Label>
                  <Form.Control
                  type="text" 
                  value={userData['motherlName']} 
                  onChange={(e) =>setUserData({...userData,"motherlName" : e.target.value})} 
                  />
                  {errors.motherlName && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.motherlName}</p>}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label className='frmlabel'>Highest Educational Attaintment</Form.Label>
                  <Form.Control
                  type="text" 
                  value={userData['motherEduc']} 
                  onChange={(e) =>setUserData({...userData,"motherEduc" : e.target.value})} 
                  />
                  {errors.motherEduc && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.motherEduc}</p>}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label className='frmlabel'>Mother Occupation</Form.Label>
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
                  <Form.Label className='frmlabel'>First Name</Form.Label>
                  <Form.Control
                  type="text" 
                  value={userData['guardianName']} 
                  onChange={(e) =>setUserData({...userData,"guardianName" : e.target.value})} 
                  />
                  {errors.guardianName && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.guardianName}</p>}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label className='frmlabel'>Middle Name</Form.Label>
                  <Form.Control
                  type="text" 
                  value={userData['guardianmName']} 
                  onChange={(e) =>setUserData({...userData,"guardianmName" : e.target.value})} 
                  />
                  {errors.guardianmName && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.guardianmName}</p>}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label className='frmlabel'>Last Name</Form.Label>
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
                  value={userData['guardianTele']} 
                  onChange={(e) =>setUserData({...userData,"guardianTele" : e.target.value})} 
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
                {/* <div>
                  <h2>List of Siblings</h2>
                  {siblings.map((sibling, index) => (
                    <div className='siblinginf' key={index}>
                      <Form.Group as={Col}>
                      <Form.Control
                        type="text"
                        value={sibling}
                        onChange={(event) => handleInputChange(index, event)}
                      />
                      </Form.Group>
                      <Button sx={{ color:'white'}} className='myButton2' onClick={() => handleRemoveFields(index)}>Remove</Button>
                    </div>
                  ))}
                  <Button sx={{ color:'white'}} className='myButton1' onClick={handleAddFields}>Add Sibling</Button>

                  <div>
                    <label>
                      <input
                        type="checkbox"
                        checked={onlyChild}
                        onChange={() => setOnlyChild(!onlyChild)}
                      />
                      I am an only child
                    </label>
                  </div>
                </div> */}
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