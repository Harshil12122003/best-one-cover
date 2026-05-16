import React, { useState, useEffect } from "react";
import { Divider } from "@mui/material";
import BaseButton from "components/atoms/Button";
import Input from "components/atoms/Input";
import styles from "./EditProfile.module.scss";
import { adminActions } from "redux/Admin/action";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { editProfileSchema } from "schemas/Validation";

const EditProfile = ({ setProfile, adminOldData }) => {
  const { fname, lname, email, mobile } = adminOldData;

  const dispatch = useDispatch();
  const [editProfile, setEditProfile] = useState({
    fname,
    lname,
    email,
    mobile,
  });

  const handleCancel = () => {
    setProfile(false);
  };
  const { values, setValues, errors, handleChange, handleSubmit } = useFormik({
    initialValues: adminOldData,
    validationSchema: editProfileSchema,

    onChange: (event) => {
      const { name, value } = event.target;
      setEditProfile({ ...editProfile, [name]: value });
    },

    onSubmit: () => {
      dispatch(adminActions.adminEditProfile(values));
      setProfile(false);
    },
  });

  useEffect(() => {
    setValues({
      fname,
      lname,
      email,
      mobile,
    });
  }, [adminOldData]);

  return (
    <form className={styles.EditProfileWrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.profileTitle}>Profile Detail</div>
        <div className={styles.Btn}>
          <BaseButton variant="outlined" onClick={handleCancel}>
            Cancel
          </BaseButton>
          <BaseButton variant="contained" type="submit" onClick={handleSubmit}>
            Save
          </BaseButton>
        </div>
      </div>
      <Divider />
      <div className={styles.mainDetailWrapper}>
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
            value={values?.fname}
            onChange={handleChange}
            required
            error={errors?.fname ? true : false}
            helperText={errors?.fname}
          />
        </div>

        <div className={styles.infoWrapper}>
          <label className={styles.labelWrapper}>Last Name</label>
          <Input
            name="lname"
            variant="outlined"
            label="Last Name"
            value={values?.lname}
            onChange={handleChange}
            required
            error={errors?.lname ? true : false}
            helperText={errors?.lname}
          />
        </div>

        <div className={styles.infoWrapper}>
          <label className={styles.labelWrapper}>Mobile</label>
          <Input
            name="mobile"
            variant="outlined"
            label="Mobile"
            value={values?.mobile}
            onChange={handleChange}
            required
            error={errors?.mobile ? true : false}
            helperText={errors?.mobile}
          />
        </div>

        <div className={styles.infoWrapper}>
          <label className={styles.labelWrapper}>Email</label>
          <Input
            name="email"
            variant="outlined"
            label="Email"
            value={values?.email}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
      </div>
    </form>
  );
};

export default EditProfile;
