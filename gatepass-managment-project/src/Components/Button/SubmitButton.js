import styled from '@emotion/styled'
import React from 'react'
import { Button } from '@mui/material';

const ButtonStyle = styled(Button) ({
  backgroundColor: '#973535',
  borderRadius: '66px',
  fontFamily: 'Montserrat, sans-serif',
  letterSpacing:'2px',
  width: '150px',
  height: '50px',
  marginTop: '2%',
  fontSize: '15px',
  transition:'transform 0.3s',
  '&:hover' : {
    backgroundColor: '#973535',
    color:'#EEC01F',
    transform:'scale(1.08)'
  },
});

const MuiButton = ({label, onClick}) => {
  return (
    <ButtonStyle variant="contained" onClick={onClick}>
        {label}
    </ButtonStyle>
  );
};

export default MuiButton;