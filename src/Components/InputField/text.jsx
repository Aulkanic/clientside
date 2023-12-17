import React from 'react';
import { useTranslation } from 'react-i18next';

const TextInput = ({ label,required,type, name, placeholder, value, onChange, error,readonly }) => {
  const { t } = useTranslation();

  return (
    <div className='flex-1 my-4 lg:mb-0 lg:mr-2'>
      <label className='block text-slate-900 dark:text-white text-sm font-bold mb-1' htmlFor={name}>
        {t(label)} {required && '*'}
      </label>
      <input
        className={`w-full px-4 py-1.5 border rounded-md focus:outline-none focus:ring focus:border-'blue-300' transition duration-300 ease-in-out`}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readonly}
      />
      {error && <p className='text-[#C42B1C] text-sm ml-2 mb-4'>{error}!</p>}
    </div>
  );
};

export default TextInput;