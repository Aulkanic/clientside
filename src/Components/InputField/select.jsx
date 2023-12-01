// SelectInput.js
import React from 'react';
import Select from 'react-select';// Import your select library

const SelectInput = ({ label,required, value, onChange, options,error }) => {
  return (
    <div className='flex-1 relative'>
      <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="baranggay">
        {label} {required && '*'}
      </label>
      <Select
        fullWidth
        className='h-full'
        value={options.find((option) => option.value === value)}
        onChange={onChange}
        placeholder=""
        isSearchable={false}
        options={options}
      />
      {error && <p className='text-[#C42B1C] text-sm ml-2 absolute -bottom-6'>{error}!</p>}
    </div>
  );
};

export default SelectInput;
