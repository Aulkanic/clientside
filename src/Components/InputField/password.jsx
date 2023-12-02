import React from 'react';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
const PasswordInput = ({ label,name, value, onChange, error,onClick ,show }) => {
   
  return (
    <div className='flex-1 my-4 lg:mb-0 lg:mr-2'>
      <label className='block text-gray-700 text-sm font-bold mb-1' htmlFor={name}>
        {label}
      </label>
      <div className='relative'>
      <input
        type={show ? 'text' : 'password'}
        className="w-full px-4 py-1.5 border rounded-md focus:outline-none focus:ring focus:border-'blue-300' transition duration-300 ease-in-out"
        name={name}
        value={value}
        onChange={onChange}
      />
      <button className='border-0 bg-transparent absolute right-2 top-2'
      onClick={onClick}
      type='button'
      >
        { show ? <FaEye className='text-lg'/> : <FaEyeSlash className='text-lg'/>}
      </button>
      </div>

      {error && <p className='text-[#C42B1C] text-sm ml-2 mb-4'>{error}!</p>}
    </div>
  );
};

export default PasswordInput;