import React, { useState } from 'react';
import {Container,Paper,Grid,Typography,InputLabel,FormControl,TextField,Select,MenuItem} from '@mui/material';
import { styled } from '@mui/system';
import RightSideImage from '../../Assets/signupimage/rafiki.png';
import MuiButton from '../../Components/Button/MuiButton';
import ConfirmSubmission from '../../Components/confirmsubmission/submitconfirm';
import Box from '@mui/system/Box';
import axios, { Axios } from 'axios';
import { useNavigate } from 'react-router-dom';

const StyledContainer = styled(Container)({
  height: '110vh',
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
  bgimg: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    maxWidth: '100%',
    height: 'auto',
  },
};

function Staffsignup() {
  const navigate = useNavigate();

  const hanclestafffsignupClick = () => {
    console.log('Form submitted!', formData);
    axios.post(`http://localhost:4000/signupstaff`, formData)
      .then(response => {
        console.log('Response:', response.data);
        if (response.data.error) {
          alert(response.data.error);
        } else {
          if (response.status === 201) {
            alert('Staff registered successfully!');
            handleClose();
            navigate('/staffemailverify',{ state: { email: formData.email } });
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
    empID: '',
    division: '',
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
      empID: '',
      division: '',
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
      errors.username = 'Full name is required';
    }
    if (!formData.empID.trim()) {
      errors.empID = 'Employee ID is required';
    }
    if (!formData.division.trim()) {
      errors.division = 'Division is required';
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
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" style={useStyles.sectionTitle}>
                  Create Account
                </Typography>

                <TextField
                  variant="outlined"
                  fullWidth
                  id="username"
                  label="Full Name without initials"
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
                  id="empID"
                  label="Employee ID"
                  name="empID"
                  autoComplete="empID"
                  value={formData.empID}
                  onChange={handleInputChange}
                  error={!!validationErrors.empID}
                  helperText={validationErrors.empID}
                  style={useStyles.section}
                />

                <FormControl fullWidth>
                  <InputLabel id="Division">Division</InputLabel>
                  <Select
                    labelId="Division"
                    id="division"
                    name="division"
                    autoComplete="division"
                    label="Division"
                    value={formData.division}
                    onChange={handleInputChange}
                    style={useStyles.section}
                  >
                    <MenuItem value="division1">Division 1</MenuItem>
                    <MenuItem value="division2">Division 2</MenuItem>
                    <MenuItem value="division3">Division 3</MenuItem>
                    <MenuItem value="division4">Division 4</MenuItem>
                    <MenuItem value="division5">Division 5</MenuItem>
                    <MenuItem value="division6">Division 6</MenuItem>
                  </Select>
                  {validationErrors.division && (
                    <Typography variant="caption" color="error">
                      {validationErrors.division}
                    </Typography>
                  )}
                </FormControl>

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
                <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
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
                    </Grid>

                <Grid item xs={12} sm={6}>
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
                </Grid>
          </Grid>
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
          
          </form>

          {/* Confirmation Dialog */}
          <ConfirmSubmission open={open} handleClose={handleClose} handleConfirmSubmit={hanclestafffsignupClick}  />
        </StyledPaper>
      </StyledContainer>
      </Grid>
    </div>
    </Box>

    
  );
}

export default Staffsignup;
