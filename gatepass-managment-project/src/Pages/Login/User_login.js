import {useState} from 'react'
import './login.css'
import { IconButton, InputAdornment, TextField } from '@mui/material';
import axios from 'axios'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import im3 from '../../Assets/im3.jpg';
import MuiButton from '../../Components/Button/MuiButton';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../../Security/AuthContext';

function User_login() {
  const navigate = useNavigate();

  const hancleRegisterClick = () => {

   
    navigate('/usersignup');
  };
  const hanclefogotClick = () => {

    navigate('/forgot');
  }

  const {isAuthenticated,setIsAuthenticated}=useAuth();


  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
      usernameOrEmail: '',
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
          usernameOrEmail:'',
          password:''
      });
      setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Error = {};
  
    if (!formData.usernameOrEmail.trim()) {
      Error.usernameOrEmail = "usernameOrEmail or email is required"; 
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
    axios.post(`http://localhost:4000/LoginUser`, formData)
      .then(response => {
        console.log('Response:', response.data);
        if (response.data.error) {
          if (response.data.error === 'Please verify your email before logging in') {
            alert(response.data.error);
            navigate('/useremailverify', { state: { email: formData.usernameOrEmail } });
          } else {
            alert(response.data.error);
          }
        } else {
          if (response.status === 201) {
            localStorage.setItem('myAppToken', response.data.data);
            setIsAuthenticated(true);
            alert('User Login  successfully!');
            handleClose();
            navigate('/userreq');
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
                id='usernameOrEmail'
                name='usernameOrEmail'
                label='User Name or Email'
                fullWidth
                variant='standard'
                value={formData.usernameOrEmail}
                onChange={handleInputChange}
                error={!!errors.usernameOrEmail}
                helperText={errors.usernameOrEmail}
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
                <p >Don't have an account? <button  style={{background: 'none',color: 'blue',
      border: 'none',
      padding: 0,
      margin: 0,}} onClick={hancleRegisterClick}>Register</button> </p>
            </div>
            
        </form>
      </div>

    </div>
    </div>
  );
};

export default User_login;

