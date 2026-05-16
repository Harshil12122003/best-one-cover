import React, { useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Listitems from "./listitems";
import Products from "pages/Product/ShowProduct";
import MoreIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import styles from "./Header.module.scss";
import LoginIcon from "@mui/icons-material/Login";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import useWindowSize from "components/atoms/useWindowSize";
import { AccountCircle } from "@material-ui/icons";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "redux/Auth/action";
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { io } from "socket.io-client";
import CloseIcon from "@mui/icons-material/Close";
import { display } from "@mui/system";
import shoppingBag from "assets/images/shopping-bag.png";
import audioTune from "assets/audio/Apple_Notification.mp3";
import store from "assets/images/store.png";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Toast } from "utils/toast";
import { sidebarMenu } from "./sideBarMenu";
import black_logo from '../../../assets/images/black_logo.svg';



const socket = io("https://best-1-backend.onrender.com");


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

const Header = ({
  handleBrand,
  handleCategory,
  isActiveCategory,
  isActiveBrand,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation()
  const [notificationsCounter, setNotificationsCounter] = useState(0);
  let audio = new Audio(audioTune);

  console.log("location", location.pathname)

  socket.on("newOrder", (arg) => {
    console.log(arg);
    // console.log("Order Recieved..");
    // setNotificationsCounter(notifications.length - notificationsList.length)
    audio.play();
    setNotificationsCounter(notificationsCounter + 1);
  });
  const { notifications: notificationsList } = useSelector(
    (state) => state.order
  );

  const [notifications, setNotifications] = useState(
    notificationsList ? notificationsList : []
  );

  useEffect(() => {
    // Listen for the 'newOrder' event and update the orders state
    socket.on("newOrder", (data) => {
      console.log("new order received:", data);
      Toast("success", data?.message);
      setNotifications((prevNotifications) => [data, ...prevNotifications]);
    });
    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("newOrder");
    };
  }, []);

  useEffect(() => {
    setNotifications([...notificationsList]);
  }, [notificationsList]);

  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [anchorElApps, setAnchorElApps] = React.useState(null);
  const token = localStorage.getItem("ADMIN_TOKEN");
  const menuId = "primary-search-account-menu";

  // console.log('token%%%%%%%%%%', token)

  const mobileMenuId = "primary-search-account-menu-mobile";

  const toggleDrawer = () => {
    setOpen(!open);
    console.log("open", open);
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isAppMenuOpen = Boolean(anchorElApps);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    setAnchorElApps(null);
  };

  const handleNotificationMenuClose = () => {
    setAnchorElApps(null);
    setNotificationsCounter(0);
  };

  const handleAppsMenuOpen = (event) => {
    setAnchorElApps(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleNavigateDashboard = () => {
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
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("ADMIN_TOKEN");
    dispatch(authActions.adminLogout());
    navigate("/signin");
    setAnchorEl(null);
  };

  const { width } = useWindowSize();

  useEffect(() => {
    if (width <= 992) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [width]);

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
      <MenuItem className={styles.box} onClick={handleProfile}>
        <div className={styles.profileIcon}>
          <EditIcon />
        </div>
        <div className={styles.profileIconTitle}> Profile </div>
      </MenuItem>
      <Divider />
      <MenuItem className={styles.box} onClick={handleLogout}>
        <div className={styles.profileIcon}>
          <LogoutIcon />
        </div>
        <div className={styles.profileIconTitle}> Sign Out </div>
      </MenuItem>
    </Menu>
  );

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return interval + " years ago";
    }

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months ago";
    }

    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days ago";
    }

    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours ago";
    }

    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes ago";
    }

    if (seconds < 10) return "just now";

    return Math.floor(seconds) + " seconds ago";
  };

  const renderMenuNotification = (
    <>
      <Menu
        anchorEl={anchorElApps}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        // id={menuAppsId}
        keepMounted
        // transformOrigin={{
        //   vertical: "bottom",
        //   horizontal: "right",
        // }}
        open={isAppMenuOpen}
        onClose={handleNotificationMenuClose}
        sx={{
          maxHeight: "550px",
          // overflowY: "scroll",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mx: 2,
            mb: 1,
          }}
        >
          <Typography
            variant="h6"
            component="h6"
            // color={"text.secondary"}
            sx={{ fontWeight: 600 }}
          >
            Notifications
          </Typography>
          <CloseIcon
            onClick={() => {
              handleNotificationMenuClose();
            }}
          />
        </Box>
        <Divider sx={{ color: "#e2e2e2" }} />

        {notifications?.length > 0 &&
          notifications?.slice(0, 8).map((notification) => {
            return (
              <MenuItem
                onClick={() => {
                  handleNotificationMenuClose();
                  // navigate(`/app/${app?.id}/${app?.appInfo?.appId}/reviews`);
                }}
                sx={{ my: 2 }}
              >
                <ListItem sx={{ p: 0 }}>
                  <ListItemAvatar>
                    <Avatar
                      alt={notification?.order?._id}
                      src={notification?.shop ? store : shoppingBag}
                      variant="rounded"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={notification?.message}
                    secondary={timeAgo(
                      new Date(
                        notification?.time
                          ? notification?.time
                          : notification?.createdAt
                      )
                    )}
                    nowrap
                  // secondary={app.appInfo?.genre}
                  />
                </ListItem>

                {/* <Typography
                variant="body2"
                component="p"
                color={"text.secondary"}
                sx={{ ml: 8 }}
              >
                {app.appInfo?.genre}
              </Typography> */}
                {/* </List> */}
              </MenuItem>
            );
          })}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mx: 2,
            // mb: 1,
            py: 2,
            position: "sticky",
            color: "#7E8299",
            bottom: 0,
            backgroundColor: "#fff",
            cursor: "pointer",
            // borderTop: 1px
          }}
          onClick={() => {
            handleNotificationMenuClose();
            navigate("/notifications");
          }}
        >
          <Divider sx={{ color: "#e2e2e2" }} />
          <Typography
            variant="subtitle1"
            component="p"
          // color={"text.secondary"}
          // sx={{ fontWeight: 600 }}
          >
            View All
          </Typography>
          <ChevronRightIcon />
        </Box>
      </Menu>
    </>
  );

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
      <MenuItem onClick={handleAppsMenuOpen}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={notificationsCounter} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notification</p>
      </MenuItem>
      <Divider />

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
    <>
      {/* <ThemeProvider theme={mdTheme}>
       <Box sx={{ display: 'flex'}}>
         <CssBaseline /> */}
      <AppBar
        position="absolute"
        open={open}
        sx={{
          backgroundColor: "#fff",
          color: "black",
          boxShadow: "none",
          borderBottom: "1px solid lightgray",
        }}
      >
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {
              location?.pathname === "/" && "Dashboard"
            }
            {
              location?.pathname === "/products" && "Product" || location?.pathname === "/product/new" && "Product"
            }
            {
              location?.pathname === "/user/orders" && "Order" || location?.pathname === "/shop/orders" && "Order"
            }
            {
              location?.pathname === "/stocks" && "Stock" || location?.pathname === "/stock/new" && "Stock"
            }
            {
              location?.pathname === "/report/revenue" && "Report" || location?.pathname === "/report/profit-loss" && "Report" || location?.pathname === "/report/sales" && "Report"
            }
            {
              location?.pathname === "/customers" && "User" || location?.pathname === "/managers" && "User"
            }
            {
              location?.pathname === "/shop/new" && "Shop" || location?.pathname === "/shops" && "Shop" || location?.pathname === "/shop/counter" && "Shop" || location?.pathname === "/shop/expense" && "Shop"
            }



          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={handleAppsMenuOpen}
            >
              <Badge badgeContent={notificationsCounter} color="error">
                <NotificationsIcon />
              </Badge>
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
      {renderMobileMenu}
      {token ? renderMenu : loginMenu}
      {token && renderMenuNotification}
      <Drawer variant="permanent" open={open} className={styles.mainSideBar}>
        <div className={styles.DrawerLogo}>
          <img src={black_logo} height={50} width={100} alt="Best-1 Logo" 
              className={styles.Logo} 
              onClick={handleNavigateDashboard}
          />
    
          <IconButton onClick={toggleDrawer} className={styles.menuBtn}>
            <MenuOpenIcon fontSize="inherit" />
          </IconButton>
        </div>
        <List component="nav">
          <Listitems
            openDrawer={open}
            handleBrand={handleBrand}
            handleCategory={handleCategory}
            isActiveCategory={isActiveCategory}
            isActiveBrand={isActiveBrand}
          />
        </List>
      </Drawer>
    </>
  );
};

export default Header;
