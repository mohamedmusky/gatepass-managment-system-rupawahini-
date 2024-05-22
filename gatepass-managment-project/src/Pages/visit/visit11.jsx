import React, { useState,useEffect } from 'react';
import {Container,Paper,Typography,TextField,Grid} from '@mui/material';
import { styled } from '@mui/system';
import MuiButton from '../../Components/Button/MuiButton';
import BasicDatePicker from '../../Components/datepicker/datepicker';
import ConfirmSubmission from '../../Components/confirmsubmission/submitconfirm';
import BasicTimePicker from '../../Components/timepicker/timepicker';
import Drawer from '../../Components/Drawer/Drawer';
import Box from '@mui/system/Box';
import axios, { Axios } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const StyledContainer = styled(Container)({
  height: '110vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const StyledPaper = styled(Paper)({
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const useStyles = {
  form: {
    width: '100%', 
  },

  section: {
    marginBottom: '16px',
    marginTop:'5px',
  
  },

  sectionTitle: {
    textAlign: 'center', 
    fontFamily: 'Montserrat, sans-serif',
    letterSpacing: '2px',
    fontWeight: 'bold',
    marginTop: '10px'  ,
    marginBottom:'10px'
  },

  bg:{
    backgroundColor: '#D6C9CA',
  }
};

function Visit11() {
  const location = useLocation();
  const requestToEdit = location.state;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    _id: requestToEdit ? requestToEdit._id : '',
    requesterName : requestToEdit ? requestToEdit.requesterName : '',
    requesteremail : requestToEdit ? requestToEdit.requesteremail : '',
    requesterNIC : requestToEdit ? requestToEdit.requesterNIC : '',
    requesterPhoneno : requestToEdit ? requestToEdit.requesterPhoneno : '',
    officerName : requestToEdit ? requestToEdit.officerName : '',
    appoinmentReason : requestToEdit ? requestToEdit.appoinmentReason : '',
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      requesterName : '',
      requesteremail : '',
      requesterNIC : '',
      requesterPhoneno : '',
      officerName : '',
      appoinmentReason : '',
    });
    setValidationErrors({});
  };

  useEffect(() => {
    // Replace with your actual API endpoint
    if (requestToEdit) return;
    const apiUrl = 'http://localhost:4000/userdataheader'; 
  
    // Get the token from local storage
    const token = localStorage.getItem('myAppToken');
  
    axios.post(apiUrl, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        
        const username = response.data.data.username;
        setFormData(prevFormData => ({
          ...prevFormData,
          username: username,
        }));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.requesterName.trim()) {
      errors.requesterName = 'Full name is required';
    }
    if (!formData.requesteremail.trim()) {
      errors.requesteremail = 'Email is required';
    } else if (!isValidEmail(formData.requesteremail)) {
      errors.requesteremail = 'Invalid email format';
    }
    if (!formData.requesterNIC.trim()) {
      errors.requesterNIC = 'NIC is required';
    }
    if (!formData.requesterPhoneno.trim()) {
      errors.requesterPhoneno = 'Contact number is required';
    } else if (!/^\d{10}$/.test(formData.requesterPhoneno)) {
      errors.requesterPhoneno = 'Contact number must be 10 digits long';
    }
    if (!formData.officerName.trim()) {
      errors.officerName = 'Full name is required';
    }
    if (!formData.appoinmentDate) {
      errors.appoinmentDate = 'Date is required';
    }
    if (!formData.appoinmentTime) {
      errors.appoinmentTime = 'Time is required';
    }
    if (!formData.appoinmentReason.trim()) {
      errors.appoinmentReason = 'Reason is required';
    }

  
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
    } else {
      
      handleOpen();
    }
  };

  const handleConfirmSubmit = () => {
    console.log('Form submitted!', formData);
    axios.put(`http://localhost:4000/updateappointment`, formData)
    .then(response => { 
        console.log('response', response.data);
        alert('Appointment request submitted successfully!');
        navigate('/userreq');
        
    })
    .catch(error => {
        console.error('Error submitting data:', error);
        alert('An error occurred. Please try again later.');
    });
    handleClose();
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
  const handleDateChange = (date) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      appoinmentDate: date,
    }));
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      appoinmentDate: '',
    }));
  };
  const handleTimeChange = (time) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      appoinmentTime: time,
    }));
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      appoinmentTime: '',
    }));
    
  };

  
  const isValidEmail = (requesteremail) => {
    // email validation 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(requesteremail);
  };

  return (

    <Box>
      <Drawer/>
    
    <div style={useStyles.bg}>
    <Grid container sx={{width: '100%'}}>
    <StyledContainer maxWidth="lg">
      <StyledPaper elevation={3}>
      <Typography variant="h6" style={useStyles.sectionTitle}>Visitor Details</Typography>
        <form style={useStyles.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                id="requesterName"
                label="Full name"
                name="requesterName"
                autoComplete="requesterName"
                value={formData.requesterName}
                onChange={handleInputChange}
                error={!!validationErrors.requesterName}
                helperText={validationErrors.requesterName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                id="requesteremail"
                label="Email Address"
                name="requesteremail"
                autoComplete="requesteremail"
                value={formData.requesteremail}
                onChange={handleInputChange}
                error={!!validationErrors.requesteremail}
                helperText={validationErrors.requesteremail}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} style={useStyles.section}>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                id="requesterNIC"
                label="NIC"
                name="requesterNIC"
                autoComplete="requesterNIC"
                value={formData.requesterNIC}
                onChange={handleInputChange}
                error={!!validationErrors.requesterNIC}
                helperText={validationErrors.requesterNIC}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                id="requesterPhoneno"
                label="Phone number"
                name="requesterPhoneno"
                autoComplete="requesterPhoneno"
                value={formData.requesterPhoneno}
                onChange={handleInputChange}
                error={!!validationErrors.requesterPhoneno}
                helperText={validationErrors.requesterPhoneno}
              />
            </Grid>
          </Grid>

          <Typography variant="h6" style={useStyles.sectionTitle}>Appointment Request</Typography>

            <Grid>
              <TextField
                fullWidth
                variant="outlined"
                id="officerName"
                label="Full name"
                name="officerName"
                autoComplete="officerName"
                value={formData.officerName}
                onChange={handleInputChange}
                error={!!validationErrors.officerName}
                helperText={validationErrors.officerName}
              />
            </Grid>
            <Grid container spacing={2} style={useStyles.section}>
                <Grid item xs={6}>
                  <BasicDatePicker
                    id="appoinmentDate"
                    value={formData.appoinmentDate}
                    handleDateChange={handleDateChange}
                  />
                  {validationErrors.appoinmentDate && (
                    <Typography variant="caption" color="error">
                      {validationErrors.appoinmentDate}
                    </Typography>
                  )}
                </Grid>
  
                <Grid item xs={6}>
                <BasicTimePicker
                    id="appoinmentTime"
                    label="Appointment Time"
                    value={formData.appoinmentTime}
                    handleTimeChange={handleTimeChange}
                />
                {validationErrors.appoinmentTime && (
                    <Typography variant="caption" color="error">
                      {validationErrors.appoinmentTime}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            <Grid style={useStyles.section}>
              <TextField
                variant="standard"
                fullWidth
                id="appoinmentReason"
                label="Reason"
                name="appoinmentReason"
                autoComplete="appoinmentReason"
                value={formData.appoinmentReason}
                onChange={handleInputChange}
                error={!!validationErrors.appoinmentReason}
                helperText={validationErrors.appoinmentReason}
                
              />
            </Grid>
        

          <Grid style={{ display: 'flex', justifyContent: 'center' }}>
        <MuiButton label="Submit" onClick={handleSubmit} /> 
        </Grid>
        
        </form>
      </StyledPaper>

      {/* Confirmation Dialog */}
      <ConfirmSubmission open={open} handleClose={handleClose} handleConfirmSubmit={handleConfirmSubmit} />
    </StyledContainer>
    </Grid>
    </div>

    </Box>
  );
}

export default Visit11;
