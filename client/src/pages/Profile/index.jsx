import React, { useEffect, useState } from "react";
import UserProfile from "./UserProfile";
import EditProfile from "./EditProfile";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "./Profile.module.scss";
import Address from "./Address";
import AddressForm from "./Address/AddressForm";
import Coupons from "./Coupons";
import Wishlist from "./Wishlist";
import Notifications from "./Notification";
import ReviewRating from "./Review & Rating";
import ChangePassword from "./ChangePassword";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import BaseButton from "components/atoms/Button";
import { userActions } from "redux/User/action";
import { useNavigate } from "react-router-dom";

const Profile = (props) => {
  const userProfile = useSelector((state) => state.user.user.userProfile);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const token = localStorage.getItem("TOKEN");
  const [value, setValue] = useState(0);
  const [profile, setProfile] = useState(false);
  const [address, setAddress] = useState(false);

  const userData = [];
  userData.push(userProfile);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  useEffect(() => {
    if (!token) {
      navigate("/signin")
    }
    dispatch(userActions.userDetail());
  }, []);


  console.log('profile', profile)

  return userData.map((profileData, index) => {
    return (
      <>
      {token && <div className={styles.userProfileWrapper} key={index}>
        {/* {console.log('profileData', profileData)} */}
        <div className={styles.contentWrapper}>
          <div className={styles.profileHeader}>
            <div className={styles.avatarWrapper}>

              <Avatar
                src="/broken-image.jpg"
                variant="square"
                className={styles.avater}
              />
            </div>

            {/* <div className={styles.profileImg}>
              <input
                type="file"
                name="userImg"
                id="userImg"
                onChange={onFileChange}
                // className={styles.userImg}
                accept=".png, .jpg, .jpeg"
              />
              <BaseButton variant="contained" onClick={onFileUpload} style={{background:"#1e1e2d"}}>
                Upload!
              </BaseButton>
            </div> */}

            <div className={styles.avatarDetails}>
              <div className={styles.avatarTitle}>
                <h3>
                  {profileData?.fname} {profileData?.lname}
                </h3>
                <h5>{profileData?.email}</h5>
              </div>
            </div>
          </div>

          <div className={styles.tabs}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Profile" {...a11yProps(0)} />
                <Tab label="Address" {...a11yProps(1)} />
                {/* <Tab label="Coupons" {...a11yProps(2)} /> */}
                {/* <Tab label="Wishlist" {...a11yProps(2)} /> */}
                <Tab label="Reviews & Rating" {...a11yProps(2)} />
                <Tab label="Password" {...a11yProps(3)} />
                {/* <Tab label="Notifications" {...a11yProps(5)} /> */}
              </Tabs>
            </Box>
          </div>
        </div>

        <Box className={styles.profileComponent}>
          <TabPanel value={value} index={0}>
            {profile ? (
              <EditProfile
                profile={profile}
                setProfile={setProfile}
                userOldData={profileData}
              />
            ) : (
              <UserProfile profile={profile} setProfile={setProfile} />
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
               
            <AddressForm address={address}   setProfile={setProfile} />
            {/* {address ? (
              <AddressForm address={address} setAddress={setAddress} />
            ) : (
              <Address setAddress={setAddress} />
            )} */}
          </TabPanel>
          {/* <TabPanel value={value} index={2}>
            <Coupons />
          </TabPanel> */}
          {/* <TabPanel value={value} index={2}>
            <Wishlist />
          </TabPanel> */}
          <TabPanel value={value} index={2}>
            <ReviewRating />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <ChangePassword />
          </TabPanel>
          {/* <TabPanel value={value} index={5}>
            <Notifications />
          </TabPanel> */}
        </Box>
      </div>}
      </>
    );
  });
};

export default Profile;
