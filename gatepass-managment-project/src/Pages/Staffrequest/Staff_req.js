import React, { useState } from 'react'
import { FormControl, Grid, InputLabel, Select, MenuItem, TextField, styled, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import image from '../../Assets/Images/staff.jpg';
import { SubmitButton } from '../../Components/MuiButton/SubmitButton';
// import axios from 'axios'
import Drawer from "../../Components/Drawer/DrawerStaff";


const BackgroundImg = styled('div') ({
    backgroundImage: `url(${image})`,
    display: 'flex',
    backgroundSize: 'cover',
    backgroundPosition: 'fixed',
    height: '100%',
    overflow: 'hidden',
    justifyContent: 'center',
    fontFamily: '"Roboto", sans-serif',
});

const ContainerForm = styled('div') ({
    display: 'flex',
    flexDirection: 'column',
    margin: '50px',
    padding: '5%',
    backgroundColor: '#fff',
    width: '700px',
    height: 'auto',
    alignItems: 'center',
    border: '2px solid',
});

const Styles = {
    form: {
        width: '100%',
    },

    section: {
        marginTop: '5px',
        marginBottom: '10px'
    }
}

function Staff_req() {
    const [reason, setReason] = useState('');

    const handleChange = (event) => {
        setReason(event.target.value);
    };

    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        Sname: '',
        Sdesig: '',
        Sid: '',
        Sdate:'',
        timeOut:'',
        timeIn:''
    });

    const [errors, setErrors] = useState({});

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData({
            Sname: '',
            Sdesig: '',
            Sid: '',
            Sdate:'',
            timeOut:'',
            timeIn:''
        });
        setErrors({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const er = {};

        if (!formData.Sname.trim()) {
            er.Sname = "Name is required";
        }
        if (!formData.Sdesig.trim()) {
            er.Sdesig = "Designation is required";
        }
        if (!formData.Sid.trim()) {
            er.Sid = "This field is required";
        }
        if (!formData.timeOut.trim()) {
            er.timeOut = "Out time is required";
        }
        if (!formData.timeIn.trim()) {
            er.timeIn = "In time is required";
        }
        if (Object.keys(er).length > 0 ) {
            setErrors(er);
        } else {
            handleOpen();
        }
    };

    const handleConfirmSubmit = () => {
        console.log('Form submited!', formData);
        // const response =  axios.post`(http://localhost:4000/api/reservation/filter,formData )`;
        handleClose();
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };


  return (
    <>
    <Drawer/>
    <BackgroundImg>
     <ContainerForm>
        <form onSubmit={handleSubmit} style={Styles.form}>
          <Grid container spacing={2}>
            <h2>Personal Details</h2>

            <TextField
                id='Sname'
                name='Sname'
                label='Name'
                fullWidth
                value={formData.Sname}
                onChange={handleInputChange}
                error={!!errors.Sname}
                helperText={errors.Sname}
                style={Styles.section}
            />

            <Grid container spacing={2}>
             <Grid item xs={12} sm={6}>
                <TextField
                    id='Sdesig'
                    name='Sdesig'
                    label='Designation'
                    fullWidth
                    value={formData.Sdesig}
                    onChange={handleInputChange}
                    error={!!errors.Sdesig}
                    helperText={errors.Sdesig}
                    style={Styles.section}
                />
             </Grid>
             <Grid item xs={12} sm={6}>
                <TextField
                    id='Sid'
                    name='Sid'
                    label='Service No'
                    fullWidth
                    value={formData.Sid}
                    onChange={handleInputChange}
                    error={!!errors.Sid}
                    helperText={errors.Sid}
                    style={Styles.section}
                />
             </Grid>
            </Grid>

            <TextField
                id='Sdate'
                name='Sdate'
                label='Date'
                type='date'
                focused
                value={formData.Sdate}
                onChange={handleInputChange}
                style={Styles.section}
            />

          </Grid>

         <Grid container spacing={2} marginTop={'1%'}>
            <h2>Request Details</h2>

            
            <FormControl fullWidth>
                <InputLabel id='reason-select-label'>Reason</InputLabel>
                <Select
                    labelId='reason-select-label' 
                    id='reason-select'
                    value={reason}
                    label='reason'
                    onChange={handleChange}
                    style={Styles.section}
                >
                    <MenuItem value={1}>Short Leave</MenuItem>
                    <MenuItem value={2}>Half Day</MenuItem>
                    <MenuItem value={3}>Other...(Specity)</MenuItem>
                </Select>
            </FormControl>

            <Grid container spacing={2}>
             <Grid item xm={12} sm={6}>
                <TextField
                    id='timeOut'
                    name='timeOut'
                    label='Time Out'
                    type='time'
                    fullWidth
                    focused
                    value={formData.timeOut}
                    onChange={handleInputChange}
                    error={!!errors.timeOut}
                    helperText={errors.timeOut}
                    style={Styles.section}

                />
             </Grid>
             <Grid item xm={12} sm={6}>
                <TextField
                    id='timeIn'
                    name='timeIn'
                    label='Time In'
                    type='time'
                    fullWidth
                    focused
                    value={formData.timeIn}
                    onChange={handleInputChange}
                    error={!!errors.timeIn}
                    helperText={errors.timeIn}
                    style={Styles.section}
                    
                />
             </Grid>
            </Grid>

            <TextField
                id='details'
                name='details'
                label='Extra Details'
                variant='standard'
                style={Styles.section}
                fullWidth
            />
            
         </Grid>

         <SubmitButton label="Submit" onClick={handleSubmit}/>
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

     </ContainerForm>
    </BackgroundImg>
    </>
    
  );
};

export default Staff_req;
