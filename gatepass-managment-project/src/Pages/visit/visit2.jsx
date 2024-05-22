import React, { useState, useEffect } from 'react';
import {Container,Paper,Typography,TextField,Grid,Radio,FormControlLabel,RadioGroup,FormLabel} from '@mui/material';
import { styled } from '@mui/system';
import MuiButton from '../../Components/Button/MuiButton';
import BasicDatePicker from '../../Components/datepicker/datepicker';
import ConfirmSubmission from '../../Components/confirmsubmission/submitconfirm';
import Drawer from '../../Components/Drawer/Drawer';
import Box from '@mui/system/Box';
import dayjs from 'dayjs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StyledContainer = styled(Container)({
    height: '110vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  });
  
  const StyledPaper = styled(Paper)({
    padding: '4%',
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
    },
  
    bg: {
      backgroundColor: '#D6C9CA',
    },
  };
  
  function Visit2() {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
      category: '',
      timeslot: '',
      note: '',
    });
    const [bookedTimeSlots, setBookedTimeSlots] = useState();
    const [validationErrors, setValidationErrors] = useState({});
    const [data,setData] = useState([]);

    const navigate = useNavigate();

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setFormData({
        category: '',
        timeslot: '',
        note: '',
      });
      setValidationErrors({});
    };

    useEffect(() => {
      // Replace with your actual API endpoint
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
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const errors = {};
      if (!formData.category.trim()) {
        errors.category = 'Please select a category';
      }
      if (!formData.timeslot.trim()) {
        errors.timeslot = 'Please select a time slot';
      }
      if (!formData.dateofArrival) {
        errors.dateofArrival = 'Date is required';
      }
    
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
      } else {
        const requestID=`${formData.category}-${formData.username}-${formData.dateofArrival}-${formData.timeslot}`;
        localStorage.setItem('requestID',requestID);
    
        // Check for booking conflict
        try {
          const response = await axios.post('http://localhost:4000/visitrupavahini/checkbooking', {
            dateofArrival: formData.dateofArrival,
            timeslot: formData.timeslot
          });
    
          if (response.data.bookingConflict) {
            // If there is a booking conflict, display the message from the server and stop the form submission
            alert(response.data.message);
            handleOpen();
          } else {
            // If there is no booking conflict, display the confirmation dialog
            if (window.confirm(response.data.message + " ,"+'Are you sure you want to submit?')) {
              handleOpen();
            }
          }
        } catch (error) {
          console.error('Error:', error.response.data);
          alert('An error occurred. Please try again.');
        }
      }
    };
    
    const handleConfirmSubmit = () => {
      console.log('Form submitted!', formData);
      const requestID = localStorage.getItem('requestID');
      const dataToSend = {...formData,requestID};
      axios.post(`http://localhost:4000/createvisitrupreq/${formData.username}`, dataToSend)
      .then(response => {
        console.log('Response:', response.data);
        if (formData.category === 'school') {
          navigate('/formschools');
        } else {
          navigate('/formsuni');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
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
  
    const handleDateChange = async (date) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        dateofArrival: date,
      }));
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        dateofArrival: '',
      }));
      fetchVisitDate(date);
    };
    const fetchVisitDate = async (date) => {

      const dateofArrival  = dayjs(date).format('YYYY-MM-DD');
  
      try {
        const response = await axios.get(
         // http://localhost:4000/api//filter/${formattedDate}
        );
        console.log("Response Data:", response.data);
        const responseData = response.data;
  
        // If responseData is an array of objects
        const visitDay = responseData.map((Timeslot, index) => (
          <div key={index} style={{}}>
            <p>Booked Time Slots : {Timeslot.timeslot}</p>
          </div>
        ));
  
        
        setBookedTimeSlots(visitDay);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    //load data from database 
  
    useEffect(()=>{
      const apiUrl ='http://localhost:4000/api//filter/2023-01-31'; //  actual endpoint

      axios.get(apiUrl)
        .then(response => {
          // Handle the data received from the backend
          setData(response.data);
        })
        .catch(error => {
          
          console.error('Error fetching data:', error);
        });
    },[]);
  
  
    return (
      <Box>
      <Drawer/>
    
    <div style={useStyles.bg}>
    <Grid container sx={{width: '100%'}}>
        <StyledContainer component="main" maxWidth="lg">
          <StyledPaper elevation={3}>
            <form style={useStyles.form} onSubmit={handleSubmit}>
              <Grid>
                <FormLabel id="category">Category</FormLabel>
                {validationErrors.category && (
                  <Typography variant="caption" color="error">
                    {validationErrors.category}
                  </Typography>
                )}
                <RadioGroup
                  row
                  aria-labelledby="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <FormControlLabel value="school" control={<Radio />} label="School" />
                  <FormControlLabel value="university" control={<Radio />} label="University" />
                  <FormControlLabel value="technical_college " control={<Radio />} label="Technical college" />
                  <FormControlLabel value="other_institute " control={<Radio />} label="Other institute" />
                </RadioGroup>
              </Grid>
  
              <Grid container spacing={2} style={useStyles.section}>
                <Grid item xs={8}>
                  <BasicDatePicker
                    id="dateofArrival"
                    value={formData.dateofArrival}
                    handleDateChange={handleDateChange}
                  />
                  {validationErrors.dateofArrival && (
                    <Typography variant="caption" color="error">
                      {validationErrors.dateofArrival}
                    </Typography>
                  )}
                </Grid>
                    
                <Grid item xs={10}>
                <FormLabel id="timeslot">Time Slots</FormLabel>
                  {validationErrors.timeslot && (
                    <Typography variant="caption" color="error">
                      {validationErrors.timeslot}
                    </Typography>
                  )}
                   <RadioGroup
                        aria-labelledby="timeslot"
                        name="timeslot"
                        value={formData.timeslot}
                        onChange={handleInputChange}
                    >
                      <FormControlLabel value="9.00-10.30" control={<Radio />} label="9.00 AM - 10.30 AM" />
                      <FormControlLabel value="11.00-12.30" control={<Radio />} label="11.00 AM - 12.30 PM" />
                      <FormControlLabel value="1.00-2.30" control={<Radio />} label="1.00 PM - 2.30 PM" />
                      <FormControlLabel value="3.00-4.30" control={<Radio />} label="3.00 PM - 4.30 PM" />
                  </RadioGroup>
                </Grid>
                <Grid><Typography variant="body2">{bookedTimeSlots}</Typography></Grid>
              </Grid>
  
              <Typography variant="body2">If all time slots are booked, you can request any time period from here</Typography>
  
              <Grid container spacing={2} style={useStyles.section}>
                <Grid item xs={8}>
                  <TextField
                    variant="standard"
                    fullWidth
                    id="note"
                    label="Note"
                    name="note"
                    autoComplete="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    style={useStyles.section}
                  />
                </Grid>
              </Grid>
  
              <MuiButton label="Next" onClick={handleSubmit} />
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
  
  export default Visit2;