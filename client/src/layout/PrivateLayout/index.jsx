import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import SemiFooter from './SemiFooter'
import styles from "./PrivateLayout.module.scss";
const PrivateLayout = ({ children }) => {
  return (
    <div className={styles.PrivateLayout}>
      <Header />
      {children}
      <SemiFooter />
      <Footer />
    </div>
  );
};

export default PrivateLayout;
