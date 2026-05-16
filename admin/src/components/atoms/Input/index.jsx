import React from "react";
import { TextField } from "@mui/material";
import styles from "./Input.module.scss";

const Input = (props) => {
  const { type,name, label,  onBlur, onChange, rows, value, ...rest } = props;

  // console.log(rest);

  return (
    <TextField
      className={styles.Input}
      name={name}
      label={label}
      rows={rows} 
      onBlur={onBlur}
      onChange={onChange}
      value={value}
      type={type}
      {...rest}
      // style={{width: "100%"}}
    />
  );
};

export default Input;
