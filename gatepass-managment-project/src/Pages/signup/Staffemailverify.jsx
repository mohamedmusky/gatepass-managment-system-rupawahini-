import React, { useState } from 'react';
import { Button, TextField, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Staffemailverify() {
  const navigate = useNavigate();

  const [code, setCode] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [email, setEmail] = useState('');


  const handleInputChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!code.trim()) {
      errors.code = 'Verification code is required';
    }
    if (!email.trim()) {
      errors.email = 'Email is required';
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(`http://localhost:4000/verify-email-staff`, { email, verificationToken: code });


        if (response.status===200) {
          alert('Email verified successfully!');
          setCode('');
          navigate('/stafflogin');
        } else {
          alert(`An error occurred. Please try again1.:${response.data.message}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert(`An error occurred. Please try again2.:${error.message}`);
      }
    }
  };

  return (
    <div style={{ backgroundColor: '#D6C9CA',height:'102vh' }}>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="h5">Enter Verification Code</Typography>
        </Grid>
        <Grid item>
          <TextField
            label="Verification Code"
            variant="outlined"
            value={code}
            onChange={handleInputChange}
            error={!!validationErrors.code}
            helperText={validationErrors.code}
          />
        </Grid>
        <Grid item>
  <TextField
    label="Email"
    variant="outlined"
    value={email}
    onChange={(event) => setEmail(event.target.value)}
    error={!!validationErrors.email}
    helperText={validationErrors.email}
  />
</Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ 
            color: '#FFFFFF', 
            backgroundColor:'#973535',
            transition: 'transform 0.3s',
            '&:hover': {
              color: '#EEC01F !important',
              transform: 'scale(1.08)',
              backgroundColor: '#973535',
            },
          }}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Staffemailverify;
