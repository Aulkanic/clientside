import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const steps = [
  {
    label: 'Evaluation of Application Form',
    description: `During the evaluation of your scholarship application, 
    our officials thoroughly reviews each section of the form. 
    This process helps us understand your academic achievements, 
    extracurricular activities, and personal goals. We carefully 
    consider your application to ensure that it aligns with the criteria 
    and objectives of the scholarship.`,
  },
  {
    label: 'Submission of Requirements',
    description:`The submission of required documents is a vital step in 
    completing your scholarship application. This includes academic transcripts,
    recommendation letters, and any other supporting materials. Providing
    comprehensive and accurate information enhances your chances of standing
    out in the selection process.`,
  },
  {
    label: 'Appointment Schedule',
    description: `Upon receiving your application and required documents, 
    we schedule an appointment to discuss your candidacy further. This 
    personalized session allows us to address any additional questions, 
    explore potential areas of excellence, and provide guidance on maximizing
    your chances of securing the scholarship. We aim to support you throughout
    the application process.`,
  },
];

export default function VerticalStepper({step}) {
  const [activeStep, setActiveStep] = React.useState(step);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
        </Paper>
      )}
    </Box>
  );
}