import React from "react";
import Button from "@mui/material/Button";
import styles from './Button.module.scss'

const BaseButton = (props) => {
  const { variant, type, color, onClick, children, ...rest } = props;

  // console.log('type', type)

  return (
    <div className={styles.Btn}>
      <Button
        variant={variant}
        type={type}
        color={color}
        onClick={onClick}
        {...rest}
      >
        {children}
      </Button>
    </div>
  );
};

export default BaseButton;
