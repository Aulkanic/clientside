import React, { useState } from 'react'
import Applicationfrm from './Applicationfrm';
import swal from 'sweetalert';
import LoopingRhombusesSpinner from '../../userhome/loadingDesign/loading';
import { useNavigate } from 'react-router-dom';
import { Axios } from 'axios';

export const multiStepContext = React.createContext();
function StepContext() {
  const navigate = useNavigate();
    const [currentStep, setStep] = useState(1);
    const [userData, setUserData] = useState({
      applicantNum:'',
      address:'',
      age:'',
      baranggay:'',
      birthday:'',
      birthPlace:'',
      caddress:'',
      citizenship:'',
      collegeAddress:'',
      collegeAward:'',
      collegeSchool:'',
      collegeYear:'',
      contactNum:'',
      course:'',
      currentSchool:'',
      currentYear:'',
      elemAddress:'',
      elemAward:'',
      elemSchool:'',
      elemYear:'',
      email:'',
      fatherEduc:'',
      fatherName:'',
      fatherlName:'',
      fathermName:'',
      fatherOccu:'',
      financialSupport:'',
      firstName:'',
      gender:'',
      guardianContact:'',
      guardianName:'',
      gwa:'',
      highAddress:'',
      highAward:'',
      highSchool:'',
      highYear:'',
      howLong:'',
      lastName:'',
      middleName:'',
      monthIncome:'',
      motherEduc:'',
      motherName:'',
      motherlName:'',
      mothermName:'',
      motherOccu:'',
      famNum:'',
      ownerShip:'',
      paddress:'',
      relationship:'',
      scholarID:'',
      typeSchool:'',
      wereLive:''
    });
    console.log(userData)
    const [finalData, setFinalData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    function SubmitData(){
      setFinalData(finalData => [...finalData,userData])
      setUserData('');
      setStep(1);
    }
  return (
    <>
    {!loading && <div>
        <multiStepContext.Provider value={{currentStep, setStep, userData, setUserData, finalData, setFinalData, SubmitData}} >
            <Applicationfrm/>
        </multiStepContext.Provider>
    </div>}
    {loading && <LoopingRhombusesSpinner/>}
    </>
  )
}

export default StepContext