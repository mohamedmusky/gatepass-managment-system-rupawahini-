import React, { useState,useEffect } from "react"
import { TextField, Grid, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import './Form.css';
import SubmitButton from "../../Components/Button/SubmitButton";
 import axios from 'axios';
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
    const [formData, setFormData] = useState({
        name: '',
        grade: '',
        address: '',
        authorizedPerson: '',
        designation: '',
        email: '',
        phoneNo: '',
        noOfmale: '',
        noOffemale: '',
        noOfteachers: '',
        noOfparents: '',
    });

    const [validationErrors, setValidationErrors] = useState({});

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData({
            name: '',
            grade: '',
            address: '',
            authorizedPerson: '',
            designation: '',
            email: '',
            phoneNo: '',
            noOfmale: '',
            noOffemale: '',
            noOfteachers: '',
            noOfparents: '',
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

      useEffect(() => {
        // Replace with your actual API endpoint
        const requestID = localStorage.getItem('requestID');
        const apiUrl = `http://localhost:4000/getSchoolDetails/${requestID}`; 
      
        axios.get(apiUrl)
          .then(response => {
            const schoolDetails = response.data;
            setFormData(prevFormData => ({
              ...prevFormData,
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

        if (!formData.name.trim()) {
            errors.name = "School Name is required";
        }
        if (!formData.grade.trim()) {
            errors.grade = "Grade is required";
        } else if (!/^\d+$/.test(formData.grade.trim())) {
            errors.grade = "Grade must contain only numeric digits";
        }
        if (!formData.authorizedPerson.trim()) {
            errors.authorizedPerson = "Request person's name is required";
        }
        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!isValidEmail(formData.email)) {
            errors.email = "Invalid email format";
        }
        if (formData.phoneNo && typeof formData.phoneNo === 'string' && !formData.phoneNo.trim()) {
            errors.phoneNo = "Contact number is required";
        } else if (formData.phoneNo && typeof formData.phoneNo === 'string' && !/^\d+$/.test(formData.phoneNo.trim())) {
            errors.phoneNo = "Contact number must only have numeric digits"
        } else if (formData.phoneNo && typeof formData.phoneNo === 'string' && formData.phoneNo.length !== 10) {
            errors.phoneNo = "Must have 10 numbers";
        }
        if (!formData.noOfmale.trim()) {
            errors.noOfmale = "No of male students is required";
        }
        if (!formData.noOffemale.trim()) {
            errors.noOffemale = "No of female students is required";
        }
        if (!formData.noOfteachers.trim()) {
            errors.noOfteachers = "No of teachers is required";
        }
        if (!formData.noOfparents.trim()) {
            errors.noOfparents = "No of parents is required";
        }
        if (Object.keys(errors).length > 0){
            setValidationErrors(errors);
        } else {
            handleOpen();
        }
    };

    const handleConfirmSubmit = () => {
        console.log('Form submitted!', formData);
        const requestID = localStorage.getItem('requestID');
        const dataToSend = {...formData,requestID};
        axios.put(`http://localhost:4000/updatevisitrupreqschool/${formData.username}`, dataToSend)
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
    <>
    <Drawer/>
    
    <div className="bg-f">
        <div className="container-f">
            <h2>School Details</h2>
            <form onSubmit={handleSubmit}>
                <TextField 
                    id="name" 
                    name="name"
                    label="School Name" 
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    error={!!validationErrors.name}
                    helperText={validationErrors.name}
                    style={useStyles.section}
                />

                <TextField 
                    id="grade" 
                    name="grade"
                    label="Grade" 
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.grade}
                    onChange={handleInputChange}
                    error={!!validationErrors.grade}
                    helperText={validationErrors.grade}
                    style={useStyles.section}
                />

                <TextField 
                    id="address" 
                    name="address"
                    label="Address" 
                    variant="outlined"
                    fullWidth
                    value={formData.address}
                    onChange={handleInputChange}
                    // error={!!validationErrors.address}
                    // helperText={validationErrors.address}
                    style={useStyles.section}
                />

                <TextField 
                    id="authorizedPerson" 
                    name="authorizedPerson"
                    label="Authorized Request Person's Name" 
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.authorizedPerson}
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
                    value={formData.designation}
                    onChange={handleInputChange}
                    // error={!!validationErrors.designation}
                    // helperText={validationErrors.designation}
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
                        value={formData.email}
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
                        value={formData.phoneNo}
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
                        value={formData.noOfmale}
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
                        value={formData.noOffemale}
                        onChange={handleInputChange}
                        error={!!validationErrors.noOffemale}
                        helperText={validationErrors.noOffemale}
                        style={useStyles.section}
                    />
                  </Grid>  
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                        id="noOfteachers" 
                        name="noOfteachers"
                        label="No of Teachers" 
                        variant="outlined"
                        type="number"
                        fullWidth
                        required
                        value={formData.noOfteachers}
                        onChange={handleInputChange}
                        error={!!validationErrors.noOfteachers}
                        helperText={validationErrors.noOfteachers}
                        style={useStyles.section}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField 
                        id="noOfparents" 
                        name="noOfparents"
                        label="No of Parents" 
                        variant="outlined"
                        type="number"
                        fullWidth
                        required
                        value={formData.noOfparents}
                        onChange={handleInputChange}
                        error={!!validationErrors.noOfparents}
                        helperText={validationErrors.noOfparents}
                        style={useStyles.section}
                    />
                  </Grid> 
                </Grid>

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