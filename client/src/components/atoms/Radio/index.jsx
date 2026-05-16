import React from "react";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const RadioButtonsGroup = (props) => {
  const { value, label, handleChange, data ,name } = props;

  return (
    <FormControl>
      <FormControlLabel
        control={
          <Radio
            checked={data === value}
            onChange={handleChange}
            value={value}
            name={name}
            // slotProps={{ input: { 'aria-label': label } }}
          />
        }
        label={label}
      />
    </FormControl>
  );
};

export default RadioButtonsGroup;
