import React, { useState, useEffect, useCallback } from 'react';
import styles from './listOfWorkers.module.scss';
import Card from '../Card/card';
import { getWorkers, IWorkerCard, getLastQueriedPage } from '../../services/getWorkers';
import Spinner from '../Spinner/spinner';
import useVisibility from '../../hooks/useVisibility';

interface Props {
  workersFromFilter?: IWorkerCard[]
}

const ListOfWorkers = (props: Props) => {
  const [workers, setWorkers] = useState<IWorkerCard[]>([])
  const [isLoading, setIsLoading] = useState<boolean>();
  const [isEndOfList, scrollEndRef] = useVisibility<HTMLDivElement>();
  const [page, setPage] = useState<number>(1);

  const fetchData = useCallback(async () => {
    const newWorkers = await getWorkers(page)
    if (newWorkers) setWorkers(prevWorkers => prevWorkers.concat(newWorkers.data));
  }, [page])

  useEffect(() => {
    setIsLoading(true);
    fetchData();
    setIsLoading(false);
  }, [])

  useEffect(() => {
    if (isEndOfList && !props.workersFromFilter?.length) {
      const lastPageCached = getLastQueriedPage();
      if (lastPageCached && lastPageCached > page) {
        setPage(lastPageCached + 1); 
      } else {
        setPage(prevPage => prevPage + 1); 
      }
    } 
  }, [isEndOfList])

  useEffect(() => {
    if (page > 1) {
      fetchData();
    }
  }, [fetchData, page])

  const checkIfUserIsFiltering = (): JSX.Element => {
    if (props.workersFromFilter?.length) {
      return (
        <>
          {props.workersFromFilter.map((worker, index) => 
            <Card 
              name={worker.name}
              id={worker.id} 
              gender={worker.gender} 
              profession={worker.profession} 
              imgSrc={worker.image} 
              key={index} 
            />
          )}
        </>
      )
    } else {
      return (
        isLoading ?
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
          <div id="endOfScroll" ref={scrollEndRef}></div>
        </>
      )
    }
  }
  return (
    <div className={styles.listOfWorkersContainer}>
      {checkIfUserIsFiltering()}
    </div>
  )
}

export default ListOfWorkers;