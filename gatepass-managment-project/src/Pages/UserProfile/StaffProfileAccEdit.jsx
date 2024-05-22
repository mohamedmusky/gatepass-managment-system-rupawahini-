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
  Input,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import DrawerStaff from "./../../Components/Drawer/DrawerStaff";
import SettingsIcon from '@mui/icons-material/Settings';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';




function UserProfileAccEdit() {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(true);
  const [initialUser, setInitialUser] = useState(null);
  const [editedUser, setEditedUser] = useState({
    empID: '',
    username: '',
    division: '',
    email: '',
    contactNo:'',
  });
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [changesSaved, setChangesSaved] = useState(false);

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
        setInitialUser(userData);
        setEditedUser({
          empID: userData.empID,
          username: userData.username,
          division: userData.division,
          email: userData.email,
          contactNo: userData.contactNo,
          image: userData.image, 
        });
        console.log('User data:', response.data.data);
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
    if ((fieldName === 'empID'||fieldName==='email') && !editing) {
      return; // Do not update empID field if not in editing mode
    }

    setEditedUser((prevUser) => ({
      ...prevUser,
      [fieldName]: value,
    }));
  };

  const validateForm = () => {
    let errorMessage = '';
    if (!editedUser.username.trim()) {
      errorMessage = 'Full name is required';
    } else if (!editedUser.empID.trim()) {
      errorMessage = 'empid is required';
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(editedUser.email)) {
      errorMessage = 'Please enter a valid email address';
    } else if (!/^\d{10}$/.test(editedUser.contactNo)) {
      errorMessage = 'Please enter a valid contact number';
    }
  
    if (errorMessage) {
      alert(errorMessage);
      return false;
    }
  
    return true;
  };

  const handleSaveChanges = async () => {
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append('empid', editedUser.empID);
    formData.append('username', editedUser.username);
    formData.append('division', editedUser.division);
    formData.append('email', editedUser.email);
    formData.append('contactNo', editedUser.contactNo);
  
    // Append the image if it exists
    if (imageFile) {
      formData.append('image', imageFile, imageFile.image);
    }
  
    try {
      const response = await axios.put(`http://localhost:4000/userstaff/${editedUser.empID}`, formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status !== 200) {
        throw new Error('Failed to save changes');
      }
      setEditing(false);
      setChangesSaved(true);
      alert('Changes saved successfully');
  
      
    } catch (error) {
      console.error('Error:', error);
      console.log(error.response.data); // Log the server's response
      alert('An error occurred while saving changes. Please try again later.');
    }
  };

  const handleCancel = () => {
    // Handle cancel logic to revert changes
    setEditedUser({
      empID: initialUser.empID,
      username: initialUser.username,
      email: initialUser.email,
      contactNo: initialUser.contactNo,
      division: initialUser.division,
      image: initialUser.image,
    });
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
      alt="Staff profile"
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
            <Grid item xs={8} >
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
              <Grid item xs={8} >
                <TextField
                  label="Full Name"
                  fullWidth
                  variant="filled"
                  value={editedUser.username}
                  onChange={(e) => handleFieldChange('username', e.target.value)}
                  disabled={!editing}
                  InputLabelProps={{
                    style: { color: '#973535' } 
                  }}
                />
              </Grid>
              <Grid item xs={8}>
  <FormControl variant="filled" fullWidth disabled={!editing}>
    <InputLabel style={{ color: '#973535' }}>Division</InputLabel>
    <Select
      value={editedUser.division}
      onChange={(e) => handleFieldChange('division', e.target.value)}
    >
      <MenuItem value="division1">Division 1</MenuItem>
      <MenuItem value="division2">Division 2</MenuItem>
      <MenuItem value="division3">Division 3</MenuItem>
      <MenuItem value="division4">Division 4</MenuItem>
      <MenuItem value="division5">Division 5</MenuItem>
      <MenuItem value="division6">Division 6</MenuItem>
    </Select>
  </FormControl>
</Grid>

              <Grid item xs={8}>
                <TextField
                  label="Email"
                  fullWidth
                  variant="filled"
                  value={editedUser.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  disabled={editing||changesSaved}
                  InputLabelProps={{
                    style: { color: '#973535' } 
                  }}
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  label="Contact Number"
                  fullWidth
                  variant="filled"
                  value={editedUser.contactNo}
                  onChange={(e) => handleFieldChange('contactNo', e.target.value)}
                  disabled={!editing}
                  InputLabelProps={{
                    style: { color: '#973535' } 
                  }}
                />
                
              </Grid>
              <Grid item xs={8}>
              <Input
      id="upload-image-input"
        type="file"
        fullWidth
        inputProps={{
          accept: 'image/*',
        }}
        disabled={!editing}
        onChange={(e) => {
          setImageFile(e.target.files[0]);
          
        }}
        InputLabelProps={{
          shrink: true,
          style: { color: '#973535' },
        }}
      />
      <label htmlFor="upload-image-input">
        <Button
          variant="contained"
          component="span"
          sx={{
            color: '#FFFFFF',
            mt: 2,
            ml: 2,
            width: '7vw',
            backgroundColor: '#973535',
            
            height: '4vh',
            fontSize: '0.5vw',
            transition: 'transform 0.3s',
            '&:hover': {
              color: '#EEC01F !important',
              transform: 'scale(1)', 
              backgroundColor: '#973535',
            },
          }}
        >
          Upload Image
        </Button>
      </label>
    </Grid>
           
              <Grid container spacing={2}>
  <Grid item xs={12} md={6}>
    {(editing && (
      <>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSaveChanges}
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
