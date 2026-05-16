import React from 'react'
import Button from '@mui/material/Button';



const BaseButton = (props) => {
    const { variant ,type ,color , onClick  ,children ,...rest} = props
    return (
            <Button variant={variant} type={type} color={color}  onClick={onClick} {...rest}> {children} </Button>  
    )
}

export default BaseButton
