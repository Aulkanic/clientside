import React, { useCallback, useEffect, useState } from 'react'
import { ListOfRenewal, SubmitRenewalForAcademicYear, SubmitRenewalRequirements } from '../../../Api/request'
import CustomAccordion from '../../../Components/Accordion/CustomAccordion'
import TextInput from '../../../Components/InputField/text'
import { useSelector } from 'react-redux';
import SelectInput from '../../../Components/InputField/select';
import { barangayList, collegeList, elementaryList, juniorhighList, seniorhighList, yearList } from '../../Public/ApplicationForm/listOptions';
import createFormData from '../../../helper/formData';

export const Renewal = () => {
  const [renewal, setRenewal] = useState([])
  const user = useSelector((state) => state.login);
  const scholarCode = user.info.scholarCode;
  const [updtInfo,setUpdtInfo] = useState({
    yearLevel:'',
    baranggay:'',
    email:'',
    contactNum:'',
    gradeLevel:'',
    school:'',
    guardian:'',
    requirements:[]
  })

  async function Fetch(){
    const res = await ListOfRenewal.FETCH()
    if(res.error) return console.log('Error:', res.error)
    setRenewal(res.data)
  }

  useEffect(() =>{
    Fetch()
  },[renewal])

  const handleOptionChange = (data) => {
    const { name, value } = data; 
    setUpdtInfo(prev =>({...prev,[name]:value}))   
  }
  const handleSubmitRenewal = async(data) =>{
   const dataToSend = {
    yearLevel:updtInfo.yearLevel || user.info.yearLevel,
    baranggay:updtInfo.baranggay || user.info.baranggay,
    email:updtInfo.email || user.info.email,
    contactNum:updtInfo.contactNum || user.info.contactNum,
    gradeLevel:updtInfo.gradeLevel || user.info.gradeLevel,
    school:updtInfo.school || user.info.school,
    guardian:updtInfo.guardian || user.info.guardianName,
    renewalCode: data[0].renewalCode
   }
    const formData = createFormData(dataToSend);
    console.log(dataToSend)
    const res = await SubmitRenewalForAcademicYear.SUBMIT(formData)
    if(res.data){
      const files = updtInfo.requirements;
      let counter=0;
      for(let i =0;i<files.length;i++){
        const item = files[i]
        const fileData = new FormData();
        fileData.append('files',item.file);
        fileData.append('Reqname',item.fieldName);
        fileData.append('renewalCode',data[0].renewalCode);
        const res1 = await SubmitRenewalRequirements.SUBMIT(fileData)
        if(res1.data){
          counter++;
          if(counter===files.length){
            alert("Successfully Updated!");
            return
          }
        }
      }
    }
  }
  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    const fileName = e.target.name ;
    setUpdtInfo(prev => ({ ...prev, requirements: [...prev.requirements,{fieldName:fileName,file:newFile}] }));
  };
  const handleInputChange = (e) =>{
    const  { name, value } = e.target;
    setUpdtInfo(prev =>({...prev,[name]:value}))
  }

  const renewalForm = () => {
    return(renewal?.map((data,idx) =>{
    const requirements = JSON.parse(data.requirements)
    const details = data.Scholars?.filter(item => item.scholarCode === scholarCode)
    const isResponded = details[0]?.status === 'Respond'
    return(
      <div key={idx}>
        <CustomAccordion
        data={data}
        title={<p style={{fontWeight:'bold'}}>{data.title}: {data.academicYear}</p>}
        content={<div className='mb-20 flex flex-col gap-12'>
          <div>
            <p>Date: {new Date(data.dateStart).toLocaleDateString()} to {new Date(data.dateEnd).toLocaleDateString()}</p>
            <p>Status: {data.status}</p>
          </div>
          {isResponded ? (
            <div className='flex justify-center items-center'><p>You Already submitted your Renewal</p></div>
          ) : (
            <>
            <div className='flex gap-12'>
            <form className='w-[65%] flex flex-col gap-4' action="">
            <h5 className='font-bold text-lg m-0'>Update Information</h5>
            <div className='flex gap-4'>
              <div className='w-full'>
              <TextInput
              label={'Phone Number'}
              required={true}
              type={'text'}
              name='contactNum'
              onChange={handleInputChange}
              value={updtInfo.contactNum || user.info.contactNum}
              readonly={false}
              />
              <TextInput
                label={'Email'}
                required={true}
                type={'text'}
                name='email'
                onChange={handleInputChange}
                value={updtInfo.email || user.info.email}
                readonly={false}
              />
              <SelectInput
                label={"Barangay"}
                required={false}
                value={updtInfo.baranggay || user.info.baranggay.toUpperCase()}
                onChange={handleOptionChange}
                options={barangayList}
              />
              <TextInput
                label={'Guardian'}
                required={true}
                type={'text'}
                name='guardian'
                onChange={handleInputChange}
                value={updtInfo.guardianName || user.info.guardianName}
                readonly={false}
              />
              </div>
              <div className='w-full'>
              <TextInput
                label={'Current School'}
                required={true}
                type={'text'}
                name='school'
                onChange={handleInputChange}
                value={updtInfo.school || user.info.school}
                readonly={false}
              />
              <SelectInput
                label={"Year Level"}
                required={false}
                value={updtInfo.yearLevel || user.info.yearLevel.toUpperCase()}
                onChange={handleOptionChange}
                options={yearList}
              />
              <SelectInput
                label={"Grade Level"}
                required={false}
                value={updtInfo.gradeLevel || user.info.gradeLevel.toUpperCase()}
                onChange={handleOptionChange}
                options={user.info.yearLevel === 'Elementary' ? elementaryList : user.info.yearLevel === 'College' ? collegeList : user.info.yearLevel === 'Junior Highschool' ? juniorhighList : seniorhighList}
              />
              </div>
            </div>

            </form>
            <div className='flex-1 flex flex-col gap-4'>
              <h5 className='font-bold text-lg'>Requirements</h5>
              {requirements?.map((data1,idx1) =>(
              <div key={idx1}>                             
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">{data1}</label>
              <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
              id="file_input" name={data1} accept=".jpg, .jpeg, .png" onChange={(e) => handleFileChange(e, idx)} type="file"  />
              </div>
              ))}
            </div>
            </div>
            <div className='w-full flex justify-end items-end'>
              <button onClick={() =>handleSubmitRenewal(details)}
              className='bg-sky-500 px-4 py-2 rounded-md text-white'>
                Submit
              </button>
            </div>            
            </>
          )}

        </div>}
        />
      </div>
    )
  }))}
  return (
    <div>
      {renewalForm()}
    </div>
  )
}
