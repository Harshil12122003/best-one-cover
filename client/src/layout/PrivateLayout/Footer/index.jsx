import { Divider } from "@mui/material";
import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <>
      {/* <Divider/> */}

      <div className={styles.footer}>
        <div className={styles.copyright}>
          Copyright © 2026 <b>Best-1 Cover House</b> All rights reserved.
        </div>
      </div>
    </>
  );
};

export default Footer;
