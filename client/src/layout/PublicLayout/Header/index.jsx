import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import WbSunnySharpIcon from "@mui/icons-material/WbSunnySharp";
import DarkModeSharpIcon from "@mui/icons-material/DarkModeSharp";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import styles from "./Header.module.scss";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import Collapse from "@mui/material/Collapse";
import EditIcon from "@mui/icons-material/Edit";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListAltIcon from "@mui/icons-material/ListAlt";
// import useWindowSize from '../../../components/atoms/useWindowSize'

import {
  Badge,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "redux/Products/action";
import { authActions } from "redux/Auth/action";
// import Cookies from "js-cookie";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("md")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Header = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.products);
  const { cartItems } = useSelector((state) => state.cart);
  // const { token } = useSelector((state) => state.auth);
  const [keyword, setKeyword] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [nestedDropdown, setNestedDropdown] = useState({});

  // const token = Cookies.get("token")
  const token = localStorage.getItem("TOKEN");

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lightMode, setLightMode] = useState(false);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleNestedDropDown = (id) => {
    setNestedDropdown((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  const handleLightMode = () => {
    setLightMode((prevState) => !prevState);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleDashboard = () => {
    navigate("/");
  };
  const handleProfile = () => {
    setAnchorEl(null);
    navigate("/profile");
  };
  const handleSignIn = () => {
    setAnchorEl(null);
    navigate("/signin");
  };

  const handlelogOut = (event) => {
    event.preventDefault();
    dispatch(authActions.userLogout());

    setAnchorEl(null);
    // navigate("/signin");
  };
  const handleOrders = () => {
    setAnchorEl(null);
    navigate("/orders");
  };
  const handleCart = () => {
    navigate("/cart");
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    dispatch(actions.getBrands());
  }, [dispatch]);

  const brandList = (
    <Box>
      <List className={styles.brands}>
        {brands.map((item) => (
          <ListItem key={item._id} disablePadding className={styles.brandItems}>
            <ListItemButton
              onClick={() => {
                handleNestedDropDown(item._id);
              }}
              className={styles.brandLink}
            >
              <ListItemText primary={item.brand} />
              {nestedDropdown[item._id] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse
              in={nestedDropdown[item._id]}
              timeout="auto"
              unmountOnExit
              className={styles.megaBox}
            >
              <List
                component="div"
                disablePadding
                className={styles.collapseBrand}
              >
                {item.models.map((element) => (
                  <ListItemButton
                    sx={{ pl: 5 }}
                    key={element._id}
                    onClick={handleDrawerToggle}
                    className={styles.collapseBrandItems}
                  >
                    <ListItemText primary={element.name} />
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
      <Typography variant="h6" sx={{ mx: 2, my: 2, fontWeight: 800 }}>
        Best1
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
      <MenuItem onClick={handleSignIn}>
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
      <MenuItem onClick={handleProfile}>
        <div className={styles.profileIcon}>
          <EditIcon />
        </div>
        <div className={styles.profileIconTitle}> Profile</div>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleOrders}>
        <div className={styles.profileIcon}>
          <ListAltIcon />
        </div>
        <div className={styles.profileIconTitle}> Orders </div>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handlelogOut}>
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
    >
      <MenuItem onClick={handleCart}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={17} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem onClick={handleLightMode}>
        <IconButton size="large" aria-label="show 17 new" color="inherit">
          {lightMode ? <DarkModeSharpIcon /> : <WbSunnySharpIcon />}
        </IconButton>

        <div>{lightMode ? "Dark" : "Light"}</div>
      </MenuItem>

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
      <AppBar position="static" className={styles.headerBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={styles.menuIcon}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            className={styles.mainlogo}
            onClick={handleDashboard}
          >
            Best1
          </Typography>
          <form className="" onSubmit={onSubmit}>
            <Search className={styles.search}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                className={styles.searchInput}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={keyword}
               onChange={()=>{
               }}
              />
            </Search>
          </form>
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
            <IconButton
              size="large"
              aria-label="show 17 new"
              color="inherit"
              onClick={handleLightMode}
            >
              {lightMode ? <DarkModeSharpIcon /> : <WbSunnySharpIcon />}
            </IconButton>
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

      <Box className={styles.brandItems}>
        <nav className={styles.navbar}>
          <ul className={styles.navitem}>
            {brands &&
              brands?.map((brand) => {
                return (
                  <li className={styles.liData} key={brand._id}>
                    <NavLink href="#">{brand?.brand}</NavLink>
                    <div className={styles.megaBox}>
                      <div className={styles.content}>
                        <div className={styles.row}>
                          <ul className={styles.megaLinks}>
                            {brand?.models?.map((model) => {
                              return (
                                <li key={model._id}>
                                  <NavLink href="">{model.name}</NavLink>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </nav>
      </Box>
    </Box>
  );
};

export default Header;
