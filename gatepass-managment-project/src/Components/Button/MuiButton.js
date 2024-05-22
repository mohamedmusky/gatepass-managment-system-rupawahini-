import styled from '@emotion/styled'
import React from 'react'
import { Button } from '@mui/material';

const ButtonStyle = styled(Button) ({
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

const MuiButton = ({label, type, onClick}) => {
  return (
    <ButtonStyle variant="contained" type={type} onClick={onClick}>
        {label}
    </ButtonStyle>
  );
};

export default MuiButton;