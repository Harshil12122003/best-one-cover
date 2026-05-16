import * as React from 'react';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function BasicDatePicker({label, onChange, style}) {
  const [value, setValue] = React.useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        inputFormat="DD/MM/YYYY"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        sx={{fontSize: "5px"}}
        renderInput={(params) => <TextField {...params} size="small" sx={{width: 150, m: 0.5}} />}
      />
    </LocalizationProvider>
  );
}