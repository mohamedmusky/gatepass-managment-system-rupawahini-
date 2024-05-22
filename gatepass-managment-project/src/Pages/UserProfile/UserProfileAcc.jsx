import React, { useState,useEffect  } from 'react';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import Drawer from '../../Components/Drawer/Drawer';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';


function UserProfileAcc() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token=localStorage.getItem('myAppToken');
        const response = await axios.post('http://localhost:4000/userdataheader',null,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        
        });
        setUser(response.data);
        console.log(response.data);
  
      } catch (error) {
        console.error('Error fetching user ', error);
      }
    };

    fetchUserData();
  }, []);
  
  

  const handleSettingsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditProfile = () => {
    handleMenuClose();
    navigate('/useraccedit');
   
    // Add logic for handling Edit Profile
  };

  const handleChangePassword = () => {
    
    handleMenuClose();
    navigate('/useraccpwd');
    // Add logic for handling Change Password
  };

  if (!user) {
    return <div></div>;
  }

  return (
    <>
      <Drawer />
     
      <Box
        sx={{
          backgroundColor: '#D6C9CF',
          minHeight: '100vh',
          padding: '1rem',
          boxSizing: 'border-box',
        }}
      >
        <Card
          sx={{
            border: '1px solid black',
            backgroundColor: '#FFFFFF',
            marginBottom: '2rem',
            marginTop: '2rem',
            marginLeft: '2rem',
            marginRight: '2rem',
            alignItems: 'center',

            
          }}
        >
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6} md={4} lg={3}>
             <Avatar
      src={user && user.data.image ? `http://localhost:4000/${user.data.image}` : null}
      alt="User profile"
      style={{
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        margin: '0 auto',
        float: 'left',
        backgroundColor: user && user.data.image ? null : '#808080',
      }}
    >
      {user && !user.data.image && <PersonIcon />}
    </Avatar>
                 
              </Grid>
              <Grid item xs={12} sm={6} md={8} lg={9}>
                <Typography
                  variant="h4"
                  component="h2"
                  textAlign="middle"
                  sm={6}
                  md={8}
                  lg={9}
                  color="#973535"
                >
                  {user.data.username}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card
          sx={{
            border: '1px solid black',
            backgroundColor: '#FFFFFF',
            marginTop: '2rem',
            marginLeft: '2rem',
            marginRight: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body1" component="p" color="#973535">
                  <h2>User Details</h2>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" component="p" color="#973535">
                  <b> Full name</b>
                  <br />
                  <span style={{ color: '#000000' }}>{user.data.fullname}</span>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" component="p" color="#973535">
                  <b> User name</b>
                  <br />
                  <span style={{ color: '#000000' }}>{user.data.username}</span>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" component="p" color="#973535">
                  <b>Email</b>
                  <br />
                  <span style={{ color: '#000000' }}>{user.data.email}</span>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" component="p" color="#973535">
                  <b>Contact number</b>
                  <br />
                  <span style={{ color: '#000000' }}>{user.data.contactNo}</span>
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <IconButton
            onClick={handleSettingsClick}
            sx={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              color: '#000000',
            }}
          >
            <SettingsIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleEditProfile} sx={{color:"#973535",'&:hover': { color: '#EEC01F' }}}>Edit Profile</MenuItem>
            <MenuItem onClick={handleChangePassword} sx={{color:"#973535",'&:hover': { color: '#EEC01F' }}}>Change Password</MenuItem>
          </Menu>
        </Card>
      </Box>
    </>
  );
}

export default UserProfileAcc;
