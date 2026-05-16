import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from '@mui/material/Box';

function Dropdown({
  onChange,
  value,
  menuItems,
  label,
  variant,
  style,
  size,
  fullWidth,
  boxWidth,
  defaultValue
}) {
  return (
    <Box sx={{ minWidth: boxWidth }} style={style}>
      <FormControl
        variant={variant}
        sx={{ m: 0.5 }}
        style={style}
        size={size ? size : "small"}
        fullWidth={fullWidth ? true : false}
      >
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={onChange}
          defaultValue={defaultValue}
        >
          {menuItems?.map((item, i) => {
            return (
              <MenuItem value={item?.value} key={i + 1}>
                {item?.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

export default Dropdown;
