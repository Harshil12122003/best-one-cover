import React from "react";
import styles from "./Coupons.module.scss";

const Coupons = (props) => {
  return (
    <div className={styles.Coupons}>
      <div className={styles.couponsContainer}>
        <div className={styles.avaliableWrapper}>
          <h3>avaliable coupons</h3>
          <div className={styles.avaliableContainer}>
            <div className={styles.avaliableTitle}>
              <h5>Extra 20% Upto ₹30</h5>
              <h6>Valid till 31 May, 2026</h6>
            </div>
            <div className={styles.avaliableDesc}>
              <h6>
                Get extra 20% off upto ₹30 on 1 item(s) (price inclusive of
                cashback/coupon)
              </h6>
              <p>View T&C</p>
            </div>
          </div>
        </div>
        <div className={styles.expiredWrapper}>
          <h3>expired coupons</h3>
          <div className={styles.expireContainer}>
            <div className={styles.expireTitle}>
              <h5>Extra 20% Upto ₹30</h5>
              <h6>Valid till 31 May, 2026</h6>
            </div>
            <div className={styles.expireDesc}>
              <h6>
                Get extra 20% off upto ₹30 on 1 item(s) (price inclusive of
                cashback/coupon)
              </h6>
              <p>View T&C</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coupons;
