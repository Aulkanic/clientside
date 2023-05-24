import React from 'react'
import Button from '@mui/material/Button';
const button = () => {
  return (
    <div><Button variant="contained" component="label" sx={{background:"blue", width: 230}}>
    <input name='documents' accept="image/*" multiple type="file"  />
  </Button></div>
  )
}

export default button
