import React from 'react'
import Button from '@mui/material/Button';
import './button.css'

function VisitRupavahiniBt({handleVisitreqbt}) {
 
 
  return (
    <div>
      <Button className="button" variant="contained" sx={{marginBottom: '2%',
              backgroundColor: '#973535',
              color: 'white',
              borderRadius: '66px',
              transition: 'transform 0.3s',
              height: '20%',
              fontSize: '1.5vw',
              width:'100%'}} onClick={handleVisitreqbt}>
        Request for vist Rupavahini
      </Button>
    </div>
  )
}

export default VisitRupavahiniBt
