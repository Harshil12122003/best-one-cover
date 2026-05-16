import BaseButton from "components/atoms/Button";
import Input from "components/atoms/Input";
import React, { useState } from "react";
import styles from "./AddressForm.module.scss";
import { useFormik } from "formik";
import { editShopSchema } from "schemas/Validation";

import { useDispatch, useSelector } from "react-redux";
import { shopActions } from "redux/Shop/action";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { actions as actionLoader } from "redux/Loader/action";
import { Box, CircularProgress } from "@mui/material";

const AddressForm = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shop } = useSelector((state) => state.shop);
  const { networkProgressDialog } = useSelector((state) => state.loader);
  const { id } = useParams();

  // console.log("shop", shop)
  // console.log("idddddddd", id)

  const [addShop, setAddShop] = useState({
    shopName: shop?.shopName,
    address: shop?.shopAddress?.address,
    pincode: shop?.shopAddress?.pincode,
    landmark: shop?.shopAddress?.landmark,
    city: shop?.shopAddress?.city,
    state: shop?.shopAddress?.state,
  });

  const handleCancel = () => {
    navigate("/shops");
  };

  const { values, errors, setValues, handleChange, handleSubmit } = useFormik({
    initialValues: addShop,
    validationSchema: editShopSchema,

    onChange: (event) => {
      const { name, value } = event.target;
      setAddShop({ ...addShop, [name]: value });
    },
    onSubmit: (action) => {
      const editObj = {
        shopName: values?.shopName,
        shopAddress: {
          address: values?.address,
          landmark: values?.landmark,
          city: values?.city,
          state: values?.state,
          pincode: values?.pincode,
        },
      };

      console.log("editObj", editObj);
      dispatch(shopActions.editShop(editObj, id));

      navigate("/shops");
      action.resetForm();
    },
  });

  useEffect(() => {
    dispatch(actionLoader.startLoader());
    dispatch(shopActions.getSingleShop(id));
  }, [dispatch]);

  useEffect(() => {
    setValues({
      shopName: shop?.shopName,
      address: shop?.shopAddress?.address,
      pincode: shop?.shopAddress?.pincode,
      landmark: shop?.shopAddress?.landmark,
      city: shop?.shopAddress?.city,
      state: shop?.shopAddress?.state,
    });
  }, [shop]);

  // console.log("shopshopshop", shop?.shopName)
  // console.log("values", values?.shopName)

  return (
    <>
      {!networkProgressDialog ? (
        <div className={styles.addressForm}>
          <form className={styles.addressFormWrapper} onSubmit={handleSubmit}>
            <div className={styles.shopDetails}>
              <h2 className={styles.shopDetailsHeader}>shop details</h2>
              <div className={styles.addressInput}>
                <Input
                  name="shopName"
                  label="Shop Name"
                  variant="outlined"
                  value={values.shopName}
                  onChange={handleChange}
                  required
                  error={errors.shopName ? true : false}
                  helperText={errors.shopName}
                />
              </div>
            </div>

            <div className={styles.shopAddress}>
              <h2 className={styles.shopAddressHeader}>shop Address</h2>
              <div className={styles.addressTextarea}>
                <Input
                  variant="outlined"
                  label="Address"
                  name="address"
                  value={values.address}
                  multiline
                  rows={4}
                  onChange={handleChange}
                  required
                  error={errors.address ? true : false}
                  helperText={errors.address}
                />
              </div>
              <div className={styles.addressInput}>
                <Input
                  variant="outlined"
                  label="Pincode"
                  name="pincode"
                  value={values.pincode}
                  onChange={handleChange}
                  required
                  error={errors.pincode ? true : false}
                  helperText={errors.pincode}
                />
                <Input
                  variant="outlined"
                  label="landmark"
                  name="landmark"
                  value={values.landmark}
                  onChange={handleChange}
                  required
                  error={errors.landmark ? true : false}
                  helperText={errors.landmark}
                />
              </div>

              <div className={styles.addressInput}>
                <Input
                  variant="outlined"
                  label="City"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  required
                  error={errors.city ? true : false}
                  helperText={errors.city}
                />
                <Input
                  variant="outlined"
                  label="State"
                  name="state"
                  value={values.state}
                  onChange={handleChange}
                  required
                  error={errors.state ? true : false}
                  helperText={errors.state}
                />
              </div>
            </div>

            <div className={styles.addressButton}>
              <BaseButton variant="outlined" onClick={handleCancel}>
                cancel
              </BaseButton>
              <BaseButton
                variant="contained"
                type="submit"
                onClick={handleSubmit}
              >
                edit shop
              </BaseButton>
            </div>
          </form>
        </div>
      ) : (
        <Box
          sx={{
            display: "grid",
            height: "55vh",
            width: "100%",
            placeItems: "center",
            marginTop: "50px",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default AddressForm;
