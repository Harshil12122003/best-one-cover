import React from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import styles from "./Password.module.scss";
import { FormHelperText } from "@material-ui/core";

const Password = (props) => {
  const {
    label,
    value,
    handleMouseDownPassword,
    handleClickShowPassword,
    showPassword,
    onChange,
    name,
    error,
    helperText,
    // ...rest
  } = props;


  // console.log("error", error);
  // console.log("helperText", helperText);
  return (
    <FormControl variant="outlined" className={styles.password}>
      <InputLabel htmlFor="outlined-adornment-password" error={!!error} >{label}</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        name={name}
        type={showPassword ? "text" : "password"}
        onChange={onChange}
        value={value}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        error={!!error}
        label={label}
      />

      <FormHelperText error id="outlined-adornment-password-error">
        {helperText}
      </FormHelperText>

    </FormControl>
  );
};

export default Password;
