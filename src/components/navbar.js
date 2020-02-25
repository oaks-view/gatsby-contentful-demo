import React from 'react'
import styles from './navbar.module.css';

const Navbar = () => {
    return <div className={styles.topnav}>
        <a href="#home" className={styles.active}>Home</a>
        <a href="#news">News</a>
        <a href="#contact">Contact</a>
        <div className={styles.dropdown}>
            <button className={styles.dropbtn}>Where do you want to move to
        <i className={[styles.fa, , styles['fa-caret-down]']]}></i>
            </button>
            <div className={styles.dropdownContent}>
                {/* <a href="#">Germany</a>
                <a href="#">France</a>
                <a href="#">Sweden</a> */}
            </div>
        </div>
        <a href="#about">About</a>
        <a href="javascript:void(0);" className={styles.icon} onclick="myFunction()">&#9776;</a>
    </div>
}

export default Navbar;
