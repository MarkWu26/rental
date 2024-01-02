import React, { useState } from 'react'

import { TimePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface TimeInputProps{
  onChange: (value: any) => void;
  value?: any
  isCheckOut?: boolean
}

const TimeInput: React.FC<TimeInputProps> = ({
  onChange,
  value,
  isCheckOut
}) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <TimePicker
    label={`${isCheckOut ? 'Check out time' : 'Check in time'} `}
    value={value}
    onChange={(newValue)=> onChange(newValue)}
    />
    </LocalizationProvider>
  )
}

export default TimeInput