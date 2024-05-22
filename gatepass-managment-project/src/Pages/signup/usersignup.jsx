import React, { useState } from 'react';
import { Grid, Typography, TextField, Container, Paper } from '@mui/material';
import { styled } from '@mui/system';
import RightSideImage from '../../Assets/signupimage/rafiki.png';
import MuiButton from '../../Components/Button/MuiButton';
import ConfirmSubmission from '../../Components/confirmsubmission/submitconfirm';

import Box from '@mui/system/Box';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const StyledContainer = styled(Container)({
  minHeight: '110vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const StyledPaper = styled(Paper)({
  padding: '30px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const useStyles = {
  form: {
    width: '100%',
  },
  section: {
    marginBottom: '10px',
    marginTop: '5px',
  },
  sectionTitle: {
    textAlign: 'center',
    fontFamily: 'Montserrat, sans-serif',
    letterSpacing: '2px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  r_image: {
    maxWidth: '100%',
    height: 'auto',
  },
  bg: {
    backgroundColor: '#D6C9CA',
  },
};

function User() {
  const navigate = useNavigate();

  const hanclesignupClick = () => {
    console.log('Form submitted!', formData);
    axios.post(`http://localhost:4000/signupuser`, formData)
      .then(response => {
        console.log('Response:', response.data);
        if (response.data.error) {
          alert(response.data.error);
        } else {
          if (response.status === 201) {
            alert('User registered successfully!');
            handleClose();
            navigate('/useremailverify',{ state: { email: formData.email } });
          } else {
            alert(`An error occurred. Please try again1.:${response.data.message}`);
          }
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert(`An error occurred. Please try again.:${error.message}`);
      });
};

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    email: '',
    contactNo: '',
    password: '',
    confirmpwd: '',
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      username: '',
      fullname: '',
      email: '',
      contactNo: '',
      password: '',
      confirmpwd: '',
    });
    setValidationErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.username.trim()) {
      errors.username = 'User name is required';
    }
    if (!formData.fullname.trim()) {
      errors.fullname = 'Full name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Invalid email format';
    }
    if (!formData.contactNo.trim()) {
      errors.contactNo = 'Contact number is required';
    } else if (!/^\d{10}$/.test(formData.contactNo)) {
      errors.contactNo = 'Contact number must be 10 digits long';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(formData.password)) {
      errors.password = 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 6 characters long';
    }
    if (formData.password !== formData.confirmpwd) {
      errors.confirmpwd = 'Passwords must match';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
    } else {
        handleOpen();
   
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Box>
     
    
    <div style={useStyles.bg}>
    <Grid container sx={{width: '100%'}}>
        <StyledContainer maxWidth="lg">
          <StyledPaper elevation={3}>
            <form style={useStyles.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={10} sm={6}>
                  <Typography variant="h6" style={useStyles.sectionTitle}>
                    Create Account
                  </Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="username"
                    label="User Name"
                    name="username"
                    autoComplete="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    error={!!validationErrors.username}
                    helperText={validationErrors.username}
                    style={useStyles.section}
                  />
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="fullname"
                    label="Full Name"
                    name="fullname"
                    autoComplete="fullname"
                    value={formData.fullname}
                    onChange={handleInputChange}
                    error={!!validationErrors.fullname}
                    helperText={validationErrors.fullname}
                    style={useStyles.section}
                  />
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={!!validationErrors.email}
                    helperText={validationErrors.email}
                    style={useStyles.section}
                  />
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="contactNo"
                    label="Contact number"
                    name="contactNo"
                    autoComplete="contactNo"
                    value={formData.contactNo}
                    onChange={handleInputChange}
                    error={!!validationErrors.contactNo}
                    helperText={validationErrors.contactNo}
                    style={useStyles.section}
                  />
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleInputChange}
                    error={!!validationErrors.password}
                    helperText={validationErrors.password}
                    style={useStyles.section}
                  />
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="confirmpwd"
                    label="Confirm Password"
                    name="confirmpwd"
                    type="password"
                    autoComplete="new-password"
                    value={formData.confirmpwd}
                    onChange={handleInputChange}
                    error={!!validationErrors.confirmpwd}
                    helperText={validationErrors.confirmpwd}
                    style={useStyles.section}
                  />
                  <Grid style={{ display: 'flex', justifyContent: 'center' }}>
                    <MuiButton label="Sign Up" onClick={handleSubmit} />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} display={{ xs: 'none', sm: 'block' }}>
                <Box sx={{display: 'flex',justifyContent: 'center',alignItems: 'center',height: '100%',}}>
                  <img src={RightSideImage} alt="signup" style={useStyles.r_image} />
                </Box>
              </Grid>
              </Grid>

              {/* Confirmation Dialog */}
              <ConfirmSubmission open={open} handleClose={handleClose} handleConfirmSubmit={hanclesignupClick} />
            </form>
          </StyledPaper>
        </StyledContainer>
        </Grid>
      </div>
      </Box>
  );
}

export default User;
