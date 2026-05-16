import React from "react";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const RadioButtonsGroup = (props) => {
  const { value, label, handleChange, data ,name , ...rest } = props;
//   console.log('defaultValue', defaultValue)


  return (
    <FormControl>
      <FormControlLabel
        control={
          <Radio
            checked={data === value}
            onClick={handleChange}
            value={value}
            name={name}
            {...rest}
            // slotProps={{ input: { 'aria-label': label } }}
          />
        }   
        label={label}
      />
    </FormControl>
  );
};

export default RadioButtonsGroup;
