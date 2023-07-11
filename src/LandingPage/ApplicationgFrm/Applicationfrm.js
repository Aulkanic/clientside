import React, { useContext } from 'react'
import Firststep from './Firststep'
import Perso from './persona'
import Fam from './family'
import Educ from './educational'
import Econ from './economic'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import '../css/ApplicationFrm.css'
import { multiStepContext } from './StepContext';
import Lheader from '../components/navbar'
import { styled } from '@mui/material/styles';

function Applicationfrm() {
    const CustomStepLabel = styled(StepLabel)({
        '& .MuiStepLabel-label': {
          color: 'white', // Change the color value to the desired color
        },
      });
    const { currentStep, finalData} = useContext(multiStepContext);
    function showStep(step){
        switch(step){  
            case 1 :
                return <Firststep/>
            case 2 :
                return <Perso/>
            case 3 :
                return <Econ/>
            case 4 :
                return <Fam/>
            case 5 :
                return <Educ/>
        }
    }
  return (
    <>
    <Lheader/>
    <div className='stepdiv'>
    <div className="backgroundstep">
        <h1>BMCC APPLICATION FORM</h1>
    <div className='stepper'>
        <Stepper alternativeLabel style={{width:'90%', color:'white'}} activeStep={currentStep - 1} orientation='horizontal'>
             <Step>
                <CustomStepLabel>Choose Scholarship</CustomStepLabel>
            </Step>
            <Step>
                <CustomStepLabel>Personal Information</CustomStepLabel>
            </Step>
            <Step>
                <CustomStepLabel>Economic Background</CustomStepLabel>
            </Step>
            <Step>
                <CustomStepLabel>Family Background</CustomStepLabel>
            </Step>
            <Step>
                <CustomStepLabel>Educational Background</CustomStepLabel>
            </Step>
        </Stepper>
    </div>
    <form action="">
    {showStep(currentStep)}
    </form>
    </div>
    </div>
    </>
  )
}

export default Applicationfrm