import BaseButton from 'components/atoms/Button';
import React from 'react';
import AddressImg from '../../../assets/images/address.jpg';
import styles from './Address.module.scss';

const Address = (props) => {

    const { setAddress} = props;

    const handleAddress = () => {
        setAddress(true)
    }
  return (
    <div className={styles.addressWrapper}>
        <div className={styles.emptyWrapper}>
            <div className={styles.locationImg}>
                <img src={AddressImg} alt="addressImage" />
            </div>
            <div className={styles.locationDesc}>

                <h4>No Addresses found in your account!</h4>
                <p>add a delivery address.  </p>
            </div>
            <div className={styles.locationAdd}>
                <BaseButton variant="contained" onClick={handleAddress} style={{background:"#1e1e2d"}}>add address</BaseButton>
            </div>
        </div>
    </div>
  )
}

export default Address