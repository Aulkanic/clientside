import React, { useEffect, useState } from 'react'
import Applicationfrm from './Applicationfrm';
import LoopingRhombusesSpinner from '../../userhome/loadingDesign/loading';
import { useSelector } from 'react-redux';
import i18next from '../../i18n';
import { I18nextProvider } from 'react-i18next';

export const multiStepContext = React.createContext();
function StepContext() {
    const user = useSelector((state) => state.user);
    const [currentStep, setStep] = useState(1);

    const [userData, setUserData] = useState(() => {
      const saveData = localStorage.getItem('userData');
      return saveData ? JSON.parse(saveData) : {
      applicantNum:user.applicantNum,
      address:'',
      age:'',
      baranggay:'',
      birthday:'',
      birthPlace:'',
      citizenship:'',
      contactNum:'',
      course:'NONE',
      School:'',
      yearLevel:'',
      SchoolAddress:'',
      email:user.email,
      fatherEduc:'',
      fatherName:'',
      fatherlName:'',
      fathermName:'',
      fatherOccu:'',
      familyCode:'',
      firstName:user.fname,
      gender:'',
      gradeLevel:'',
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
      siblings: [],
      };
    });
    const [finalData, setFinalData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() =>{
      setUserData((prevUserData) => ({
        ...prevUserData,
        applicantNum: user.applicantNum, 
        firstName:user.fname,
        lastName:user.lname,
        middleName:user.mname,
        email:user.email,
      }));
        localStorage.setItem('userData',JSON.stringify(userData))
    },[userData])

    useEffect(() =>{
      const saveData = localStorage.getItem('userData');
      if(saveData){
        setUserData(JSON.parse(saveData))
      }
    },[])

    function SubmitData(){
      setFinalData(finalData => [...finalData,userData])
      setUserData('');
      setStep(1);
    }
  
  return (
    <>
    {!loading && <div>
      <I18nextProvider i18n={i18next}>
        <multiStepContext.Provider value={{currentStep, setStep, userData, setUserData, finalData, setFinalData, SubmitData}} >
            <Applicationfrm/>
        </multiStepContext.Provider>
        </I18nextProvider>
    </div>}
    {loading && <LoopingRhombusesSpinner/>}
    </>
  )
}

export default StepContext