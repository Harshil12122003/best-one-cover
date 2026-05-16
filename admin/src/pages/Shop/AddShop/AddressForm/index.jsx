import BaseButton from "components/atoms/Button";
import Input from "components/atoms/Input";
import React, { useState } from "react";
import styles from "./AddressForm.module.scss";
import { useFormik } from "formik";
import { addShopSchema } from "schemas/Validation";

import { useDispatch, useSelector } from "react-redux";
import { shopActions } from "redux/Shop/action";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddressForm = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shop } = useSelector((state) => state.shop);
  const { id } = useParams();

  // console.log("shopppp", shop);
  // console.log("idddddddd", id)

  const [addShop, setAddShop] = useState({
    email: "",
    shopName: "",
    address: "",
    pincode: "",
    landmark: "",
    city: "",
    state: "",
  });

  const handleCancel = () => {
    console.log("Cliecke");
    setAddShop({
      email: "",
      shopName: "",
      address: "",
      pincode: "",
      landmark: "",
      city: "",
      state: "",
    })
  }

  const { values, errors, handleChange, handleSubmit, handleReset } = useFormik({
    initialValues: addShop,
    validationSchema: addShopSchema,

    onChange: (event) => {
      const { name, value } = event.target;
      setAddShop({ ...addShop, [name]: value });
      // console.log(addShop)
    },

    onSubmit: (action) => {
      // if (id) {
      //   console.log("editObj")
      //   const editObj = {
      //     "shopName": shop?.shopName,
      //     "shopAddress": {
      //       "address": shop?.shopAddress?.address,
      //       "landmark": shop?.shopAddress?.landmark,
      //       "city": shop?.shopAddress?.city,
      //       "state": shop?.shopAddress?.state,
      //       "pincode": shop?.shopAddress?.pincode
      //     }
      //   }
      //   console.log("editObj", editObj)

      // }
      // else{
      //   const newObj = {
      //     "shopName": values?.shopName,
      //     "shopAddress": {
      //       "address": values?.address,
      //       "landmark": values?.landmark,
      //       "city": values?.city,
      //       "state": values?.state,
      //       "pincode": values?.pincode
      //     },
      //     "email": values?.email
      //   }
      //   // dispatch(shopActions.addShop(newObj));
      // }

      const newObj = {
        shopName: values?.shopName,
        shopAddress: {
          address: values?.address,
          landmark: values?.landmark,
          city: values?.city,
          state: values?.state,
          pincode: values?.pincode,
        },
        email: values?.email,
      };
      // console.log("newObj",newObj)
      dispatch(shopActions.addShop(newObj, navigate));
      action.resetForm();
    },
    onReset: (values, { resetForm }) => resetForm(),
  });

  useEffect(() => {
    dispatch(shopActions.getSingleShop(id));
  }, [dispatch , id]);

  return (
    <div className={styles.addressForm}>
      <form className={styles.addressFormWrapper} onSubmit={handleSubmit}>
        <div className={styles.shopDetails}>
          <h2 className={styles.shopDetailsHeader}>shop details</h2>

          <div className={styles.addressInput}>
            <Input
              name="email"
              label="Manager Email"
              variant="outlined"
              type="email"
              value={values.email}
              onChange={handleChange}
              error={errors.email ? true : false}
              helperText={errors.email}
              required
            />

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
          <BaseButton variant="outlined" onClick={()=>{handleReset()}} >cancel</BaseButton>
          <BaseButton variant="contained" type="submit" onClick={handleSubmit}>
            <div>add shop</div>
          </BaseButton>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
