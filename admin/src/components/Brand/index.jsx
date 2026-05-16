import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { alpha } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import { actions } from "redux/Products/action";
import styles from "./Brand.module.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Input from "components/atoms/Input";
// import { useFormik } from "formik";
// import { editCategorySchema } from "schemas/Validation";
// import BaseButton from "components/atoms/Button";
import Modal from "components/Modal";
import { Box } from "@mui/system";
import BasicModal from "components/atoms/Modal";

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

const Brand = ({ brand }) => {
  // const [openPopUpModel, setOpenPopUpModel] = useState(false);
  // const [anchorElModel, setAnchorElModel] = React.useState(null);
  const dispatch = useDispatch();
  const [openPopUp, setOpenPopUp] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openBrandModel, setOpenBrandModel] = useState(false);
  const [inputItem, setInputItem] = useState("");
  const [brandData, setBrandData] = useState({
    brand: brand.brand,
    id: brand._id,
  });
  const [modelData, setModelData] = useState({
    name: "",
    id: "",
  });

  const handleClose = () => {
    setAnchorEl(null);
    setOpenPopUp(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setBrandData({
      brand: brand.brand,
      id: brand._id,
    });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenPopUp(!openPopUp);
  };

  const handleDelete = () => {
    const id = brand._id;
    dispatch(actions.deleteBrand(id));
  };

  const handleEdit = () => {
    setOpenModal(true);
    setOpenPopUp(false);
  };

  const handelSaveModel = (id) => {
    const data = {
      brandId: brand?._id,
      modelId: id,
      name: modelData?.name,
    };
    dispatch(actions.editModel(data));
    // setOpenModal(false);
  };

  const handleDeleteModel = (id) => {
    dispatch(actions.deleteModel({ brandId: brand?._id, modelId: id }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, "=--", value);
    setBrandData({ ...brandData, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("brandData%%%%%", brandData);
    dispatch(actions.editBrand(brandData));

    setOpenModal(false);
  };

  // console.log("brand#####", brand.brand);

  return (
    <>
      <div className={styles.listItems}>
        <p className={styles.brandItem}>{brandData?.brand}</p>
        {/* <p className={styles.brandItem}>{brand?.brand}</p> */}

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
            <MenuItem
              onClick={() => {
                setOpenBrandModel(true);
              }}
            >
              <VisibilityIcon />
              View Models
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
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
        title="edit Brand"
        handleCloseModal={handleCloseModal}
        // handleSubmit={handleSubmit}
        handleClick={handleSubmit}
      >
        <form>
          <Input
            variant="outlined"
            name="brand"
            label="Edit Brand"
            value={brandData.brand}
            onChange={handleChange}
            // error={errors.category ? true : false}
            // helperText={errors.category}
            required
          />
        </form>
      </BasicModal>

      {openBrandModel && (
        <Modal
          open={openBrandModel}
          setOpen={setOpenBrandModel}
          title={`Models of ${brand?.brand}`}
          // onClick={() => {
          //   setOpenBrandModel(false);
          // }}
          // handleSubmit={handleSubmit}
          sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 650 } }}
          dividers={true}
        >
          {brand?.models?.length > 0 &&
            brand?.models.map((model) => {
              return (
                <div key={model?._id}>
                  {model?._id !== inputItem && (
                    <div className={styles.listItems} key={model?._id}>
                      <p className={styles.brandItem}>
                        {modelData.name && modelData?.id === model?._id
                          ? modelData.name
                          : model?.name}
                      </p>
                      <div>
                        <EditIcon
                          fontSize="small"
                          sx={{ mr: 1, color: "green", cursor: "pointer" }}
                          onClick={() => {
                            setInputItem(model?._id);
                            setModelData({ name: model?.name, id: model?._id });
                          }}
                        />
                        <DeleteIcon
                          fontSize="small"
                          sx={{ color: "rgb(220,53,69)", cursor: "pointer" }}
                          onClick={() => {
                            console.log("Clikced");
                            handleDeleteModel(model?._id);
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {model?._id === inputItem && (
                    <form>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          my: 2,
                        }}
                      >
                        <Box sx={{ width: "65%" }}>
                          <Input
                            variant="outlined"
                            name="name"
                            label="Edit Model"
                            value={modelData.name}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setModelData({
                                ...modelData,
                                [e.target.name]: e.target.value,
                              });
                            }}
                            // error={errors.category ? true : false}
                            // helperText={errors.category}
                            required
                            size="small"
                          />
                        </Box>
                        <Box>
                          <Button
                            variant="outlined"
                            onClick={() => {
                              setInputItem("");
                              setModelData({
                                name: model?.name,
                                id: model?._id,
                              });
                            }}
                            sx={{ mx: 1 }}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="contained"
                            size=""
                            onClick={() => {
                              handelSaveModel(model?._id);
                              setInputItem("");
                            }}
                          >
                            Save
                          </Button>
                        </Box>
                      </Box>
                    </form>
                  )}
                </div>
              );
            })}
        </Modal>
      )}
    </>
  );
};

export default Brand;
