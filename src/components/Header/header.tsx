import React from 'react';
import styles from './header.module.scss';
import logo from '../../assets/images/logo.png';
import { Link } from "wouter";

const Header = () => {
  return (
    <div className={styles.headerComponent}>
      <div className={styles.headerContentContainer}>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <h1>Oompa Loompa's Crew</h1>
      </div>
    </div>
  )
}

export default Header;