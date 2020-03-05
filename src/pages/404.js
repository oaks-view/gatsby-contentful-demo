import React from 'react'
import styles from './404.module.css'

const NotFoundPage = () => (
  <div className={styles.content}>
    <img
      alt="404 page"
      width="206"
      src="/images/404.png"
      className={styles.icon404}
    />
    <h2 className={styles.title}>Page not found</h2>
    <p className={styles.description}>
      The page you are looking for doesn't exist or has been moved.
    </p>
  </div>
)

export default NotFoundPage
