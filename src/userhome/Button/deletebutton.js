import React from 'react'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const deletebutton = () => {
  return (
<Button variant="outlined" startIcon={<DeleteIcon />} sx={{background:"red", color:'white'}}>
    Delete
  </Button>
  )
}

export default deletebutton
