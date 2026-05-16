import React, { useEffect, useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CategoryIcon from "@mui/icons-material/Category";
import Collapse from "@mui/material/Collapse";
import AppsIcon from "@mui/icons-material/Apps";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
// import { Drawer, IconButton, ListItem, Toolbar } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { sidebarMenu } from "./sideBarMenu";
import { Box, Popper } from "@mui/material";

const Listitems = ({
  openDrawer,
  handleBrand,
  handleCategory,
  isActiveBrand,
  isActiveCategory,
}) => {
  // const [open, setOpen] = React.useState(true);
  const [nestedDropdown, setNestedDropdown] = useState({});
  const [dropdownItem, setDropdownItem] = useState([]);
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState({ status: false, id: "" });
  // const isMenuOpen = Boolean(anchorEl);
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  // const handleClick = () => {
  //   setOpen(!open);
  // };

  // console.log("isActiveDrawer", isActiveDrawer);

  const handleDrawerToggle = (id) => {
    setActiveMenu({ status: true, id: id });
    setMobileOpen((prevState) => !prevState);
  };

  const handleNestedDropDown = (id) => {
    if (![2, 3, 4, 5, 6, 7].includes(id)) {
      setActiveMenu({ status: true, id: id });
    }
    openDrawer &&
      setNestedDropdown((prevState) => ({
        ...prevState,
        [id]: !prevState[id],
      }));
  };

  useEffect(() => {
    setNestedDropdown({});
  }, [openDrawer]);

  return (
    <>
      <React.Fragment>
        {sidebarMenu.map((item, i) => {
          return (
            // minWidth: "35px",
            <div key={item._id}>
              {i === 1 && <ListSubheader component="div">Pages</ListSubheader>}
              <ListItemButton
                aria-describedby={id}
                onClick={(e) => {
                  !openDrawer && handleClick(e);
                  setDropdownItem(item.subName ? item.subName : [])
                  handleNestedDropDown(item._id);
                  item?.navigate && navigate(item?.navigate);
                }}
                sx={
                  // activeMenu.status &&
                  // activeMenu.id === item._id && location.pathname === "/" &&
                  // !item.subName && {
                  location.pathname === "/" &&
                  !item.subName && {
                    backgroundColor: "rgb(235,241,254)",
                    color: "rgb(8 72 202)",
                    borderRight: "3px solid rgb(8 72 202)",
                  }
                }
              >
                <ListItemIcon
                  sx={{
                    minWidth: "35px",
                    color:
                      activeMenu.status &&
                      activeMenu.id === item._id &&
                      !item.subName
                        ? "rgb(8 72 202)"
                        : "",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {openDrawer && (
                  <ListItemText
                    primary={item.menuName}
                    sx={{ textTransform: "capitalize" }}
                  />
                )}
                {openDrawer && item.subName ? (
                  nestedDropdown[item._id] ? (
                    <ExpandLess sx={{ color: "gray", fontSize: "23px" }} />
                  ) : (
                    <ExpandMore sx={{ color: "gray", fontSize: "23px" }} />
                  )
                ) : (
                  ""
                )}
              </ListItemButton>
              {item.subName && (
                <Collapse
                  in={nestedDropdown[item._id]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.subName.map((element) => {
                      return (
                        <ListItemButton
                          sx={{
                            pl: 6.5,
                            backgroundColor:
                              activeMenu.status && activeMenu.id === element._id
                                ? "rgb(235,241,254)"
                                : "",
                            color:
                              activeMenu.status && activeMenu.id === element._id
                                ? "rgb(8 72 202)"
                                : "",
                            borderRight:
                              activeMenu.status && activeMenu.id === element._id
                                ? "3px solid rgb(8 72 202)"
                                : "",
                          }}
                          key={element._id}
                          onClick={() => {
                            handleDrawerToggle(element._id);
                            element?.navigate && navigate(element?.navigate);
                          }}
                          className={
                            activeMenu.status && activeMenu.id === element._id
                              ? "active"
                              : ""
                          }
                        >
                          <ListItemText
                            primary={element.name}
                            sx={{
                              textTransform: "capitalize",
                              fontSize: "10px",
                            }}
                          />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              )}
            </div>
          );
        })}
      </React.Fragment>

      <Divider sx={{ my: 1 }} />
      <React.Fragment>
        <ListSubheader component="div">Catalog</ListSubheader>
        <ListItemButton
          onClick={handleBrand}
          sx={{
            backgroundColor: isActiveBrand ? "rgb(235,241,254)" : "",
            color: isActiveBrand ? "rgb(8 72 202)" : "",
            borderRight: isActiveBrand ? "3px solid rgb(8 72 202)" : "",
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: "35px",
              color: isActiveBrand ? "rgb(8 72 202)" : "",
            }}
          >
            <AppsIcon />
          </ListItemIcon>
          {openDrawer && <ListItemText primary="Brand" />}
        </ListItemButton>
        <ListItemButton
          onClick={handleCategory}
          sx={{
            backgroundColor: isActiveCategory ? "rgb(235,241,254)" : "",
            color: isActiveCategory ? "rgb(8 72 202)" : "",
            borderRight: isActiveCategory ? "3px solid rgb(8 72 202)" : "",
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: "35px",
              color: isActiveCategory ? "rgb(8 72 202)" : "",
            }}
          >
            <CategoryIcon />
          </ListItemIcon>
          {openDrawer && <ListItemText primary="Category" />}
        </ListItemButton>
        {!openDrawer && <Popper id={id} open={open} anchorEl={anchorEl} placement={"right"}>
          <Box sx={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px", py: 1, bgcolor: "background.paper", ml: .2, zIndex: 9999 }}>
          <List component="div" disablePadding>
                    {dropdownItem.map((element) => {
                      return (
                        <ListItemButton
                          sx={{
                            // pl: 6.5,
                            backgroundColor:
                              activeMenu.status && activeMenu.id === element._id
                                ? "rgb(235,241,254)"
                                : "",
                            color:
                              activeMenu.status && activeMenu.id === element._id
                                ? "rgb(8 72 202)"
                                : "",
                            borderRight:
                              activeMenu.status && activeMenu.id === element._id
                                ? "3px solid rgb(8 72 202)"
                                : "",
                          }}
                          key={element._id}
                          onClick={() => {
                            setAnchorEl(null)
                            handleDrawerToggle(element._id);
                            element?.navigate && navigate(element?.navigate);
                          }}
                          className={
                            activeMenu.status && activeMenu.id === element._id
                              ? "active"
                              : ""
                          }
                        >
                          <ListItemText
                            primary={element.name}
                            sx={{
                              textTransform: "capitalize",
                              fontSize: "10px",
                            }}
                          />
                        </ListItemButton>
                      );
                    })}
                  </List>
          </Box>
        </Popper>}
      </React.Fragment>
    </>
  );
};

export default Listitems;
