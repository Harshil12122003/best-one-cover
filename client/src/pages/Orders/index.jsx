import BaseButton from "components/atoms/Button";
import React, { useEffect, useState } from "react";
import styles from "./Orders.module.scss";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Box, Button, Chip, CircularProgress, Divider, TextField, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "redux/Order/action";
import { actions as reviewAction } from "redux/Review/action";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import swal from "sweetalert";
import { jsPDF } from "jspdf";
import "jspdf/dist/polyfills.es.js";
import { useNavigate } from "react-router-dom";
import { loaderAction } from "redux/Loader/action";

const Orders = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { networkProgressDialog } = useSelector((state) => state.loader);
  const { orders: myOrders } = useSelector((state) => state.order);
  const { myReviews } = useSelector((state) => state.review);

  const token = localStorage.getItem("TOKEN");

  const [rating, setRating] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [productFeedback, setProductFeedback] = useState({
    rating: 0,
    review: "",
    product: "",
  });
  const [orderHistory, setOrderHistory] = useState(myOrders[0]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveReview = () => {
    setOpen(false);
    dispatch(reviewAction.createReview(productFeedback));
    setProductFeedback({
      product: "",
      rating: 0,
      review: "",
    });
    setRating(0);
  };

  const handleCancelOrder = async (id) => {
    const willDelete = await swal({
      title: "Are you sure ?",
      text: "Are you sure that you want to cancel this order ?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "Yes, Cancel It!"],
    });

    if (willDelete) {
      dispatch(actions.deleteOrder(id));
      swal(
        "Cancelled!",
        "Your order has been cancelled successfully.",
        "success"
      );
    }
  };

  const handleDownloadInvoice = () => {
    const doc = new jsPDF({ format: "a4", unit: "px" });
    // const data = myOrders.map(orderData => {
    //   return orderData
    // })
    doc.text(20, 20, "This is the first title.");
    doc.addFont("helvetica", "normal");
    doc.text(20, 60, "This is the second title.");
    doc.text(20, 100, "This is the thrid title.");

    doc.save("invoice.pdf");
  };
  useEffect(() => {
    !token && navigate("/signin");
  }, [token]);

  useEffect(() => {
    dispatch(loaderAction.startLoader())
    dispatch(actions.getOrders());
    dispatch(reviewAction.getMyReviews());
  }, []);

  useEffect(() => {
    setOrderHistory(myOrders[0]);
  }, [myOrders]);

  var yourDate = new Date(orderHistory?.orderDate).getTime();
  var today = new Date().getTime();
  var diffStatus = today - yourDate > 60 * 60 * 1000 * 24 * 2;

  return (
    <div className={styles.Orders}>
      <div className={styles.OrdersContainer}>
        <div className={styles.invoice}>
          <h2>Your Orders</h2>
          {/* <div>
            <BaseButton
              variant="contained"
              style={{ background: "#1e1e2d" }}
              onClick={handleDownloadInvoice}
            >
              <ReceiptIcon /> download invoice
            </BaseButton>
          </div> */}
        </div>

        {!networkProgressDialog ? <div className={styles.orderContent}>
          <div className={styles.ordersLeftSession}>
            <div className={styles.orderHistory}>
              <h3 style={{ marginBottom: '38px' }}>order history</h3>
              {myOrders.map((orderData, i) => (
                <div
                  className={styles.history}
                  key={orderData?._id}
                  onClick={() => {
                    setOrderHistory(orderData);
                  }}
                >
                  <div className={styles.orderIdWrapper}>
                    <div className={styles.orderId}>#{orderData?._id}</div>
                    <div className={styles.orderProcess}>
                      {orderData?.status}
                    </div>
                  </div>

                  <div className={styles.orderDateWrapper}>
                    <div className={styles.orderPrice}>
                      <CurrencyRupeeIcon fontSize="small" />
                      {orderData?.totalPrice}
                    </div>
                    <div className={styles.orderDate}>
                      {new Date(orderData?.orderDate).toDateString()}
                    </div>
                  </div>
                  <div className={styles.orderItem}>
                    {orderData?.orderItems?.length} item
                  </div>
                  {/* <Divider sx={{color: "black"}} /> */}
                  {myOrders?.length > i + 1 && <hr style={{ color: "gray" }} />}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.ordersRightSession}>
            <div className={styles.orderProduct}>
              <div className={styles.orderRating}>
                <h4>order #{orderHistory && orderHistory?._id}</h4>
                <Chip
                  label={orderHistory?.orderStatus}
                  // color="success"
                  sx={{
                    backgroundColor:
                      orderHistory?.orderStatus === "pending"
                        ? "#808080"
                        : orderHistory?.orderStatus === "processing"
                          ? "#ff9100"
                          : orderHistory?.orderStatus === "shipped"
                            ? "#007bff"
                            : orderHistory?.orderStatus === "delivered"
                              ? "#2e7d32"
                              : orderHistory?.orderStatus === "cancelled"
                                ? "#d32f2f"
                                : "black",
                    color: "#fff",
                  }}
                // size="small"
                />
                {/* <Rating
                  name="half-rating-read"
                  defaultValue={3.5}
                  precision={0.5}
                  readOnly
                /> */}
              </div>
              <p style={{ marginBottom: "38px" }}>
                Date:{" "}
                {orderHistory &&
                  new Date(orderHistory?.orderDate).toDateString()}
              </p>

              {orderHistory?.orderItems?.length > 0 &&
                orderHistory?.orderItems?.map((orders) => {
                  let review = myReviews.find(
                    (review) => orders?.product === review?.product?._id
                  );
                  return (
                    <div key={orders?._id} className={styles.orderinfo}>
                      <div className={styles.productDetails}>
                        <div className={styles.productImg}>
                          <img
                            src={orders?.image ? orders?.image : ""}
                            alt="product Img"
                          />
                        </div>
                        <div className={styles.product}>
                          <div className={styles.productInfo}>
                            <div
                              className={styles.productTitle}
                              style={{
                                wordBreak: "break-word",
                                textAlign: "justify",
                              }}
                            >
                              {orders?.name}
                            </div>
                            <div className={styles.productPrice}>
                              <CurrencyRupeeIcon fontSize="small" />
                              {orders?.price}
                            </div>
                          </div>
                          <div className={styles.ProductQty}>
                            <div className={styles.productItem}>
                              {orders.quantity} items
                            </div>
                            <div className={styles.productTax}>
                              taxPrice: {orderHistory.taxPrice}
                            </div>
                          </div>
                          <div className="my-3">
                            <div className={styles.productItem}>
                              {!review &&
                                orderHistory?.orderStatus === "delivered" && (
                                  <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() => {
                                      handleClickOpen();
                                      setProductFeedback({
                                        ...productFeedback,
                                        product: orders?.product,
                                      });
                                    }}
                                  >
                                    {review ? "View Review" : "Give Review"}
                                  </Button>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <Divider />
                    </div>
                  );
                })}
            </div>
            <div className={styles.orderDetails}>
              <h4>order details</h4>
              <div className={styles.productDetails}>
                <div className={styles.userContactNum}>
                  <p>Name</p>
                  <h6>{orderHistory?.shippingInfo?.name}</h6>
                </div>
                <div className={styles.userContactNum}>
                  <p>Email</p>
                  <h6 style={{ textTransform: "lowercase" }}>
                    {orderHistory?.shippingInfo?.email}
                  </h6>
                </div>
                <div className={styles.userContactNum}>
                  <p>phone number</p>
                  <h6>+91 {orderHistory?.shippingInfo?.mobile}</h6>
                </div>
                <div className={styles.userAddredss}>
                  <p>delivary address</p>
                  <h6>
                    {orderHistory?.shippingInfo?.address +
                      ", " +
                      orderHistory?.shippingInfo?.landmark +
                      ", " +
                      orderHistory?.shippingInfo?.city +
                      ", " +
                      orderHistory?.shippingInfo?.state +
                      "."}
                  </h6>
                </div>
                <div className={styles.orderInvoice}>
                  <p>invoice</p>
                  <h6>invoice-M25.PDF</h6>
                </div>
              </div>
            </div>

            <div className={styles.orderSummary}>
              <h4>Payment Details</h4>

              <div className={styles.priceCal}>
                <div className={styles.deliveryFee}>
                  <p>Payment Id :</p>
                  <p>{orderHistory?.paymentInfo.id}</p>
                </div>
                <div className={styles.deliveryFee}>
                  <p>Payment Type :</p>
                  <p>
                    {orderHistory?.paymentMethod === "cod"
                      ? "Cash On Delivery"
                      : "CARD"}
                  </p>
                </div>
                <div className={styles.deliveryFee}>
                  <p>Payment Status :</p>
                  <p>
                    <Chip
                      label={orderHistory?.paymentInfo.status}
                      color="success"
                      size="small"
                    />
                  </p>
                </div>
              </div>
              <Divider />
            </div>

            <div className={styles.orderSummary}>
              <h4>order summary</h4>

              <div className={styles.priceCal}>
                <div className={styles.subTotal}>
                  <p>sub total :</p>
                  <p>
                    <CurrencyRupeeIcon fontSize="small" />
                    {orderHistory?.itemsPrice}
                  </p>
                </div>
                <div className={styles.deliveryFee}>
                  <p>tax charges :</p>
                  <p>{orderHistory?.taxPrice}</p>
                </div>
                <div className={styles.deliveryFee}>
                  <p>delivery fee :</p>
                  <p>{orderHistory?.shippingPrice}</p>
                </div>
              </div>
              <Divider />
              <div className={styles.grandTotal}>
                <h5>total </h5>
                <h4>
                  <CurrencyRupeeIcon fontSize="small" />
                  {orderHistory?.totalPrice}
                </h4>
              </div>
            </div>

            {!diffStatus && (orderHistory?.orderStatus === "pending") && (
              <div className={styles.orderSummary}>
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h4>Cancel This Order</h4>
                    <p>
                      You can cancel this order within 2 days of your order
                      date.
                    </p>
                  </div>

                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleCancelOrder(orderHistory?._id)}
                  >
                    cancel this order
                  </Button>
                </div>
              </div>
            )}

            <Dialog open={open} onClose={handleClose} fullWidth>
              <DialogTitle>Give Ratings and Review</DialogTitle>
              <DialogContent>
                <Rating
                  name="half-rating"
                  // defaultValue={2.5}
                  value={productFeedback.rating}
                  className="my-2"
                  // precision={0.5}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                    setProductFeedback({
                      ...productFeedback,
                      rating: newValue,
                    });
                  }}
                />
                <DialogContentText>
                  Give Reviews of this products
                </DialogContentText>
                <TextField
                  id="outlined-basic"
                  label="Give Reviews"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={5}
                  margin="dense"
                  value={productFeedback.review}
                  onChange={(e) => {
                    setProductFeedback({
                      ...productFeedback,
                      review: e.target.value,
                    });
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={saveReview}>Save</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div> : <Box sx={{ display: "grid", height: "calc(100vh - 102px)", width: "100%", placeItems: "center", }}>
          <CircularProgress />  
        </Box>}
      </div>
    </div>
  );
};

export default Orders;
