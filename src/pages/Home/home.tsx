import React from 'react';
import styles from './home.module.scss';
import { Link } from "wouter";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <Link href="/IdDelOompa"><button>Go!</button></Link>
    </div>
  )
}

export default Home;