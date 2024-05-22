import {useState} from "react";
import { IconButton, InputAdornment, Grid, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import im4 from '../../Assets/im4.jpg';
import MuiButton from "../../Components/Button/MuiButton";
import axios from 'axios';
import { useNavigate } from "react-router-dom";



function Change_Pwd(){
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const { id, token } = useParams(); // Get the id and token from the URL
  const navigate = useNavigate();
  const handleClickDownPassword = (event) =>{
    event.preventDefault();
  };

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
      password: '',
      confirmpassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
        password: '',
        confirmpassword: ''
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Errors = {};

    if (!formData.password.trim()) {
      Errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      Errors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmpassword) {
      Errors.confirmpassword = 'Passwords must match';
    }

    if (Object.keys(Errors).length > 0) {
      setErrors(Errors);
    } else {
      // Make a POST request to the /reset-password/:id/:token endpoint
      try {
        const response = await axios.post(`http://localhost:4000/reset-password/${id}/${token}`, { password: formData.password, confirmpassword: formData.confirmpassword });

        // Check if the request was successful
        if (response.data.status === "Password Updated") {
          handleOpen();
          alert('Password Updated successfully!');
          navigate('/userlogin');
        } else {
          // Handle error
          console.error(response.data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

    return(
    <div className='bg-pw'>
    <div className='container-pw'>

      <div className="left-side-pw"> 
        <h1 className='para-h1'>Change Password</h1>
        
        <form onSubmit={handleSubmit}>
        <Grid style={{textAlign: 'center'}}>
            <TextField
              id='password'
              name='password'
              label='Enter New Password'
              fullWidth
              style={{marginBottom: '10%'}}
              type={showPassword1 ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='password visibility'
                      onClick={handleClickShowPassword1}
                      onMouseDown={handleClickDownPassword}
                    >
                      {showPassword1 ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              id='confirmpassword'
              name='confirmpassword'
              label='Re-enter new password'
              fullWidth
              type={showPassword2 ? "text" : "password"}
              value={formData.confirmpassword}
              onChange={handleInputChange}
              error={!!errors.confirmpassword}
              helperText={errors.confirmpassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='password visibility'
                      onClick={handleClickShowPassword2}
                      onMouseDown={handleClickDownPassword}
                    >
                      {showPassword2 ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <MuiButton label='Submit' onClick={handleSubmit}/>
        </Grid>

            <div className='back'>
              <a href='/Forgot'>Back to again</a>
            </div>

        </form>
      </div>

      <div className="right-side-pw">
        <img src={im4} alt=''/>
        
      </div>

    </div>
    </div>

    );
};

export default Change_Pwd;