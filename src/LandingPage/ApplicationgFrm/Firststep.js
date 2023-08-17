import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { multiStepContext } from './StepContext';
import Button from '@mui/material/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { ScholarCategory} from '../../Api/request.js'
import { Rulelist} from '../../Api/request.js';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import '../css/Firststep.css'
import '../css/buttonStyle.css'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function Firststep() {
  const user = useSelector((state) => state.user)
  const { setStep, userData, setUserData} = useContext(multiStepContext);
  const [errors, setErrors] = useState({}); 
  const [scholarprog, setScholarProg] = useState([]);
  const [rule,setRule] = useState([])
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const calculateAge = (birthday) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    const yearDiff = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (
      yearDiff > 0 ||
      (yearDiff === 0 && monthDiff > 0) ||
      (yearDiff === 0 && monthDiff === 0 && dayDiff >= 0)
    ) {
      let age = yearDiff;
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }
      return age;
    } else {
      return 0; // Return 0 if the entered birthday is in the current year or a future year
    }
  };
  useEffect(() => {
    const { birthday } = userData;
    const age = calculateAge(birthday);
    setUserData((prevData) => ({ ...prevData, age: age.toString() }));
  }, [userData.birthday]);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const scholist = await ScholarCategory.ScholarshipProgram();
        const schodata = scholist.data.SchoCat;
        const schoav = schodata.filter(data => data.status === 'Open')
        const rul = await Rulelist.FETCH_RULE()
        setRule(rul.data.result[0])
        setScholarProg(schoav);
      } catch (error) {
        console.error(error);
      }
    }
    
    fetchData();

  }, []);

  function Check(){
    const errors = {};
    if (!userData.gender) {
      errors.gender = "Please Select your Gender";
    }
    if (userData.citizenship === '') {
      errors.citizenship = "Citizenship is required";
    }else if (userData.citizenship.length === 1) {
      errors.citizenship = "Input must not contain a single letter.";
    }else if (userData.citizenship.length > 50) {
      errors.citizenship = "Input should contain less than 50 characters.";
    } else if (/[0-9]/.test(userData.citizenship)) {
      errors.citizenship = "Input must not contain numeric value";
    } else if (/[!@#$%^&*/_(),.?":{}|<>]/.test(userData.citizenship)) {
      errors.citizenship = "Special characters are not allowed.";
    } else if (!/^[A-Z][A-Za-z,\s]*$/.test(userData.citizenship)) {
      errors.citizenship = "First Letter must be Capital";
    }
    if (userData.birthday === '') {
      errors.birthday = "Birthday is required";
    }
    if (userData.baranggay === '') {
      errors.baranggay = "Select your Baranggay";
    }
    if (userData.School === '') {
      errors.School = "Please provide details";
    }
    if (userData.SchoolAddress === '') {
      errors.SchoolAddress = "Please provide details";
    }
    if (userData.yearLevel === '') {
      errors.yearLevel = "Select your Year Level";
    }
    if (userData.course === '') {
      errors.course = "Select your Course";
    }
    if (userData.age === '') {
      errors.age = "Age is required";
    } else if (userData.age <= 0) {
      errors.age = "Invalid Age";
    }else if (/[a-zA-Z]/.test(userData.age)) {
      errors.age = "Input must not contain letter value";
    }else if (/[!@#$%^&*/_(),.?":{}|<>]/.test(userData.age)) {
      errors.age = "Special characters are not allowed.";
    }else if (userData.age > rule.ageNum) {
      errors.age = "Not Qualified";
      Swal.fire({
        title: "Warning",
        text: `You are not Qualify to Apply Scholarship.Only ${rule.ageNum} below must considered.`,
        icon: "warning",
        button: "OK",
      });
      setStep(1);
    }else if(userData.age <=5){
      errors.age = 'Minimum age for application is five years old';
    }
    if (userData.birthPlace === '') {
      errors.birthPlace = "Birth of Place is required";
    } else if (userData.birthPlace.length === 1) {
      errors.birthPlace = "Input must not contain a single letter.";
    }else if (/[!@#$%^&*/_()?":{}|<>]/.test(userData.age)) {
      errors.age = "Special characters are not allowed.";
    }
    if (userData.contactNum === '') {
      errors.contactNum = "Phone Number is required";
    } else if (!/^09\d{9}$/.test(userData.contactNum)) {
      errors.contactNum = "Invalid phone number.";
    }
    if (userData.address === '') {
      errors.address = "Current Address is required";
    }else if (/[!@#$%^&*/_()?":{}|<>]/.test(userData.address)) {
      errors.address = "Special characters are not allowed.";
    }   
    

    if (Object.keys(errors).length > 0) {
      console.log(errors)
      setErrors(errors);
      return;
    }
    setErrors('')
    setStep(2)
};

  return (
  <>
  <Dialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={handleClose}
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle> Step#2: Fill up the Application Form</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-slide-description">

        *Completely accomplish the online application form. Once done, you will 
        received an email that your Application form was sent and we will inform you 
        when it is reviewed and evaluated .<br/>
        Note: Please fill out all required fields with accurate information and if it not applicable please input 'None' instead.<br/><br/>
        

      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Ok</Button>
    </DialogActions>
  </Dialog>
  <div className='FirstepFrm'>
      <div className="FFd">
          <div className="form">
          <div className='containerform'>
          <h4 className='h4head'>Personal Information</h4>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label className='frmlabel'>Last Name</Form.Label>
              <Form.Control
               type="text" 
               value={userData['lastName']} 
               disabled
               />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label className='frmlabel'>First Name</Form.Label>
              <Form.Control 
              type="text" 
              value={userData['firstName']} 
              disabled
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label className='frmlabel'>Middle Name</Form.Label>
              <Form.Control 
              type="text" 
              value={userData['middleName']} 
              disabled
              />
            </Form.Group>
            <Form.Group className='col-md-3'>
              <Form.Label className='frmlabel'>Suffix</Form.Label>
              <Form.Select aria-label="Default select example"
              value={userData['suffix']} 
              onChange={(e) =>setUserData({...userData,"suffix" : e.target.value})}
              >
              <option value=""></option>
              <option value="JR">JR</option>
              <option value="SR">SR</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
              <option value="IX">IX</option>
              <option value="V">V</option>
              <option value="VI">VI</option>
              <option value="XV">XV</option>
              <option value="VII">VII</option>
              <option value="VII">VII</option>
              <option value="X">X</option>
              <option value="XI">XI</option>
              <option value="XI">XII</option>
              <option value="XIII">XIII</option>
              <option value="XIV">XIV</option>
            </Form.Select>
            </Form.Group>
            <div>

            </div>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label className='frmlabel'>Address</Form.Label>
              <Form.Control 
              type="text" 
              placeholder="" 
              value={userData['address']} 
              onChange={(e) =>setUserData({...userData,"address" : e.target.value})}
              />
          {errors.address && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.address}</p>}
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label className='frmlabel'>Baranggay</Form.Label>
              <Form.Select 
              type="text" 
              placeholder="" 
              value={userData['baranggay']} 
              onChange={(e) =>setUserData({...userData,"baranggay" : e.target.value})}
              >
                <option value={''}>Select Baranggay</option>
                <option value={'Abangan Norte'}>Abangan Norte</option>
                <option value={'Abangan Sur'}>Abangan Sur</option>
                <option value={'Ibayo'}>Ibayo</option>
                <option value={'Lambakin'}>Lambakin</option>
                <option value={'Lias'}>Lias</option>
                <option value={'Loma de Gato'}>Loma de Gato</option>
                <option value={'Nagbalon'}>Nagbalon</option>
                <option value={'Patubig'}>Patubig</option>
                <option value={'Poblacion I'}>Poblacion I</option>
                <option value={'Poblacion II'}>Poblacion II</option>
                <option value={'Prenza I'}>Prenza I</option>
                <option value={'Prenza II'}>Prenza II</option>
                <option value={'Saog'}>Saog</option>
                <option value={'Sta. Rosa I'}>Sta. Rosa I</option>
                <option value={'Sta. Rosa II'}>Sta. Rosa II</option>
                <option value={'Tabing-Ilog'}>Tabing-Ilog</option>
              </Form.Select>
              {errors.baranggay && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.baranggay}</p>}
            </Form.Group>
          </Row>
          <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label className='frmlabel'>Gender</Form.Label>
            <Form.Select aria-label="Default select example"
              value={userData['gender']} 
              onChange={(e) =>setUserData({...userData,"gender" : e.target.value})}
            >
              <option>Select your gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </Form.Select>
            {errors.gender && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.gender}</p>}
            </Form.Group>

            <Form.Group as={Col}>
            <Form.Label className='frmlabel'>Birthday</Form.Label>
              <Form.Control 
              type="date" 
              value={userData['birthday']} 
              onChange={(e) =>setUserData({...userData,"birthday" : e.target.value})}       
              />
              {errors.birthday && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.birthday}</p>}
            </Form.Group>

            <Form.Group as={Col}>
            <Form.Label className='frmlabel'>Age</Form.Label>
              <Form.Control value={userData['age']} type="number" disabled />
              {errors.age && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.age}</p>}
            </Form.Group>
          </Row>
          <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label className='frmlabel'>Birth Place</Form.Label>
            <Form.Control 
            type="text" 
            value={userData['birthPlace']} 
            onChange={(e) =>setUserData({...userData,"birthPlace" : e.target.value})}
            />
           {errors.birthPlace && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.birthPlace}</p>}
            </Form.Group>

            <Form.Group as={Col}>
            <Form.Label className='frmlabel'>Citizenship</Form.Label>
            <Form.Control 
            type="text" 
            value={userData['citizenship']} 
            onChange={(e) =>setUserData({...userData,"citizenship" : e.target.value})}
            />
               {errors.citizenship && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.citizenship}</p>}
            </Form.Group>

            <Form.Group as={Col}>
            <Form.Label className='frmlabel'>Mobile Number</Form.Label>
            <Form.Control type="text" placeholder='09xxxxxxxxx'
              value={userData['contactNum']} 
              onChange={(e) =>setUserData({...userData,"contactNum" : e.target.value})}
            />
               {errors.contactNum && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.contactNum}</p>}
            </Form.Group>
          </Row>
          </div>
          <div className='containerform'>
          <h4 className='h4head'>Educational Information</h4>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label className='frmlabel'>Last School Attended</Form.Label>
              <Form.Control 
              type="text"
              value={userData['School']} 
              onChange={(e) =>setUserData({...userData,"School" : e.target.value})}
              />
                 {errors.School && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.School}</p>}
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label className='frmlabel'>Year Level</Form.Label>
              <Form.Select
                value={userData['yearLevel']} 
                onChange={(e) =>setUserData({...userData,"yearLevel" : e.target.value})}
              >
                <option value={''}></option>
                <option value={'Elementary'}>Elementary</option>
                <option value={'Highschool'}>Highschool</option>
                <option value={'College'}>College</option>
              </Form.Select>
              {errors.yearLevel && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.yearLevel}</p>}
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label className='frmlabel'>School Address</Form.Label>
              <Form.Control type="text"
               value={userData['SchoolAddress']} 
               onChange={(e) =>setUserData({...userData,"SchoolAddress" : e.target.value})}
              />
             {errors.SchoolAddress && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.SchoolAddress}</p>}
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label className='frmlabel'>Course</Form.Label>
              <Form.Select 
                value={userData['course']} 
                onChange={(e) =>setUserData({...userData,"course" : e.target.value})}
              >
                <option value={''}></option>
                <option value={'Not Applicable'}>Not Applicable</option>
                <option value={'Bachelor fo Science in Respiratory Therapy'}>Bachelor fo Science in Respiratory Therapy</option>
                <option value={'Bachelor in Landscape Architecture'}>Bachelor in Landscape Architecture</option>
                <option value={'Bachelor in Secondary Education Major in Mathematics'}>Bachelor in Secondary Education Major in Mathematics</option>
                <option value={'Bachelor in Secondary Education Major in Science'}>Bachelor in Secondary Education Major in Science</option>
                <option value={'Bachelor of Culture and the Arts Education'}>Bachelor of Culture and the Arts Education</option>
                <option value={'Bachelor of Data Science and Analytics'}>Bachelor of Data Science and Analytics</option>
                <option value={'Bachelor of Early Childhood Education'}>Bachelor of Early Childhood Education</option>
                <option value={'Bachelor of Fine Arts'}>Bachelor of Fine Arts</option>
                <option value={'Bachelor of Library and Information Science'}>Bachelor of Library and Information Science</option>
                <option value={'Bachelor of Medical Laboratory Science'}>Bachelor of Medical Laboratory Science</option>
                <option value={'Bachelor of Science in Accountancy'}>Bachelor of Science in Accountancy</option>
                <option value={'Bachelor of Science in Agribusiness'}>Bachelor of Science in Agribusiness</option>
                <option value={'Bachelor of Science in Agricultural and Biosystems Engineering'}>Bachelor of Science in Agricultural and Biosystems Engineering</option>
                <option value={'Bachelor of Science in Agroforestry'}>Bachelor of Science in Agroforestry</option>
                <option value={'Bachelor of Science in Aircraft Maintenance Technology'}>Bachelor of Science in Aircraft Maintenance Technology</option>
                <option value={'Bachelor of Science in Applied Mathematics'}>Bachelor of Science in Applied Mathematics</option>
                <option value={'Bachelor of Science in Applied Physics'}>Bachelor of Science in Applied Physics</option>
                <option value={'Bachelor of Science in Applied Statistics'}>Bachelor of Science in Applied Statistics</option>
                <option value={'Bachelor of Science in Architecture'}>Bachelor of Science in Architecture</option>
                <option value={'Bachelor of Science in Aviation'}>Bachelor of Science in Aviation</option>
                <option value={'Bachelor of Science in Aviation Technology'}>Bachelor of Science in Aviation Technology</option>
                <option value={'Bachelor of Science in Biochemistry'}>Bachelor of Science in Biochemistry</option>
                <option value={'Bachelor of Science in Biology'}>Bachelor of Science in Biology</option>
                <option value={'Bachelor of Science in Botany'}>Bachelor of Science in Botany</option>
                <option value={'Bachelor of Science in Business Administration Major in Business Analytics'}>Bachelor of Science in Business Administration Major in Business Analytics</option>
                <option value={'Bachelor of Science in Business Analytics'}>Bachelor of Science in Business Analytics</option>
                <option value={'Bachelor of Science in Ceramic Engineering'}>Bachelor of Science in Ceramic Engineering</option>
                <option value={'Bachelor of Science in Chemical Engineering'}>Bachelor of Science in Chemical Engineering</option>
                <option value={'Bachelor of Science in Chemistry'}>Bachelor of Science in Chemistry</option>
                <option value={'Bachelor of Science in Civil Engineering'}>Bachelor of Science in Civil Engineering</option>
                <option value={'Bachelor of Science in Climate Change'}>Bachelor of Science in Climate Change</option>
                <option value={'Bachelor of Science in Community Development'}>Bachelor of Science in Community Development</option>
                <option value={'Bachelor of Science in Computer Engineering'}>Bachelor of Science in Computer Engineering</option>
                <option value={'Bachelor of Science in Computer Science'}>Bachelor of Science in Computer Science</option>
                <option value={'Bachelor of Science in Cyber Security'}>Bachelor of Science in Cyber Security</option>
                <option value={'Bachelor of Science in Disaster Risk Management'}>Bachelor of Science in Disaster Risk Management</option>
                <option value={'Bachelor of Science in Electrical Engineering'}>Bachelor of Science in Electrical Engineering</option>
                <option value={'Bachelor of Science in Electronics and Communications Engineering'}>Bachelor of Science in Electronics and Communications Engineering</option>
                <option value={'Bachelor of Science in Electronics Engineering'}>Bachelor of Science in Electronics Engineering</option>
                <option value={'Bachelor of Science in Engineering Technology'}>Bachelor of Science in Engineering Technology</option>
                <option value={'Bachelor of Science in Entertainment and Multimedia Computing'}>Bachelor of Science in Entertainment and Multimedia Computing</option>
                <option value={'Bachelor of Science in Environmental Planning'}>Bachelor of Science in Environmental Planning</option>
                <option value={'Bachelor of Science in Environmental Science'}>Bachelor of Science in Environmental Science</option>
                <option value={'Bachelor of Science in Food Engineering'}>Bachelor of Science in Food Engineering</option>
                <option value={'Bachelor of Science in Game Development and Animation'}>Bachelor of Science in Game Development and Animation</option>
                <option value={'Bachelor of Science in Geodetic Engineering'}>Bachelor of Science in Geodetic Engineering</option>
                <option value={'Bachelor of Science in Geology'}>Bachelor of Science in Geology</option>
                <option value={'Bachelor of Science in Hospitality Management'}>Bachelor of Science in Hospitality Management</option>
                <option value={'Bachelor of Science in Human Biology'}>Bachelor of Science in Human Biology</option>
                <option value={'Bachelor of Science in Human Services'}>Bachelor of Science in Human Services</option>
                <option value={'Bachelor of Science in Indigenous Peoples Education'}>Bachelor of Science in Indigenous Peoples Education</option>
                <option value={'Bachelor of Science in Indigenous Peoples Studies'}>Bachelor of Science in Indigenous Peoples Studies</option>
                <option value={'Bachelor of Science in Industrial Engineering'}>Bachelor of Science in Industrial Engineering</option>
                <option value={'Bachelor of Science in Industrial Technology'}>Bachelor of Science in Industrial Technology</option>
                <option value={'Bachelor of Science in Information Systems'}>Bachelor of Science in Information Systems</option>
                <option value={'Bachelor of Science in Information Technology'}>Bachelor of Science in Information Technology</option>
                <option value={'Bachelor of Science in Interior Design'}>Bachelor of Science in Interior Design</option>
                <option value={'Bachelor of Science in Manufacturing Engineering'}>Bachelor of Science in Manufacturing Engineering</option>
                <option value={'Bachelor of Science in Marine Biology'}>Bachelor of Science in Marine Biology</option>
                <option value={'Bachelor of Science in Marine Engineering'}>Bachelor of Science in Marine Engineering</option>
                <option value={'Bachelor of Science in Marine Transportation'}>Bachelor of Science in Marine Transportation</option>
                <option value={'Bachelor of Science in Materials Engineering'}>Bachelor of Science in Materials Engineering</option>
                <option value={'Bachelor of Science in Mathematics'}>Bachelor of Science in Mathematics</option>
                <option value={'Bachelor of Science in Mechanical Engineering'}>Bachelor of Science in Mechanical Engineering</option>
                <option value={'Bachelor of Science in Mechatronics Engineering'}>Bachelor of Science in Mechatronics Engineering</option>
                <option value={'Bachelor of Science in Mechatronics Engineering Technology'}>Bachelor of Science in Mechatronics Engineering Technology</option>
                <option value={'Bachelor of Science in Medical Technology'}>Bachelor of Science in Medical Technology</option>
                <option value={'Bachelor of Science in Metallurgical Engineering'}>Bachelor of Science in Metallurgical Engineering</option>
                <option value={'Bachelor of Science in Meteorology'}>Bachelor of Science in Meteorology</option>
                <option value={'Bachelor of Science in Midwifery'}>Bachelor of Science in Midwifery</option>
                <option value={'Bachelor of Science in Mining Engineering'}>Bachelor of Science in Mining Engineering</option>
                <option value={'Bachelor of Science in Molecular Biology and Biotechnology'}>Bachelor of Science in Molecular Biology and Biotechnology</option>
                <option value={'Bachelor of Science in Nursing'}>Bachelor of Science in Nursing</option>
                <option value={'Bachelor of Science in Nutrition and Dietetics'}>Bachelor of Science in Nutrition and Dietetics</option>
                <option value={'Bachelor of Science in Occupational Therapy'}>Bachelor of Science in Occupational Therapy</option>
                <option value={'Bachelor of Science in Peace Education'}>Bachelor of Science in Peace Education</option>
                <option value={'Bachelor of Science in Peace Studies'}>Bachelor of Science in Peace Studies</option>
                <option value={'Bachelor of Science in Petroleum Engineering'}>Bachelor of Science in Petroleum Engineering</option>
                <option value={'Bachelor of Science in Physical Therapy'}>Bachelor of Science in Physical Therapy</option>
                <option value={'Bachelor of Science in Physics'}>Bachelor of Science in Physics</option>
                <option value={'Bachelor of Science in Production Engineering'}>Bachelor of Science in Production Engineering</option>
                <option value={'Bachelor of Science in Radiologic Technology'}>Bachelor of Science in Radiologic Technology</option>
                <option value={'Bachelor of Science in Renewable Energy'}>Bachelor of Science in Renewable Energy</option>
                <option value={'Bachelor of Science in Robotics Engineering'}>Bachelor of Science in Robotics Engineering</option>
                <option value={'Bachelor of Science in Sanitary Engineering'}>Bachelor of Science in Sanitary Engineering</option>
                <option value={'Bachelor of Science in Social Work'}>Bachelor of Science in Social Work</option>
                <option value={'Bachelor of Science in Speech-Language Pathology'}>Bachelor of Science in Speech-Language Pathology</option>
                <option value={'Bachelor of Science in Statistics'}>Bachelor of Science in Statistics</option>
                <option value={'Bachelor of Science in Structural Engineering'}>Bachelor of Science in Structural Engineering</option>
                <option value={'Bachelor of Science in Sustainable Energy'}>Bachelor of Science in Sustainable Energy</option>
                <option value={'Bachelor of Science in Tourism'}>Bachelor of Science in Tourism</option>
                <option value={'Bachelor of Science in Tourism Management'}>Bachelor of Science in Tourism Management</option>
                <option value={'Bachelor of Science/Bachelor of Arts in Psychology'}>Bachelor of Science/Bachelor of Arts in Psychology</option>
                <option value={'Bachelor of Special Needs Education'}>Bachelor of Special Needs Education</option>
                <option value={'Bachelor of Sports and Exercise Science'}>Bachelor of Sports and Exercise Science</option>
                <option value={'Doctor of Dental Medicine'}>Doctor of Dental Medicine</option>
                <option value={'Doctor of Optometry'}>Doctor of Optometry</option>
              </Form.Select>
              {errors.course && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.course}</p>}
            </Form.Group>
          </Row>
          </div>
          <div className='frmbtnec'>
          <Button className='myButton' variant="contained" onClick={Check}>Next</Button>
          </div>
          </div>
      </div>
  </div>
  </>
)
}


export default Firststep