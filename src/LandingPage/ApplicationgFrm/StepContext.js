import React, { useState } from 'react'
import Applicationfrm from './Applicationfrm';
import LoopingRhombusesSpinner from '../../userhome/loadingDesign/loading';
import { useSelector } from 'react-redux';

export const multiStepContext = React.createContext();
function StepContext() {
    const user = useSelector((state) => state.user);
    console.log(user)
    const [currentStep, setStep] = useState(1);
    const [userData, setUserData] = useState({
      applicantNum:user.applicantNum,
      address:'',
      age:'',
      baranggay:'',
      birthday:'',
      birthPlace:'',
      citizenship:'',
      contactNum:'',
      course:'',
      School:'',
      yearLevel:'',
      SchoolAddress:'',
      email:user.email,
      fatherEduc:'',
      fatherName:'',
      fatherlName:'',
      fathermName:'',
      fatherOccu:'',
      firstName:user.fname,
      gender:'',
      guardianContact:'',
      guardianName:'',
      guardianlName:'',
      guardianmName:'',
      guardianAddress:'',
      lastName:user.lname,
      middleName:user.mname,
      motherEduc:'',
      motherName:'',
      motherlName:'',
      mothermName:'',
      motherOccu:'',
      relationship:'',
      schoID:'',
    });
    const [finalData, setFinalData] = useState([]);
    const [loading, setLoading] = useState(false);
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