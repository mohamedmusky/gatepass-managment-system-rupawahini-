import React, { useState,useEffect } from 'react';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Button,
  InputAdornment
} from '@mui/material';
import DrawerStaff from "./../../Components/Drawer/DrawerStaff";
import SettingsIcon from '@mui/icons-material/Settings';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';


function UserProfileAccEdit() {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(true);
  const [editedUser, setEditedUser] = useState({
    empID:'',
    oldPassword: '',
    newPassword: '',
    reEnterNewPassword: '',
  });

  const [changesSaved, setChangesSaved] = useState(false);

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    reEnterNewPassword: false,
  });
  
  const [anchorEl, setAnchorEl] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post('http://localhost:4000/staffdataheader', {}, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('myAppToken')}`, // Assuming the token is stored in local storage
          },
        });
  
        if (response.status !== 200) {
          throw new Error('Failed to fetch staff data');
        }
  
        const userData = response.data.data;
        setEditedUser({
          empID: userData.empID,
          oldPassword: '',
          newPassword: '',
          reEnterNewPassword: '',
          image: userData.image, // Add this line
        });
       
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching user data. Please try again later.');
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
    console.log('Edit Profile clicked');
    handleMenuClose();
    navigate('/staffaccedit');
    // Add logic for handling Edit Profile
  };


  const handleChangePassword = () => {
    console.log('Change Password clicked');
    handleMenuClose();
    navigate('/staffaccpwd');
    // Add logic for handling Change Password
  };

  const handleFieldChange = (fieldName, value) => {
    if (fieldName === 'empID' && !editing) {
      return; // Do not update username field if not in editing mode
    }
    setEditedUser((prevUser) => ({
      ...prevUser,
      [fieldName]: value,
    }));
  };

  const handleSaveChanges = async () => {
    const data = {
      
      oldPassword: editedUser.oldPassword,
      newPassword: editedUser.newPassword,
    };
    try {
      const response = await axios.put(`http://localhost:4000/updatestaffpassword/${editedUser.empID}`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('myAppToken')}`, // Assuming the token is stored in local storage
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to save changes');
      }
      setChangesSaved(true);
      setEditing(false);
      alert("Password updated successfully");
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving changes. Please try again later.');
    }
  };

  const handleCancel = () => {
    // Handle cancel logic to revert changes
    setEditedUser({
      empID: editedUser.empID,
      oldPassword: '',
      newPassword: '',
      reEnterNewPassword: '',
      image: editedUser.image,
  });
  };
  const handlePasswordVisibility = (fieldName) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [fieldName]: !prevState[fieldName],
    }));
  };

  const validatePassword = () => {
    const { newPassword, reEnterNewPassword } = editedUser;
  
    // Check if new password and re-entered new password match
    if (newPassword !== reEnterNewPassword) {
      alert("New password and re-entered new password do not match.");
      return false;
    }
  
    // Check if new password meets certain criteria (e.g., minimum length, contains at least one number and one letter)
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=\S+$).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      alert(
        "New password must be at least 8 characters long, contain at least one number and one letter, and have no spaces."
      );
      return false;
    }
  
    return true;
  };
  

  return (
    <>
      <DrawerStaff />
      <Box
        sx={{
          backgroundColor: '#D6C9CF',
          minHeight: '100vh',
          padding: '1rem',
          boxSizing: 'border-box',
        }}
      >
        {/* Your Profile Image Card */}
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
      src={editedUser && editedUser.image ? `http://localhost:4000/${editedUser.image}` : null}
      alt="User profile"
      style={{
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        margin: '0 auto',
        float: 'left',
        backgroundColor: editedUser && editedUser.image ? null : '#808080',
      }}
    >
      {editedUser && !editedUser.image && <PersonIcon />}
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
                  {editedUser.empID}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Your User Profile Card */}
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
              
              <Grid item xs={8}>
                <TextField
                  label="Employee ID"
                  fullWidth
                  variant="filled"
                  value={editedUser.empID}
                  onChange={(e) => handleFieldChange('empID', e.target.value)}
                  disabled={editing||changesSaved}
                  InputLabelProps={{
                    style: { color: '#973535' } 
                  }}
                />
              </Grid>
              <Grid item xs={8}>
                            <TextField
                    label="Current Password"
                    fullWidth
                    type={showPassword.oldPassword ? "text" : "password"}
                    variant="filled"
                    value={editedUser.oldPassword}
                    onChange={(e) => handleFieldChange('oldPassword', e.target.value)}
                    disabled={!editing}
                    InputLabelProps={{
                    style: { color: '#973535' } 
                    }}
                    InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => handlePasswordVisibility('oldPassword')}
                        >
                            {showPassword.oldPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                        </InputAdornment>
                    ),
                    }}
                />
              </Grid>
              <Grid item xs={8}>
              <TextField
                    label="New Password"
                    fullWidth
                    type={showPassword.newPassword ? "text" : "password"}
                    variant="filled"
                    value={editedUser.newPassword}
                    onChange={(e) => handleFieldChange('newPassword', e.target.value)}
                    disabled={!editing}
                    InputLabelProps={{
                    style: { color: '#973535' } 
                    }}
                    InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => handlePasswordVisibility('newPassword')}
                        >
                            {showPassword.newPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                        </InputAdornment>
                    ),
                    }}
                />
              </Grid>
              <Grid item xs={8}>
              <TextField
                    label="Re-enter New Password"
                    fullWidth
                    type={showPassword.reEnterNewPassword ? "text" : "password"}
                    variant="filled"
                    value={editedUser.reEnterNewPassword}
                    onChange={(e) => handleFieldChange('reEnterNewPassword', e.target.value)}
                    disabled={!editing}
                    InputLabelProps={{
                    style: { color: '#973535' } 
                    }}
                    InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => handlePasswordVisibility('reEnterNewPassword')}
                        >
                            {showPassword.reEnterNewPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                        </InputAdornment>
                    ),
                    }}
                />
              </Grid>
              
             
           
              <Grid container spacing={2}>
  <Grid item xs={12} md={6}>
    {(editing && (
      <>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={() => {
            if (validatePassword()) {
              handleSaveChanges();
            }
          }}
          sx={{ color: '#FFFFFF', mt: 2, ml: 2, width: '15vw' ,backgroundColor:'#973535',borderRadius:'66px',height:'5vh',fontSize: '1vw',transition: 'transform 0.3s','&:hover': {
            color: '#EEC01F !important',
            transform: 'scale(1.08)',
            backgroundColor: '#973535',
          },}}
        >
          Save Changes
        </Button>
      </>
    ))}
  </Grid>
  <Grid item xs={12} md={6}>
    {(editing && (
      <>
        <Button
          variant="outlined"
          startIcon={<CancelIcon />}
          onClick={handleCancel}
          sx={{ color: '#FFFFFF', mt: 2, ml: 2, width: '15vw',backgroundColor:'#973535' ,borderRadius:'66px',height:'5vh',fontSize: '1vw',transition: 'transform 0.3s','&:hover': {
            color: '#EEC01F !important',
            transform: 'scale(1.08)',
            backgroundColor: '#973535',
          },}}
        >
          Cancel
        </Button>
      </>
    ))}
  </Grid>
</Grid>

           </Grid>
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
          {/* Menu options */}
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
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default UserProfileAccEdit;
