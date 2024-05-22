import {useState} from 'react'
import './login.css'
import { IconButton, InputAdornment, TextField } from '@mui/material';
import axios from 'axios'
import { Visibility, VisibilityOff } from '@mui/icons-material';

import im3 from '../../Assets/im3.jpg';
import MuiButton from '../../Components/Button/MuiButton';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../../Security/AuthContext';


function Staff_login() {
  const navigate = useNavigate();
  const {isAuthenticated,setIsAuthenticated}=useAuth();

  const hancleRegister1Click = () => {

   
    navigate('/staffsignup');
  };

  const hanclefogotClick= () => {
      
      navigate('/staffforgot');
  }
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    empIDorEmail: '',
      password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickDownPassword = (event) =>{
    event.preventDefault();
  };

  const [errors, setErrors] = useState({});

  const handleOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
      setFormData({
        empIDorEmail:'',
          password:''
      });
      setErrors({});
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      const Error = {};

      if (!formData.empIDorEmail.trim()) {
        Error.empIDorEmail = "User name is required";
      }
      if (!formData.password.trim()) {
        Error.password = "Password is required";
      } else if (formData.password.length < 6) {
        Error.password = "Password must be at least 6 characters"
      }
      if (Object.keys(Error).length > 0) {
        setErrors(Error);
      } else {
        handleOpen();
      }
      console.log('Form submitted!', formData);
    axios.post(`http://localhost:4000/LoginStaff`, formData)
      .then(response => {
        console.log('Response:', response.data);
        if (response.data.error) {
          if (response.data.error === 'Please verify your email before logging in'){
          alert(response.data.error);
          navigate('/staffemailverify', { state: { email: formData.empIDorEmail } });
        } else {
          alert(response.data.error);
        }
        } else {
          if (response.status === 201) {
            localStorage.setItem('myAppToken', response.data.data);
            setIsAuthenticated(true);
            alert('Staff Login  successfully!');
            handleClose();
            navigate('/Dailyactivity');
          } else {
            alert('An error occurred. Please try again 1.');
          }
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again 2.');
      });

  };

 
  const handleInputChange = (e) => {
      const {name, value} = e.target;
      setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value
      }));
      setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: '',
      }));
  };

  

  return (
    <div className='bg'>
    <div className='container1'>

      <div className="left-side"> 
        <img src={im3} />
        <h3 className='para'>Welcome to Sri Lanaka Rupavahini Corporation</h3>
      </div>

      <div className="right-side">
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit}>
            
              <TextField
                id='empIDorEmail'
                name='empIDorEmail'
                label='Emp Id or Email'
                fullWidth
                variant='standard'
                value={formData.empIDorEmail}
                onChange={handleInputChange}
                error={!!errors.empIDorEmail}
                helperText={errors.empIDorEmail}
                style={{marginBottom: '10%'}}
              />
            
            <TextField
                id='password'
                name='password'
                label='Password'
                type={showPassword ? 'text' : 'password'}
                variant='standard'
                fullWidth
                value={formData.password}
                onChange={handleInputChange}
                error={!!errors.password}
                helperText={errors.password}
                style={{ marginBottom: '15%' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleClickDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
      />

            <div className='forgot'>
            <button  style={{background: 'none',color: 'blue',
      border: 'none',
      padding: 0,
      margin: 0,}} onClick={hanclefogotClick}>Forgot Password</button>
            </div>

            <MuiButton label='Login' onClick={handleSubmit}/>
                       
            <div className='register'>
                <p>Don't have an account? <button  style={{background: 'none',color: 'blue',
      border: 'none',
      padding: 0,
      margin: 0,}} onClick={hancleRegister1Click}>Register</button></p>
            </div>
            
        </form>
      </div>

    </div>
    </div>
  );
};

export default Staff_login;

