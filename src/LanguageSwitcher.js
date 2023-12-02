import React from 'react';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {

    i18n.changeLanguage(language);
  };

  return (
    <div className='flex mr-4 z-50 justify-center items-center gap-2' >
      <Form.Label className='text-white'>Choose Language: </Form.Label>
      <Form.Select size="sm"  onChange={(e) => changeLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="tl">Tagalog</option>
      </Form.Select>
    </div>
  );
}

export default LanguageSwitcher;
