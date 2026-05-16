import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from '@mui/material/FormHelperText';

import styles from "./Select.module.scss";

const BasicSelect = (props) => {
  const {
    name,
    error,
    helperText,
    value,
    onChange,
    label,
    menuItems,
    // ...rest
  } = props;

  console.log('menuItems', menuItems)
  return (
    <div className={styles.select}>
      <FormControl fullWidth error>
        <InputLabel id="demo-simple-select-label" error={!!error} >{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          name={name}
          label={label}
          onChange={onChange}
          error={!!error}

        // {...rest}
        >
          {/* {menuItems?.map((item, i) => {
            return (
              <MenuItem value={item?.value} key={i + 1}>
                {item?.value}
              </MenuItem>
            );
          })} */}
        </Select>
        <FormHelperText error>{helperText}</FormHelperText>
      </FormControl>
    </div>
  );
};

export default BasicSelect;
