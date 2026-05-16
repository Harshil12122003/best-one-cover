import React from 'react'
import { TextField } from '@mui/material'
import styles from './Input.module.scss';


const Input = (props) => {
    const { name ,label, value, onChange ,rows, ...rest} = props
    return (
            <TextField className={styles.Input}  name={name} label={label} rows={rows} value={value} onChange={onChange} {...rest} />
    )
}

export default Input
 