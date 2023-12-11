import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { multiStepContext } from './StepContext';
import Button from '@mui/material/Button';
import swal from 'sweetalert';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import '../css/persona.css'
import '../css/buttonStyle.css'
import { Rulelist,FetchingFamily,CheckFamily } from '../../Api/request';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Switch from '@mui/material/Switch';
import { useTranslation } from 'react-i18next';
import { Backdrop, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import TextInput from '../../Components/InputField/text.jsx';
import TeleInput from '../../Components/InputField/telephone.jsx';
import SelectInput from '../../Components/InputField/select.jsx';
import { fatherEducationOptions,motherEducationOptions,relationshipList } from '../../Pages/Public/ApplicationForm/listOptions.js';
import { setForm } from '../../Redux/formSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../Components/Button/button.jsx';
import { validateText,validateCellphoneNumber,validateNumber,validateField } from '../../helper/validateField.js';

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 50,
  color: '#fff',
}));

function Persona() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const form = useSelector((state) => state.form)
    const { setStep, userData} = useContext(multiStepContext);
    const [errors, setErrors] = useState({}); 
    const [loading,setLoading] = useState(false);
    const [showBackdrop, setShowBackdrop] = useState(false);
    const [rule,setRule] = useState([]);
    const [siblings, setSiblings] = useState(form.siblings || [])
    const [value, setValue] = useState('' || form.relationship);
    const [isGuardiancheck,setisGuardiancheck] = useState(false);

    const handleChangeRadio = (event) => {
      setValue(event.target.value);
      const isGuardian = event.target.value;
      if(isGuardian === 'FATHER'){
        dispatch(setForm({ ['guardianName']: form.fatherName }));
        dispatch(setForm({ ['guardianlName']: form.fatherlName }));
        dispatch(setForm({ ['guardianmName']: form.fathermName }));
        dispatch(setForm({ ['relationship']: 'FATHER' }));
        setisGuardiancheck(true);
      }
      if(isGuardian === 'MOTHER'){
        dispatch(setForm({ ['guardianName']: form.motherName }));
        dispatch(setForm({ ['guardianlName']: form.motherlName }));
        dispatch(setForm({ ['guardianmName']: form.mothermName }));
        dispatch(setForm({ ['relationship']: 'MOTHER' }));
        setisGuardiancheck(true)
      }
      if(isGuardian === 'OTHERS'){
        dispatch(setForm({ ['guardianName']: '' }));
        dispatch(setForm({ ['guardianlName']: '' }));
        dispatch(setForm({ ['guardianmName']: '' }));
        dispatch(setForm({ ['relationship']: '' }));
        setisGuardiancheck(false)
      }
    };
    const handleOptionChange = (data) => {
      const { name, value } = data; 
      dispatch(setForm({ [name]: value }));
    }
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      const caps = value.toUpperCase()
      dispatch(setForm({ [name]: caps }));
    };
    const handleInputChange1 = (index, field, value) => {
      const updatedSiblings = [...siblings];
      updatedSiblings[index][field] = value;
      setSiblings(updatedSiblings);
    };
    const handleAddFields = () =>{
      setSiblings([...siblings, { firstName: '', lastName: '',middleName:'' }]);
    }
    const handleRemoveFields = (index) =>{
      const values = [...siblings]
      values.splice(index, 1);
      setSiblings(values)
    }
    const handleOnlyChild = (event) =>{
      const isChecked = event.target.checked;
      console.log(isChecked)
      if(isChecked === true){
        dispatch(setForm({ ['onlyChild']: isChecked }));
        setSiblings([])
      }else{
        dispatch(setForm({ ['onlyChild']: isChecked }));
      }
    }
    const handleNoFather = (event) =>{
      const isChecked = event.target.checked;
      if(isChecked === true){
        dispatch(setForm({ ['fatherName']: 'NONE' }));
        dispatch(setForm({ ['fatherlName']: 'NONE' }));
        dispatch(setForm({ ['fathermName']: 'NONE' }));
        dispatch(setForm({ ['fatherEduc']: 'NONE' }));
        dispatch(setForm({ ['fatherOccu']: 'NONE' }));
        dispatch(setForm({ ['noFather']: true }));
        if(value === 'FATHER'){
          setValue('OTHERS')
        }
      }else{
        dispatch(setForm({ ['fatherName']: '' }));
        dispatch(setForm({ ['fatherlName']: '' }));
        dispatch(setForm({ ['fathermName']: '' }));
        dispatch(setForm({ ['fatherEduc']: '' }));
        dispatch(setForm({ ['fatherOccu']: '' }));
        dispatch(setForm({ ['noFather']: false }));
      }
    }
    const handleSameAddress = (event) =>{
      const isChecked = event.target.checked;
      if(isChecked){
        dispatch(setForm({ ['guardianAddress']: form.address }));
        dispatch(setForm({ ['isSameAddress']: isChecked }));
      }else{
        dispatch(setForm({ ['isSameAddress']: isChecked }));
        dispatch(setForm({ ['guardianAddress']: '' }));
      }
    }
    async function Check(){
      const errors = {};
      errors.motherName = await validateText(form.motherName, 50, 'Mother Name');
      errors.motherlName = await validateText(form.motherlName,50, 'Mother Lastname');
      errors.motherOccu = await validateField(form.motherOccu, 150, 'Mother Occupation');
      errors.motherEduc = await validateField(form.motherEduc, 150, 'Mother Education');
      errors.fatherName = await validateText(form.fatherName,50,'Father Name');
      errors.fatherlName = await validateText(form.fatherlName,50,'Father Lastname');
      errors.fatherOccu = await validateField(form.fatherOccu, 50,'Father Occupation');
      errors.fatherEduc = await validateField(form.fatherEduc, 150,  'Father Education');
      errors.guardianName = await validateText(form.guardianName, 150,'Guardian Name');
      errors.guardianlName = await validateText(form.guardianlName, 50,'Guardian Lastname');
      errors.relationship = await validateField(form.relationship, 50,'Relationship to Guardian');
      errors.guardianContact = await validateCellphoneNumber(form.guardianContact,'Guardian Contact');
      errors.guardianAddress = await validateField(form.guardianAddress, 500,'Guardian Address');
      if(!form.onlyChild){
        const hasEmptyFields = siblings.some(
          (sibling) =>
            sibling.firstName.trim() === '' ||
            sibling.lastName.trim() === ''
        );
        if(siblings.length === 0){
          errors.sibling = `Atleast Add siblings details if not only child`
        }else if(hasEmptyFields){
          errors.sibling = `Please fill out all sibling information fields.`
        }
      }
      const isError = Object.values(errors).every(error => error === undefined)
        if (isError !== true) {
          setErrors(errors);
          return;
        }
        dispatch(setForm({ ['siblings']: siblings }));
        function toTitleCase(str) {
          return str?.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          });
        }
        const str1 = toTitleCase(form.motherName);
        const str2 = toTitleCase(form.motherlName);
        const str21 = toTitleCase(form.mothermName);
        const str3 = toTitleCase(form.fatherName);
        const str4 = toTitleCase(form.fatherlName);
        const str41 = toTitleCase(form.fathermName);
        const str5 = toTitleCase(form.firstName);
        const str6 = toTitleCase(form.lastName);
        const str61 = toTitleCase(form.middleName);
        const userName = `${str5} ${str61} ${str6}`
        const groupedNames = {
          motherName: `${str1} ${str21} ${str2}`,
          fatherName: `${str3} ${str41} ${str4}`,
          siblingNames: siblings.length > 0 ? [...siblings.map(sibling => `${toTitleCase(sibling.firstName)} ${toTitleCase(sibling.middleName)} ${toTitleCase(sibling.lastName)}`), userName].sort() : [],

        };
        
        const formData = new FormData();
        formData.append('familyNames', JSON.stringify(groupedNames));
        setLoading(true)
        await CheckFamily.CHECK_FAM(formData)
        .then((res) =>{    
          if(res.data.results.length === rule.famNum){
            setLoading(false)
            swal({
              title: "Warning",
              text: 'One Family Per head',
              icon: "warning",
              button: "OK",
            });
            setErrors('')
            setStep(2)
            return
          }else{
            setErrors('')
            dispatch(setForm({ ['familyCode']: res.data.familyCode }));
            setLoading(false)
            setStep(3)
          }
        })

    };


    useEffect(() =>{
      async function Fetch(){
        const rul = await Rulelist.FETCH_RULE()
        setRule(rul.data.result[0])
      }
      Fetch()
    },[rule])

   const siblingfrm = siblings?.map((sibling, index) => (
    <>
    <div className='flex flex-col p-4'>
      <h1 className='m-0'>{`${t("Sibling")} ${index + 1}`}</h1>
      <div className='sm:block md:flex' key={index}>
          <TextInput
            label={`${t("Last Name")} ${index + 1}`}
            required={true}
            type={'text'}
            name='lastName'
            placeholder="Enter sibling's last name"
            value={sibling.lastName}
            onChange={(e) =>handleInputChange1(index,e.target.name,e.target.value.toUpperCase())}
            error={errors.lastName}
            readonly={false}
          />
          <TextInput
            label={`${t("First Name")} ${index + 1}`}
            required={true}
            type={'text'}
            name='firstName'
            placeholder="Enter sibling's first name"
            value={sibling.firstName}
            onChange={(e) =>handleInputChange1(index,e.target.name,e.target.value.toUpperCase())}
            error={errors.firstName}
            readonly={false}
          />
          <TextInput
            label={`${t("Middle Name")} ${index + 1}`}
            required={true}
            type={'text'}
            name='middleName'
            placeholder="Enter sibling's middle name"
            value={sibling.middleName}
            onChange={(e) =>handleInputChange1(index,e.target.name,e.target.value.toUpperCase())}
            error={errors.middleName}
            readonly={false}
          />
        <div className='relative pt-0 md:pt-10'>
        <CustomButton
            label={<DeleteIcon className='text-white'/>}
            color={'red'}
            loading={false}
            onClick={() => handleRemoveFields(index)}
            disabled={false}
        /> 
        </div>
      </div>
    </div>

    </>
     ))

    return (
    <>   
      <StyledBackdrop open={showBackdrop}>
        <CircularProgress color="inherit" />
      </StyledBackdrop>
    <div className='w-full bg-white'> 
      <div className='w-full'>
        <div className='w-full leading-8 sm:block md:flex flex-wrap h-auto p-2'>
          <div className='flex-1 flex-col gap-4 p-2'> 
             <TextInput
                label={"Father's last name"}
                required={true}
                type={'text'}
                name='fatherlName'
                placeholder="Your answer"
                value={form.fatherlName}
                onChange={handleInputChange}
                error={errors.fatherlName}
                readonly={form.noFather}
              />
             <TextInput
                label={"Father's first name"}
                required={true}
                type={'text'}
                name='fatherName'
                placeholder="Your answer"
                value={form.fatherName}
                onChange={handleInputChange}
                error={errors.fatherName}
                readonly={form.noFather}
              />
             <TextInput
                label={"Father's middle name"}
                required={false}
                type={'text'}
                name='fathermName'
                placeholder="Your answer"
                value={form.fathermName}
                onChange={handleInputChange}
                error={errors.fathermName}
                readonly={form.noFather}
              />  
             <TextInput
                label={"Father's Occupation"}
                required={true}
                type={'text'}
                name='fatherOccu'
                placeholder="Your answer"
                value={form.fatherOccu}
                onChange={handleInputChange}
                error={errors.fatherOccu}
                readonly={form.noFather}
              />   
              <SelectInput
                label={"Highest Educational Attaintment"}
                required={true}
                value={form.fatherEduc}
                onChange={handleOptionChange}
                options={fatherEducationOptions}
                error={errors.fatherEduc}
                isDisabled={form.noFather}
              />
              <div>
              <FormControlLabel sx={{whiteSpace:'nowrap',marginLeft:'15px'}} control={<Switch checked={form.noFather} onChange={handleNoFather} />}
               label={"No Father"} />
              </div>  
            
          </div>
          <div className='flex-1 flex-col gap-4 p-2'>
          <TextInput
                label={"Mother's last name"}
                required={true}
                type={'text'}
                name='motherlName'
                placeholder="Your answer"
                value={form.motherlName}
                onChange={handleInputChange}
                error={errors.motherlName}
                readonly={false}
              />
             <TextInput
                label={"Mother's first name"}
                required={true}
                type={'text'}
                name='motherName'
                placeholder="Your answer"
                value={form.motherName}
                onChange={handleInputChange}
                error={errors.motherName}
                readonly={false}
              />
             <TextInput
                label={"Mother's middle name"}
                required={false}
                type={'text'}
                name='mothermName'
                placeholder="Your answer"
                value={form.mothermName}
                onChange={handleInputChange}
                error={errors.mothermName}
                readonly={false}
              />  
             <TextInput
                label={"Mother's Occupation"}
                required={true}
                type={'text'}
                name='motherOccu'
                placeholder="Your answer"
                value={form.motherOccu}
                onChange={handleInputChange}
                error={errors.motherOccu}
                readonly={false}
              /> 
              <SelectInput
                label={"Highest Educational Attaintment"}
                required={true}
                value={form.motherEduc}
                onChange={handleOptionChange}
                options={motherEducationOptions}
                error={errors.motherEduc}
              /> 
          </div>
        </div>
        <div className='mt-4 w-full '>
            <h3 className='bg-[#043F97] w-full text-white pl-4 py-4 mb-4 text-lg font-bold'>{t("Guardian's Information")}</h3>
          <div className='w-full flex flex-col h-auto p-2'>
              <div className=''>
                <h3 style={{fontSize:'18px',fontWeight:'bold',color:'rgb(11, 73, 128)',marginLeft:'5px'}}>{t("Guardian")}</h3>
                <Form.Group as={Col}>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  value={value || form.relationship}
                  onChange={handleChangeRadio}
                >
                  <FormControlLabel value="MOTHER" control={<Radio />} label={t("Mother")} />
                  <FormControlLabel disabled={form.noFather} value="FATHER" control={<Radio />} label={t("Father")} />
                  <FormControlLabel value="OTHERS" control={<Radio />} label={t("Other")} />
                </RadioGroup>
                </Form.Group>
              </div>
              <div className='sm:block md:flex gap-2 p-2'>
                  <TextInput
                    label={"Guardian's last name"}
                    required={true}
                    type={'text'}
                    name='guardianlName'
                    placeholder="Your answer"
                    value={form.guardianlName}
                    onChange={handleInputChange}
                    error={errors.guardianlName}
                    readonly={isGuardiancheck || form.userType === 'Guardian'}
                  />
                  <TextInput
                    label={t("Guardian's first name")}
                    required={true}
                    type={'text'}
                    name='guardianName'
                    placeholder="Your answer"
                    value={form.guardianName}
                    onChange={handleInputChange}
                    error={errors.guardianName}
                    readonly={isGuardiancheck || form.userType === 'Guardian'}
                  />
                  <TextInput
                    label={t("Guardian's middle name")}
                    required={true}
                    type={'text'}
                    name='guardianmName'
                    placeholder="Your answer"
                    value={form.guardianmName}
                    onChange={handleInputChange}
                    error={errors.guardianmName}
                    readonly={isGuardiancheck || form.userType === 'Guardian'}
                  />
              </div>
              <div className='sm:block md:flex gap-2 p-2 mb-2'>
                   <div className='flex-1 m-2'>
                   <TextInput
                      label={"Guardian's Address"}
                      required={true}
                      type={'text'}
                      name='guardianmName'
                      placeholder="Your answer"
                      value={form.guardianAddress}
                      onChange={handleInputChange}
                      error={errors.guardianAddress}
                      readonly={form.isSameAddress}
                    />
                     <FormControlLabel 
                     control={<Switch checked={form.isSameAddress} onChange={handleSameAddress} />}
                      label={t("Same address")} />
                   </div>
                   <SelectInput
                      label={t("Relationship to guardian")}
                      required={true}
                      value={form.relationship}
                      onChange={handleOptionChange}
                      options={relationshipList}
                      error={errors.relationship}
                      isDisabled={form.relationship === 'FATHER' || form.relationship === 'MOTHER'}
                    />
                    <div className='flex-1 mt-10 md:mt-0'>
                    <TeleInput
                        label={t("Guardian's Contact No.")}
                        type={'text'}
                        required={true}
                        name='guardianContact'
                        onChange={handleInputChange}
                        error={errors.guardianContact}
                        value={form['guardianContact']}
                        readonly={false}
                    /> 
                    </div>

              </div>
          </div>
        </div>
        <div className='w-full'>
          <div className='w-full'>
          <h3 className='bg-[#043F97] w-full text-white pl-4 py-4 text-lg font-bold'>{t("List of Siblings")}</h3>
          </div>
          <div className='relative h-10'>
          <FormControlLabel className='absolute right-0 ' control={<Switch checked={form.onlyChild} onChange={handleOnlyChild} />} label={t("I am only child")} />
          </div>
          <div style={{width:'100%',marginLeft:'30px'}}>
          {errors.sibling && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.sibling}</p>}
          {errors.siblingErrors && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.siblingErrors}</p>}
          </div>

          {siblingfrm}
          <div className='flex justify-center items-center my-2'>
          <CustomButton
            label={'+ Add more siblings'}
            color={form.onlyChild === false ? 'green' : 'gray'} 
            loading={false}
            onClick={handleAddFields}
            disabled={form.onlyChild}
            /> 
          </div>
        </div>
        <div className='flex justify-end items-end gap-2 pr-8 py-8'>
          <CustomButton
            label={'Previous'}
            color={'blue'}
            loading={false}
            onClick={() => setStep(1)}
          /> 
          <CustomButton
            label={'Next'}
            color={'blue'}
            loading={loading}
            disabled={loading}
            onClick={Check}
          /> 
        </div>
      </div>
    </div>
    </>
  )
}

export default Persona