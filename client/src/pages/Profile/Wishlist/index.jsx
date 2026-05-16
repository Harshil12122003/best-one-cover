import React from "react";
import WishlistImg from "../../../assets/images/wishlist.png";
import styles from "./Wishlist.module.scss";

const Wishlist = (props) => {
  return (
    <div className={styles.wishlist}>
      <div className={styles.wishlistContainer}>
        <div className={styles.wishlistImage}>
          <img src={WishlistImg} alt="Wishlist" />
        </div>
        <div className={styles.wishlistDesc}>
          <h4>Empty Wishlist</h4>
          <p>You have no items in your wishlist. Start adding!</p>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
