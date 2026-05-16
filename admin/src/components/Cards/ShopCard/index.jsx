import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/system";
import store from "assets/images/store.png";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import { shopActions } from "redux/Shop/action";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

function ShopCard({ shop }) {

  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log("shop******",shop)
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleEdit = () => {
    navigate(`/shop/${shop._id}`)
  }
  const handleDelete = () => {
  console.log("shop******",shop)

    dispatch(shopActions.deleteShop(shop._id));
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        // avatar={
        //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        //     R
        //   </Avatar>
        // }
        action={
          <IconButton aria-label="settings" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        }
        // title="Shrimp and Chorizo Paella"
        subheader={new Date(shop.createdAt).toDateString()}
      />
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEdit} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleDelete} disableRipple>
          <DeleteIcon />
          Delete
        </MenuItem>
      </StyledMenu>
      {/* <CardMedia
      component="img"
      height="194"
      image="/static/images/cards/paella.jpg"
      alt="Paella dish"
    /> */}
      <CardContent sx={{ textAlign: "center" }}>
        <Box sx={{ width: "100px", mx: "auto" }}>
          {/* <StoreIcon fontSize="large" sx={{ fontSize: "100px" }} /> */}
          <img src={store} alt="store" style={{ width: "100%" }} />
        </Box>

        <Typography variant="h6" color="">
          {shop?.shopName?.replace(/\b\w/g, (c) => c.toUpperCase())}
        </Typography>
        <Typography variant="body1" color="" sx={{ mt: 1, mb: 0.5, }}>
          {shop?.shopAddress?.address?.replace(/\b\w/g, (c) =>
            c.toUpperCase()
          ) +
            ", " +
            shop?.shopAddress?.landmark?.replace(/\b\w/g, (c) =>
              c.toUpperCase()
            )}
        </Typography>
        <Typography variant="body2" color="">
          {shop?.shopAddress?.city?.replace(/\b\w/g, (c) => c.toUpperCase()) +
            ", " +
            shop?.shopAddress?.state?.replace(/\b\w/g, (c) => c.toUpperCase()) +
            ", " +
            shop?.shopAddress?.pincode}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ShopCard;
