import React from 'react';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    console.log(language)
    i18n.changeLanguage(language);
  };

  return (
    <div style={{display:'flex',whiteSpace:'nowrap',alignItems:'center',marginRight:'25px'}} >
      <Form.Label style={{marginRight:'10px'}} className='frmlabel'>Choose Language:</Form.Label>
      <Form.Select size="sm"  onChange={(e) => changeLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="tl">Tagalog</option>
      </Form.Select>
    </div>
  );
}

export default LanguageSwitcher;
