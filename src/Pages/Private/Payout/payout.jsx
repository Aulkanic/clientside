import React, { useEffect, useState } from 'react'
import { AcadmicyearListofScho, RemovePayeeReceiver, SetPayeeReceiver } from '../../../Api/request';
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
    console.log(data)
    const det = data.PayDet[0];
    const details ={
      fname:frmReceiver.fname,
      lname: frmReceiver.lname,
      mname: frmReceiver.mname,
      relationship: frmReceiver.relationship,
      address: frmReceiver.address,
      contactNum: frmReceiver.contactNum,
      academicYear: data.academicYear,
      batch: data.batchtitle,
      scholarid: det.scholarCode
    }

    const formData = createFormData(details)
    const res = await SetPayeeReceiver.SET(formData)
    if(res.data){
      alert('Submitted Successfully')
      FetchData()
    }
  }
  const handleRemoveGuardian = async(data) =>{
    console.log(data)
    const filter = data.results.filter(item => item.batch === data.batchtitle);
    const det = filter[0]
    const details = {
      schoid: det.scholarCode,
      academicYear: data.academicYear,
      batch: data.batchtitle
    }
    console.log(details)
    const formData = createFormData(details)
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    console.log(formDataObject)
    const res = await RemovePayeeReceiver.REMOVE(formData);
    console.log(res)
    if(res.data){
      FetchData()
    }
  }
  console.log(allAcademic)
 return (
  <>
  <div>
    {allAcademic?.map((data,idx) =>{
      const payDet = data.PayDet[0];
      const isHaveGuardian = data.Receiver.length > 0;
      const receiverDet = data.Receiver[0]
      return(
        <div key={idx}>
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
                  <td>{new Date(payDet?.date).toLocaleDateString()}</td>
                  <td>{new Date(payDet?.timeStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' , timeZone: 'UTC'})} to {new Date(payDet?.timeEnd).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' , timeZone: 'UTC'})}</td>
                  <td>{payDet?.location}</td>
                  <td>{payDet?.cashierId}</td>
                  <td>{currencyFormat(payDet?.total)}</td>
                  <td>{payDet?.reminder}</td>
                </tr>
              </tbody>
            </table>
            <div className='shadow-border h-max p-4'>
              {isHaveGuardian ? (<div>
                <div>
                <p>Receiver  Information : </p>
                </div>
                <table className=''>
              <tbody className='flex gap-8'>
                <tr className='flex flex-col gap-4 font-bold'>
                  <td>Name:</td>
                  <td>Relationship:</td>
                  <td>Address:</td>
                  <td>Contact No:</td>
                </tr>
                <tr className='flex flex-col gap-4 text-right'>
                  <td>{`${receiverDet?.receiverfname} ${receiverDet?.receivermname} ${receiverDet?.receiverlname}`}</td>
                  <td>{receiverDet?.relationship}</td>
                  <td>{receiverDet?.address}</td>
                  <td>{receiverDet?.contactNum}</td>
                </tr>
              </tbody>
            </table>
            <div className='flex justify-end items-end mt-4'>
            <CustomButton
              label={'Remove Guardian'}
              color={'red'}
              onClick={() =>{handleRemoveGuardian(data)}}
            />
            </div>
              </div>) : (<div>
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
              </div>)}

            </div>
          </div>}
        />
        </div>
      )
    })}
  </div>
  </>
 )
}

