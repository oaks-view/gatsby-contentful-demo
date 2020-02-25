import React from 'react'
import styles from './navbar.module.css';

const Navbar = () => {
    return <div className={styles.topnav}>
        <a href="/">
            <img className={styles.logoImg} src={'/images/movinga-logo.png'} alt="Logo" />
        </a>

        <div className={styles.dropdown}>
            <button className={styles.dropbtn}>Where do you want to move to
        {/* <i className={[styles.fa, , styles['fa-caret-down]']]}></i> */}
            </button>
            <div className={styles.dropdownContent}>
            </div>
        </div>
    </div>
}

export default Navbar;
