import React from 'react'
import styles from './CartEmpty.module.scss';
import cartEmpty from 'assets/images/cart.png'
import BaseButton from 'components/atoms/Button';
import { useNavigate } from 'react-router-dom';

const EmptyCart = () => {
    const Navigate = useNavigate();

    const handleOrders = () => {
        Navigate("/")
    }

  return (
    <div className={styles.cartEmpty}>
      <div className={styles.cartEmptyContainer}>
        <div className={styles.cartEmptyImage}>
          <img src={cartEmpty} alt="cartEmpty" />
        </div>
        <div className={styles.cartEmptyDesc}>
          <h4 className='mb-4'>Your cart is empty</h4>
          <BaseButton className="mb-5" variant="contained" onClick={handleOrders} style={{background:"#1e1e2d"}}>Start Shopping</BaseButton>
        </div>
      </div>
    </div>
  );
}

export default EmptyCart
