import React, {useEffect, useState} from 'react'
import './scholar.css'
import Homepage from '../components/Homepage'
import { UploadingDocs, ListofReq, ListofSub, EditSub, DeleteSub,FetchingApplicantsInfo } from '../../Api/request';
import swal from 'sweetalert';
import Noimageprev from '../../userhome/assets/documenticon.png'
import { DataGrid} from '@mui/x-data-grid';
import { Box, Button} from "@mui/material";
import Swal from 'sweetalert2';
import Card from '@mui/material/Card';
import LoadingButton from '@mui/lab/LoadingButton';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Chip from '@mui/material/Chip';
import TabPanel from '@mui/lab/TabPanel';
import { darken, lighten} from '@mui/material/styles';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import HourglassBottomRoundedIcon from '@mui/icons-material/HourglassBottomRounded';
import '../Button/buttonstyle.css'
import { styled } from '@mui/material/styles';
import { Backdrop, CircularProgress } from '@mui/material';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useSelector } from 'react-redux'

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 50,
  color: '#fff',
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  fontWeight: 'bold',
  '&.Mui-selected': {
    color: 'white',
    backgroundColor:'black'
  },
}));

const StyledTabList = styled(TabList)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,

}));

const getBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.9) : lighten(color, 0.7);

const getHoverBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

const getSelectedBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

const getSelectedHoverBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.4) : lighten(color, 0.4);

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .super-app-theme--Open': {
    backgroundColor: getBackgroundColor(theme.palette.info.main, theme.palette.mode),
    '&:hover': {
      backgroundColor: getHoverBackgroundColor(
        theme.palette.info.main,
        theme.palette.mode,
      ),
    },
    '&.Mui-selected': {
      backgroundColor: getSelectedBackgroundColor(
        theme.palette.info.main,
        theme.palette.mode,
      ),
      '&:hover': {
        backgroundColor: getSelectedHoverBackgroundColor(
          theme.palette.info.main,
          theme.palette.mode,
        ),
      },
    },
  },
  '& .super-app-theme--Approved': {
    backgroundColor: getBackgroundColor(
      theme.palette.success.main,
      theme.palette.mode,
    ),
    '&:hover': {
      backgroundColor: getHoverBackgroundColor(
        theme.palette.success.main,
        theme.palette.mode,
      ),
    },
    '&.Mui-selected': {
      backgroundColor: getSelectedBackgroundColor(
        theme.palette.success.main,
        theme.palette.mode,
      ),
      '&:hover': {
        backgroundColor: getSelectedHoverBackgroundColor(
          theme.palette.success.main,
          theme.palette.mode,
        ),
      },
    },
  },
  '& .super-app-theme--For_Review': {
    backgroundColor: getBackgroundColor(
      theme.palette.warning.main,
      theme.palette.mode,
    ),
    '&:hover': {
      backgroundColor: getHoverBackgroundColor(
        theme.palette.warning.main,
        theme.palette.mode,
      ),
    },
    '&.Mui-selected': {
      backgroundColor: getSelectedBackgroundColor(
        theme.palette.warning.main,
        theme.palette.mode,
      ),
      '&:hover': {
        backgroundColor: getSelectedHoverBackgroundColor(
          theme.palette.warning.main,
          theme.palette.mode,
        ),
      },
    },
  },
  '& .super-app-theme--Reject': {
    backgroundColor: getBackgroundColor(
      theme.palette.error.main,
      theme.palette.mode,
    ),
    '&:hover': {
      backgroundColor: getHoverBackgroundColor(
        theme.palette.error.main,
        theme.palette.mode,
      ),
    },
    '&.Mui-selected': {
      backgroundColor: getSelectedBackgroundColor(
        theme.palette.error.main,
        theme.palette.mode,
      ),
      '&:hover': {
        backgroundColor: getSelectedHoverBackgroundColor(
          theme.palette.error.main,
          theme.palette.mode,
        ),
      },
    },
  },
}));

