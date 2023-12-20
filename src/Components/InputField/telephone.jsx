import React from 'react';

const TeleInput = ({ label,required,type, name, placeholder, value, onChange, error,readonly }) => {
  return (
    <div className='flex-1 my-4 lg:mb-0 lg:mr-2'>
      <label className='block text-gray-700 text-sm font-bold mb-1' htmlFor={name}>
        {label} {required && '*'}
      </label>
    <div className='relative'>
        <span className='absolute top-1.5 left-2'>+63-</span>
        <input
        className='w-full px-4 py-1.5 pl-12 border rounded-md focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out'
        name={name}
        type={type}
        placeholder={placeholder ? placeholder : "XXX XXX XXXX"}
        value={value}
        onChange={onChange}
        readOnly={readonly}
        />
    </div>
      {error && <p className='text-[#C42B1C] text-sm ml-2'>{error}!</p>}
    </div>
  );
};

export default TeleInput;