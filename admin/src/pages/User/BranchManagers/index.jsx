import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Button, CircularProgress, Typography } from "@mui/material";
import "./Customers.css";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import ListItemText from "@mui/material/ListItemText";
// import Select from "@mui/material/Select";
// import Checkbox from "@mui/material/Checkbox";
// import EditIcon from "@material-ui/icons/Edit";
// import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchInput from "components/Search";
import { actions } from "redux/Customers/action";
import { useSelector, useDispatch } from "react-redux";
import { downloadFile, preferredOrder } from "utils/downloadFile";
import moment from "moment";
import BreadCrumb from "components/atoms/BreadCrumb";
import { actions as actionLoader } from "redux/Loader/action";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// const names = [
//   "Oliver Hansen",
//   "Van Henry",
//   "April Tucker",
//   "Ralph Hubbard",
//   "Omar Alexander",
//   "Carlos Abbott",
//   "Miriam Wagner",
//   "Bradley Wilkerson",
//   "Virginia Andrews",
//   "Kelly Snyder",
// ];

function Managers() {
  const dispatch = useDispatch();
  const { managers } = useSelector((state) => state.customer);
  const { networkProgressDialog } = useSelector((state) => state.loader);
  const {adminProfile} = useSelector((state) => state?.admin?.admin);
  const columns = [
    // { field: "id", headerName: "ID", width: 40 },
    {
      field: "fName",
      headerName: "First Name",
      width: 120,
    },
    {
      field: "lName",
      headerName: "Last Name",
      width: 120,
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
    {
      field: "mobile",
      headerName: "Mobile",
      width: 120,
    },
    {
      field: "role",
      headerName: "Role",
      width: 100,
    },
    {
      field: "shopName",
      headerName: "Shop Name",
      width: 150,
    },
    {
      field: "createdAt",
      headerName: "createdAt",
      width: 130,
      type: "date",
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "actions",
      sortable: false,
      getActions: (params) => [
        // <GridActionsCellItem
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
          icon={<DeleteIcon style={{ color: params.id !== adminProfile?._id ? "#e02727" : "gray" }} />}
          label="Delete"
          onClick={() => dispatch(actions.deleteManger(params.id))}
          disabled={params.id === adminProfile?._id ? true : false}
        />,
      ],
    },
  ];

  console.log("adminProfile",adminProfile);

  const rows = managers.map((data, i) => {
    return {
      id: data._id,
      fName: data?.fname,
      lName: data?.lname,
      email: data?.email,
      mobile: data?.mobile,
      role: data?.role,
      shopName: data?.shop?.shopName,
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
    const dataArrayCopy = structuredClone(managers);
    let jsonData = dataArrayCopy.map((data) => {
      // data.address = data?.address?.address ? data?.address.address : "";
      // data.landmark = data?.landmark ? data?.landmark : "";
      // data.city = data?.address?.city ? data?.address?.city : "";
      // data.state = data?.address?.state ? data?.address?.state : '';
      data.fname = data?.fname ? data?.fname : "";
      data.lname = data?.lname ? data?.lname : "";
      data.mobile = data?.mobile ? data?.mobile : "";
      data.createdAt = data?.createdAt
        ? moment(new Date(data?.createdAt), "DD-MM-YYYY").format("DD-MM-YYYY")
        : "-";
      data.shopName = data?.shop?.shopName ? data?.shop?.shopName : "";
      delete data.address;
      delete data.updatedAt;
      delete data._id;
      delete data?.shop;

      console.log("****", data);


      let restructureData = preferredOrder(data, [
        "fname",
        "lname",
        "email",
        "mobile",
        "shopName",
        "createdAt",
      ]);
      return restructureData;
    });

    const Heading = [
      [
        "First Name",
        "Last Name",
        "Email",
        "Mobile",
        "Shop Name",
        "Created At",
      ],
    ];

    downloadFile(jsonData, Heading, "Managers.xlsx");
  };

  useEffect(() => {
    dispatch(actionLoader.startLoader());
    dispatch(actions.getManagers());
  }, [dispatch]);

  return (
    <div
      style={
        {
          minHeight: "calc( 100vh - 110px) ",

          // marginLeft: "265px",
          paddingTop: "15px",
        }
      }
    >
      <div className="headingWithTitle">
        <Typography variant="h5" component="h2">
          Show Managers
        </Typography>
        <BreadCrumb
          parentElement="Home"
          childLink="/managers"
          childElement="Managers"
          child2Link="/managers"
          child2Element=" Show Managers"
        />
        {/* <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: "13px" }}>
          <Link underline="hover" color="inherit" href="/">
            MUI
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/material-ui/getting-started/installation/"
          >
            Core
          </Link>
          <Typography color="text.primary">Breadcrumbs</Typography>
        </Breadcrumbs> */}
      </div>

      {!networkProgressDialog ? (<Box className="miniContainer">
        <Box className="miniHeader">
          <div className="d-flex">
            <Box sx={{ width: "300px" }}>
              <SearchInput
                onChange={(e) => {
                  dispatch(actions.getManagers(e.target.value));
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

          <Button
            variant="contained"
            startIcon={<InsertDriveFileOutlinedIcon />}
            onClick={downloadExcelFile}
          >
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

export default Managers;
