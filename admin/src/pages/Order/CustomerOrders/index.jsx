import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import {
  Avatar,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import "./UserOrders.css";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@material-ui/icons/Edit";
import SearchInput from "components/Search";
import { actions } from "redux/Order/action";
import { useSelector, useDispatch } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Dropdown from "components/atoms/Dropdown";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router";
import Modal from "components/Modal";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { downloadFile, preferredOrder } from "utils/downloadFile";
import moment from "moment";
import BreadCrumb from "components/atoms/BreadCrumb";
import { actions as actionLoader } from "redux/Loader/action";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function UserOrders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders } = useSelector((state) => state.order);
  const [modalOpen, setModalOpen] = useState(false);
  const [updateStatus, setUpdateStatus] = useState("");
  const [updateStatusId, setUpdateStatusId] = useState("");
  const { networkProgressDialog } = useSelector((state) => state.loader);

  const columns = [
    // { field: "id", headerName: "ID", width: 40 },
    {
      field: "customerName",
      headerName: "Customer Name",
      width: 200,
    },

    {
      field: "orderDate",
      headerName: "Order Date",
      width: 200,
      type: "date",
    },
    {
      field: "orderStatus",
      headerName: "Order Status",
      width: 110,
      flex: 0.3,
      renderCell: (params) =>
        params.row.orderStatus === "pending" ? (
          <Chip
            label="Pending"
            size="small"
            sx={{
              bgcolor: "rgb(255 204 167)",
              color: "rgb(250,107,3)",
              fontWeight: "bold",
            }}
          />
        ) : params.row.orderStatus === "cancelled" ? (
          <Chip
            label="Cancelled"
            size="small"
            sx={{
              bgcolor: "rgb(253,232,231)",
              color: "red",
              fontWeight: "bold",
            }}
          />
        ) : params.row.orderStatus === "confirmed" ? (
          <Chip
            label="Confirmed"
            size="small"
            sx={{
              bgcolor: "rgb(226,246,240)",
              color: "green",
              fontWeight: "bold",
            }}
          />
        ) : params.row.orderStatus === "shipped" ? (
          <Chip
            label="Shipped"
            size="small"
            sx={{
              bgcolor: "rgb(226,246,240)",
              color: "green",
              fontWeight: "bold",
            }}
          />
        ) : params.row.orderStatus === "processing" ? (
          <Chip
            label="Processing"
            size="small"
            sx={{
              bgcolor: "rgb(211 235 255)",
              color: "#3a8cc4",
              fontWeight: "bold",
            }}
          />
        ) : params.row.orderStatus === "delivered" ? (
          <Chip
            label="Delivered"
            size="small"
            sx={{
              bgcolor: "rgb(226,246,240)",
              color: "green",
              fontWeight: "bold",
            }}
          />
        ) : (
          ""
        ),
    },
    // {
    //   field: "paymentStatus",
    //   headerName: "Payment Status",
    //   width: 110,
    //   flex: 0.3,
    //   renderCell: (params) =>
    //     params.row.paymentStatus === "succeeded" ? (
    //       <Chip
    //         label="Succeeded"
    //         size="small"
    //         sx={{
    //           bgcolor: "rgb(226,246,240)",
    //           color: "green",
    //           fontWeight: "bold",
    //         }}
    //       />
    //     ) : params.row.paymentStatus === "failed" ? (
    //       <Chip
    //         label="Failed"
    //         size="small"
    //         sx={{
    //           bgcolor: "rgb(253,232,231)",
    //           color: "red",
    //           fontWeight: "bold",
    //         }}
    //       />
    //     ) : params.row.paymentStatus === "cancelled" ? (
    //       <Chip
    //         label="Cancelled"
    //         size="small"
    //         sx={{
    //           bgcolor: "rgb(253,232,231)",
    //           color: "red",
    //           fontWeight: "bold",
    //         }}
    //       />
    //     ) : params.row.paymentStatus === "processing" ? (
    //       <Chip
    //         label="Pending"
    //         size="small"
    //         sx={{
    //           bgcolor: "rgb(254,242,225)",
    //           color: "orange",
    //           fontWeight: "bold",
    //         }}
    //       />
    //     ) : (
    //       ""
    //     ),
    // },
    {
      field: "paymentMethod",
      headerName: "Payment Method",
      width: 150
    },
    {
      field: "noOfProducts",
      headerName: "No. Products",
      width: 110,
      type: "number",
    },
    {
      field: "total",
      headerName: "Total",
      width: 110,
      type: "number",
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
          icon={<VisibilityIcon style={{ color: "gray" }} />}
          label="View"
          onClick={() => {
            navigate("/user/order/" + params.id);
          }}
        />,
        <GridActionsCellItem
          icon={
            <EditIcon
              style={{
                color:
                  params.row.orderStatus === "delivered" ||
                    params.row.orderStatus === "cancelled"
                    ? "rgb(147 147 147 / 4  6%)"
                    : "rgb(25,118,210)",
              }}
            />
          }
          label="Update"
          onClick={() => {
            setUpdateStatusId(params.id);
            setUpdateStatus(params.row.orderStatus);
            setModalOpen(true);
          }}
          disabled={
            params.row.orderStatus === "delivered" ||
              params.row.orderStatus === "cancelled"
              ? true
              : false
          }
        />,
        // <GridActionsCellItem
        //   icon={<DeleteIcon style={{ color: "#e02727" }} />}
        //   label="Delete"
        //   onClick={() => {
        //     dispatch(actions.deleteOrder(params.id));
        //   }}
        // />,
      ],
    },
  ];

  let rows = orders.map((data, i) => {
    return {
      id: data._id,
      // _id: data._id,
      customerName: data?.shippingInfo?.name,
      total: "₹" + data?.totalPrice,
      noOfProducts: data?.orderItems?.length,
      orderStatus: data?.orderStatus,
      // paymentStatus: data?.paymentInfo?.status,
      paymentMethod: data?.paymentMethod.toUpperCase(),
      orderDate: new Date(data?.orderDate).toDateString(),
    };
  });

  const menuItems = [
    { name: "All", value: "all" },
    { name: "Pending", value: "pending" },
    { name: "Processing", value: "processing" },
    { name: "Shipped", value: "shipped" },
    { name: "Delivered", value: "delivered" },
    { name: "Cancelled", value: "cancelled" },
  ];

  const orderStatus = [
    { label: "Pending", value: "pending" },
    { label: "Processing", value: "processing" },
    { label: "Shipped", value: "shipped" },
    { label: "Delivered", value: "delivered" },
    // { label: "Cancelled", value: "cancelled" },
  ];

  const paymentMenuItems = [
    { name: "All", value: "all" },
    // {name: "Pending", value: "Pending"},
    { name: "Succeeded", value: "succeeded" },
    { name: "Pending", value: "pending" },
    { name: "Failed", value: "failed" },
    { name: "Cancelled", value: "cancelled" },
  ];

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const [openDatePicker, setOpenDatePicker] = React.useState(false);
  const [personName, setPersonName] = React.useState([]);
  const handleSearch = (value) => {
    dispatch(actions.getOrders({ username: value }));
  };

  const handleDate = () => {
    dispatch(actions.getOrders());
  };

  const downloadExcelFile = () => {
    const dataArrayCopy = structuredClone(orders);
    let jsonData = dataArrayCopy.map((data) => {
      data.noOfProducts = data?.orderItems?.length;
      data.paymentStatus = data?.paymentInfo?.status;
      data.customerName = data?.shippingInfo?.name
        ? data?.shippingInfo?.name
        : "  ";
      delete data.shippingInfo;
      delete data.orderItems;
      delete data.userId;
      delete data._id;
      delete data.paymentInfo;
      delete data.shippingDate;
      delete data.createdAt;
      delete data.updatedAt;
      data.orderDate = data.orderDate
        ? moment(new Date(data.orderDate), "DD-MM-YYYY").format("DD-MM-YYYY")
        : "-";

      let restructureData = preferredOrder(data, [
        "customerName",
        "noOfProducts",
        "itemsPrice",
        "taxPrice",
        "shippingPrice",
        "totalPrice",
        "paymentMethod",
        "orderStatus",
        "paymentStatus",
        "orderDate",
      ]);
      return restructureData;
    });

    const Heading = [
      [
        "Customer Name",
        "No of Products",
        "Items Price",
        "Tax Price",
        "Shipping Price",
        "Total",
        "Payment Method",
        "Order Status",
        "Payment Status",
        "Order Date",
      ],
    ];

    downloadFile(jsonData, Heading, "Report.xlsx");
  };

  useEffect(() => {
    dispatch(actionLoader.startLoader());
    dispatch(actions.getOrders());
  }, [dispatch]);

  return (
    <div
      style={{
        minHeight: "calc(100vh - 115px)",
        paddingTop: "15px",
      }}
    >
      <div className="headingWithTitle">
        <Typography variant="h5" component="h2">
          Customer Orders
        </Typography>
        <BreadCrumb
          parentElement="Home"
          childLink="/user/orders"
          childElement="Order"
          child2Link="/user/orders"
          child2Element="Customer Orders"
        />
      </div>

      {!networkProgressDialog ? (
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

              {/* <BasicDatePicker label="Start Date" /> */}
              {/* <BasicDatePicker label="End Date" /> */}
              <Box
                variant="outlined"
                sx={{
                  border: "1px solid #BCBCBC",
                  p: 1.1,
                  mx: 0.5,
                  cursor: "pointer",
                  borderRadius: 1,
                  color: "gray",
                  fontSize: 14,
                  fontWeight: 300,
                }}
                size="large"
                onClick={(e) => {
                  setOpenDatePicker(true);
                  console.log("Clicked");
                }}
              >
                Pick Date Range - DD/MM/YY
              </Box>
              {openDatePicker && (
                <Modal
                  open={openDatePicker}
                  setOpen={setOpenDatePicker}
                  handleDate={handleDate}
                  onClick={() => {
                    dispatch(
                      actions.getOrders({
                        startDate: state[0].startDate,
                        endDate: new Date(
                          new Date(state[0].endDate).getTime() +
                          1000 * 60 * 60 * 24
                        ),
                      })
                    );
                    setOpenDatePicker(false);
                  }}
                >
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setState([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                  />
                </Modal>
              )}
              <Dropdown
                label={"Order Status"}
                menuItems={menuItems}
                style={{ minWidth: 160 }}
                onChange={(e) => {
                  if (e.target.value === "all") {
                    dispatch(
                      actions.getOrders()
                    );
                  } else {
                    dispatch(
                      actions.getOrders({
                        // startDate: state[0].startDate,
                        // endDate: new Date(
                        //   new Date(state[0].endDate).getTime() +
                        //     1000 * 60 * 60 * 24
                        // ),
                        orderStatus: e.target.value
                      })
                    );
                  }
                }}
              />
              {/* <Dropdown
                label={"Payment Status"}
                menuItems={paymentMenuItems}
                style={{ minWidth: 160 }}
                onChange={(e) => {
                  if (e.target.value === "all") {
                    dispatch(
                      actions.getOrders()
                    );
                  } else {
                    dispatch(
                      actions.getOrders({
                        // startDate: state[0].startDate,
                        // endDate: new Date(
                        //   new Date(state[0].endDate).getTime() +
                        //     1000 * 60 * 60 * 24
                        // ),
                        paymentStatus: e.target.value
                      })
                    );
                  }
                }}
              /> */}
            </div>

            <Button
              variant="contained"
              startIcon={<InsertDriveFileOutlinedIcon />}
              onClick={() => {
                downloadExcelFile();
              }}
            >
              Export Report
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
      <Modal
        open={modalOpen}
        setOpen={setModalOpen}
        title={"Update Order Status"}
        onClick={() => {
          dispatch(
            actions.updateOrder({
              id: updateStatusId,
              orderStatus: updateStatus,
            })
          );
          setUpdateStatus("");
          setModalOpen(false);
        }}
      >
        {/* <Dropdown
          menuItems={orderStatus}
          label={"Order Status"}
          fullWidth={true}
          boxWidth={200}
          value={updateStatus}
          defaultValue={updateStatus}
          onChange={(e)=>{
            setUpdateStatus(e.target.value)
          }}
        /> */}
        <form>
          <TextField
            id="status"
            name="status"
            select
            fullWidth
            label="Update Status"
            // helperText="Please Update Status"
            value={updateStatus}
            onChange={(e) => {
              setUpdateStatus(e.target.value);
            }}
            // sx={{ minWidth: 200 }}
            size="small"
          >
            {orderStatus.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                className="d-block"
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </form>
      </Modal>
    </div>
  );
}

export default UserOrders;
