import React, { useState } from 'react'
import Applicationfrm from './Applicationfrm';
import i18next from '../../i18n';
import { I18nextProvider } from 'react-i18next';

export const multiStepContext = React.createContext();
function StepContext() {
    const [currentStep, setStep] = useState(1);
  
  return (
    <>
    <div>
      <I18nextProvider i18n={i18next}>
        <multiStepContext.Provider value={{currentStep, setStep}} >
            <Applicationfrm/>
        </multiStepContext.Provider>
        </I18nextProvider>
    </div>
    </>
  )
}

export default StepContext