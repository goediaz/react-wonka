import React from 'react';
import styles from './home.module.scss';
import ListOfWorkers from '../../components/ListOfWorkers/listOfWorkers';

const Home = () => {
  return (
    <section className={styles.homeContainer}>
      <header className={styles.homeHeader}>
        <h2>Find your Oompa Loompa</h2>
        <h3>There are more than 100k</h3>
      </header>
      <ListOfWorkers />
    </section>
  )
}

export default Home;