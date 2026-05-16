import { Typography } from "@mui/material";
import BreadCrumb from "components/atoms/BreadCrumb";
import React from "react";
import AddressForm from "./AddressForm";
import styles from "./EditShop.module.scss";
// import { useLocation, useParams } from 'react-router-dom';


const EditShop = () => {
  // const { id } = useParams();

  // console.log("useParams",id)

  return (
    <div className={styles.editShop}>
      <div className={styles.editShopHeader}>
      <Typography variant="h5" component="h2">
          Edit shop
        </Typography>
        <div className={styles.editBreadCrumb}>
          <BreadCrumb
            parentElement="Home"
            childLink="/shop/new"
            childElement="Edit Shop"
            data="Data"
          />
        </div>
      </div>
      <div className={styles.editAddressForm}>
        <AddressForm />
      </div>
    </div>
  );
};

export default EditShop;
