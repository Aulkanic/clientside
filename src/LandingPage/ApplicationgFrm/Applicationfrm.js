import React, { useContext } from 'react'
import Firststep from './Firststep'
import Perso from './persona'
import Fam from './family'
import Educ from './educational'
import Econ from './economic'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import PropTypes from 'prop-types';
import '../css/ApplicationFrm.css'
import { multiStepContext } from './StepContext';
import Lheader from '../components/navbar'
import { styled } from '@mui/material/styles';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import InfoIcon from '@mui/icons-material/Info';


  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 95deg,rgba(54,225,70,1) 0%, rgba(185,207,188,1) 57%, rgba(160,196,161,1) 100%);',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 95deg,rgba(102,213,112,1) 0%, rgba(8,193,36,1) 57%, rgba(5,92,9,1) 100%);',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 10,
      border: 0,
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderRadius: 1,
    },
  }));
  
  const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius:'10px',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'transform 0.2s ease',
    ...(ownerState.active && {
      backgroundImage:
        'linear-gradient( 136deg, rgba(109,102,213,1) 0%, rgba(8,83,193,1) 57%, rgba(5,34,92,1) 100%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
      transform:'scale(1.5)'
    }),
    ...(ownerState.completed && {
      backgroundImage:
        'linear-gradient( 136deg,rgba(102,213,112,1) 0%, rgba(8,193,36,1) 57%, rgba(5,92,9,1) 100%);',
    }),
  }));
  
  function ColorlibStepIcon(props) {
    const { active, completed, className } = props;
  
    const icons = {
      1: <AccountBoxIcon />,
      2: <FamilyRestroomIcon />,
      3: <InfoIcon />,
    };
  
    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }
  
  ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
  };

  const steps = ['Personal Information', 'Family Background', 'Other Information'];
  const CustomStepLabel = styled(StepLabel)(({ theme, active }) => ({
    '& .MuiStepLabel-label': {
      color: active ? 'black' : 'black', // Change the color when active
      fontWeight: active ? '900' : '200',
      fontSize: active ? '18px' : '15px'
    },
  }));


function Applicationfrm() {
    const { currentStep, finalData} = useContext(multiStepContext);
    function showStep(step){
        switch(step){  
            case 1 :
                return <Firststep/>
            case 2 :
                return <Perso/>
            case 3 :
                return <Econ/>
        }
    }
  return (
    <div style={{display:'flex',flexDirection:'column'}}>
    <div className='stepdiv'>
    <div className="backgroundstep">
        <h1>BMCC APPLICATION FORM</h1>
    <div className='stepper'>
        <Stepper alternativeLabel style={{width:'100%',paddingTop:'20px',height:'max-Content'}} activeStep={currentStep - 1} orientation='horizontal' connector={<ColorlibConnector />}>

        {steps.map((label,index) => (
          <Step key={label}>
            <CustomStepLabel active={currentStep === (index + 1)} StepIconComponent={ColorlibStepIcon}>{label}</CustomStepLabel>
          </Step>
        ))}
        </Stepper>
    </div>
    <form action="">
    {showStep(currentStep)}
    </form>
    </div>
    </div>
    </div>
  )
}

export default Applicationfrm