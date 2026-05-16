import React from 'react'
import styles from './ShippingPolicy.module.scss'

const ShippingPolicy = () => {
    return (
        <div className={styles.shippingPolicy}>
            <h1 className={styles.mainTitle}>Shipping Policy</h1>
            <div className={styles.shippingPolicyContainer}>
                <div className={styles.mainHeader}>

                    <p className={styles.thought}><b> best1Cover.com</b>  delivers your products in a very secured way through the fastest courier service available at your Pincode. We offer Free Shipping on All Orders</p>

                    <h3 className={styles.title}>How does the delivery process work?</h3>

                    <ul className={styles.unOrderList}>
                        <li>Once we receive your order, We immediately start manufacturing your ordered products.</li>
                        <li>After your ordered phone covers are manufactured, the covers are inspected thoroughly to ensure they are in a perfect condition.</li>
                        <li>After they pass through the final round of quality check, they are packed and handed over to our trusted delivery partner.</li>
                        <li>We prepare, manufacture, pack, and ship your order to the courier partners within 24 hours. Also, we always try to ship the orders through fastest available courier service available at your Pincode.  </li>
                    </ul>

                    <div className={styles.information}>
                        <h3 className={styles.title}>How are items packaged?</h3>
                        <p className={styles.tagline}>We package our products in our Premium Branded best1Cover Boxes. Each individual product is packaged in bubble wrap to ensure its secure delivery throughout delivery process to make sure it reaches you in perfect conditions.
                        </p>
                        <p className={styles.tagline}>We pride ourselves on the quality of our packaging.</p>
                    </div>

                    <div className={styles.information}>
                        <h3 className={styles.title}>How are items packaged?</h3>
                        <p className={styles.tagline}>We package our products in our Premium Branded best1Cover Boxes. Each individual product is packaged in bubble wrap to ensure its secure delivery throughout delivery process to make sure it reaches you in perfect conditions.
                        </p>
                        <p className={styles.tagline}>We pride ourselves on the quality of our packaging.</p>
                    </div>

                    <div className={styles.information}>
                        <h3 className={styles.title}>What is the range of locations to which best1Cover ships their products?</h3>
                        <p className={styles.tagline}>best1Cover.com ships throughout India!</p>
                    </div>

                    <div className={styles.information}>
                        <h3 className={styles.title}>What is the estimated delivery time? </h3>
                        <p className={styles.tagline}>We usually dispatch most orders within 24 hours from our warehouse. After the order is dispatched, orders are generally delivered within 3 days in the metro cities, and takes around 5 days in non-metro cities. </p>
                    </div>

                    <div className={styles.information}>
                        <h3 className={styles.title}>Are there any shipping charges applicable on my order?</h3>
                        <p className={styles.tagline}>No, We Offer Free Shipping on All orders !</p>
                    </div>

                    <div className={styles.information}>
                        <h3 className={styles.title}>Does best1Cover.com ship outside India?</h3>
                        <p className={styles.tagline}>Currently, in this Covid-19 Situation, the International shipments are hugely impacted, so currently we are not shipping Outside of India.</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ShippingPolicy
