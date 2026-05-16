import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import BaseButton from "components/atoms/Button";
import AddressForm from "pages/Profile/Address/AddressForm";
import React, { useState, useEffect, useRef } from "react";
import styles from "./Checkout.module.scss";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import RadioButtonsGroup from "components/atoms/Radio";
import BasicModal from "components/atoms/Modal";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "redux/Products/action";
import { actions as orderActions } from "redux/Order/action";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import axios from "axios";
import { Toast } from "utils/toast";
import "./Checkout.css";
import uuid from "utils/uuid";
import { loaderAction } from "redux/Loader/action";

const Checkout = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("TOKEN");
  const cart = localStorage.getItem("cart");
  const { networkProgressDialog } = useSelector((state) => state.loader);

  const [editAddress, setEditAddress] = useState(false);
  const [payment, setPayment] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { search } = useLocation();
  const id = new URLSearchParams(search).get("id");
  const { product } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);
  const { order } = useSelector((state) => state.order);
  const [total, setTotal] = useState(0);
  // const [qty, setQty] = useState(1);
  const [paymentType, setPaymentType] = useState("");
  const [activeStep, setActiveStep] = useState(1);
  const [orders, setOrders] = useState([]);
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const steps = ["OrderSummary", "Addresses", "Payments"];

  const delivery = [
    {
      key: 1,
      name: "jignesh nakum",
      mobile: 9712158963,
      address: "310 ,SNS Business Park",
      pincode: 395007,
      city: "surat",
      locality: "vesu",
      state: "Gujarat",
      addressType: "work",
    },
  ];

  // console.log("cart",cart?.length)

  useEffect(() => {
    !cart && navigate("/cart");
  }, [cart]);

  useEffect(() => {
    !token && navigate("/signin");
    if(!localStorage.getItem("auth-checkout")){
      navigate("/")
    };
  }, [token]);

  let deliveryCharge = 0;
  useEffect(() => {
    let newTotal = 0 + deliveryCharge;
    orders.filter((el) => (newTotal += el.productPrice));
    setTotal(newTotal);
    id && dispatch(actions.getProductDetails(id));
    if (JSON.parse(localStorage.getItem("cart"))) {
      setOrders([...orders, ...JSON.parse(localStorage.getItem("cart"))]);
    }
    // if (id) {
    //   setOrders([product]);
    // }
  }, [id, dispatch]);

  useEffect(() => {
    if (id) {
      const orderData = product;
      orderData.cartQty = 1;
      setOrders([orderData]);
    }
  }, [product]);

  const handleAddress = () => {
    setEditAddress((edit) => !edit);
  };
  const handlePayment = (address) => {
    if (address) {
      const dataAddress = address;
      dataAddress.name =
        user?.userProfile?.fname + " " + user?.userProfile?.lname;
      dataAddress.mobile = user?.userProfile?.mobile;
      sessionStorage.setItem("address", JSON.stringify(dataAddress));
    }
    setActiveStep(activeStep + 1);
    setPayment(true);
  };

  const handleIncrement = (product) => {
    const newQty = product.cartQty + 1;
    if (product.qty <= product.cartQty) {
      return;
    }

    const ordersData = orders.map((order) => {
      if (order === product) {
        order.cartQty = newQty;
      }
      return order;
    });

    setOrders([...ordersData]);
  };
  const handleDecrement = (product) => {
    const newQty = product.cartQty - 1;
    if (product.cartQty <= 1) {
      return;
    }

    const ordersData = orders.map((order) => {
      if (order === product) {
        order.cartQty = newQty;
      }
      return order;
    });

    setOrders([...ordersData]);
  };

  const paymentData = {};

  const submitHandler = async (e) => {
    e.preventDefault();
    let shippingInfo = JSON.parse(sessionStorage.getItem("address"));
    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://best-1-backend.onrender.com/api/payment/process",
        {
          amount: Math.round(
            orders.reduce((acc, item) => acc + item.cartQty * item.price, 0) *
            100
          ),
        },
        config
      );
      const client_secret = data.body.result.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user?.userProfile?.fname + " " + user?.userProfile?.lname,
            email: user?.userProfile?.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: "In",
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        Toast("error", result.error.message);
        // alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          paymentData.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          // dispatch(createOrder(order));
          handleOpenModal();
          // navigate("/success");
        } else {
          Toast("warning", "There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      // alert(error.response.data.message);
      console.log(error);
    }
  };

  const handleOpenModal = () => {
    let address = JSON.parse(sessionStorage.getItem("address"));
    paymentData.shippingInfo = {
      name: address?.name,
      email: user?.userProfile?.email,
      address: address?.address,
      city: address?.city,
      state: address?.state,
      landmark: address?.landmark,
      country: "In",
      pinCode: address?.pinCode,
      mobile: address?.mobile,
    };
    paymentData.totalQty = 0;
    paymentData.orderItems = orders.map((order) => {
      paymentData.totalQty += order.cartQty;
      return {
        product: order?._id,
        name: order?.name,
        price: order?.price,
        quantity: order.cartQty,
        image: order?.images[0]?.url,
        itemPrice: order?.price * order.cartQty,
      };
    });
    paymentData.itemsPrice = orders.reduce(
      (acc, item) => acc + item.cartQty * item.price,
      0
    );

    paymentData.shippingPrice = paymentData.itemsPrice > 1000 ? 0 : 0;

    // paymentData.taxPrice = paymentData.itemsPrice * 0.18;
    paymentData.taxPrice = paymentData.itemsPrice * 0;

    paymentData.totalPrice =
      paymentData.itemsPrice + paymentData.taxPrice + paymentData.shippingPrice;
    paymentData.shippingDate = new Date() + 3;
    paymentData.paymentMethod = paymentType;
    if (!paymentData.paymentInfo) {
      paymentData.paymentInfo = {
        id: uuid(),
        status: "pending",
      };
    }
    dispatch(loaderAction.startLoader())
    dispatch(orderActions.createOrder(paymentData, navigate));
    Toast("success", "Your Order Placed Successfully");
    setActiveStep(activeStep + 1);
    // setOpenModal(true);
    // navigate("/orders");
    // order && dispatch(orderActions.createPayment({
    //   paymentId: paymentData?.paymentInfo?.id,
    //   status: paymentData?.paymentInfo?.status,
    //   amount: paymentData?.totalPrice,
    //   orderId: order?._id,
    // }));
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handlePaymentType = (event) => {
    setPaymentType(event.target.value);
  };

  return (
    <>
    {localStorage.getItem("auth-checkout") && <div className={styles.checkOut}>
      <div className={styles.checkoutStepper}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <div className={styles.checkOutContainer}>
        <div className={styles.checkoutContent}>
          <div className={styles.checkoutOptions}>
            {!payment ? (
              <div className={styles.checkoutAddress}>
                {delivery.map((userinfo, index) => (
                  <div key={index} className={styles.deliveryInfo}>
                    <div className={styles.infoheader}>
                      <h5>Delivery Address</h5>
                      {!editAddress && (
                        <BaseButton variant="contained" onClick={handleAddress}>
                          {user?.userProfile?.address ? "edit" : "Add Address"}
                        </BaseButton>
                      )}
                    </div>
                    {editAddress ? (
                      <div className={styles.editAddress}>
                        <AddressForm
                          handleCallBack={() => {
                            handlePayment();
                          }}
                        />
                      </div>
                    ) : (
                      <div className={styles.user}>
                        <div className={styles.userName}>
                          {user?.userProfile?.fname +
                            " " +
                            user?.userProfile?.lname}
                        </div>
                        <div className={"mt-3"}>
                          <b>Address:</b>{" "}
                          {user?.userProfile?.address
                            ? user?.userProfile?.address?.address +
                            "," +
                            user?.userProfile?.address?.landmark +
                            "," +
                            user?.userProfile?.address?.city +
                            "," +
                            user?.userProfile?.address?.state
                            : "Please Add Address"}
                        </div>
                        {user?.userProfile?.address && (
                          <div className={styles.deliveryBtn}>
                            <BaseButton
                              variant="contained"
                              onClick={() =>
                                handlePayment(user?.userProfile?.address)
                              }
                            >
                              delivery here
                            </BaseButton>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.checkoutPayment}>
                <h5>Payment Options</h5>
                <div className={styles.paymentTypes}>
                  <RadioButtonsGroup
                    value="COD"
                    label="cash on delivery"
                    name="cashOnDelivery"
                    handleChange={handlePaymentType}
                    data={paymentType}
                  />
                  <RadioButtonsGroup
                    value="CARD"
                    label="net banking"
                    name="netBanking"
                    handleChange={handlePaymentType}
                    data={paymentType}
                  />
                </div>

                {paymentType === "CARD" && (
                  <div className="paymentContainer">
                    <form
                      className="paymentForm"
                      onSubmit={(e) => submitHandler(e)}
                    >
                      <Typography>Card Details</Typography>
                      <div>
                        <CreditCardIcon />
                        <CardNumberElement className="paymentInput" />
                      </div>
                      <div>
                        <EventIcon />
                        <CardExpiryElement className="paymentInput" />
                      </div>
                      <div>
                        <VpnKeyIcon />
                        <CardCvcElement className="paymentInput" />
                      </div>

                      <input
                        type="submit"
                        value={`Pay - ₹ ${orders &&
                          orders.reduce(
                            (acc, item) => acc + item.cartQty * item.price,
                            0
                          )
                          }`}
                        ref={payBtn}
                        style={{ background: "#1972D2", fontSize: "20px" }}
                        className="paymentFormBtn"
                      />
                    </form>
                  </div>
                )}

                <div className={styles.paymentSuccess}>
                  {paymentType === "COD" ? (
                    !networkProgressDialog ? <BaseButton variant="contained" onClick={handleOpenModal}>
                      place to order
                    </BaseButton> : <Box sx={{ display: "grid", width: "100%", placeItems: "center", }}>
                    <CircularProgress />
                  </Box>
                  ) : (
                  ""
                  )}
                  <BasicModal
                    openModal={openModal}
                    title="Orders payment successful "
                    handleCloseModal={handleCloseModal}
                  />
                </div>
              </div>
            )}
          </div>

          <div className={styles.checkoutOrdersummery}>
            {orders.map((orders) => (
              <div key={orders?._id} className={styles.orderinfo}>
                <div className={styles.productDetails}>
                  <div className={styles.productImg}>
                    <img
                      src={orders?.images ? orders?.images[0]?.url : ""}
                      alt="product Img"
                    />
                  </div>

                  <div className={styles.product}>
                    <div className={styles.productInfo}>
                      <div className={styles.productTitle}>{orders.name}</div>
                    </div>
                    <div className={styles.Qty}>
                      <div
                        className={styles.decrement}
                        onClick={() => handleDecrement(orders)}
                      >
                        -
                      </div>
                      <div className={styles.qtyValue}>{orders.cartQty}</div>
                      <div
                        className={styles.increment}
                        onClick={() => handleIncrement(orders)}
                      >
                        +
                      </div>
                    </div>
                  </div>

                  <div className={styles.productPrice}>
                    <CurrencyRupeeIcon />
                    {orders.price}
                  </div>
                </div>
                <Divider />
              </div>
            ))}

            <div className={styles.priceCal}>
              <div className={styles.subTotal}>
                <p>sub total :</p>
                <p>
                  <CurrencyRupeeIcon />
                  {orders.reduce(
                    (acc, item) => acc + item.cartQty * item.price,
                    0
                  )}
                </p>
              </div>
              <div className={styles.deliveryFee}>
                <p>delivery fee :</p>
                <p>free</p>
              </div>
            </div>
            <Divider />
            <div className={styles.grandTotal}>
              <h4>total </h4>
              <h4>
                <CurrencyRupeeIcon />
                {orders.reduce(
                  (acc, item) => acc + item.cartQty * item.price,
                  0
                )}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>}
    </>
  );
};
export default Checkout;
