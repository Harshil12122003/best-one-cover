import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import styles from "./Header.module.scss";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import Collapse from "@mui/material/Collapse";
import EditIcon from "@mui/icons-material/Edit";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "redux/Products/action";
import { authActions } from "redux/Auth/action";
import black_logo from '../../../assets/images/black_logo.svg';
import white_logo from '../../../assets/images/white_logo.svg'
import Input from "components/atoms/Input";
import InputAdornment from '@mui/material/InputAdornment';
import { loaderAction } from "redux/Loader/action";

import {
  Badge,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

const Header = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.products);
  const { cartItems } = useSelector((state) => state.cart);
  // const { networkProgressDialog } = useSelector((state) => state.loader);
  const locationNotShow = ["/profile", "/orders", "/cart", "/checkout"]
  const locationMatch = locationNotShow.includes(location.pathname)

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [nestedDropdown, setNestedDropdown] = useState({});
  const [keyword, setKeyword] = useState("");

  // const token = Cookies.get("token")
  const token = localStorage.getItem("TOKEN");

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const { window } = props;
  const [hoverIsOn, sethoverIsOn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // const [lightMode, setLightMode] = useState(false);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const onHoverBrand = () => {
    sethoverIsOn(true)
  }

  const handleNestedDropDown = (id) => {
    setNestedDropdown((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  // const handleLightMode = () => {
  //   setLightMode((prevState) => !prevState);
  //   // setAnchorEl(null);
  //   handleMobileMenuClose();
  // };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    handleMobileMenuClose();
    setAnchorEl(null);
  };
  const handleDashboard = () => {
    // dispatch(loaderAction.startLoader())
    navigate("/");
  };
  const handleProfile = () => {
    handleMobileMenuClose();
    setAnchorEl(null);
    navigate("/profile");
  };
  const handleSignIn = () => {
    navigate("/signin");
    setAnchorEl(null);
  };

  const handlelogOut = (event) => {
    event.preventDefault();
    dispatch(authActions.userLogout());
    localStorage.clear();
    sessionStorage.clear();
    setAnchorEl(null);
  };
  const handleOrders = () => {
    handleMobileMenuClose();
    setAnchorEl(null);
    navigate("/orders");
  };
  const handleCart = () => {
    handleMobileMenuClose();
    navigate("/cart");
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSearch = (e) => {
    e.preventDefault()
    keyword && navigate(`/products/${keyword}`);
  };




  useEffect(() => {
    dispatch(actions.getBrands());
  }, [dispatch]);

  const brandList = (
    <Box>
      <List className={styles.brands}>
        {brands.map((brand) => (
          <ListItem key={brand._id} disablePadding className={styles.brandItems}>
            <ListItemButton
              onClick={() => {
                handleNestedDropDown(brand._id);
              }}
              className={styles.brandLink}
            >
              <ListItemText primary={brand.brand} />
              {nestedDropdown[brand._id] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse
              in={nestedDropdown[brand._id]}
              timeout="auto"
              unmountOnExit
              className={styles.megaBox}
            >
              <List
                component="div"
                disablePadding
                className={styles.collapseBrand}
              >
                {brand.models.map((model) => (
                  <ListItemButton
                    sx={{ pl: 5 }}
                    key={model._id}
                    onClick={handleDrawerToggle}
                    className={styles.collapseBrandItems}
                  >
                    {/* <ListItemText primary={element.name} /> */}
                    <NavLink
                      to={{pathname: `/products/${brand?.brand.toLowerCase()}/${model?.name
                        .toLowerCase()
                        .split(" ")
                        .join("-")}?bId=${brand._id}&mId=${model._id
                        }`, state: { prevPath: location.pathname }}}
                      style={{ color: "white" }}
                      
                    >
                      {model.name}
                    </NavLink>
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const drawer = (
    <Box>
      <Typography
        variant="h6"
        noWrap
        component="div"
        className={styles.mainlogo}
        onClick={handleDashboard}
        sx={{ cursor: "pointer", mx: 1, my: 2, }}
      >
        <img src={white_logo} height={40} width={90} alt="Best-1 Logo" />
      </Typography>
      <Divider />
      {brandList}
    </Box>
  );

  const menuId = "primary-search-account-menu";

  const loginMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      className={styles.profileBox}
    >
      <MenuItem className={styles.box} onClick={handleSignIn}>
        <div className={styles.profileIcon}>
          <LoginIcon />
        </div>
        <div className={styles.profileIconTitle}> Sign In </div>
      </MenuItem>
    </Menu>
  );

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      className={styles.profileBox}
    >
      <MenuItem className={styles.box} onClick={handleProfile}>
        <div className={styles.profileIcon}>
          <EditIcon />
        </div>
        <div className={styles.profileIconTitle}> Profile </div>
      </MenuItem>
      <Divider />
      <MenuItem className={styles.box} onClick={handleOrders}>
        <div className={styles.profileIcon}>
          <ListAltIcon />
        </div>
        <div className={styles.profileIconTitle}> Orders </div>
      </MenuItem>
      <Divider />
      <MenuItem className={styles.box} onClick={handlelogOut}>
        <div className={styles.profileIcon}>
          <LogoutIcon />
        </div>
        <div className={styles.profileIconTitle}> Sign Out </div>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      className={styles.mobileBox}
    >
      <MenuItem onClick={handleCart}>
        <IconButton size="large" color="inherit">
          <ShoppingCartIcon />
        </IconButton>
        <div>Cart</div>
      </MenuItem>
      <Divider />

      {/* <MenuItem onClick={handleLightMode}>
        <IconButton size="large" color="inherit">
          {lightMode ? <DarkModeSharpIcon /> : <WbSunnySharpIcon />}
        </IconButton>

        <div>{lightMode ? "Dark" : "Light"}</div>
      </MenuItem>
      <Divider /> */}

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <div>Profile</div>
      </MenuItem>
    </Menu>
  );

  return (
    <Box className={styles.header}>
      <AppBar position="static" className={styles.headerBar} sx={{ backgroundColor: "#fff", color: "black" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            className={styles.mainlogo}
            onClick={handleDashboard}
            sx={{ cursor: "pointer" }}
          >
            <img src={black_logo} height={50} width={100} alt="Best-1 Logo" />
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={styles.menuIcon}
          >
            <MenuIcon />
          </IconButton>


          <div className={styles.search}>
            <form onSubmit={handleSearch}>
              {/* <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper> */}
              {/* <StyledInputBase

                  className={styles.searchInput}
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  value={keyword}
                  onChange={(e) => {
                    setKeyword(e.target.value);
                  }}
                /> */}
              <Input
                size="small"
                className={styles.searchInput}
                placeholder="Search by mobile brand or model..."
                inputProps={{ "aria-label": "search" }}
                value={keyword}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  setKeyword(e.target.value);
                }} />
            </form>
          </div>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={handleCart}
            >
              <Badge badgeContent={cartItems && cartItems.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            {/* <IconButton
              size="large"
              aria-label="show 17 new"
              color="inherit"
              onClick={handleLightMode}
            >
              {lightMode ? <DarkModeSharpIcon /> : <WbSunnySharpIcon />}
            </IconButton> */}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {token ? <AccountCircle /> : <LoginIcon />}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          className={styles.sideDrawer}
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      {renderMobileMenu}
      {token ? renderMenu : loginMenu}
      {/* {location.pathname !== "/profile" && location.pathname !== "/orders" && <Box className={styles.brandItems}> */}

        {!locationMatch && <Box className={styles.brandItems}>
        <nav className={styles.navbar}>
          <ul className={styles.navitem}>
            {brands &&
              brands?.map((brand) => {
                return (
                  <li className={styles.liData} key={brand._id} onMouseOver={onHoverBrand}>
                    <NavLink href="#">{brand?.brand}</NavLink>
                    {hoverIsOn && <div className={styles.megaBox}>
                      <div className={styles.content}>
                        <div className={styles.row}>
                          <ul className={styles.megaLinks}>
                            {brand?.models?.map((model) => {
                              return (
                                <li key={model._id} onClick={() => { sethoverIsOn(false) }}>
                                  <NavLink
                                    to={`/products/${brand?.brand.toLowerCase()}/${model?.name
                                      .toLowerCase()
                                      .split(" ")
                                      .join("-")}?bId=${brand._id}&mId=${model._id
                                      }`}
                                  >
                                    {model.name}
                                  </NavLink>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>}
                  </li>
                );
              })}
          </ul>
        </nav>
      </Box>}
    </Box>
  );
};

export default Header;
