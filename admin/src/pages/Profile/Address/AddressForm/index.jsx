import BaseButton from "components/atoms/Button";
// import RadioButtonsGroup from "components/atoms/Radio";
import Input from "components/atoms/Input";
import React, { useState } from "react";
import styles from "./AddressForm.module.scss";
// import { FormLabel } from "@mui/material";
import { useLocation } from "react-router-dom";
// import { fieldValidation } from "utils/validations";
// import { useDispatch } from "react-redux";
// import {userActions} from "redux/User/action";

const AddressForm = (props) => {
  // const { setAddress , delivaryAdd} = props;
  const location = useLocation();
  // const dispatch = useDispatch();
  // const [gender, setGender] = useState("");
  const [address, setAddress] = useState({
    name: "",
    mobile: "",
    pinCode: "",
    landmark: "",
    address: "",
    city: "",
    state: "",
    country: "India",
  });

  const [error, setError] = useState({
    name: "",
    mobile: "",
    pinCode: "",
    landmark: "",
    address: "",
    city: "",
    state: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAddress({ ...address, [name]: value });
    // setGender(event.target.value);

    // fieldValidation(error, name, value);
    setError({ ...error });

  };

  const handleAddressSave = () => {
    // e.prevent.default()
    console.log(address);
    // dispatch(userActions.userEditProfile({address: {
    //   address: address.address,
    //   pinCode: address.pinCode,
    //   landmark: address.landmark,
    //   city: address.city,
    //   state: address.state,
    //   country: "India",
    // }}))
    // sessionStorage.setItem("address", JSON.stringify(address));
    // props?.handleCallBack && props?.handleCallBack();
  };
  const handleGoBack = () => {};

  return (
    <div className={styles.addressFormWrapper}>
      {location.pathname !== "/checkout" ? (
        <div className={styles.addressHeader}>
          <h3>manage addresses</h3>
        </div>
      ) : (
        <div></div>
      )}
      <form
        className={
          location.pathname !== "/checkout"
            ? styles.addressWrapper
            : styles.checkoutAddress
        }
        // onSubmit={handleAddressSave}
      >
        <div className={styles.addAddress}>
          <p>add a new address</p>
        </div>
        <div className={styles.addressInput}>
          <Input
            name="name"
            label="Name"
            variant="outlined"
            value={address.name}
            onChange={handleChange}
            required
            error={error.name ? true : false}
            helperText={error.name}
          />
          <Input
            name="mobile"
            label="Mobile Number"
            variant="outlined"
            value={address.mobile}
            onChange={handleChange}
            required
            error={error.mobile ? true : false}
            helperText={error.mobile}
          />
        </div>

        <div className={styles.addressInput}>
          <Input
            variant="outlined"
            label="Pincode"
            name="pinCode"
            value={address.pinCode}
            onChange={handleChange}
            required
            error={error.pinCode ? true : false}
            helperText={error.pinCode}
          />
          <Input
            variant="outlined"
            label="landmark"
            name="landmark"
            value={address.landmark}
            onChange={handleChange}
            required
            error={error.landmark ? true : false}
            helperText={error.landmark}
          />
        </div>

        <div className={styles.addressTextarea}>
          <Input
            variant="outlined"
            label="Address"
            name="address"
            value={address.address}
            multiline
            rows={4}
            onChange={handleChange}
            required
            error={error.address ? true : false}
            helperText={error.address}
          />
        </div>

        <div className={styles.addressInput}>
          <Input
            variant="outlined"
            label="City"
            name="city"
            value={address.city}
            onChange={handleChange}
            required
            error={error.city ? true : false}
            helperText={error.city}
          />
          <Input
            variant="outlined"
            label="State"
            name="state"
            value={address.state}
            onChange={handleChange}
            required
            error={error.state ? true : false}
            helperText={error.state}
          />
        </div>

        {/* <div className={styles.addressType}>
          <div>
            <FormLabel>Address Type</FormLabel>
          </div>
          <div className={styles.addressRadio}>
            <RadioButtonsGroup
              value={"home"}
              label="Home"
              name="home"
              handleChange={handleChange}
              data={address.type}
            />
            <RadioButtonsGroup
              value={"work"}
              label="Work"
              name="work"
              handleChange={handleChange}
              data={address.type}
            />
          </div>
        </div> */}

        {/* {allFieldsError && (
          <div className={styles.errorMsg}>
            <p>{allFieldsError}</p>
          </div>
        )} */}

        <div className={styles.addressButton}>
          <BaseButton
            variant="contained"
            type="button"
            onClick={handleAddressSave}
          >
            save
          </BaseButton>
          <BaseButton variant="contained" onClick={handleGoBack}>
            cancel
          </BaseButton>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
