import React, { useState } from "react";
import { Button, Divider } from "@mui/material";
import BaseButton from "components/atoms/Button";
import Input from "components/atoms/Input";
import styles from "./EditProfile.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "redux/User/action";
import { fieldValidation, validation } from "utils/validations";

const EditProfile = ({ setProfile, userOldData = {} }) => {
  const { fname, lname, email, mobile } = userOldData;

  // const userProfile = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [editProfile, setEditProfile] = useState({
    fname,
    lname,
    email,
    mobile,
  });

  const [error, setError] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProfile({ ...editProfile, [name]: value });
    fieldValidation(error, name, value);
    setError({ ...error });
  };

  const handleEditProfile = (e) => {
    e.preventDefault();
    if (validation(error, editProfile)) {
      dispatch(userActions.EditProfile({ ...editProfile }));
    }
    setProfile(false);
  };
  const handleCancelProfile = (e) => {
    e.preventDefault();
    setProfile(false);
  };
  return (
    <div className={styles.EditProfileWrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.profileTitle}>Profile Detail</div>
        <div className={styles.btn}>
          <BaseButton
            variant="outlined"
            onClick={handleCancelProfile}
          >
            cancel
          </BaseButton>
          <BaseButton
            variant="contained"
            onClick={handleEditProfile}
          >
            Save
          </BaseButton>
        </div>
      </div>
      <Divider />
      <form className={styles.mainDetailWrapper}>
        {/* <div className={styles.infoWrapper}>
          <label className={styles.labelWrapper}>avatar</label>
          <Button variant="contained" component="label">
            Upload
            <input hidden accept="image/*" multiple type="file" />
          </Button>
        </div> */}

        <div className={styles.infoWrapper}>
          <label className={styles.labelWrapper}>First Name</label>
          <Input
            name="fname"
            variant="outlined"
            label="First Name"
            value={editProfile.fname}
            onChange={handleEditChange}
            required
            error={error.fname ? true : false}
            helperText={error.fname}
          />
        </div>

        <div className={styles.infoWrapper}>
          <label className={styles.labelWrapper}>Last Name</label>
          <Input
            name="lname"
            variant="outlined"
            label="Last Name"
            value={editProfile.lname}
            onChange={handleEditChange}
            required
            error={error.lname ? true : false}
            helperText={error.lname}
          />
        </div>



        <div className={styles.infoWrapper}>
          <label className={styles.labelWrapper}>Mobile</label>
          <Input
            name="mobile"
            variant="outlined"
            label="Mobile"
            value={editProfile.mobile}
            onChange={handleEditChange}
            required
            error={error.mobile ? true : false}
            helperText={error.mobile}
          />
        </div>

        <div className={styles.infoWrapper}>
          <label className={styles.labelWrapper}>Email</label>
          <Input
            name="email"
            variant="outlined"
            label="Email"
            InputProps={{
              readOnly: true,
            }}
            value={editProfile.email}
            onChange={handleEditChange}
            required
            error={error.email ? true : false}
            helperText={error.email}
          />
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
