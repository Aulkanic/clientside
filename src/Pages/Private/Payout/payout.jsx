import React, { useEffect, useState } from 'react'
import { AcadmicyearListofScho, SetPayeeReceiver } from '../../../Api/request';
import { useSelector } from 'react-redux';
import CustomAccordion from '../../../Components/Accordion/CustomAccordion';
import TextInput from '../../../Components/InputField/text';
import SelectInput from '../../../Components/InputField/select';
import { relationshipList } from '../../Public/ApplicationForm/listOptions';
import CustomButton from '../../../Components/Button/button';
import createFormData from '../../../helper/formData';

export const Payout = () => {
  const user = useSelector((state) => state.login);
  const [allAcademic,setAllAcademic] = useState([]);
  const [frmReceiver,setFrmReceiver] = useState({
    fname:'',
    lname:'',
    mname:'',
    relationship:'',
    address:'',
    contactNum:'',
    academicYear:'',
    batch:'',
    scholarid:''
  })
  const currencyFormat = (num) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PHP',
    });
    return formatter.format(num);
  }

  useEffect(() =>{
    FetchData()
  },[])

  async function FetchData(){
    const scholarCode = user.info.scholarCode
    const res = await AcadmicyearListofScho.LIST(scholarCode)
    console.log(res)
    if(res.data){
      setAllAcademic(res.data)
    }
  }    
  const handleInputChange = (e) =>{
    const { name,value } = e.target;
    setFrmReceiver(prev=> ({...prev,[name]: value}))
  }
  const handleOptionChange = (data) => {
    const { name, value } = data;    
    setFrmReceiver(prev=> ({...prev,[name]: value}))
  }
  const handleSubmit = async(e,data) =>{
    e.preventDefault()
    const det = data.results[0];
    setFrmReceiver(prev =>({...prev,academicYear:data.academicYear,batch:data.batchtitle,scholarid:det.schoid}))
    console.log(frmReceiver)
    const formData = createFormData(frmReceiver)
    const res = await SetPayeeReceiver.SET(formData)
    console.log(res)
    if(res.data){
      alert('Submitted Successfully')
    }
  }
 return (
  <>
  <div>
    {allAcademic?.map((data,idx) =>{
      const det = data.results[0];
      return(
        <CustomAccordion
          data={data}
          title={<p style={{fontWeight:'bold'}}>Academic Year: {data.academicYear} {data.batchtitle}</p>}
          content={<div style={{display:'flex',justifyContent:'space-around',padding:'0px 24px'}}>
            <table className='shadow-border h-max'>
              <tbody className='flex gap-8 p-4'>
                <tr className='flex flex-col gap-4 font-bold'>
                  <td>Date:</td>
                  <td>Time:</td>
                  <td>Location:</td>
                  <td>Cashier No:</td>
                  <td>Amount to Received:</td>
                  <td>Reminder:</td>
                </tr>
                <tr className='flex flex-col gap-4 text-right'>
                  <td>{new Date(det.date).toLocaleDateString()}</td>
                  <td>{new Date(det.timeStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} to {new Date(det.timeEnd).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                  <td>{det.location}</td>
                  <td>{det.cashierId}</td>
                  <td>{currencyFormat(det.total)}</td>
                  <td>{det.reminder}</td>
                </tr>
              </tbody>
            </table>
            <div className='shadow-border h-max p-4'>
            <p>Person incharge for receiving allowance</p>
            <p className='text-sm italic font-semibold'>Note:Fill up this form if the guardian will be the one to received the allowance</p>
              <form action="" >
                <div className='flex gap-4'>
                  <div className='w-full'>
                  <TextInput
                    label={'Guardian FirstName'}
                    required={true}
                    type={'text'}
                    name='fname'
                    value={frmReceiver.fname}
                    onChange={handleInputChange}
                    readonly={false}
                  />
                  <TextInput
                    label={'Guardian LastName'}
                    required={true}
                    type={'text'}
                    name='lname'
                    value={frmReceiver.lname}
                    onChange={handleInputChange}
                    readonly={false}
                  />
                  <TextInput
                    label={'Guardian MiddleName'}
                    required={false}
                    type={'text'}
                    name='mname'
                    value={frmReceiver.mname}
                    onChange={handleInputChange}
                    readonly={false}
                  />
                  </div>
                  <div className='w-full'>
                  <SelectInput
                    label={"Relationship to guardian"}
                    required={true}
                    options={relationshipList}
                    value={frmReceiver.relationship}
                    onChange={handleOptionChange}
                  />
                  <TextInput
                    label={'Guardian Address'}
                    required={true}
                    type={'text'}
                    name='address'
                    onChange={handleInputChange}
                    value={frmReceiver.address}
                    readonly={false}
                  />
                  <TextInput
                    label={'Guardian Contact No. (Mobile)'}
                    required={true}
                    type={'text'}
                    onChange={handleInputChange}
                    name='contactNum'
                    value={frmReceiver.contactNum}
                    readonly={false}
                  /> 
                  </div>
                </div>
                <div className='flex justify-end items-end mt-4'>
                <CustomButton
                  label={'Submit'}
                  color={'blue'}
                  
                  onClick={(e) =>handleSubmit(e,data)}
                />
                </div>

              </form>
            </div>
          </div>}
        />
      )
    })}
  </div>
  </>
 )
}

