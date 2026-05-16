import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { alpha } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import { actions } from "redux/Products/action";
import styles from "./Category.module.scss";
import BasicModal from "components/atoms/Modal";
import Input from "components/atoms/Input";
// import { useFormik } from "formik";
// import { editCategorySchema } from "schemas/Validation";
// import BaseButton from "components/atoms/Button";

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
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 4px 6px -2px",
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

const Category = ({ category }) => {

  const dispatch = useDispatch();
  const [openPopUp, setOpenPopUp] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [inputItem, setInputItem] = useState(null);
  const [editCategory, setEditCategory] = useState({ name: category.name, id: category._id });

  const handleClose = () => {
    setAnchorEl(null);
    setOpenPopUp(false);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenPopUp(!openPopUp);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, "=--", value);
    setEditCategory({ ...editCategory, [name]: value });
  };

  // console.log(editCategory);

  const handleDelete = () => {
    const id = category._id;
    dispatch(actions.deleteCategories(id));
  };

  // const { values, errors, handleChange, handleSubmit } = useFormik({
  //   initialValues: editCategory,
  //   validationSchema: editCategorySchema,

  //   onChange: (event) => {
  //    // const { name, value } = event.target;
  //     setEditCategory(event.target.value);
  //   },

  //   onSubmit: () => {
  //     console.log("object")
  //     // dispatch(actions.editCategories());

  //   },
  // });

  const handleEdit = () => {
    setOpenModal(true);
    setInputItem(
      <>
        <form onSubmit={handleSubmit}>
          <Input
            variant="outlined"
            name="category"
            label="Edit Category"
            value={editCategory.category}
            onChange={(e) => {
              handleChange(e);
            }}
            // error={errors.category ? true : false}
            // helperText={errors.category}
            required
          />
          {/* <BaseButton onClick={handleCloseModal} variant="outlined">
            Cancel
          </BaseButton>
          <BaseButton variant="contained" type="submit">
            Save
          </BaseButton> */}
        </form>
      </>
    );
    setOpenPopUp(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Edit");
    console.log("editCategory!!!!!!!!!!", editCategory.category);
    dispatch(actions.editCategories(editCategory))
    setOpenModal(false);
  };
  return (
    <>
      <div className={styles.listItems}>
        <p className={styles.brandItem}>{editCategory?.name}</p>
        <IconButton onClick={handleClick} aria-label="settings">
          <MoreVertIcon />
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={openPopUp}
            onClose={handleClose}
          >
            <MenuItem onClick={handleEdit}>
              <EditIcon />
              Edit
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={handleDelete}>
              <DeleteIcon />
              Delete
            </MenuItem>
          </StyledMenu>
        </IconButton>
      </div>
      <BasicModal
        openModal={openModal}
        title="edit category"
        handleCloseModal={handleCloseModal}
        // handleSubmit={handleSubmit}
        handleClick={handleSubmit}
      >
        {/* {inputItem} */}
        <form>
          <Input
            variant="outlined"
            name="name"
            label="Edit Category"
            value={editCategory.name}
            onChange={handleChange}
            // error={errors.category ? true : false}
            // helperText={errors.category}
            required
          />
        </form>
      </BasicModal>
    </>
  );
};

export default Category;
