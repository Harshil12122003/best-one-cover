import React, { useEffect } from "react";
import Box from "@mui/material/Box";
// import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import {  CircularProgress, Typography } from "@mui/material";
// import "./Shop.css";
// import AddIcon from "@mui/icons-material/Add";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import ListItemText from "@mui/material/ListItemText";
// import Select from "@mui/material/Select";
// import Checkbox from "@mui/material/Checkbox";
// import EditIcon from "@material-ui/icons/Edit";
// import DeleteIcon from "@material-ui/icons/Delete";
// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Link from "@mui/material/Link";
// import SearchInput from "components/Search";
import { shopActions } from "redux/Shop/action";
import { useSelector, useDispatch } from "react-redux";
// import Chip from "@mui/material/Chip";
import ShopCard from "components/Cards/ShopCard";
import Grid from "@mui/material/Grid";
import styles from "./ManageShop.module.scss";
import BreadCrumb from "components/atoms/BreadCrumb";
import { actions as actionLoader } from "redux/Loader/action";

function Shops() {
  const dispatch = useDispatch();
  const { shops } = useSelector((state) => state.shop);
  const { networkProgressDialog } = useSelector((state) => state.loader);

  // console.log("shops",shops)

  // const columns = [
  //   { field: "id", headerName: "ID", width: 80 },
  //   {
  //     field: "brand",
  //     headerName: "Brand",
  //     width: 150,
  //   },
  //   {
  //     field: "model",
  //     headerName: "Model",
  //     width: 180,
  //   },
  //   {
  //     field: "category",
  //     headerName: "Category",
  //     width: 140,
  //   },
  //   {
  //     field: "buyingPrice",
  //     headerName: "Buying Price",
  //     type: "number",
  //     width: 110,
  //   },
  //   {
  //     field: "sellingPrice",
  //     headerName: "Selling Price",
  //     type: "number",
  //     width: 110,
  //   },
  //   {
  //     field: "qty",
  //     headerName: "Qty",
  //     type: "number",
  //     width: 110,
  //   },
  //   {
  //     field: "status",
  //     headerName: "Status",
  //     width: 110,
  //     flex: 0.3,
  //     renderCell: (params) => (
  //       <Chip
  //         label={params.row.qty > 10 ? "In Stock" : "Low stock"}
  //         size="small"
  //         sx={{
  //           bgcolor:
  //             params.row.qty > 10 ? "rgb(226,246,240)" : "rgb(254,242,225)",
  //           color: params.row.qty > 10 ? "green" : "orange",
  //           fontWeight: "bold",
  //         }}
  //       />
  //     ),
  //   },
  //   {
  //     field: "actions",
  //     flex: 0.3,
  //     headerName: "Actions",
  //     minWidth: 150,
  //     type: "actions",
  //     sortable: false,
  //     getActions: (params) => [
  //       <GridActionsCellItem
  //         icon={<EditIcon style={{ color: "rgb(25,118,210)" }} />}
  //         label="Update"
  //         // onClick={() =>
  //         //   setUpdateUserId(params.id)
  //         // }
  //         data-toggle="modal"
  //         data-target="#editUserModal"
  //       />,
  //       <GridActionsCellItem
  //         icon={<DeleteIcon style={{ color: "#e02727" }} />}
  //         label="Delete"
  //         onClick={() => dispatch(actions.deleteStock(params.id))}
  //       />,
  //     ],
  //   },
  // ];

  // const rows = shops.map((data, i) => {
  //   return {
  //     id: data._id,
  //     brand: data?.brand?.name,
  //     model: data?.model?.name,
  //     category: data?.category?.name,
  //     buyingPrice: data?.buyPrice,
  //     sellingPrice: data?.sellPrice,
  //     qty: data?.qty,
  //     status: "In Stock",
  //   };
  // });

  // const [personName, setPersonName] = React.useState([]);

  // const handleChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setPersonName(
  //     // On autofill we get a stringified value.
  //     typeof value === "string" ? value.split(",") : value
  //   );
  // };

  useEffect(() => {
    dispatch(actionLoader.startLoader());
    dispatch(shopActions.getShops());
  }, [dispatch]);

  return (
    <div className={styles.ManageShop} >
      <div className={styles.manageShopTitle}>
        <Typography variant="h5" component="h2">
          Show Shops
        </Typography>

        <BreadCrumb
          parentElement="Home"
          childLink="/shops"
          childElement="Shop"
          child2Link="/shops"
          child2Element="Show Shops"
          data="Data"
        />
      </div>

      {!networkProgressDialog ? (
        <Box sx={{ width: "100%", mt: 2 }}>
          <Grid
            container
            rowSpacing={3}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {shops &&
              shops?.length > 0 &&
              shops?.map((shop) => {
                return (
                  <Grid item xs={12} sm={6} lg={3}>
                    <ShopCard shop={shop} />
                  </Grid>
                );
              })}
          </Grid>
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            height: "55vh",
            width: "100%",
            placeItems: "center",
            marginTop: "50px",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </div>
  );
}

export default Shops;