const Scholar = () => {
const user = useSelector((state) => state.login);
const [docs, setDocs] = useState([]);
const [submitted1, setSubmittedDocs1] = useState([]);
const [fileValues, setFileValues] = useState([]);
const [fileNames, setFileNames] = useState([]);
const [showBackdrop, setShowBackdrop] = useState(false);
const [loading, setLoading] = useState(false);
const [images, setImages] = useState([]);
const [disabledInputs, setDisabledInputs] = useState([]);
const [userFiles, setUserFiles] = useState([]);
const applicantNum = user.info.applicantNum;
const [userInfo,setUserInfo] = useState([]);
const [value, setValue] = React.useState('1');

const handleChange = (event,newValue) => {
  setValue(newValue);
};
const handleFileChange = (index, event) => {
  const files = [...fileValues];
  files[index] = event.target.files[0];
  setFileValues(files);
  const previmg = files.map((img) =>
  img instanceof File ? URL.createObjectURL(img) : img)
  setImages(previmg);
  const updatedFileNames = [...fileValues];
  if (files[index]) {
    updatedFileNames[index] = files[index].name;
  } else {
    updatedFileNames[index] = 'none';
  }
  setFileNames(updatedFileNames);
};
const handleSubmit = async (event) => {
  event.preventDefault();

  if (userInfo.remarks === 'For Evaluation' || userInfo.remarks === 'Failed' || userInfo.remarks === 'Revoke') {
    swal({
      text: `You cannot submit your Documents because your Application Status is ${userInfo.remarks}`,
      timer: 2000,
      buttons: false,
      icon: "error",
    });
    setLoading(false);
    return;
  }

  const errors = []; 
  const messages = [];
  if(fileValues.length === 0 ){
    swal("Error","Please upload all required Requirements.","warning");
  }
  try {
   
    for (let index = 0; index < fileValues.length; index++) {
      const file = fileValues[index];
      const docu = docs[index];

      if (!file) {
        continue;
      }

      const validationResult = validateFile(file, docu);
      if (validationResult.error) {
        errors.push({ Name: docu.requirementName, message: validationResult.error });
        continue;
      }

      const formData = createFormData(file, docu);
      setShowBackdrop(true)
      try {
        const res = await uploadDocument(formData);
        handleSuccessfulUpload(index, res);
        
        messages.push({Name: docu.requirementName, Message: res.message})
      } catch (error) {
        handleFailedUpload(index, error);
      }
    }
  } catch (error) {
    console.log('An error occurred during file submission:', error);
  }

  setShowBackdrop(false)
  if(messages.length > 0){
    const successMessages = messages.map((succ) => `${succ.Name}: ${succ.Message}`);
    swal(successMessages.join("\n"));
  }
  if (errors.length > 0) {
    const errorMessages = errors.map((err) => `${err.Name}: ${err.message}`);
    swal(errorMessages.join("\n"), { icon: "error" });
  }
};

const validateFile = (file, docu) => {
  if (!file.type.startsWith('image/') || (file.type !== 'image/png' && file.type !== 'image/jpeg')) {
    return { error: 'Only PNG and JPG image files are allowed.' };
  }

  const fileSizeInBytes = file.size;
  const maxSizeInBytes = 5 * 1024 * 1024; // 5MB in bytes

  if (fileSizeInBytes > maxSizeInBytes) {
    return { error: 'File size exceeds the limit of 5MB.' };
  }

  return { error: null };
};

const createFormData = (file, docu) => {
  const applicantNum = user.info.applicantNum;
  const formData = new FormData();
  formData.append('file', file);
  formData.append('Reqname', docu.requirementName);
  formData.append('applicantNum', applicantNum);
  formData.append('docsFor', docu.docsfor);
  formData.append('Name', user.info.Name);
  return formData;
};

const uploadDocument = async (formData) => {
  try {
    const res = await UploadingDocs.UPLOAD_DOCS(formData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const handleSuccessfulUpload = (index, res) => {
  const updatedDisabledInputs = [...disabledInputs];
  updatedDisabledInputs[index] = true;
  setDisabledInputs(updatedDisabledInputs);
  setFileValues([])
  setSubmittedDocs1(res.DocumentSubmitted);
};

const handleFailedUpload = (index, error) => {
  console.error(`File upload failed for index ${index}:`, error);
  // You can implement appropriate error handling here
};

const DeleteReq = async (det) =>{
  const id = det.applicantId;
  const requirement_Name = det.requirement_Name;
  const formData = new FormData();
  formData.append('id', id);
  formData.append('requirement_Name', requirement_Name);
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
      setShowBackdrop(true)
  DeleteSub.DELETE_SUB(formData)
  .then(res => {
    setShowBackdrop(false)
    setSubmittedDocs1(res.data.result);
    const schoCat = userInfo.SchoIarshipApplied
    const Batch = userInfo.Batch
    const RequireDocs = res.data.documentlist.results1?.filter(docs => docs.schoName === schoCat && docs.batch === Batch && docs.docsfor === 'Application')
    setDocs(RequireDocs);
  }
   )
  .catch(err => console.log(err));
    }
  })
  
}
const EditReq = async (data) =>{
  const { value: file } = await Swal.fire({
    title: 'Select image',
    input: 'file',
    inputAttributes: {
      'accept': 'image/*',
      'aria-label': 'Upload your profile picture'
    }
  })
  if(!file){
    return
  }
  const fileExtension = file?.name.split('.').pop().toLowerCase();
  if (fileExtension !== 'png' && fileExtension !== 'jpg' && fileExtension !== 'jpeg')  {
    swal({
      text: 'Please upload a PNG or JPG image only.',
      timer: 2000,
      buttons: false,
      icon: "error",
    });
  
    return
  }
  const fileSizeInBytes = file.size;
  const maxSizeInBytes = 5 * 1024 * 1024; // 5MB in bytes
  if (fileSizeInBytes > maxSizeInBytes) {
    swal({
      text: 'File size exceeds the limit of 5MB.',
      timer: 2000,
      buttons: false,
      icon: "error",
    });
    return
  }
  const applicantNum = data.applicantId;
  const requirement_Name = data.requirement_Name;
  const formData = new FormData();
    formData.append(`file`, file);
    formData.append(`Reqname`, requirement_Name);
    formData.append(`applicantNum`, applicantNum);
    setShowBackdrop(true);
    EditSub.EDIT_SUB(formData)
    .then(res => {
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          Swal.fire({
            title: 'Your uploaded picture',
            imageUrl: e.target.result,
            imageAlt: 'The uploaded picture'
          })
        }
        reader.readAsDataURL(file)
      }
      setSubmittedDocs1(res.data.result);
      setUserFiles([]); 
      setShowBackdrop(false);
    }
    )
    .catch(err => console.log(err));
  }
  const viewFile = async (data) =>{
    Swal.fire({
      title: `${data.requirement_Name}`,
      imageUrl: `${data.File}`,
      imageWidth: 600,
      imageHeight: 400,
      imageAlt: 'Custom image',
    })
  }
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await Promise.all([
        ListofReq.FETCH_REQUIREMENTS(),
        ListofSub.FETCH_SUB(applicantNum),
        FetchingApplicantsInfo.FETCH_INFO(applicantNum)
      ]);
      const data1 = response[0].data;
      const data2 = response[1].data;
      const data3 = response[2].data;
      const schoCat = data3.results[0].SchoIarshipApplied
      const Batch = data3.results[0].Batch
      const RequireDocs = data1.Requirements.results?.filter(docs => docs.schoName === schoCat && docs.batch === Batch && docs.docsfor === 'Application')
      setDocs(RequireDocs);
      setUserInfo(data3.results[0]);
      setSubmittedDocs1(data2.Document);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
  const intervalId = setInterval(fetchData, 5000);
  return () => {
    clearInterval(intervalId);
  };
}, []);
const requirements = docs?.map((docu, index) => {
      const isDisabled = disabledInputs[index] || false;
      const valueToCheck = docu.requirementName;
      const hassubmit = submitted1.some((item) => item.requirement_Name === valueToCheck);
      const deadline = new Date(docu.deadline);
      const currentDate = new Date(); 
      const isPastDue = currentDate > deadline && !hassubmit;
    
      return (
            <div key={index} className=' w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 bg-gray-200'>
                <div className="flex flex-col flex-wrap gap-2">
                  <div className="flex-1 relative whitespace-normal md:truncate">
                    <h1 className='absolute text-base font-bold md:left-20'>{docu.requirementName}</h1>
                    <img className='w-20'
                    src={Noimageprev} alt='No Image' />
                  </div>
                  <div className='flex-1 flex flex-col'>
                    <span>Deadline: {docu.deadline}</span>
                    {isPastDue ? (
                      <p style={{margin:0}}>Past due: Document submission is no longer possible.</p>
                    ) : (
                      !isDisabled && !hassubmit ? (
                        <input
                          type="file"
                          accept=".jpg, .jpeg, .png"
                          name={`${docu.requirementName}`}
                          disabled={isDisabled}
                          onChange={(event) => handleFileChange(index, event)}
                        />
                      ) : (
                        <p style={{margin:0}}>Already Submitted</p>
                      )
                    )}
                  </div>
                </div>
            </div>
      );
    });

    const columns = [
      { 
        field: 'requirement_Name', 
        headerName: 'Requirement Name',
        width: 200
       },
       {
        field: 'File',
        headerName: 'File',
        width: 100, 
        renderCell: (params) => {     
          return (
                <img
                  alt="No Image"
                  src={params.value}
                  style={{ minwidth: '75px', height: 35,objectFit:'cover' }}
                />
          );},
        },
       {
         field: 'Date', 
          headerName: 'Date Submitted',
        width: 150
        },
      {
        field: 'Comments',
        headerName: 'Comments',
        width: 150,
        editable: false,
      },
      {
        field: 'Status',
        headerName: 'Remarks',
        width: 200,
        editable: false,
        renderCell: (params) =>{
          let details = {};
          if(params.row.Status === 'Approved'){
             details = {
              color: 'success',
              icon: <CheckRoundedIcon/>,
              label: 'Checked'
            }
          }
          if(params.row.Status === 'Reject'){
             details = {
              color: 'error',
              icon: <ClearRoundedIcon/>,
              label: 'Rejected'
            }
          }
          if(params.row.Status === 'For_Review'){
            details = {
              color: 'warning',
              icon: <HourglassBottomRoundedIcon/>,
              label: 'For Review'
            }
          }

          return(
            <Chip label={details.label} color={details.color} variant={'filled'} icon={details.icon}/>
          )
        }
      },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 220,
        editable: false,
        renderCell:(params) =>{

          return(
            <>
            {params.row.Status !== 'Approved' ? 
            (<div className='flex gap-2'>
              <button onClick={() =>EditReq(params.row)} 
              className='myButton1'><EditIcon /></button>
              <button onClick={() =>DeleteReq(params.row)}
               className='myButton2'><ClearRoundedIcon /></button>
            </div>) :
            (
              <button onClick={() => viewFile(params.row)} 
               className='myButton'><RemoveRedEyeIcon />View</button>
            )
            }
            </>
          )
        }
      }
  
    ];
