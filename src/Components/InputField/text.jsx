import React from 'react';

const TextInput = ({ label,required,type, name, placeholder, value, onChange, error,readonly }) => {
  return (
    <div className='flex-1 mb-4 lg:mb-0 lg:mr-2'>
      <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor={name}>
        {label} {required && '*'}
      </label>
      <input
        className={`w-full px-4 py-1.5 border rounded-md focus:outline-none focus:ring focus:border-${error ? 'red-500' : 'blue-300'} transition duration-300 ease-in-out`}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readonly}
      />
      {error && <p className='text-[#C42B1C] text-sm ml-2'>{error}!</p>}
    </div>
  );
};

export default TextInput;