import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from '@mui/material/Divider';
import { useParams } from "react-router";
import { actions } from "redux/Order/action";
import { useSelector, useDispatch } from "react-redux";
import BreadCrumb from "components/atoms/BreadCrumb";
import "./OrderDetails.css";

function ShopOrderDetails() {
  const dispatch = useDispatch();
  const { shopOrder } = useSelector((state) => state.order);
  const { orderId } = useParams();
  console.log("Called", orderId);
  useEffect(() => {
    dispatch(actions.getShopOrderDetails(orderId))
  }, [orderId])


  return (
    <div className="shopDetails">
      <div className="shopBreadCrum">
        <Typography variant="h5" component="h2">
          Shop Orders Details
        </Typography>
        <BreadCrumb
          parentElement="Home"
          childLink="/shop/orders"
          childElement="Orders"
          child2Link="/shop/orders"
          child2Element="Shop Orders"
          child3Link="/shop/order/:id"
          child3Element="Orders Details"
        />
      </div>
      <Box sx={{ width: "100%" }}>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ paddingTop : "15px" }}
        >
          <Grid item xs={12} sm={12} md={3}>
            <Box
              sx={{
                padding: 3,
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                background : "#fff"
              }}
            >
              <Box
                sx={{
                  marginBottom: 5,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{}}>
                  <Typography
                    sx={{ fontSize: 20, color: "black", m: 0 }}
                    //   color="text.secondary"
                    gutterBottom
                  >
                    Order ID
                  </Typography>
                  <Typography
                    sx={{ fontSize: 16, mt: 1 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    #{shopOrder?._id}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <div className="methodsDiv">
                  <Typography
                    sx={{ fontSize: 16, color: "black", marginBottom: 1 }}
                    //   color="text.secondary"
                    gutterBottom
                  >
                    Shop Name
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14, m: 0 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {shopOrder?.shop?.shopName}
                  </Typography>
                </div>
                <div className="methodsDiv">
                  <Typography
                    sx={{ fontSize: 16, color: "black", marginBottom: 1 }}
                    //   color="text.secondary"
                    gutterBottom
                  >
                    Customer Email
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14, m: 0 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {shopOrder?.shippingInfo?.email}
                  </Typography>
                </div>
                <div className="methodsDiv">
                  <Typography
                    sx={{ fontSize: 16, color: "black", marginBottom: 1 }}
                    //   color="text.secondary"
                    gutterBottom
                  >
                    Customer Mobile
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14, m: 0 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    +91 {shopOrder?.shippingInfo?.mobile}
                  </Typography>
                </div>
                <hr style={{ marginBottom: 20 }} />
                <div className="methodsDiv">
                  <Typography
                    sx={{ fontSize: 16, color: "black", marginBottom: 1 }}
                    //   color="text.secondary"
                    gutterBottom
                  >
                    Order Status
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14, m: 0 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {shopOrder?.orderStatus?.toUpperCase()}
                  </Typography>
                </div>
                <div className="methodsDiv">
                  <Typography
                    sx={{ fontSize: 16, color: "black", marginBottom: 1 }}
                    //   color="text.secondary"
                    gutterBottom
                  >
                    Ordered Date
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14, m: 0 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {new Date(shopOrder?.orderDate).toLocaleString()}
                  </Typography>
                </div>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={9}>
            <Box
              sx={{
                padding: 3,
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                background : "#fff"

              }}
            >
              <Box
                sx={{
                  marginBottom: 2,
                }}
              >
                <Box sx={{}}>
                  <Typography
                    sx={{ fontSize: 20, color: "black", m: 0 }}
                    //   color="text.secondary"
                    gutterBottom
                  >
                    Ordered Products
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Total {shopOrder?.orderItems?.length} products
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ width: "100%", marginTop: "10px" }}>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Qty</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {shopOrder?.orderItems?.length > 0 && shopOrder?.orderItems.map(
                        (row, i) =>
                          i < 6 && (
                            <TableRow
                              key={row._id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                <ListItem>
                                  <ListItemAvatar sx={{ marginRight: 2 }}>
                                    <Avatar
                                      alt="Remy Sharp"
                                      src={row?.image}
                                      variant="rounded"
                                      sx={{ width: 60, height: 60 }}
                                    />
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={row?.brand?.name?.replace(/\b\w/g, (c) =>
                                      c.toUpperCase()
                                    )}
                                    secondary={"Price: ₹" + row?.price}
                                  />
                                  <ListItemText
                                    primary={row?.model?.name?.replace(/\b\w/g, (c) =>
                                      c.toUpperCase()
                                    )}
                                    secondary={"Color: " + row?.color}
                                  />
                                  <ListItemText
                                    primary={row?.category?.name?.replace(/\b\w/g, (c) =>
                                      c.toUpperCase()
                                    )}
                                  // secondary={"Category: " + row?.color}
                                  />
                                </ListItem>
                              </TableCell>
                              <TableCell align="right">
                                {row?.qty}
                              </TableCell>
                            </TableRow>
                          )
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Divider />
                <div className="totalPriceDiv text-end">
                  <Typography
                    sx={{ fontSize: 18, color: "black", mt: 2 }}
                    //   color="text.secondary"
                    gutterBottom
                  >
                    Total Amount: ₹ {shopOrder?.totalAmount}
                  </Typography>
                </div>
              </Box>
            </Box>

            <Box
              sx={{
                padding: 3,
                mt: 3,
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                background : "#fff"

              }}
            >
              <Box
                sx={{
                  marginBottom: 2,
                }}
              >
                <Box sx={{}}>
                  <Typography
                    sx={{ fontSize: 20, color: "black", m: 0 }}
                    //   color="text.secondary"
                    gutterBottom
                  >
                    Shipping Details
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ width: "100%", marginTop: "10px" }}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  sx={{ margin: 5 }}
                >
                  <Grid item xs={8} sx={{ mb: 3 }}>
                    <div>
                      <Typography
                        sx={{ fontSize: 17, color: "black", m: 0 }}
                        //   color="text.secondary"
                        gutterBottom
                      >
                        Address Line
                      </Typography>
                      <Typography
                        sx={{ fontSize: 15, mt: 1 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {shopOrder?.shop?.shopAddress?.address}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={4} sx={{ mb: 3 }}>
                    <div>
                      <Typography
                        sx={{ fontSize: 17, color: "black", m: 0 }}
                        //   color="text.secondary"
                        gutterBottom
                      >
                        Landmark
                      </Typography>
                      <Typography
                        sx={{ fontSize: 15, mt: 1 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {shopOrder?.shop?.shopAddress?.landmark}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <div>
                      <Typography
                        sx={{ fontSize: 17, color: "black", m: 0 }}
                        //   color="text.secondary"
                        gutterBottom
                      >
                        City
                      </Typography>
                      <Typography
                        sx={{ fontSize: 15, mt: 1 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {shopOrder?.shop?.shopAddress?.city}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <div>
                      <Typography
                        sx={{ fontSize: 17, color: "black", m: 0 }}
                        //   color="text.secondary"
                        gutterBottom
                      >
                        State
                      </Typography>
                      <Typography
                        sx={{ fontSize: 15, mt: 1 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {shopOrder?.shop?.shopAddress?.state}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <div>
                      <Typography
                        sx={{ fontSize: 17, color: "black", m: 0 }}
                        //   color="text.secondary"
                        gutterBottom
                      >
                        Pin Code
                      </Typography>
                      <Typography
                        sx={{ fontSize: 15, mt: 1 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {shopOrder?.shop?.shopAddress?.pinCode}
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default ShopOrderDetails;
