import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Button, CircularProgress, Typography } from "@mui/material";
import "./Customers.css";
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import ListItemText from "@mui/material/ListItemText";
// import Select from "@mui/material/Select";
// import Checkbox from "@mui/material/Checkbox";
// import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchInput from "components/Search";
import { actions } from "redux/Customers/action";
import { useSelector, useDispatch } from "react-redux";
// import VisibilityIcon from '@mui/icons-material/Visibility';
import { downloadFile, preferredOrder } from "utils/downloadFile";
import moment from "moment";
import BreadCrumb from "components/atoms/BreadCrumb";
import { actions as actionLoader } from "redux/Loader/action";


function Customers() {
  const dispatch = useDispatch();
  const { customers } = useSelector((state) => state.customer);
  const { networkProgressDialog } = useSelector((state) => state.loader);
  const columns = [
    // { field: "id", headerName: "ID", width: 40 },
    {
      field: "fName",
      headerName: "First Name",
      width: 175,
    },
    {
      field: "lName",
      headerName: "Last Name",
      width: 175,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "mobile",
      headerName: "Mobile",
      width: 170,
    },
    // {
    //   field: "orderStatus",
    //   headerName: "Order Status",
    //   width: 110,
    //   flex: 0.3,
    //   cellClassName: "greenColor",
    //   // cellClassName: (params) => {
    //   //     return params.getValue(params.id, "role") === "admin"
    //   //         ? "greenColor"
    //   //         : "rgba(0,0,0,0)";
    //   // },
    // },
    {
      field: "createdAt",
      headerName: "createdAt",
      width: 170,
      type: "date",
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 180,
      type: "actions",
      sortable: false,
      getActions: (params) => [
        //   <GridActionsCellItem
        //   icon={<VisibilityIcon style={{ color: "gray" }} />}
        //   label="Delete"
        //   // onClick={() =>
        //   //   deleteUserHandler(params.id)
        //   // }
        // />,
        // <GridActionsCellItem
        //   icon={<EditIcon style={{ color: "rgb(25,118,210)" }} />}
        //   label="Update"
        //   // onClick={() =>
        //   //   setUpdateUserId(params.id)
        //   // }
        //   data-toggle="modal"
        //   data-target="#editUserModal"
        // />,
        <GridActionsCellItem
          icon={<DeleteIcon style={{ color: "#e02727" }} />}
          label="Delete"
          onClick={() =>
            dispatch(actions.deleteCustomer(params.id))
          }
        />,

      ],
    },
  ];

  const rows = customers.map((data, i) => {
    return {
      id: data._id,
      fName: data?.fname,
      lName: data?.lname,
      email: data?.email,
      mobile: data?.mobile,
      createdAt: new Date(data?.createdAt).toDateString(),
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

  const downloadExcelFile = () => {
    const dataArrayCopy = structuredClone(customers);
    let jsonData = dataArrayCopy.map((data) => {
      // data.address = data?.address?.address ? data?.address.address : "";    
      // data.landmark = data?.landmark ? data?.landmark : "";    
      // data.city = data?.address?.city ? data?.address?.city : "";    
      // data.state = data?.address?.state ? data?.address?.state : '';    
      data.createdAt = data?.createdAt
        ? moment(new Date(data?.createdAt), "DD-MM-YYYY").format("DD-MM-YYYY")
        : "-";

      delete data.address;
      delete data.updatedAt;
      delete data.password;
      delete data._id;

      let restructureData = preferredOrder(data, [
        "fname",
        "lname",
        "email",
        "mobile",
        // "address",
        // "landmark",
        // "city",
        // "state",
        "createdAt"
      ]);
      return restructureData;
    });

    const Heading = [
      [
        "First Name",
        "Last Name",
        "Email",
        "Mobile",
        // "Address",
        // "Landmark",
        // "City",
        // "State",
        "Created At",
      ],
    ];

    downloadFile(jsonData, Heading, "Customers.xlsx")
  }

  useEffect(() => {
    dispatch(actionLoader.startLoader());
    dispatch(actions.getCustomers());
  }, [dispatch]);

  return (
    <div
      style={
        {
          minHeight: "calc( 100vh - 110px) ",
          paddingTop: "15px",
        }
      }
    >
      <div className="headingWithTitle">
        <Typography variant="h5" component="h2">
          Show Customers
        </Typography>
        <BreadCrumb
          parentElement="Home"
          childLink="/customers"
          childElement="User"
          child2Link="/customers"
          child2Element=" Show Customers"
        />
      </div>

      {!networkProgressDialog ? (<Box className="miniContainer">
        <Box className="miniHeader">
          <div className="d-flex">
            <Box sx={{ width: "300px" }}>
              <SearchInput
                onChange={(e) => {
                  dispatch(actions.getCustomers(e.target.value));
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

          <Button variant="contained" startIcon={<InsertDriveFileOutlinedIcon />} onClick={downloadExcelFile}>
            Export File
          </Button>
        </Box>

        <Box sx={{ height: 830, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            rowHeight={72}
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

export default Customers;
