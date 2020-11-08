import React, { useState, useEffect } from 'react';
import getWorkers, { IWorkerCard } from '../../services/getWorkers';
import styles from './home.module.scss';
import Card from '../../components/Card/card';
import Spinner from '../../components/Spinner/spinner';

const Home = () => {
  const [workers, setWorkers] = useState<IWorkerCard[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [])

  const fetchData = async (page: number = 1) => {
    const workers = await getWorkers(page)
    setWorkers(workers);
    setIsLoading(false);
  }

  return (
    <section className={styles.homeContainer}>
      <header className={styles.homeHeader}>
        <h2>Find your Oompa Loompa</h2>
        <h3>There are more than 100k</h3>
      </header>
      <div className={styles.homeContent}>
      {
        isLoading ?
        <Spinner /> : 
        workers.map((worker) => 
          <Card 
            name={worker.name}
            id={worker.id} 
            gender={worker.gender} 
            profession={worker.profession} 
            imgSrc={worker.image} 
            key={worker.id} 
          />
        )}
      </div>
    </section>
  )
}
   
export default Home;