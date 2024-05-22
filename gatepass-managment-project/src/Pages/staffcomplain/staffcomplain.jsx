import React, { useState } from 'react';
import {Container,Paper,Typography,TextField,Grid} from '@mui/material';
import { styled } from '@mui/system';
import Box from '@mui/system/Box';
import MuiButton from '../../Components/Button/MuiButton';
import BasicDatePicker from '../../Components/datepicker/datepicker';
import ConfirmSubmission from '../../Components/confirmsubmission/submitconfirm';
import Drawer from '../../Components/Drawer/DrawerStaff';
import axios, { Axios } from 'axios';

const StyledContainer = styled(Container)({
    height: '100vh',
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
      marginTop: '5px',
    },
  
    sectionTitle: {
      textAlign: 'center',
      fontFamily: 'Montserrat, sans-serif',
      letterSpacing: '2px',
      fontWeight: 'bold',
      marginTop: '20px',
      marginBottom: '20px',
    },
  
    bg: {
      backgroundColor: '#D6C9CA',
    },
  };
  
function StaffComplain() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name : '',
    empID : '',
    designation:'',
    complaintDate: null,
    title:'',
    details : '',
    
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    
    setOpen(false);
    setFormData({
      name : '',
      empID : '',
      designation:'',
        complaintDate: null,
        title:'',
        details : '',
    });
    setValidationErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.empID.trim()) {
      errors.empID = 'Employee ID is required';
    }
    if (!formData.designation.trim()) {
      errors.designation = 'Designation is required';
    }
    if (!formData.complaintDate) {
      errors.complaintDate = 'Date is required';
    }
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }
    if (!formData.details.trim()) {
        errors.details = 'Details is required';
      }

   
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
    } else {
      
      handleOpen();
    }
  };

  const handleConfirmSubmit = async () => {
    console.log('Form submitted!', formData);
    try {
      const response = await axios.post(`http://localhost:4000/createcomp`, formData);
      if (response.status === 201) {
        alert('Complaint successfully created!');
      } else {
        alert('An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error.response.data);
      alert('An error occurred. Please try again.');
    }
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

  const handleDateChange = async (date) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      complaintDate: date,
    }));
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      complaintDate: '',
    }));
  };
  return (
    
    <Box>
      <Drawer/>
    
    <div style={useStyles.bg}>
    <Grid container sx={{width: '100%'}}>
    <StyledContainer maxWidth="lg">
      <StyledPaper elevation={3}>
      <Typography variant="h6" style={useStyles.sectionTitle}>Personal Details</Typography>
        <form style={useStyles.form} onSubmit={handleSubmit}>
          <Grid container spacing={2} style={useStyles.section}>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleInputChange}
                error={!!validationErrors.name}
                helperText={validationErrors.name}
              />
            </Grid>
            <Grid item xs={6}>
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
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} style={useStyles.section}>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="designation"
                label="Designation"
                name="designation"
                autoComplete="designation"
                value={formData.designation}
                onChange={handleInputChange}
                error={!!validationErrors.designation}
                helperText={validationErrors.designation}
              />
            </Grid>
            <Grid item xs={6}>
            <BasicDatePicker
                    id="complaintDate"
                    value={formData.complaintDate}
                    handleDateChange={handleDateChange}
                  />
                  {validationErrors.complaintDate && (
                    <Typography variant="caption" color="error">
                      {validationErrors.complaintDate}
                    </Typography>
                  )}
            </Grid>
          </Grid>

          <Typography variant="h6" style={useStyles.sectionTitle}>Complain</Typography>

            <Grid style={useStyles.section}>
              <TextField
                variant="outlined"
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoComplete="title"
                value={formData.title}
                onChange={handleInputChange}
                error={!!validationErrors.title}
                helperText={validationErrors.title}
              />
            </Grid>
           
            <Grid style={useStyles.section}>
              <TextField
                variant="standard"
                fullWidth
                id="details"
                label="Your complain"
                name="details"
                autoComplete="details"
                value={formData.details}
                onChange={handleInputChange}
                error={!!validationErrors.details}
                helperText={validationErrors.details}
                
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

export default StaffComplain;
