import { Typography } from "@mui/material";
import BreadCrumb from "components/atoms/BreadCrumb";
import React from "react";
import AddressForm from "./AddressForm";
import styles from "./AddShop.module.scss";
// import { useLocation, useParams } from 'react-router-dom';

const AddShop = () => {
  // const { id } = useParams();

  // console.log("useParams",id)

  return (
    <div className={styles.addShop}>
      <div className={styles.addShopHeader}>
        {/* <h2>Add shop</h2> */}
        <Typography variant="h5" component="h2">
          Add Shop
        </Typography>
        <div className={styles.BreadCrumb}>
          <BreadCrumb
            parentElement="Home"
            childLink="/shop/new"
            childElement="Shop"
            child2Link="/shop/new"
            child2Element="Add Shop"
            data="Data"
          />
        </div>
      </div>
      <div className={styles.addressForm}>
        <AddressForm />
      </div>
    </div>
  );
};

export default AddShop;
