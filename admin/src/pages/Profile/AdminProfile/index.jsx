import React from "react";
import BaseButton from "components/atoms/Button";
import { Divider, Typography } from "@mui/material";
import styles from "./AdminProfile.module.scss";

const AdminProfile = (props) => {
  const { setProfile, adminData } = props;

  // console.log('setProfile######3',  adminData)

  // const userData = [
  //   {
  //     fname: "jignesh",
  //     lname: "nakum",
  //     email: "jignesh@gmail.com",
  //     mobile: 9712157194,
  //     rule: "super-admin",
  //   },
  // ];

  const userData = [];
  userData.push(adminData);

  const handleEditProfile = () => {
    setProfile(true);
  };

  return (
    <div className={styles.UserDetailsWrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.profileTitle}>Profile Detail</div>
        <div className={styles.editBtn}>
          <BaseButton variant="contained" onClick={handleEditProfile}>
            Edit Profile
          </BaseButton>
        </div>
      </div>
      {userData.map((profileData, index) => (
        <div className={styles.mainDetailWrapper} key={index}>
          <div className={styles.infoWrapper}>
            <label className={styles.labelWrapper}>First Name</label>
            <div className={styles.valueWrapper}>
              <Typography component={"span"} variant={"body2"}>
                {profileData?.fname}
              </Typography>
            </div>
          </div>

          <div className={styles.infoWrapper}>
            <label className={styles.labelWrapper}>Last Name</label>
            <div className={styles.valueWrapper}>
              <Typography component={"span"} variant={"body2"}>
                {profileData?.lname}
              </Typography>
            </div>
          </div>

          <div className={styles.infoWrapper}>
            <label className={styles.labelWrapper}>Email</label>
            <div className={styles.valueWrapper}>
              <Typography component={"span"} variant={"body2"}>
                {profileData?.email}
              </Typography>
            </div>
          </div>

          <div className={styles.infoWrapper}>
            <label className={styles.labelWrapper}>Mobile</label>
            <div className={styles.valueWrapper}>
              <Typography component={"span"} variant={"body2"}>
                {profileData?.mobile}
              </Typography>
            </div>
          </div>

          <div className={styles.infoWrapper}>
            <label className={styles.labelWrapper}>role</label>
            <div className={styles.valueWrapper}>
              <Typography component={"span"} variant={"body2"}>
                {profileData?.role}
              </Typography>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminProfile;
