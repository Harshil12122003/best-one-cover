import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import "./UserOrders.css";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import MenuItem from "@mui/material/MenuItem";
import { actions } from "redux/Order/action";
import { useSelector, useDispatch } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
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
import { shopActions } from "redux/Shop/action";
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

function ShopOrders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shopOrders } = useSelector((state) => state.order);
  const { shops } = useSelector((state) => state.shop);
  const [modalOpen, setModalOpen] = useState(false);
  const [updateStatus, setUpdateStatus] = useState("");
  const [updateStatusId, setUpdateStatusId] = useState("");
  const [shopId, setShopId] = useState("");
  const { networkProgressDialog } = useSelector((state) => state.loader);

  let shopsMenuItems =
    shops &&
    shops?.map((shop) => {
      return {
        name: shop?.shopName.replace(/\b\w/g, (c) => c.toUpperCase()),
        value: shop?._id,
      };
    });
  shopsMenuItems = [{ name: "All Shops", value: "all" }, ...shopsMenuItems];

  const columns = [
    // { field: "id", headerName: "ID", width: 40 },
    {
      field: "shopName",
      headerName: "Shop Name",
      width: 200,
    },
    // {
    //   field: "brand",
    //   headerName: "Product Brand",
    //   // width: 200,
    // },{
    //   field: "model",
    //   headerName: "Product Model",
    //   width: 170,
    // },{
    //   field: "category",
    //   headerName: "Product Category",
    //   // width: 200,
    // },
    // {
    //   field: "color",
    //   headerName: "Product Color",
    //   // width: 200,
    // },
    {
      field: "noOfProducts",
      headerName: "No. Products",
      width: 140,
      type: "number",
    },
    {
      field: "total",
      headerName: "Total",
      width: 140,
      type: "number",
    },
    {
      field: "orderDate",
      headerName: "Order Date",
      width: 170,
      type: "date",
    },
    {
      field: "orderStatus",
      headerName: "Order Status",
      width: 140,
      // flex: 0.3,
      renderCell: (params) =>
        params.row.orderStatus === "accepted" ? (
          <Chip
            label="Accepted"
            size="small"
            sx={{
              bgcolor: "rgb(226,246,240)",
              color: "green",
              fontWeight: "bold",
            }}
          />
        ) : params.row.orderStatus === "rejected" ? (
          <Chip
            label="Rejected"
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
        ) : params.row.orderStatus === "completed" ? (
          <Chip
            label="Completed"
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
        ) : (
          ""
        ),
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
            navigate("/shop/order/" + params.id);
          }}
        />,
        <GridActionsCellItem
          icon={<EditIcon style={{ color: "rgb(25,118,210)" }} />}
          label="Update"
          onClick={() => {
            setUpdateStatusId(params.id);
            setUpdateStatus(params.row.orderStatus);
            setModalOpen(true);
          }}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon style={{ color: "#e02727" }} />}
          label="Delete"
          onClick={() => {
            dispatch(actions.deleteShopOrder(params.id));
          }}
        />,
      ],
    },
  ];

  let rows = shopOrders.map((data, i) => {
    return {
      id: data._id,
      // _id: data._id,
      shopName: data?.shop?.shopName,
      // brand: data?.brand?.name,
      // model: data?.model?.name,
      // category: data?.category?.name,
      // color: data?.color,
      noOfProducts: data?.totalQty,
      total: "₹" + data?.totalAmount,
      orderStatus: data?.orderStatus,
      // paymentStatus: data?.paymentInfo?.status,
      orderDate: new Date(data?.orderDate).toDateString(),
    };
  });
  const menuItems = [
    { name: "All", value: "all" },
    { name: "Processing", value: "processing" },
    { name: "Accepted", value: "accepted" },
    { name: "Rejected", value: "rejected" },
    { name: "Completed", value: "completed" },
  ];

  const orderStatus = [
    // {name: "Pending", value: "Pending"},
    { label: "Processing", value: "processing" },
    { label: "Accepted", value: "accepted" },
    { label: "Rejected", value: "rejected" },
    { label: "Completed", value: "completed" },
  ];

  // const paymentMenuItems = [
  //   { name: "All", value: "All" },
  //   // {name: "Pending", value: "Pending"},
  //   { name: "Succeeded", value: "Succeeded" },
  //   { name: "Pending", value: "Pending" },
  //   { name: "Failed", value: "Failed" },
  //   { name: "Cancelled", value: "Cancelled" },
  // ];

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openDatePicker, setOpenDatePicker] = React.useState(false);
  // const [personName, setPersonName] = React.useState([]);
  // const handleSearch = (value) => {
  //   dispatch(actions.getShopOrders({ username: value }));
  // };

  const handleDate = () => {
    dispatch(actions.getShopOrders({ shopId: shopId ? shopId : "" }));
  };

  const downloadExcelFile = () => {
    const dataArrayCopy = structuredClone(shopOrders);
    let jsonData = dataArrayCopy.map((data) => {
      data.noOfProducts = data?.totalQty;
      data.shopName = data?.shop?.shopName;
      delete data?._id;
      delete data?.createdAt;
      delete data.updatedAt;
      delete data?.totalQty;
      delete data?.shop;
      data.orderDate = data?.orderDate
        ? moment(new Date(data?.orderDate), "DD-MM-YYYY").format("DD-MM-YYYY")
        : "-";

      let restructureData = preferredOrder(data, [
        "shopName",
        "noOfProducts",
        "totalAmount",
        "orderStatus",
        "orderDate",
      ]);
      return restructureData;
    });

    const Heading = [
      [
        "Shop Name",
        "No of Products",
        "Total Amount",
        "Order Status",
        "Order Date",
      ],
    ];

    downloadFile(jsonData, Heading, "Report.xlsx");
  };

  useEffect(() => {
    dispatch(shopActions.getShops());
    dispatch(actionLoader.startLoader());
    dispatch(actions.getShopOrders());
  }, [dispatch]);

  return (
    <div
      style={{
        minHeight: "calc(100vh - 115px)",
        // marginLeft: "265px",
        paddingTop: "15px",
      }}
    >
      <div className="headingWithTitle">
        <Typography variant="h5" component="h2">
          Shop Orders
        </Typography>
        <BreadCrumb
          parentElement="Home"
          childLink="/shop/orders"
          childElement="Order"
          child2Link="/shop/orders"
          child2Element="Shop Orders"
        />
      </div>

      {!networkProgressDialog ? (
        <Box className="miniContainer">
          <Box className="miniHeader">
            <div className="d-flex">
              <Box>
                {/* <SearchInput
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
              /> */}
                <Dropdown
                  label={"Select Shop"}
                  menuItems={shopsMenuItems}
                  style={{ minWidth: 160 }}
                  onChange={(e) => {
                    if (e.target.value === "all") {
                      setShopId("");
                      dispatch(actions.getShopOrders());
                    } else {
                      setShopId(e.target.value);
                      dispatch(
                        actions.getShopOrders({
                          shopId: e.target.value ? e.target.value : "",
                        })
                      );
                    }
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
                      actions.getShopOrders({
                        shopId: shopId ? shopId : "",
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
                      actions.getShopOrders()
                    );
                  } else {
                    dispatch(
                      actions.getShopOrders({
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
                  if (e.target.value  === "all") {
                    dispatch(
                      actions.getOrders()
                    );
                  }else{
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
            actions.updateShopOrder({
              id: updateStatusId,
              orderStatus: updateStatus,
            })
          );
          setUpdateStatus("");
          setModalOpen(false);
        }}
      >
        {/* <Dropdown
          menuItems={menuItems}
          label={"Order Status"}
          fullWidth={true}
          boxWidth={200}
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

export default ShopOrders;
