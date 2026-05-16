import React from 'react'
import NotificationImg from '../../../assets/images/notification.png'
import styles from './Notification.module.scss';

const Notifications = () => {
  return (
    <div>
      <div className={styles.notification}>
      <div className={styles.notificationContainer}>
        <div className={styles.notificationImage}>
          <img src={NotificationImg} alt="Notifications" />
        </div>
        <div className={styles.notificationDesc}>
          <h4>All caught up!</h4>
          <p>There are no new notifications for you.</p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Notifications
