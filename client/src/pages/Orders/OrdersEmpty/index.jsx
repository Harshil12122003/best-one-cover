import BaseButton from "components/atoms/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
import EmptyOrderImg from "assets/images/no-order.svg";
import styles from "./OrdersEmpty.module.scss";

const Orders = (props) => {

    const Navigate = useNavigate();

    const handleOrders = () => {
        Navigate("/")
    }

  return (
    <div className={styles.OrdersEmpty}>
      <div className={styles.OrdersEmptyContainer}>
        <div className={styles.OrdersEmptyImage}>
          <img src={EmptyOrderImg} alt="EmptyOrderImage" />
        </div>
        <div className={styles.OrdersEmptyDesc}>
          <h4>You have no orders</h4>
          <BaseButton variant="contained" onClick={handleOrders} style={{background:"#1e1e2d"}}>Start Shopping</BaseButton>
        </div>
      </div>
    </div>
  );
};

export default Orders;
