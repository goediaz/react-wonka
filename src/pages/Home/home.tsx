import React, { useState, useEffect } from 'react';
import getWorkers, { IWorker } from '../../services/getWorkers';
import styles from './home.module.scss';
import Card from '../../components/Card/card';

const Home = () => {
  const [workers, setWorkers] = useState<IWorker[]>([])

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    const workers = await getWorkers()
    setWorkers(workers);
  }

  return (
    <section className={styles.homeContainer}>
      {workers.map((worker) => 
        <Card 
          name={worker.name}
          id={worker.id} 
          gender={worker.gender} 
          profession={worker.profession} 
          imgSrc={worker.image} 
          key={worker.id} 
        />
      )}
    </section>
  )
}
   
export default Home;