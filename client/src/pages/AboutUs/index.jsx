import React from 'react'
import styles from './AboutUs.module.scss'

const AboutUs = () => {
  return (
    <div className={styles.aboutUs}>
      <h1 className={styles.mainTitle}>about us</h1>
      <div className={styles.aboutUsContainer}>
        <div className={styles.mainHeader}>

          <h3 className={styles.title}>Our Pride</h3>

          <p className={styles.thought}>Excellent , Efficient And Productive</p>
          <p className={styles.shortThoght}>Your cover is a style statement. It reflects your personality. You wear your cover more often than your favorite outfits!</p>
          <p className={styles.shortThoght}>We bring to our customers, affordable style statements that have been crafted with meticulous attention to detail by our in-house designers and product development team.
          </p>
          <p className={styles.shortThoght}>
            To top it all, we deliver your product to you in a very secure way through the fastest courier service possible. We have transformed buying a cover into an occasion in itself.</p>
        </div>

        <div className={styles.best1CoverOffer}>
          <h3 className={styles.offerTitle}>What Best1 Cover Offer</h3>
          <p className={styles.tagline}><b className={styles.label}>Designing :</b>  Our products are designed by our experienced in-house team. We work hard to provide you with the latest designs and durable covers. We're constantly expanding our range of mobile phone covers.
          </p>
          <p className={styles.tagline}><b className={styles.label}>Payments :</b> We offer a completely hassle-free experience of online shopping with an option to pay Credit Card, Debit Card</p>
          <p className={styles.tagline}><b className={styles.label}>Delivery :</b> We offer Free Shipping through the fastest possible courier services that offer live tracking.</p>
          <p className={styles.tagline}><b className={styles.label}>100% Satisfaction Guaranteed :</b> We exist for our customers. With every click you make and the product you purchase, we learn a little more about you so that we can tailor our services to suit your ever-changing tastes.</p>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
