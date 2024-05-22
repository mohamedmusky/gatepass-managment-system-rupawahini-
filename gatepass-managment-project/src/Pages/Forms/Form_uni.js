import React, { useState,useEffect } from "react"
import { TextField, Grid, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import './Form.css';
import axios from 'axios';
import SubmitButton from "../../Components/Button/SubmitButton";
import Drawer from "../../Components/Drawer/Drawer"
import {useNavigate} from 'react-router-dom';

const useStyles = { 
    section: {
        marginTop: '5px',
        marginBottom: '10px',
    }
};

function Form() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [uniData, setUniData] = useState({
        name: '',
        address: '',
        authorizedPerson: '',
        designation: '',
        email: '',
        phoneNo: '',
        noOfmale: '',
        noOffemale: '',
        noOfothers: '',
    });

    
    const [validationErrors, setValidationErrors] = useState({});

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setUniData({
            name: '',
            address: '',
            authorizedPerson: '',
            designation: '',
            email: '',
            phoneNo: '',
            noOfmale: '',
            noOffemale: '',
            noOfothers: '',
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
            setUniData(prevuniData => ({
              ...prevuniData,
              username: username,
            }));
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);

      useEffect(() => {
        // Replace with your actual API endpoint
        const requestID = localStorage.getItem('requestID');
        const apiUrl = `http://localhost:4000/getSchoolDetails/${requestID}`; 

        axios.get(apiUrl)
          .then(response => {
            const schoolDetails = response.data;
            setUniData(prevUniData => ({
              ...prevUniData,
              ...schoolDetails,
            }));
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = {};

        if (!uniData.name.trim()) {
            errors.name = "This field is required";
        }
        if (!uniData.authorizedPerson.trim()) {
            errors.authorizedPerson = "Request person's name is required";
        }
        if (!uniData.email.trim()) {
            errors.email = "Email is required";
        } else if (!isValidEmail(uniData.email)) {
            errors.email = "Invalid email format";
        }
        if (uniData.phoneNo && typeof uniData.phoneNo === 'string' && !uniData.phoneNo.trim()) {
            errors.phoneNo = "Contact number is required";
        } else if (uniData.phoneNo && typeof uniData.phoneNo === 'string' && uniData.phoneNo.length !== 10) {
            errors.phoneNo = "Must have 10 numbers";
        }
        
        if (!uniData.noOfmale.trim()) {
            errors.noOfmale = "No of male students is required";
        }
        if (!uniData.noOffemale.trim()) {
            errors.noOffemale = "No of female students is required";
        }
        if (!uniData.noOfothers.trim()) {
            errors.noOfothers = "This field is required";
        }
        if (Object.keys(errors).length > 0){
            setValidationErrors(errors);
        } else {
            handleOpen();
        }
    };
    
    const handleConfirmSubmit = () => {
        console.log('Form submited!', uniData);
        const requestID = localStorage.getItem('requestID');
        const dataToSend = {...uniData,requestID};
        axios.put(`http://localhost:4000/updatevisitrupreqother/${uniData.username}`, dataToSend)
        .then((response) => {
            alert('Submission successful!');
            console.log(response);
            navigate('/userreq');
            handleClose();
        })
        .catch((error) => {
            console.error('Error submitting form:', error);
        });
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUniData((prevUniData) => ({
            ...prevUniData,
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
    <>
    <Drawer/>
    <div className="bg-f">
        <div className="container-f">
            <h2>University/ College/ Institute Details</h2>
            <form onSubmit={handleSubmit}>
            <TextField 
                id="name" 
                name="name"
                label="University/College/Institute Name" 
                variant="outlined"
                fullWidth
                required
                value={uniData.name}
                onChange={handleInputChange}
                error={!!validationErrors.name}
                helperText={validationErrors.name}
                style={useStyles.section}
            />
            <TextField 
                id="address" 
                name="address"
                label="Address"  
                variant="outlined"
                fullWidth
                value={uniData.address}
                onChange={handleInputChange}
                    // error={!!validationErrors.uniaddress}
                    // helperText={validationErrors.uniaddress}
                style={useStyles.section}
            />
            <TextField 
                id="authorizedPerson" 
                name="authorizedPerson"
                label="Authorized Request Person's Name"
                variant="outlined"
                fullWidth
                required
                value={uniData.authorizedPerson}
                onChange={handleInputChange}
                error={!!validationErrors.authorizedPerson}
                helperText={validationErrors.authorizedPerson}
                style={useStyles.section}
            />
            <TextField 
                id="designation" 
                name="designation"
                label="Designation"
                variant="outlined"
                fullWidth
                value={uniData.designation}
                onChange={handleInputChange}
                // error={!!validationErrors.Rqdesignation}
                // helperText={validationErrors.Rqdesignation}
                style={useStyles.section}
            />
  
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <TextField 
                        id="email" 
                        name="email"
                        label="Email" 
                        variant="outlined"
                        fullWidth
                        required
                        value={uniData.email}
                        onChange={handleInputChange}
                        error={!!validationErrors.email}
                        helperText={validationErrors.email}
                        style={useStyles.section}
                    />
              </Grid>

              <Grid item xs={12} sm={6}>
              <TextField 
                        id="phoneNo" 
                        name="phoneNo"
                        label="Contact Number" 
                        variant="outlined"
                        fullWidth
                        required
                        value={uniData.phoneNo}
                        onChange={handleInputChange}
                        error={!!validationErrors.phoneNo}
                        helperText={validationErrors.phoneNo}
                        style={useStyles.section}
                    />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <TextField 
                        id="noOfmale" 
                        name="noOfmale"
                        label="No of male Students" 
                        variant="outlined"
                        type="number"
                        fullWidth
                        required
                        value={uniData.noOfmale}
                        onChange={handleInputChange}
                        error={!!validationErrors.noOfmale}
                        helperText={validationErrors.noOfmale}
                        style={useStyles.section}
                    />
              </Grid>

              <Grid item xs={12} sm={6}>
              <TextField 
                        id="noOffemale" 
                        name="noOffemale"
                        label="No of Female Students" 
                        variant="outlined"
                        type="number"
                        fullWidth
                        required
                        value={uniData.noOffemale}
                        onChange={handleInputChange}
                        error={!!validationErrors.noOffemale}
                        helperText={validationErrors.noOffemale}
                        style={useStyles.section}
                    />
              </Grid>
            </Grid>

           <TextField 
                id="noOfothers"
                name="noOfothers"
                label="No of Other Visitors"
                variant="outlined"
                type="number"
                fullWidth
                required
                value={uniData.noOfothers}
                onChange={handleInputChange}
                error={!!validationErrors.noOfothers}
                helperText={validationErrors.noOfothers}
                style={useStyles.section}
           />

            <SubmitButton label="Submit" onClick={handleSubmit} />

            </form>

            {/* Confirmation Dialog */}
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Confirm Submission</DialogTitle>
            <DialogContent>
                <DialogContentText>
                Are you sure you want to submit the form?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                No
                </Button>
                <Button onClick={handleConfirmSubmit} color="primary" autoFocus>
                Yes
                </Button>
            </DialogActions>
            </Dialog>

        </div>
    </div>
    </>
  )
}

export default Form