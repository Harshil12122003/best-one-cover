import React from "react";
import banner from "assets/images/coverBanner1.png";

import styles from "./Autohero.module.scss";

const AutoHero = () => {
  return (
    <div className={styles.PosterContainer}>
      <div className={styles.brandLogo}>
        <h1>Best-1 Cover House</h1>
      </div>
      <div className={styles.bannerImg}>
        <img src={banner} alt="Banner" />
      </div>
      <div className={styles.descriptionWrapper}>
        <p>excellent , efficient and productive</p>
      </div>
    </div>
  );
};

export default AutoHero;
