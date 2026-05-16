import BaseButton from "components/atoms/Button";
import RadioButtonsGroup from "components/atoms/Radio";
import Input from "components/atoms/Input";
import React, { useEffect, useState } from "react";
import styles from "./AddressForm.module.scss";
import { FormLabel } from "@mui/material";
import { useLocation } from "react-router-dom";
import { fieldValidation, validation } from "utils/validations";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "redux/User/action";

const AddressForm = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  // const [gender, setGender] = useState("");
  const { userProfile } = useSelector((state) => state.user.user);
  const [allFieldsError, SetAllFieldsError] = useState("");
  const [address, setAddress] = useState({
    name: "",
    mobile: "",
    pinCode: "",
    landmark: "",
    address: "",
    city: "",
    state: "",
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

  useEffect(() => {
    setAddress({
      name: userProfile?.fname ? userProfile?.fname : "",
      mobile: userProfile?.mobile ? userProfile?.mobile : "",
      pinCode: userProfile?.address?.pinCode
        ? userProfile?.address?.pinCode
        : "",
      landmark: userProfile?.address?.landmark
        ? userProfile?.address?.landmark
        : "",
      address: userProfile?.address?.address
        ? userProfile?.address?.address
        : "",
      city: userProfile?.address?.city ? userProfile?.address?.city : "",
      state: userProfile?.address?.state ? userProfile?.address?.state : "",
    });
  }, [userProfile]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAddress({ ...address, [name]: value });
    // setGender(event.target.value);

    fieldValidation(error, name, value);
    setError({ ...error });
  };

  const handleAddressSave = () => {
    // e.prevent.default()

    let filedsRequired =
      address.name === "" &&
      address.mobile === "" &&
      address.pinCode === "" &&
      address.landmark === "" &&
      address.address === "" &&
      address.city === "" &&
      address.state === "";

    let filedsRequiredProfileAddress =
      address.pinCode === "" &&
      address.landmark === "" &&
      address.address === "" &&
      address.city === "" &&
      address.state === "";

    if (location.pathname === "/checkout") {
      if (validation(error, address) && !filedsRequired) {
        dispatch(
          userActions.EditProfile({
            address: {
              address: address.address,
              pinCode: address.pinCode,
              landmark: address.landmark,
              city: address.city,
              state: address.state,
            },
          })
        );
        sessionStorage.setItem("address", JSON.stringify(address));
        props?.handleCallBack && props?.handleCallBack();
      } else {
        SetAllFieldsError("All fields are required!");
      }
    } else {
      delete error.name;
      delete error.mobile;
      delete address.name;
      delete address.mobile;
      // console.log(error);
      if (validation(error, address) && !filedsRequiredProfileAddress) {
        dispatch(
          userActions.EditProfile({
            address: {
              address: address.address,
              pinCode: address.pinCode,
              landmark: address.landmark,
              city: address.city,
              state: address.state,
            },
          })
        );
      } else {
        SetAllFieldsError("All fields are required!");
      }
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setAddress({
      name: "",
      mobile: "",
      pinCode: "",
      landmark: "",
      address: "",
      city: "",
      state: "",
    });
  };

  return (
    <div className={styles.addressFormWrapper}>
      {location.pathname !== "/checkout" ? (
        <div className={styles.addressHeader}>
          <p>manage address</p>
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
        {location.pathname === "/checkout" && (
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
        )}

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

        {allFieldsError && (
          <div className={styles.errorMsg} style={{ color: "red" }}>
            <p>{allFieldsError}</p>
          </div>
        )}

        <div className={styles.addressButton}>
          <BaseButton
            variant="contained"
            type="button"
            onClick={handleAddressSave}
          >
            save
          </BaseButton>
          <BaseButton
            variant="outlined"
            onClick={handleCancel}
          >
            reset
          </BaseButton>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
