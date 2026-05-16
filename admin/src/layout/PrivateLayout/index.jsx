import React, { useState, useEffect } from "react";
import Header from "./Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import styles from "./PrivateLayout.module.scss";
import { actions } from "redux/Products/action";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import Category from "components/Category";
import Drawer from "components/atoms/Drawer";
import Brand from "components/Brand";
import Footer from "./Footer";
import { IconButton, ListItemButton, ListItemIcon, Typography } from "@mui/material";

const PrivateLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { brands, categories } = useSelector((state) => state.products);


  const [openBrand, setOpenBrand] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [isActiveBrand, setIsBrandActive] = useState(false);
  const [isActiveCategory, setIsCategoryActive] = useState(false);

  const handleBrand = () => {
    setIsBrandActive(!isActiveBrand);
    setIsCategoryActive(false);

    setOpenBrand(!openBrand);
    setOpenCategory(false);
  };

  const handleCategory = () => {
    setIsCategoryActive(!isActiveCategory);
    setIsBrandActive(false);
    setOpenBrand(false);
    setOpenCategory(!openCategory);
  };


  const mdTheme = createTheme();

  const listCategory = (
    <div className={styles.list}>
      {categories &&
        categories?.length > 0 &&
        categories?.map((categoryValue, index) => (
          <Category category={categoryValue} />
        ))}
    </div>
  );

  const listBrand = (
    <div className={styles.listItems}>
      {brands &&
        brands?.length > 0 &&
        brands?.map((brandValue, index) => <Brand brand={brandValue} />)}
    </div>
  );


  useEffect(() => {
    dispatch(actions.getBrands());
    dispatch(actions.getCategories());
  }, [dispatch]);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header
          handleBrand={handleBrand}
          handleCategory={handleCategory}
          isActiveCategory={isActiveCategory}
          isActiveBrand={isActiveBrand}
        />
        <Box
          component="main"
          className={styles.mainComponent}
          sx={{
            flexGrow: 1,
          }}
        >
          <Drawer
            variant="persistent"
            anchor="right"
            open={openBrand}
            handleClose={handleBrand}
            handleOpen={handleBrand}
          >
            <div className={styles.brandTitle}>
              <Typography variant="h5" gutterBottom>
                brand
              </Typography>
              <div onClick={handleBrand} className={styles.brandClose}>
                <IconButton>
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
            {listBrand}
          </Drawer>
          <Drawer
            variant="persistent"
            anchor="right"
            open={openCategory}
            handleClose={handleCategory}
            handleOpen={handleCategory}
          >
            {/* <CloseIcon /> */}
            <div className={styles.categoryTitle}>
              <Typography variant="h5" gutterBottom>
                category
              </Typography>
              <div onClick={handleCategory} className={styles.categoryClose} >
                <IconButton>
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
            {listCategory}
          </Drawer>
          {children}
          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default PrivateLayout;
