import React from 'react';
import dayjs from 'dayjs'; // Import dayjs library
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const BasicTimePicker = ({ id, value, handleTimeChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
        <TimePicker label="Time"
          id={id}
          value={dayjs(value)} 
          onChange={handleTimeChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default BasicTimePicker;
