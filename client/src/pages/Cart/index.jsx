import React from "react";
import styles from "./Cart.module.scss";
import { Divider } from "@mui/material";
import BaseButton from "components/atoms/Button";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actions as cartActions } from "redux/Cart/action";
import DeleteIcon from '@mui/icons-material/Delete';
import CartEmpty from './CartEmpty';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  // const authUser = useSelector((state) => state.auth.auth.success)

  const token = localStorage.getItem("TOKEN");


  const increaseQuantity = (product, stock) => {
    const newQty = product.cartQty + 1;
    if (stock <= product.cartQty) {
      return;
    }
    dispatch(cartActions.addItemsToCart({ ...product, cartQty: newQty }));
  };

  const decreaseQuantity = (product) => {
    const newQty = product.cartQty - 1;
    if (product.cartQty <= 1) {
      return;
    }
    dispatch(cartActions.addItemsToCart({ ...product, cartQty: newQty }));
  };

  const deleteCartItems = (id) => {
    dispatch(cartActions.removeItemsFromCart(id));
  };

  const handleCheckout = () => {
    if(token){
      localStorage.setItem("auth-checkout", true);
      navigate("/checkout");
    }
    else {
      navigate('/signin')
    }
  };
  return (
    <>
      {cartItems?.length > 0 ? <div className={styles.cart}>
        <div className={styles.cartContainer}>
          <div className={styles.cartContent}>
            <div className={styles.cartLists}>
              {cartItems.map((product) => (
                <div key={product._id} className={styles.cartProduct}>
                  <div className={styles.ProductImg}>
                    <img
                      src={product?.images ? product?.images[0]?.url : ""}
                      alt={product.name ? product.name : ""}
                    />
                  </div>
                  <div className={styles.productDetails}>
                    <div className={styles.productInfo}>
                      <div className={styles.productTitle}>
                        {product.name ? product.name : ""}
                      </div>
                      <div className={styles.productPrice}>
                        ₹{/* <CurrencyRupeeIcon /> */}
                        {product.price ? product.price : ""}
                      </div>
                    </div>
                    <div className={styles.ProductQty}>
                      <div className={styles.ProductAddRemove}>
                        <div
                          className={styles.decrement}
                          onClick={() => decreaseQuantity(product)}
                        >
                          <a className={styles.sign}>-</a>
                        </div>
                        <div className={styles.qtyValue}>{product.cartQty}</div>
                        <div
                          className={styles.increment}
                          onClick={() => increaseQuantity(product, product.qty)}
                        >
                          <a className={styles.sign}>+</a>
                        </div>
                      </div>
                      <div
                        className={styles.productRemove}
                        onClick={() => deleteCartItems(product._id)}
                      >
                        <DeleteIcon className="text-danger" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.cartSummary}>
              <div className={styles.checkoutOrdersummery}>
                <h2>PRICE DETAILS</h2>
                <Divider />
                <div className={styles.priceCal}>
                  <div className={styles.subTotal}>
                    <div>
                      <p>sub total :</p>
                      <p>(including GST)</p>
                    </div>
                    <p>
                      ₹
                      {cartItems.reduce(
                        (acc, item) => acc + item.cartQty * item.price,
                        0
                      )}
                    </p>
                  </div>
                  <div className={styles.deliveryFee}>
                    <p>delivery fee :</p>
                    <p>Free</p>
                  </div>
                </div>
                <Divider />
                <div className={styles.grandTotal}>
                  <h4>total </h4>
                  <h4>
                    ₹
                    {cartItems.reduce(
                      (acc, item) => acc + item.cartQty * item.price,
                      0
                    )}
                  </h4>
                </div>
              </div>
              <div className={styles.goCheckout}>
                <BaseButton variant="contained" onClick={handleCheckout}>
                  proceed to checkout
                </BaseButton>
              </div>
            </div>
          </div>
        </div>
      </div> : <CartEmpty />}
    </>
  );
};

export default Cart;
