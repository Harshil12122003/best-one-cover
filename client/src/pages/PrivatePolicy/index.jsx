import React from 'react'
import styles from './PrivatePolicy.module.scss'

const PrivatePolicy = () => {
    return (
        <div className={styles.privatePolicy}>
            <h1 className={styles.mainTitle}>privacy policy</h1>
            <div className={styles.privatePolicyContainer}>
                <div className={styles.mainHeader}>

                    <p className={styles.title}>We protect your privacy</p>

                    <p className={styles.thought}>Our privacy policy is simple: any information you give us stays with us. We do not rent, sell, lend, or otherwise distribute your personal information to anyone for any reason. This includes your contact information, as well as specific order information.</p>

                    <p className={styles.title}> We limit data access to those who need to know.</p>


                    <p className={styles.shortThoght}>
                        Within our organization, your personal data is accessible to only a limited number of employees with special access privileges. Although we may, from time to time, compile general demographic information based on your order, this information is shared within our organization only and has no identifiable personal data associated with it.</p>
                </div>

                <div className={styles.information}>
                    <h3 className={styles.infoTitle}>Information Collected</h3>
                    <p className={styles.tagline}>To enable you to place an order on our site, we need to have the following basic information about you: Your First Name, Your Last Name, and Your Address, City, Zip code, State, Country, Phone Number and Contact E-mail address.
                    </p>
                    <p className={styles.tagline}>We do not allow any unauthorized person or organization be it other members, visitors, and anyone not in our organization to use any information collected from you.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PrivatePolicy