return(
  <>
  <StyledBackdrop open={showBackdrop}>
    <CircularProgress color="inherit" />
  </StyledBackdrop>
  <div>
      <TabContext value={value}>
        <Box>
          <StyledTabList onChange={handleChange} aria-label="lab API tabs example">
            <StyledTab label="Requirements List" value="1" />
            <StyledTab label="Submitted" value="2" />
          </StyledTabList>
        </Box>
        <TabPanel value="1">
          <div className='flex flex-col gap-4 w-full'>
            <div className=''>
              <h1 className='font-bold text-lg'>Requirements</h1>
              <p>Please upload the documents required below</p>
              <ul>
                <li>File format in JPEG(.jpg) and PNG are the only acceptable file for upload.</li>
                <li>A maximum of 5mb file size is allowed per attached file.</li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-4">
                {requirements}
            </div>
          <div className='flex justify-end items-end'>
              <button
                className='myButton1'
                onClick={handleSubmit}
              >
                Upload
              </button>
          </div>
          </div>
        </TabPanel>
        <TabPanel value="2">
          <div className="w-full">
            <div>
              <h1 className='text-2xl font-bold'>Requirements Submitted</h1>
            </div>
            <div className='w-full bg-white overflow-x-auto'>
            {submitted1.length > 0 ? 
            (
              <Box>
              <StyledDataGrid
              rows={submitted1}
              columns={columns}
              getRowId={(row) => row.id}
              scrollbarSize={10}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              sx={{color:'black',padding:'10px'}}
              getRowClassName={(params) => `super-app-theme--${params.row.Status}`}
              pageSizeOptions={[25]}
              disableRowSelectionOnClick
            />
            </Box>
            ) : 
            (<div className="docusibmitted">
              <div className='Nodocupost'> 
              <p>No Document Submitted</p>
              </div>
              </div>)}
            </div>
          </div>
        </TabPanel>
      </TabContext>
  </div>
  </>
)
}
export default Scholar