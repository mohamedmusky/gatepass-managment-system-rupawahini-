import React from 'react';
import Drawer from '../../Components/Drawer/Drawer';
import { styled } from '@mui/material/styles';
import VisitRupavahiniBt from '../../Components/UserRequestButtons/VisitRupavahiniBt';
import AppoinmentBt from '../../Components/UserRequestButtons/AppoinmentBt';
import { useNavigate } from 'react-router-dom';

//const GlobalStyle = styled('div')({
  //height: '100vh',
 // overflow: 'hidden',
//});

const CenteredContent = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1, 
});

const BodyWithBackground = styled('div')({
  backgroundImage: 'url("https://rupavahini.lk/wp-content/uploads/2023/11/cad7c966-9caa-45f8-aa6f-4cf6bbd54ded.jpeg")',
  backgroundSize: 'cover',
  height: '100vh',
  width: '100vw',
  overflow: 'hidden',
});

function UserReq() {
  const navigate = useNavigate();
  const handlappoinmt = () => {
    navigate('/visit1');
  }
  const handleVisitreq = () => {
    navigate('/visit2');
  };
  return (
    <BodyWithBackground>
      <Drawer>
        <main>
          <CenteredContent>
            
             <VisitRupavahiniBt handleVisitreqbt={handleVisitreq} />
          <br/>
            <AppoinmentBt handlappoinmtbt={handlappoinmt}/>
            
          </CenteredContent>
        </main>
      </Drawer>
    </BodyWithBackground>
  );
}

export default UserReq;
