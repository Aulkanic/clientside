import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { IoMdSave } from "react-icons/io";
import ImgDef from '../../../Images/logo.png';
import TextInput from '../../../Components/InputField/text';
import { SetupReceiver,FetchingReceiver } from '../../../Api/request';
import { useSelector } from 'react-redux';
import { FaCamera } from "react-icons/fa";

export const Payout = () => {
  const [isEdit,setIsEdit] = useState(false);
  const [preview, setPreview] = useState(null);
  const [receiver,setReceiver] = useState({
    payoutSched: [],
    receiverInfo: []
  });
  const [guardianReceiver,setGuardianReceiver] = useState({
    firstName:'',
    lastName:'',
    middleName:'',
    email:'',
    relationship:'',
    address: '',
    contactNum:'',
    validId:'',
    authorizedLetter:'',
    profile:''
  })
  const user = useSelector((state) => state.login);

  useEffect(() =>{
     async function Fetch(){
      const formData = new FormData();
      formData.append('scholarCode',user.info.scholarCode)
      let res = await FetchingReceiver.GET_RECEIVER(formData)
      setReceiver({
        ...receiver,
        payoutSched: res.data.results1,
        receiverInfo: res.data.results
      })
     }
     Fetch()
  },[])
  useEffect(() => {
    if (!guardianReceiver.profile) {
        setPreview(undefined)
        return
    }
    
    const objectUrl = URL.createObjectURL(guardianReceiver.profile)
    setPreview(objectUrl)
    
    return () => URL.revokeObjectURL(objectUrl)
    }, [guardianReceiver.profile])
  const handleInputChange = (event) =>{
    setGuardianReceiver({...guardianReceiver,[event.target.name]: event.target.value})
  }
  const handleFileChange = (event) =>{
    setGuardianReceiver({...guardianReceiver,[event.target.name] : event.target.files[0]})
  }
  const saveDetails = async() =>{

    setIsEdit(false)
    const formData = new FormData();
    formData.append('scholarCode',user.info.scholarCode)
    formData.append('firstName',guardianReceiver.firstName)
    formData.append('lastName',guardianReceiver.lastName)
    formData.append('middleName',guardianReceiver.middleName)
    formData.append('email',guardianReceiver.email)
    formData.append('applicantNum',user.info.applicantNum)
    formData.append('contactNum',guardianReceiver.contactNum)
    formData.append('address',guardianReceiver.address)
    formData.append('relationship',guardianReceiver.relationship)
    formData.append('validId',guardianReceiver.validId)
    formData.append('profile',guardianReceiver.validId)
    formData.append('authorizedLetter',guardianReceiver.authorizedLetter)
    await SetupReceiver.SET_RECEIVER(formData)
  }
  return (
    <div className='flex flex-col md:flex-row gap-8'>
      <div>
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-3xl">Payout Details</h1>
        <div className='w-max bg-white flex flex-col gap-4 h-max md:h-full'>
            <div className='bg-blueish00 text-black w-max md:w-96 h-max px-4 py-8 rounded-lg'>
              {receiver.payoutSched.length > 0 ? `Date: ${receiver.payoutSched[0].date} at ${receiver.payoutSched[0].timeStart}-${receiver.payoutSched[0].timeEnd}` : ``} <br/>
              {receiver.payoutSched.length > 0 && `Location: ${receiver.payoutSched[0].Location}`}
            </div>
            <div className='bg-blueish00 text-black w-max md:w-96 h-max px-4 py-8 rounded-lg'>
              BENEFITS: P5,000 {receiver.payoutSched.length > 0 && receiver.payoutSched[0].cashier}
            </div>
            <div className='bg-blueish00 h-72 max-h-max text-black w-max md:w-96 px-4 py-8 rounded-lg'>
              REMINDER:
              {receiver.payoutSched.length > 0 && receiver.payoutSched[0].Reminder}
            </div>
        </div>
      </div>
      <div className='w-full flex-1'>
        <div className='w-full flex justify-between'>
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-3xl">Payout Receiver(if Guardian)</h1>
           {!isEdit ? 
          <div>
            <button onClick={(e) =>setIsEdit(true)} className='border-2 border-blueish flex items-center gap-1 px-4 py-2 text-blueish hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg'
            >
              <FaEdit />
              Edit Details
            </button>
          </div> : 
          <div>
             <button onClick={saveDetails} className='border-2 border-blueish flex items-center gap-1 px-4 py-2 text-blueish hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg'
            >
              <IoMdSave />
              Save Details
            </button>             
          </div>}     
        </div>
        <div className='bg-white w-full h-full flex flex-col md:flex-row'>
          <div className='w-2/5 bg-blueish'>
              <div className='flex relative justify-center items-top w-full h-max p-2 pt-4'>
                <img className='w-full h-40 object-contained' 
                src={preview || ImgDef} alt="" />
                <label className='absolute right-2 bottom-4 cursor-pointer' htmlFor="fileImg">
                <FaCamera  className=' text-6xl'/>
                <input id='fileImg' name='profile' onChange={handleFileChange} type="file" className='hidden' />
                </label>
              </div>
              <div className='p-2'>
                <TextInput
                    label={'LastName'}
                    type={'text'}
                    required={true}
                    name='lastName'
                    value={guardianReceiver.lastName}
                    onChange={handleInputChange}
                    readonly={!isEdit}
                />               
                <TextInput
                    label={'FirstName'}
                    type={'text'}
                    required={true}
                    name='firstName'
                    value={guardianReceiver.firstName}
                    onChange={handleInputChange}
                    readonly={!isEdit}
                />               
                <TextInput
                    label={'MiddleName'}
                    type={'text'}
                    required={true}
                    name='middleName'
                    value={guardianReceiver.middleName}
                    onChange={handleInputChange}
                    readonly={!isEdit}
                />               
                <TextInput
                    label={'Email'}
                    type={'text'}
                    required={true}
                    name='email'
                    value={guardianReceiver.email}
                    onChange={handleInputChange}
                    readonly={!isEdit}
                />               
              </div>
          </div>
          <div className='px-4 w-3/5'>
                <TextInput
                    label={'Relationship'}
                    type={'text'}
                    required={true}
                    name='relationship'
                    value={guardianReceiver.relationship}
                    onChange={handleInputChange}
                    readonly={!isEdit}
                />  
                <TextInput
                    label={'Contact Num'}
                    type={'text'}
                    required={true}
                    name='contactNum'
                    value={guardianReceiver.contactNum}
                    onChange={handleInputChange}
                    readonly={!isEdit}
                />  
                <TextInput
                    label={'Address'}
                    type={'text'}
                    required={true}
                    name='address'
                    value={guardianReceiver.address}
                    onChange={handleInputChange}
                    readonly={!isEdit}
                />  
                <div>
                  <h1>Credentials</h1>
                  <div>                             
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Authorization Letter</label>
                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                    id="file_input" disabled={!isEdit} name='validId' onChange={handleFileChange} type="file" />
                  </div>
                  <div>                             
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Valid Id</label>
                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                    id="file_input" disabled={!isEdit} name='authorizedLetter' onChange={handleFileChange} type="file" />
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

