import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Avatar, Button, Typography } from "@mui/material";
import "./Products.css";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchInput from "components/Search";
import { actions } from "redux/Products/action";
import { actions as actionLoader } from "redux/Loader/action";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from '@mui/material/Chip';
import { useNavigate } from "react-router";
import BreadCrumb from "components/atoms/BreadCrumb";



function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);
  const { networkProgressDialog } = useSelector((state) => state.loader);
  const columns = [
    // { field: "id", headerName: "ID", width: 70 },
    {
      field: "image",
      headerName: "image",
      // width: 100,
      // height: 150,
      // renderCell: (params) => (
      //   <img
      //     src={params.value}
      //     style={{ width: "100px", height: "100px", objectFit: "cover" }}
      //   />
      // ),
      width: 70,
      height: 100,
      renderCell: (params) => <Avatar src={params.value} variant="rounded" />,
      sortable: false,
      filterable: false,
      // renderHeader: (params) => (
      //   <b style={{fontSize: "20px"}}>
      //     {'image '}
      //   </b>
      // )
    },

    {
      field: "product",
      headerName: "Product",
      width: 200,
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 125,
    },
    {
      field: "model",
      headerName: "Model",
      width: 140,
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
      field: "price",
      headerName: "Price",
      type: "number",
      width: 90,
    },
    {
      field: "qty",
      headerName: "Qty",
      type: "number",
      width: 70,
      //   editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      // flex: 0.3,
      renderCell: (params) => (
        <Chip label={params.row.qty > 10 ? "In Stock" : "Low stock"} size="small" sx={{ bgcolor: params.row.qty > 10 ? "rgb(226,246,240)" : "rgb(254,242,225)", color: params.row.qty > 10 ? "green" : "orange", fontWeight: "bold" }} />
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
          onClick={() =>
            navigate("/product/" + params.id)
          }
        />,
        <GridActionsCellItem
          icon={<DeleteIcon style={{ color: "#e02727" }} />}
          label="Delete"
          onClick={() =>
            dispatch(actions.deleteProduct(params.id))
          }
        />,
      ],
    },
  ];

  const rows = products.map((data, i) => {
    console.log("DataColor",data)
    return {
      id: data._id,
      // image: "https://emilus.themenate.net/img/thumbs/thumb-8.jpg",
      image: data?.images[0]?.url,
      // image:
      //   "https://rukminim1.flixcart.com/image/612/612/xif0q/cases-covers/back-cover/g/v/l/candy-rdm-note-12pro-5g-nstrr1-nstar-original-imaghh8a3wvzwrdz.jpeg?q=70",
      product: data?.name,
      brand: data?.brand,
      model: data?.model,
      category: data?.category,
      color: data?.color,
      price: data?.price,
      qty: data?.qty,
      createdAt: new Date(data?.createdAt).toDateString(),
      status: "In Stock",
    };
  });

  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleHome = (event) => {
    event.preventDefault();
    navigate('/')
  }

  const handleProduct = (event) => {
    event.preventDefault();
    navigate('/products')
  }

  const handleSearch = (value) => {
    dispatch(actions.getProducts({ keyword: value }));
  };

  useEffect(() => {
    dispatch(actionLoader.startLoader());
    dispatch(actions.getProducts());
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
          Show Products
        </Typography>
        <BreadCrumb
          parentElement="Home"
          childLink="/products"
          childElement="Product"
          child2Link="/products"
          child2Element="Show Products"
        />
      </div>

      <Box className="miniContainer">
        <Box className="miniHeader">
          <div className="d-flex">
            <Box sx={{ width: "300px" }}>
              <SearchInput
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
              />
            </Box>
          </div>

          <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("/product/new")}>
            Add Product
          </Button>
        </Box>

        {!networkProgressDialog ? (
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
                border: 0,
              }}
              initialState={{ pinnedColumns: { right: ['actions'] } }}
            />
          </Box>
        ) : (
          <Box sx={{ display: "grid", height: "100%", width: "100%", placeItems: "center", marginTop: "50px" }}>
            <CircularProgress />
          </Box>
        )}
      </Box>
    </div>
  );
}

export default Products;
