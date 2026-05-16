import { Divider, Typography } from "@mui/material";
import BaseButton from "components/atoms/Button";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./UserProfile.module.scss";

const UserProfile = (props) => {
  const { setProfile } = props;
  const userProfile = useSelector(state => state.user.user.userProfile)


  const userData = []
  userData.push(userProfile)


  const handleEditProfile = () => {
    setProfile(true)
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
              <Typography component={'span'} variant={'body2'} >{profileData?.fname}</Typography>
            </div>
          </div>

          <div className={styles.infoWrapper}>
            <label className={styles.labelWrapper}>Last Name</label>
            <div className={styles.valueWrapper}>
              {/* <span>{profileData.user.lname}</span> */}
              <Typography component={'span'} variant={'body2'} >{profileData?.lname}</Typography>

            </div>
          </div>

          <div className={styles.infoWrapper}>
            <label className={styles.labelWrapper}>Email</label>
            <div className={styles.valueWrapper}>
              <Typography component={'span'} variant={'body2'} >{profileData?.email}</Typography>

            </div>
          </div>

          <div className={styles.infoWrapper}>
            <label className={styles.labelWrapper}>Mobile</label>
            <div className={styles.valueWrapper}>
              <Typography component={'span'} variant={'body2'} >{profileData?.mobile}</Typography>

            </div>
          </div>
        </div>
      ))}


    </div>
  );
};

export default UserProfile;
