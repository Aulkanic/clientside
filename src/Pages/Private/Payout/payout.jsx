import React, { useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { IoMdSave } from "react-icons/io";
import ImgDef from '../../../Images/logo.png';
import TextInput from '../../../Components/InputField/text';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export const Payout = () => {
  const [isEdit,setIsEdit] = useState(false)
  return (
    <div className='flex flex-col md:flex-row gap-8'>
      <div>
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-3xl">Payout Details</h1>
        <div className='w-max bg-white flex flex-col gap-4 h-max md:h-full'>
            <div className='bg-blueish00 text-black w-max md:w-96 h-max px-4 py-8 rounded-lg'>
              SCHEDULE: 12/19/2023 07:00 AM-10:00 AM
            </div>
            <div className='bg-blueish00 text-black w-max md:w-96 h-max px-4 py-8 rounded-lg'>
              BENEFITS: P5,000 Cashier 3
            </div>
            <div className='bg-blueish00 h-72 max-h-max text-black w-max md:w-96 px-4 py-8 rounded-lg'>
              REMINDER:
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            </div>
        </div>
      </div>
      <div className='w-full flex-1'>
        <div className='w-full flex justify-between'>
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-3xl">Payout Receiver(if Guardian)</h1>
           {!isEdit ? 
          <div>
            <button className='border-2 border-blueish flex items-center gap-1 px-4 py-2 text-blueish hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg'
            >
              <FaEdit />
              Edit Details
            </button>
          </div> : 
          <div>
             <button className='border-2 border-blueish flex items-center gap-1 px-4 py-2 text-blueish hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg'
            >
              <IoMdSave />
              Save Details
            </button>             
          </div>}     
        </div>
        <div className='bg-white w-full h-full flex flex-col md:flex-row'>
          <div className='w-2/5 bg-blueish'>
              <div className='flex justify-center items-top w-full h-max p-2 pt-4'>
                <img className='w-full h-40 border-2 border-black object-contained' 
                src={ImgDef} alt="" />
              </div>
              <div className='p-2'>
                <TextInput
                    label={'LastName'}
                    type={'text'}
                    required={true}
                    name='birthday'
                    value={'Juan'}
                    readonly={false}
                />               
                <TextInput
                    label={'FirstName'}
                    type={'text'}
                    required={true}
                    name='birthday'
                    value={'Juan'}
                    readonly={false}
                />               
                <TextInput
                    label={'MiddleName'}
                    type={'text'}
                    required={true}
                    name='birthday'
                    value={'Juan'}
                    readonly={false}
                />               
                <TextInput
                    label={'Email'}
                    type={'text'}
                    required={true}
                    name='birthday'
                    value={'Juan'}
                    readonly={false}
                />               
              </div>
          </div>
          <div className='px-4 w-3/5'>
                <TextInput
                    label={'Relationship'}
                    type={'text'}
                    required={true}
                    name='birthday'
                    value={'Juan'}
                    readonly={false}
                />  
                <TextInput
                    label={'Contact Num'}
                    type={'text'}
                    required={true}
                    name='birthday'
                    value={'Juan'}
                    readonly={false}
                />  
                <TextInput
                    label={'Address'}
                    type={'text'}
                    required={true}
                    name='birthday'
                    value={'Juan'}
                    readonly={false}
                />  
                <div>
                  <h1>Credentials</h1>
                  <div>                             
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Authorization Letter</label>
                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                    id="file_input" type="file" />
                  </div>
                  <div>                             
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Valid Id</label>
                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                    id="file_input" type="file" />
                  </div>
                </div>
          </div>
        </div>
      </div>
      <div>

      </div>
    </div>
  )
}

