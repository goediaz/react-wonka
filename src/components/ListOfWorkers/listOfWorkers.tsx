import React, { useState, useEffect, useCallback } from 'react';
import styles from './listOfWorkers.module.scss';
import Card from '../Card/card';
import getWorkers, { IWorkerCard } from '../../services/getWorkers';
import Spinner from '../Spinner/spinner';

const ListOfWorkers = () => {
  const [workers, setWorkers] = useState<IWorkerCard[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => { 
    const newWorkers = await getWorkers(0)
    setWorkers(prevWorkers => prevWorkers.concat(newWorkers));
  }, [])

  useEffect(() => {
    setIsLoading(true);
    fetchData();
    setIsLoading(false);
  }, [fetchData])

  return (
    <div className={styles.listOfWorkersContainer}>
      {isLoading ?
      <Spinner /> :
      workers.map((worker, index) => 
        <Card 
          name={worker.name}
          id={worker.id} 
          gender={worker.gender} 
          profession={worker.profession} 
          imgSrc={worker.image} 
          key={index} 
        />
      )}
    </div>
  )
}

export default ListOfWorkers;