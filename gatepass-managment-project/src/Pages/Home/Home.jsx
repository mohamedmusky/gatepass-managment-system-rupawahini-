import React from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { useNavigate } from 'react-router-dom';

import './home.css';

function Home() {
  const navigate = useNavigate();

  const handleUserButtonClick = () => {
    // Define the logic you want to execute when the USER button is clicked
    // For example, navigate to the '/user' page
   
    navigate('/userlogin');
  };

  const handleStaffButtonClick = () => {
    // Define the logic you want to execute when the STAFF button is clicked
    // For example, navigate to the '/staff' page
    navigate('/stafflogin');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'linear-gradient(to bottom, #973535, #D6C9CA)', width: '100%', height: '100vh', margin: 0, }}>
      {/* Logo at the top middle */}
      <div style={{ textAlign: 'center', marginBottom: '5vw', marginTop: '1vw' }}>
        {/* logo image */}
        <img
          src="https://eapl15616.weebly.com/uploads/1/4/6/1/146126864/navbar-logo3-300x42_orig.png"
          alt="Logo"
          style={{ width: '70%', maxWidth: '42vw', height: 'auto' }}
        />
      </div>

      <Paper elevation={10} style={{ padding: '2%', textAlign: 'center', maxWidth: '90%', display: 'flex', }}>
        {/* Left half with the image */}
        <div style={{ flex: 1 }}>
          <img
            src="https://eapl15616.weebly.com/uploads/1/4/6/1/146126864/one-businessman-using-wireless-technology-global-communications-generated-by-ai_orig.jpg"
            alt="Your redundant alt text"
            style={{ width: '100%', borderRadius: '66px' }}
          />
        </div>

        {/* Right half with buttons and text */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginLeft: '2%' }}>
          <Typography
            variant="body1"
            className="welcome-text"
            style={{
              marginBottom: '2%',
              textAlign: 'center',
              color: '#EEC01F',
              fontStyle: 'Roboto',
              fontWeight: 'bold',
              fontSize: '2.5vw',
            }}
            paragraph
          >
            සාදරයෙන් පිළිගනිමු
            <br />
            WELCOME
            <br />
            TO SRI LANKA
            <br />
            RUPAVAHINI COOPERATION
          </Typography>

          {/* Use onClick to define click event handlers */}
          <Button
            className="button"
            variant="contained"
            style={{
              marginBottom: '2%',
              backgroundColor: '#973535',
              color: 'white',
              borderRadius: '66px',
              transition: 'transform 0.3s',
              height: '13%',
              fontSize: '1.5vw',
            }}
            startIcon={<AccountCircleIcon style={{ fontSize: '2vw' }} />}
            onClick={handleUserButtonClick}
          >
            Guest
          </Button>

          <Button
            className="button"
            variant="contained"
            style={{
              marginBottom: '2%',
              backgroundColor: '#973535',
              color: 'white',
              borderRadius: '66px',
              transition: 'transform 0.3s',
              height: '13%',
              fontSize: '1.5vw',
            }}
            startIcon={<SupervisorAccountIcon style={{ fontSize: '2vw' }} />}
            onClick={handleStaffButtonClick}
          >
            STAFF
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default Home;
