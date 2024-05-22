import React from 'react'
import { Button, styled } from '@mui/material'

const StyleButton = styled(Button) ({
  backgroundColor: '#973535',
  borderRadius: '40px',
  width: '150px',
  height: '50px',
  marginTop: '10%',
  fontSize: '20px',
  transition:'transform 0.3s',
  '&:hover' : {
    backgroundColor: '#973535',
    color:'#EEC01F',
    transform:'scale(1.08)'
  },
});

export const SubmitButton = ({label, onClick}) => {
  return (
    
    <StyleButton variant='contained' onClick={onClick}>
        {label}
    </StyleButton>
  )
}
