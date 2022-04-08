import React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

export default function DatePicker2(props) {


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Add Appointment Date"
        value={props.value}
        onChange={(newValue) => {
          props.setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}