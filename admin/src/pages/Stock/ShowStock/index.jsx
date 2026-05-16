import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Avatar, Button, CircularProgress, Typography } from "@mui/material";
import "./Stock.css";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchInput from "components/Search";
import { actions } from "redux/Stock/action";
import { useSelector, useDispatch } from "react-redux";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router";
import BreadCrumb from "components/atoms/BreadCrumb";
import { actions as actionLoader } from "redux/Loader/action";

function Stock() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { stocks } = useSelector((state) => state.stock);
  const { networkProgressDialog } = useSelector((state) => state.loader);


  const columns = [
    // { field: "id", headerName: "ID", width: 80 },
    {
      field: "image",
      headerName: "image",
      width: 70,
      height: 100,
      renderCell: (params) => <Avatar src={params.value} variant="rounded" />,
      sortable: false,
      filterable: false,
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 100,
    },
    {
      field: "model",
      headerName: "Model",
      width: 180,
    },
    {
      field: "category",
      headerName: "Category",
      width: 140,
    },
    {
      field: "color",
      headerName: "color",
      width: 100,
    },
    {
      field: "buyingPrice",
      headerName: "Cost Price",
      type: "number",
      width: 90,
    },
    {
      field: "qty",
      headerName: "Qty",
      type: "number",
      width: 90,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      // flex: 0.3,
      renderCell: (params) => (
        <Chip
          label={params.row.qty > 10 ? "In Stock" : "Low stock"}
          size="small"
          sx={{
            bgcolor:
              params.row.qty > 10 ? "rgb(226,246,240)" : "rgb(254,242,225)",
            color: params.row.qty > 10 ? "green" : "orange",
            fontWeight: "bold",
          }}
        />
      ),
    },
    {
      field: "createdAt",
      headerName: "Creation Date",
      type: "date",
      width: 140,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "actions",
      sortable: false,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon style={{ color: "rgb(25,118,210)" }} />}
          label="Update"
          onClick={() => navigate("/stock/" + params.id)}
          data-toggle="modal"
          data-target="#editUserModal"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon style={{ color: "#e02727" }} />}
          label="Delete"
          onClick={() => dispatch(actions.deleteStock(params.id))}
        />,
      ],
    },
  ];


  const rows = stocks.map((data, i) => {
    return {
      id: data?._id,
      image: data?.images[0]?.url,
      brand: data?.brand?.name,
      model: data?.model?.name,
      category: data?.category?.name,
      color: data?.color,
      buyingPrice: data?.buyPrice,
      qty: data?.qty,
      createdAt: new Date(data?.createdAt).toDateString(),
      status: "In Stock",
    };
  });

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
    dispatch(actions.getStock());
  }, [dispatch]);

  return (
    <div
      style={
        {
          minHeight: "calc( 100vh - 115px) ",
          paddingTop: "15px",
        }
      }
    >
      <div className="headingWithTitle">
        <Typography variant="h5" component="h2">
          Show Stocks
        </Typography>

        <BreadCrumb
          parentElement="Home"
          childLink="/stocks"
          childElement="Stock"
          child2Link="/stocks"
          child2Element="Show Stocks"
        />
      </div>

      {!networkProgressDialog ? (<Box className="miniContainer">
        <Box className="miniHeader">
          <div className="d-flex">
            <Box sx={{ width: "300px" }}>
              <SearchInput
                onChange={(e) => {
                  dispatch(actions.getStock(e.target.value));
                }}
              />
            </Box>
            {/* <FormControl sx={{ m: 1, width: 200 }} size="small">
              <InputLabel id="demo-multiple-checkbox-label">ALL</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
                sx={{ borderColor: "#e6ebf1" }}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={personName.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}
          </div>

          <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("/stock/new")}>
            Add Stock
          </Button>
        </Box>

        <Box sx={{ height: 880, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}

            rowHeight={75}
            sx={{
              // boxShadow: 2,
              border: 0,
            }}
          />
        </Box>
      </Box>) : (
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

export default Stock;
