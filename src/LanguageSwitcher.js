import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    console.log(language)
  };

  return (
    <div style={{
      position:'fixed',
      bottom:'0',
      right:'0'
    }}>
      <button style={{
        padding:'10px',
        backgroundColor: '#3498db',
        border:'none',
        color:'white',
        fontWeight:'900',
        borderRight:'2px solid '
      }} onClick={() => changeLanguage('en')}>English</button>
      <button style={{
        padding:'10px',
        backgroundColor: '#3498db',
        border:'none',
        color:'white',
        fontWeight:'900'
      }} onClick={() => changeLanguage('tl')}>Tagalog</button>
    </div>
  );
}

export default LanguageSwitcher;
