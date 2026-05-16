import React, { useEffect, useState } from "react";
import ManagerProfile from "./AdminProfile";
import EditProfile from "./EditProfile";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "./Profile.module.scss";
import Address from "./Address";
import AddressForm from "./Address/AddressForm";
import ChangePassword from "./ChangePassword";
import { Avatar } from "@mui/material";
import { adminActions } from "redux/Admin/action";
import { useDispatch, useSelector } from "react-redux";

const Profile = (props) => {
  const dispatch = useDispatch();
  const {adminProfile} = useSelector((state) => state?.admin?.admin);

  // console.log("managerProfile", adminProfile)

  const [value, setValue] = useState(0);
  const [profile, setProfile] = useState(false);
  const [address, setAddress] = useState(false);


  const userData = [];
  userData.push(adminProfile);

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
    dispatch(adminActions.adminDetail());
  }, [dispatch]);

  return userData.map((profileData, index) => {
    return (
      <div className={styles.userProfileWrapper}>
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
              <BaseButton variant="contained" onClick={onFileUpload}>
                Upload!
              </BaseButton>
            </div> */}

            <div className={styles.avatarDetails}>
              <div className={styles.avatarTitle}>
                <h2 className={styles.profileName}>{profileData?.fname} {profileData?.lname}</h2>
                <h4 className={styles.profileEmail}>{profileData?.email}</h4>
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
                {/* <Tab label="Address" {...a11yProps(1)} /> */}
                <Tab label="Password" {...a11yProps(1)} />
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
                adminOldData={profileData}
              />
            ) : (
              <ManagerProfile
                profile={profile}
                setProfile={setProfile}
                adminData={profileData}
              />
            )}
          </TabPanel>
          {/* <TabPanel value={value} index={1}>
            {address ? (
              <AddressForm address={address} setAddress={setAddress} />
            ) : (
              <Address setAddress={setAddress} />
            )}
          </TabPanel> */}
          <TabPanel value={value} index={1}>
            <ChangePassword />
          </TabPanel>
        </Box>
      </div>
    );
  });
};

export default Profile;
