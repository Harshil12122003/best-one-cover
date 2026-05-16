import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import General from "./General";
import Variation from "./Variation";
import styles from "./AddProduct.module.scss";
import { useNavigate, useParams } from "react-router";
import BreadCrumb from "components/atoms/BreadCrumb";

const AddProduct = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
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
  const handleChange = (event, newValue) => {
    // console.log(newValue)
    setValue(newValue);
  };

  const handleHome = (event) => {
    event.preventDefault();
    navigate("/");
  };

  const handleProduct = (event) => {
    event.preventDefault();
    navigate("/product/New");
  };

  return (
    <div className={styles.addProducts}>
      <div className={styles.addProductContainer}>
        {/* <div className={styles.productHeader}> */}
          <div className={styles.productHeadLine}>
            <Typography variant="h5" component="h2">
              {params?.id ? "Update Product" : "add product"}
            </Typography>
            <div className={styles.BreadCrumb}>
              <BreadCrumb
                parentElement="Home"
                childLink={
                  params?.id ? `/product/${params?.id}` : `/product/new`
                }
                childElement="Product"
                child2Link={
                  params?.id ? `/product/${params?.id}` : `/product/new`
                }
                child2Element={params?.id ? "Update Product" : "Add Product"}
              />
            </div>
          </div>

          <div className={styles.productTabs}>
            {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="General" {...a11yProps(0)} />
                <Tab label="variation" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <General />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Variation />
            </TabPanel> */}
            <General />
          </div>

          {/* <div className={styles.productBtn}>
            <div className={styles.productBtnWrapper}>
              <BaseButton variant="outlined">cancel</BaseButton>
              <BaseButton variant="contained">add product</BaseButton>
            </div>
          </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default AddProduct;
