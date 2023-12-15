import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { IoMdSave } from "react-icons/io";
import ImgDef from '../../../Images/logo.png';
import TextInput from '../../../Components/InputField/text';
import { SetupReceiver,FetchingReceiver } from '../../../Api/request';
import { useSelector } from 'react-redux';
import { FaCamera } from "react-icons/fa";
import swal from 'sweetalert';
import { validateText,validateCellphoneNumber } from '../../../helper/validateField';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const Payout = () => {
  const [isEdit,setIsEdit] = useState(false);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({}); 
  const [loading,setLoading] = useState(false)
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
    const errors = {};
    const oldData = receiver.receiverInfo[0];
    console.log(oldData)
    const firstName = guardianReceiver.firstName || oldData.firstName;
    const lastName = guardianReceiver.lastName || oldData.lastName;
    const middleName = guardianReceiver.middleName || oldData.middleName;
    const contactNum = guardianReceiver.contactNum || oldData.contactNum;
    const email = guardianReceiver.email || oldData.email;
    const address = guardianReceiver.address || oldData.address;
    const relationship = guardianReceiver.relationship || oldData.relationship;
    const validId = guardianReceiver.validId || oldData.valid_Id;
    const profile = guardianReceiver.profile || oldData.profile;
    const authorizedLetter = guardianReceiver.authorizedLetter || oldData.request_Letter;
    console.log(validId)
    console.log(authorizedLetter)
    errors.firstName = await validateText(firstName,50,'firstName');
    errors.lastName = await validateText(lastName,50,'lastName');
    errors.middleName = await validateText(middleName,50,'middleName');
    errors.contactNum = await validateCellphoneNumber(contactNum,'contactNum');
    errors.address = await validateText(address,250,'address');
    errors.relationship = await validateText(relationship,50,'relationship');
    if(!validId || !authorizedLetter){
      swal({
        text: 'Please upload the required documents.',
        timer: 2000,
        buttons: false,
        icon: "warning",
      })
      return  
    }
    const isError = Object.values(errors).every(error => error === undefined)
    console.log(errors)
    if (isError !== true) {
      setErrors(errors);
      return;
    }
    setLoading(true)
    const formData = new FormData();
    formData.append('scholarCode',user.info.scholarCode)
    formData.append('firstName',firstName)
    formData.append('lastName',lastName)
    formData.append('middleName',middleName)
    formData.append('email',email)
    formData.append('applicantNum',user.info.applicantNum)
    formData.append('contactNum',contactNum)
    formData.append('address',address)
    formData.append('relationship',relationship)
    formData.append('validId',validId)
    formData.append('profile',profile)
    formData.append('authorizedLetter',authorizedLetter)
    await SetupReceiver.SET_RECEIVER(formData)
    .then((res) =>{
      setReceiver({
        ...receiver,
        payoutSched: res.data.results1,
        receiverInfo: res.data.results
      })
      setIsEdit(false)
      setLoading(false)
      swal({
        text: 'Data was saved',
        timer: 2000,
        buttons: false,
        icon: "success",
      })
      return
    })
  } 
  console.log(receiver)
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
             <button onClick={saveDetails} disabled={loading} className='border-2 border-blueish flex items-center gap-1 px-4 py-2 text-blueish hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg'
            >
              {!loading ? <IoMdSave /> : <AiOutlineLoading3Quarters className='animate-spin' />}
              {!loading ? 'Save Details' : 'Saving...'}
            </button>             
          </div>}     
        </div>
        <div className='bg-white w-full h-full flex flex-col md:flex-row'>
          <div className='w-2/5 bg-blueish'>
              <div className='flex relative justify-center items-top w-full h-max p-2 pt-4'>
                <img className='w-full h-40 object-contained' 
                src={preview || receiver.receiverInfo[0]?.profile || ImgDef} alt="" />
                <label className='absolute right-2 bottom-4 cursor-pointer' htmlFor="fileImg">
                <FaCamera  className=' text-6xl'/>
                <input id='fileImg' accept=".jpg, .jpeg, .png" name='profile' onChange={handleFileChange} type="file" className='hidden' />
                </label>
              </div>
              <div className='p-2'>
                <TextInput
                    label={'LastName'}
                    type={'text'}
                    required={true}
                    name='lastName'
                    placeholder={receiver.receiverInfo[0]?.lastName}
                    value={guardianReceiver.lastName}
                    onChange={handleInputChange}
                    readonly={!isEdit}
                    error={errors.lastName}
                />               
                <TextInput
                    label={'FirstName'}
                    type={'text'}
                    required={true}
                    name='firstName'
                    value={guardianReceiver.firstName}
                    placeholder={receiver.receiverInfo[0]?.firstName}
                    onChange={handleInputChange}
                    readonly={!isEdit}
                    error={errors.firstName}
                />               
                <TextInput
                    label={'MiddleName'}
                    type={'text'}
                    required={true}
                    name='middleName'
                    value={guardianReceiver.middleName}
                    placeholder={receiver.receiverInfo[0]?.middleName}
                    onChange={handleInputChange}
                    readonly={!isEdit}
                    error={errors.middleName}
                />               
                <TextInput
                    label={'Email'}
                    type={'email'}
                    required={true}
                    name='email'
                    value={guardianReceiver.email}
                    placeholder={receiver.receiverInfo[0]?.email}
                    onChange={handleInputChange}
                    readonly={!isEdit}
                    error={errors.email}
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
                    placeholder={receiver.receiverInfo[0]?.relationship}
                    onChange={handleInputChange}
                    readonly={!isEdit}
                    error={errors.relationship}
                />  
                <TextInput
                    label={'Contact Num'}
                    type={'text'}
                    required={true}
                    name='contactNum'
                    value={guardianReceiver.contactNum}
                    placeholder={receiver.receiverInfo[0]?.contactNum}
                    onChange={handleInputChange}
                    readonly={!isEdit}
                    error={errors.contactNum}
                />  
                <TextInput
                    label={'Address'}
                    type={'text'}
                    required={true}
                    name='address'
                    value={guardianReceiver.address}
                    placeholder={receiver.receiverInfo[0]?.address}
                    onChange={handleInputChange}
                    readonly={!isEdit}
                    error={errors.address}
                />  
                <div>
                  <h1>Credentials</h1>
                  <div>                             
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Authorization Letter</label>
                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                    id="file_input" accept='accept=".jpg, .jpeg, .png' disabled={!isEdit} name='validId' onChange={handleFileChange} type="file" />
                  </div>
                  <div>                             
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Valid Id</label>
                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                    id="file_input" accept=".jpg, .jpeg, .png" disabled={!isEdit} name='authorizedLetter' onChange={handleFileChange} type="file" />
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

