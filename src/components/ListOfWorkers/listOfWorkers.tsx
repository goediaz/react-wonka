import React, { useState, useEffect, useCallback } from 'react';
import styles from './listOfWorkers.module.scss';
import Card from '../Card/card';
import getWorkers, { IWorkerCard } from '../../services/getWorkers';
import Spinner from '../Spinner/spinner';
import useVisibility from '../../hooks/useVisibility';

const ListOfWorkers = () => {
  const [workers, setWorkers] = useState<IWorkerCard[]>([])
  const [isLoading, setIsLoading] = useState<boolean>();
  const [isEndOfList, scrollEndRef] = useVisibility<HTMLDivElement>(100);
  const [page, setPage] = useState<number>(0);

  const fetchData = useCallback(async () => { 
    const newWorkers = await getWorkers(page)
    setWorkers(prevWorkers => prevWorkers.concat(newWorkers));
  }, [page])

  useEffect(() => {
    setIsLoading(true);
    fetchData();
    setIsLoading(false);
  }, [])

  useEffect(() => {
    if (isEndOfList) {
      setPage(prevPage => prevPage + 1); 
    } 
  }, [isEndOfList])

  useEffect(() => {
    if (page > 0) {
      fetchData();
    }
  }, [fetchData, page])

  return (
    <div className={styles.listOfWorkersContainer}>
      {isLoading ?
      <Spinner /> :
        <>
          {workers.map((worker, index) => 
            <Card 
              name={worker.name}
              id={worker.id} 
              gender={worker.gender} 
              profession={worker.profession} 
              imgSrc={worker.image} 
              key={index} 
            />
          )}
          <div ref={scrollEndRef}></div>
        </>
      } 
    </div>
  )
}

export default ListOfWorkers;