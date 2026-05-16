import React from 'react'
import { Drawer } from "@mui/material";
import styles from './Drawer.module.scss'

const BaseDrawer = (props) => {

    const { open, handleClose, handleOpen, anchor, variant ,children } = props


    return (
            <Drawer
                className={styles.drawer}
                variant={variant}
                anchor={anchor}
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
            >
                {/* <h1 className={styles.Header}>category</h1> */}
                {children}
            </Drawer>
    )
}

export default BaseDrawer
